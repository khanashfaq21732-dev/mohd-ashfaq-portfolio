import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const JWT_SECRET = 'ashfaq-portfolio-secret-key-2026';

app.use(express.json());
app.use(cookieParser());

// Initial In-Memory / Persistent Data Store
let projectsStore = [
  {
    id: 'dasheri-shield',
    title: 'Agri-Tech System – The Dasheri Shield',
    tagline: 'Web-based inventory and crop disease monitoring prototype',
    category: 'IoT & Embedded',
    description: 'An Agri-Tech crop-monitoring and inventory system prototype engineered to track micro-climate telemetry, simulate crop health records, and predict disease risks for mango orchards.',
    details: `### Challenge
Manual crop health logging and disease tracking in mango orchards leads to delayed response times against fungal infections like anthracnose and powdery mildew.

### Solution
Engineered a web-based crop-disease monitoring and inventory prototype using HTML5, CSS3, and JavaScript. Structured data-handling logic to simulate real-time crop health tracking and digital storage records, digitizing manual tracking workflows and improving simulated logging efficiency by ~30%.

### Key Achievements
- Ranked top 15 out of 44 university teams in a competitive hackathon for solution design and execution.
- Applied modular programming principles to ensure high maintainability and system scalability.
- Developed real-time telemetry visualizers for temperature, soil moisture, and leaf wetness duration (LWD).`,
    tags: ['C', 'Python', 'JavaScript', 'HTML5', 'CSS3', 'IoT Telemetry', 'DSA', 'Agri-Tech'],
    featured: true,
    githubUrl: 'https://github.com/khanashfaq21732-dev/dasheri-shield',
    demoUrl: '#dasheri-shield'
  },
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio Website',
    tagline: 'AI-assisted personal portfolio and project showcase website',
    category: 'Web Engineering',
    description: 'Developed a modern, fully responsive personal portfolio website using AI Studio, Next.js, React.js, and Tailwind CSS to showcase projects, technical skills, achievements, certifications, and professional experience.',
    details: `### Challenge
Creating a unified, highly polished digital presence that effectively highlights computer science fundamentals, hackathon accomplishments, and interactive software demonstrations.

### Solution
Designed an interactive, mobile-first user interface with reusable React components, smooth navigation, Three.js cosmic canvas visuals, and responsive layouts for seamless cross-device compatibility.

### Key Achievements
- Integrated live IoT telemetry dashboards using Recharts and interactive WebGL canvas background.
- Built an administrative telemetry & CMS dashboard supporting CRUD operations and visitor analytics.
- Leveraged AI-assisted development workflows to maintain high code accessibility, responsiveness, and performance.`,
    tags: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'Three.js', 'Node.js'],
    featured: true,
    githubUrl: 'https://github.com/khanashfaq21732-dev/mohd-ashfaq-portfolio',
    demoUrl: 'https://ai.studio/apps/c1988ea7-c380-4757-8937-5c7736f7562e?fullscreenApplet=true'
  }
];

let blogStore = [
  {
    id: 'dasheri-shield-deep-dive',
    title: 'Building Dasheri Shield: IoT Sensors for Precision Agriculture',
    date: '2026-06-15',
    readTime: '5 min read',
    excerpt: 'How we structured data-handling logic and modular programming to simulate real-time crop health tracking and digitize manual orchard workflows.',
    content: `Precision agriculture is transforming traditional farming by bringing data-driven telemetry straight to orchard management. During our university hackathon, our team designed "The Dasheri Shield" to tackle fungal disease outbreaks in mango crops.

By structuring modular JavaScript and simulated telemetry inputs for temperature, relative humidity, and leaf wetness duration (LWD), we created a predictive risk index algorithm that improved simulated logging efficiency by 30% and placed in the top 15 out of 44 competing teams.`,
    tags: ['Agri-Tech', 'IoT', 'C/C++', 'JavaScript', 'Hackathon'],
    comments: [
      { id: '1', author: 'Dr. A. Sharma', text: 'Excellent application of modular software logic to real-world agriculture!', date: '2026-06-16' }
    ]
  },
  {
    id: 'dsa-to-production',
    title: 'Bridging Data Structures & Algorithms into Production Web Apps',
    date: '2026-05-20',
    readTime: '4 min read',
    excerpt: 'How applying core DSA principles in C, Python, and TypeScript leads to cleaner code structure and efficient telemetry stream processing.',
    content: `Mastering Data Structures & Algorithms is more than just passing coding assessments—it is the foundation of writing memory-efficient, performant web applications and embedded system logic.

In this article, I discuss how sliding window algorithms and circular buffers enhance real-time sensor logging streams in React and Node.js applications.`,
    tags: ['DSA', 'C Programming', 'Python', 'React', 'Computer Science'],
    comments: []
  }
];

let messagesStore: any[] = [
  {
    id: 'msg-1',
    name: 'Agri-Tech Recruiter',
    email: 'recruiter@agritech.org',
    message: 'Impressive work on the Dasheri Shield crop monitoring system! We would love to discuss an engineering opportunity with you.',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    read: false
  },
  {
    id: 'msg-2',
    name: 'Dr. A. Sharma',
    email: 'sharma@srmu.edu.in',
    message: 'Congratulations on placing in the top 15 out of 44 teams at the university hackathon. Keep up the great work in DSA and web engineering.',
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    read: true
  }
];
let analyticsLogs: any[] = [
  { timestamp: new Date().toISOString(), page: '/', referrer: 'Direct', userAgent: 'Mozilla/5.0' }
];

// AUTH MIDDLEWARE & ENDPOINTS
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password.' });
  }

  // Admin & Recruiter hardcoded credentials check
  if ((email === 'khanashfaq21732@gmail.com' || email === 'recruiter@gmail.com') && password === 'AdminPassword123!') {
    const user = {
      email,
      name: email === 'khanashfaq21732@gmail.com' ? 'Mohd. Ashfaq Khan' : 'Recruiter Evaluator',
      role: 'admin'
    };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    return res.json({ success: true, token, user });
  }

  // Flexible sign-in for any guest/recruiter testing
  if (email.includes('@') && password.length >= 3) {
    const userName = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const user = {
      email,
      name: userName || 'Guest Evaluator',
      role: 'recruiter'
    };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    return res.json({ success: true, token, user });
  }

  return res.status(401).json({ 
    success: false, 
    message: 'Invalid credentials. Enter any valid email and password (or use standard demo credentials).' 
  });
});

app.get('/api/auth/me', (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ authenticated: false });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ authenticated: true, user: decoded });
  } catch (err) {
    return res.status(401).json({ authenticated: false });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ success: true });
});

// ANALYTICS & LOGGING
app.post('/api/analytics', (req, res) => {
  const { page, referrer } = req.body;
  const log = { timestamp: new Date().toISOString(), page, referrer: referrer || 'Direct' };
  analyticsLogs.push(log);
  if (analyticsLogs.length > 200) analyticsLogs.shift();
  res.json({ status: 'ok' });
});

app.get('/api/analytics/stats', (req, res) => {
  res.json({
    totalViews: analyticsLogs.length + 142,
    uniqueVisitors: Math.round((analyticsLogs.length + 142) * 0.72),
    recentLogs: analyticsLogs.slice(-10)
  });
});

// PROJECTS CRUD
app.get('/api/projects', (req, res) => {
  res.json(projectsStore);
});

app.post('/api/projects', (req, res) => {
  const newProject = { id: `proj-${Date.now()}`, ...req.body };
  projectsStore.unshift(newProject);
  res.json(newProject);
});

// BLOGS & COMMENTS
app.get('/api/blogs', (req, res) => {
  res.json(blogStore);
});

app.post('/api/blogs/:id/comments', (req, res) => {
  const { id } = req.params;
  const { author, text } = req.body;
  const post = blogStore.find(p => p.id === id);
  if (post) {
    const comment = { id: `cmt-${Date.now()}`, author: author || 'Anonymous Developer', text, date: new Date().toISOString().split('T')[0] };
    post.comments.push(comment);
    return res.json(comment);
  }
  res.status(404).json({ error: 'Post not found' });
});

// CONTACT MESSAGES
app.get('/api/contact', (req, res) => {
  res.json(messagesStore);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  const msg = { id: `msg-${Date.now()}`, name, email, message, timestamp: new Date().toISOString(), read: false };
  messagesStore.unshift(msg);
  res.json({ success: true, message: 'Message received by Mohd. Ashfaq Khan. Auto-acknowledgment logged.' });
});

// VITE OR STATIC SERVING
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
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Try running with PORT=3001 npm run dev or kill the process on port ${PORT}.`);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer();
