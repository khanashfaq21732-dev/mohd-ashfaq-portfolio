/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { db } from './server/db/index';

const app = express();
const PORT = 3000;

// Enable JSON body parser with limit enforcements (Denial of Wallet protection)
app.use(express.json({ limit: '10mb' }));

// Helper to hash password with salt
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + "ashfaq-secure-salt-2026").digest('hex');
}

// Simple cryptographically signed sessions (custom JWT-like implementation to avoid compiling issues)
const SESSION_SECRET = "ashfaq-super-secret-session-key-2026-portfolio";
function generateToken(payload: object): string {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('hex');
  return `${data}.${signature}`;
}

function verifyToken(token: string): any | null {
  try {
    const [data, signature] = token.split('.');
    if (!data || !signature) return null;
    const expectedSignature = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('hex');
    if (signature !== expectedSignature) return null;
    return JSON.parse(Buffer.from(data, 'base64').toString('utf8'));
  } catch (e) {
    return null;
  }
}

// Helper to escape HTML characters to prevent stored/reflective XSS attacks
function escapeHtml(text: string): string {
  if (typeof text !== 'string') return text;
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Helper to validate email addresses using standard regular expression
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Manual Cookie Parser utility middleware
app.use((req, res, next) => {
  const cookieHeader = req.headers.cookie || '';
  const cookies: Record<string, string> = {};
  cookieHeader.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    if (parts.length === 2) {
      cookies[parts[0].trim()] = parts[1].trim();
    }
  });
  (req as any).cookies = cookies;
  next();
});

// Auth Middleware
function requireAuth(role?: string) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization || '';
    let token = '';
    
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      token = (req as any).cookies?.token || '';
    }

    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }

    if (role && payload.role !== role) {
      return res.status(403).json({ error: "Insufficient privileges. Requires role: " + role });
    }

    (req as any).user = payload;
    next();
  };
}

// REST API ROUTES
const router = express.Router();

// --- AUTHENTICATION ENDPOINTS ---
router.post('/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }

  const existingUser = db.getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ error: "User with this email already exists" });
  }

  const passwordHash = hashPassword(password);
  const newUser = {
    id: "user-" + Date.now(),
    name,
    email,
    passwordHash,
    role: "user",
    createdAt: new Date().toISOString()
  };

  db.addUser(newUser);
  const token = generateToken({ id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role });

  res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 86400000 });
  res.json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } });
});

router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = db.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const inputHash = hashPassword(password);
  // Support both new hashing and seed hashing md5/sha256 for backward compatibility
  const md5Hash = crypto.createHash('md5').update(password).digest('hex'); // For seeded admin
  
  if (user.passwordHash !== inputHash && user.passwordHash !== md5Hash) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = generateToken({ id: user.id, name: user.name, email: user.email, role: user.role });
  res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 86400000 });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

router.post('/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: "Logged out successfully" });
});

router.get('/auth/me', (req, res) => {
  const authHeader = req.headers.authorization || '';
  let token = '';
  
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else {
    token = (req as any).cookies?.token || '';
  }

  if (!token) {
    return res.json({ user: null });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.json({ user: null });
  }

  res.json({ user: payload });
});

// --- VISITOR ANALYTICS RECORDER ---
router.post('/analytics/log', (req, res) => {
  const { referrer } = req.body;
  const userAgent = req.headers['user-agent'] || '';
  
  // Basic user-agent parsing
  let browser = 'Unknown';
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';

  let device = 'Desktop';
  if (userAgent.includes('Mobi') || userAgent.includes('Android') || userAgent.includes('iPhone')) {
    device = 'Mobile';
  } else if (userAgent.includes('Tablet') || userAgent.includes('iPad')) {
    device = 'Tablet';
  }

  // IP/Country simulation
  const countries = ['India', 'United States', 'United Kingdom', 'Germany', 'Canada', 'Singapore'];
  const country = countries[Math.floor(Math.random() * countries.length)];

  const newLog = {
    id: "log-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
    timestamp: new Date().toISOString(),
    country,
    browser,
    device,
    referrer: referrer || 'Direct / None'
  };

  db.addVisitorLog(newLog);
  res.json({ success: true });
});

router.get('/analytics/summary', requireAuth('admin'), (req, res) => {
  res.json(db.getAnalyticsSummary());
});

// --- PROJECTS ENDPOINTS ---
router.get('/projects', (req, res) => {
  res.json(db.getProjects());
});

router.post('/projects', requireAuth('admin'), (req, res) => {
  const project = req.body;
  if (!project.id || !project.title || !project.description) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  db.saveProject(project);
  res.json({ success: true, project });
});

router.delete('/projects/:id', requireAuth('admin'), (req, res) => {
  db.deleteProject(req.params.id);
  res.json({ success: true });
});

// --- BLOGS & COMMENTS ENDPOINTS ---
router.get('/blogs', (req, res) => {
  res.json(db.getBlogs());
});

router.post('/blogs', requireAuth('admin'), (req, res) => {
  const blog = req.body;
  if (!blog.id || !blog.title || !blog.excerpt || !blog.content) {
    return res.status(400).json({ error: "Missing required blog fields" });
  }
  db.saveBlog(blog);
  res.json({ success: true, blog });
});

router.delete('/blogs/:id', requireAuth('admin'), (req, res) => {
  db.deleteBlog(req.params.id);
  res.json({ success: true });
});

router.get('/blogs/:id/comments', (req, res) => {
  const comments = db.getComments().filter(c => c.blogId === req.params.id);
  res.json(comments);
});

router.post('/blogs/:id/comments', (req, res) => {
  const { userName, content } = req.body;
  if (!userName || !content) {
    return res.status(400).json({ error: "Username and comment content are required" });
  }

  const sanitizedUserName = escapeHtml(userName.trim().substring(0, 100));
  const sanitizedContent = escapeHtml(content.trim().substring(0, 2000));

  const newComment = {
    id: "comment-" + Date.now(),
    blogId: req.params.id,
    userName: sanitizedUserName,
    content: sanitizedContent,
    createdAt: new Date().toISOString()
  };

  db.addComment(newComment);
  res.json({ success: true, comment: newComment });
});

router.post('/blogs/:id/like', (req, res) => {
  const blog = db.getBlogs().find(b => b.id === req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "Blog post not found" });
  }
  blog.likes = (blog.likes || 0) + 1;
  db.saveBlog(blog);
  res.json({ success: true, likes: blog.likes });
});

// --- SKILLS ENDPOINTS ---
router.get('/skills', (req, res) => {
  res.json(db.getSkills());
});

router.post('/skills', requireAuth('admin'), (req, res) => {
  const skill = req.body;
  if (!skill.id || !skill.name || skill.level === undefined) {
    return res.status(400).json({ error: "ID, name, and level are required" });
  }
  db.saveSkill(skill);
  res.json({ success: true, skill });
});

router.delete('/skills/:id', requireAuth('admin'), (req, res) => {
  db.deleteSkill(req.params.id);
  res.json({ success: true });
});

// --- EXPERIENCE TIMELINE ENDPOINTS ---
router.get('/experiences', (req, res) => {
  res.json(db.getExperiences());
});

router.post('/experiences', requireAuth('admin'), (req, res) => {
  const exp = req.body;
  if (!exp.id || !exp.role || !exp.company || !exp.period) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  db.saveExperience(exp);
  res.json({ success: true, experience: exp });
});

router.delete('/experiences/:id', requireAuth('admin'), (req, res) => {
  db.deleteExperience(req.params.id);
  res.json({ success: true });
});

// --- TESTIMONIALS ENDPOINTS ---
router.get('/testimonials', (req, res) => {
  res.json(db.getTestimonials());
});

router.post('/testimonials', requireAuth('admin'), (req, res) => {
  const testimonial = req.body;
  if (!testimonial.id || !testimonial.name || !testimonial.content) {
    return res.status(400).json({ error: "Missing testimonial fields" });
  }
  db.saveTestimonial(testimonial);
  res.json({ success: true, testimonial });
});

router.delete('/testimonials/:id', requireAuth('admin'), (req, res) => {
  db.deleteTestimonial(req.params.id);
  res.json({ success: true });
});

// --- GALLERY ENDPOINTS ---
router.get('/gallery', (req, res) => {
  res.json(db.getGallery());
});

router.post('/gallery', requireAuth('admin'), (req, res) => {
  const item = req.body;
  if (!item.id || !item.title || !item.url) {
    return res.status(400).json({ error: "Missing required gallery fields" });
  }
  db.saveGalleryItem(item);
  res.json({ success: true, galleryItem: item });
});

router.delete('/gallery/:id', requireAuth('admin'), (req, res) => {
  db.deleteGalleryItem(req.params.id);
  res.json({ success: true });
});

// --- SETTINGS ENDPOINTS ---
router.get('/settings', (req, res) => {
  res.json(db.getSettings());
});

router.post('/settings', requireAuth('admin'), (req, res) => {
  db.updateSettings(req.body);
  res.json({ success: true, settings: db.getSettings() });
});

// --- RESUME ENDPOINTS ---
router.get('/resume/download', (req, res) => {
  // Let's create an elegant auto-generated PDF/text resume fallback
  const settings = db.getSettings();
  const experiences = db.getExperiences();
  const skills = db.getSkills();

  let resumeText = `==================================================\n`;
  resumeText += `            RESUME - ${settings.name.toUpperCase()}\n`;
  resumeText += `            ${settings.title}\n`;
  resumeText += `==================================================\n\n`;
  resumeText += `Email: ${settings.email}\n`;
  resumeText += `Phone: ${settings.phone}\n`;
  resumeText += `GitHub: ${settings.github}\n`;
  resumeText += `LinkedIn: ${settings.linkedin}\n\n`;
  resumeText += `BIOGRAPHY\n`;
  resumeText += `---------\n`;
  resumeText += `${settings.bio}\n\n`;
  resumeText += `EDUCATION & EXPERIENCE TIMELINE\n`;
  resumeText += `--------------------------------\n`;
  
  experiences.forEach(e => {
    resumeText += `* ${e.role} | ${e.company} (${e.period})\n`;
    e.description.forEach(desc => {
      resumeText += `  - ${desc}\n`;
    });
    resumeText += `\n`;
  });

  resumeText += `CORE COMPETENCIES & TECHNICAL SKILLS\n`;
  resumeText += `-------------------------------------\n`;
  const categories = ['Languages', 'Core CS', 'Web & Frameworks', 'Tools & Platforms'];
  categories.forEach(cat => {
    const catSkills = skills.filter(s => s.category === cat);
    if (catSkills.length > 0) {
      resumeText += `${cat}: ${catSkills.map(s => `${s.name} (${s.level}%)`).join(', ')}\n`;
    }
  });

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Disposition', `attachment; filename=Resume_Mohd_Ashfaq_Khan.txt`);
  res.send(resumeText);
});

// --- CONTACT ENDPOINT WITH EMAIL AUTO-REPLY SIMULATION ---
router.post('/contact', (req, res) => {
  const { name, email, phone, company, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Name, email, subject, and message are required" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email address format" });
  }

  const sanitizedName = escapeHtml(name.trim().substring(0, 100));
  const sanitizedEmail = email.trim().toLowerCase().substring(0, 150);
  const sanitizedPhone = escapeHtml((phone || '').trim().substring(0, 30));
  const sanitizedCompany = escapeHtml((company || '').trim().substring(0, 100));
  const sanitizedSubject = escapeHtml(subject.trim().substring(0, 200));
  const sanitizedMessage = escapeHtml(message.trim().substring(0, 5000));

  const newMessage = {
    id: "msg-" + Date.now(),
    name: sanitizedName,
    email: sanitizedEmail,
    phone: sanitizedPhone,
    company: sanitizedCompany,
    subject: sanitizedSubject,
    message: sanitizedMessage,
    createdAt: new Date().toISOString(),
    isRead: false
  };

  db.addMessage(newMessage);

  // SIMULATE BACKEND SMTP NOTIFICATIONS
  console.log(`[SMTP SIMULATOR] Sent internal notification email to khanashfaq21732@gmail.com!`);
  console.log(`[SMTP SIMULATOR] Content: New contact message from ${sanitizedName} (${sanitizedEmail}) - Subject: ${sanitizedSubject}`);
  
  console.log(`[SMTP SIMULATOR] Sent auto-reply email to ${sanitizedEmail}!`);
  console.log(`[SMTP SIMULATOR] Content: "Hello ${sanitizedName}, thank you for reaching out to Mohd. Ashfaq Khan. He will get back to you shortly!"`);

  res.json({ 
    success: true, 
    message: "Message logged successfully! Simulated auto-reply and admin notification emails dispatched.",
    data: newMessage
  });
});

router.get('/contact/messages', requireAuth('admin'), (req, res) => {
  res.json(db.getMessages());
});

router.post('/contact/messages/:id/read', requireAuth('admin'), (req, res) => {
  db.markMessageAsRead(req.params.id);
  res.json({ success: true });
});

router.delete('/contact/messages/:id', requireAuth('admin'), (req, res) => {
  db.deleteMessage(req.params.id);
  res.json({ success: true });
});

// --- SUBSCRIBERS ENDPOINTS ---
router.post('/subscribers', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email address is required" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email address format" });
  }

  const sanitizedEmail = email.trim().toLowerCase().substring(0, 150);

  const existing = db.getSubscriberByEmail(sanitizedEmail);
  if (existing) {
    return res.status(409).json({ error: "This email is already subscribed!" });
  }

  const newSubscriber = {
    id: "sub-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
    email: sanitizedEmail,
    subscribedAt: new Date().toISOString()
  };

  db.addSubscriber(newSubscriber);

  console.log(`[SMTP SIMULATOR] Dispatching welcome confirmation email to ${sanitizedEmail}!`);

  res.json({
    success: true,
    message: "Subscription successful! You have been registered for newsletter and portfolio updates.",
    data: newSubscriber
  });
});

router.get('/subscribers', requireAuth('admin'), (req, res) => {
  res.json(db.getSubscribers());
});

// Bind routing under /api prefix
app.use('/api', router);

// Setup static serving & Vite middleware integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Full-Stack Portfolio running on http://localhost:${PORT}`);
  });
}

startServer();
