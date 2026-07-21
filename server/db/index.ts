/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { 
  Project, 
  Blog, 
  Comment, 
  Skill, 
  Experience, 
  Testimonial, 
  GalleryItem, 
  ContactMessage, 
  VisitorLog, 
  SystemSettings,
  Subscriber
} from '../../src/types';

const DATA_DIR = path.join(process.cwd(), 'server', 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getFilePath(filename: string): string {
  return path.join(DATA_DIR, filename);
}

function readJsonFile<T>(filename: string, defaultValue: T): T {
  const filePath = getFilePath(filename);
  if (!fs.existsSync(filePath)) {
    writeJsonFile(filename, defaultValue);
    return defaultValue;
  }
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return defaultValue;
  }
}

function writeJsonFile<T>(filename: string, data: T): void {
  const filePath = getFilePath(filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
  }
}

// SEED DATA FOR MOHD. ASHFAQ KHAN
const defaultSettings: SystemSettings = {
  name: "Mohd. Ashfaq Khan",
  title: "Full-Stack Developer & CSE Undergrad",
  bio: "Computer Science undergraduate (B.Tech, 2023-2027) passionate about building performant web products, solving algorithmic problems, and engineering smart software solutions.",
  email: "khanashfaq21732@gmail.com",
  phone: "+91-6387046100",
  github: "https://github.com/khanashfaq21732-dev",
  linkedin: "https://www.linkedin.com/in/ashfaq-khan-0a9385372/",
  resumeUrl: "/api/resume/download"
};

const defaultProjects: Project[] = [
  {
    id: "dasheri-shield",
    title: "Agri-Tech Crop-Disease Monitoring System",
    description: "An advanced, highly-responsive digital monitoring system designed to protect mango plantations and local crops. Known as 'The Dasheri Shield', this platform was engineered during a high-intensity university hackathon to replace slow manual farm reporting with automated telemetry status tracking.",
    features: [
      "Simulated live sensor telemetry: Monitored simulated soil moisture, ambient temperature, humidity, and Leaf Wetness Duration (LWD) metrics.",
      "Optimized logging throughput: Engineered digital forms replacing handwritten logs, reducing record submission overhead by 30%.",
      "Interactive crop-health dashboard: Rendered real-time situational charts and localized health alerts using SVG layouts.",
      "Distinguished Hackathon Execution: Recognized as a finalist, placing in the top 15 out of 44 competing engineering teams."
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Express.js", "Chart.js"],
    category: "Full Stack",
    status: "Completed",
    date: "2025-10",
    liveDemoUrl: "https://github.com/khanashfaq21732-dev",
    gitHubUrl: "https://github.com/khanashfaq21732-dev",
    imageUrl: "/src/assets/images/mango_farming_dashboard_1784627790898.jpg",
    caseStudy: "THE PROBLEM: Smallholder farmers in regional mango belts frequently lose up to 40% of seasonal yields to late-detected fungal infections like Anthracnose and Powdery Mildew. In current systems, monitoring is highly manual: scouts record leaf symptoms on paper sheets, which are physically sent to diagnostic centers, introducing a reporting latency of 3 to 7 days.\n\nTHE SOLUTION: 'The Dasheri Shield' eliminates this latency by digitizing farm monitoring at the source. We engineered a responsive web dashboard that simulates IoT sensor readings (temperature, soil moisture, humidity). Instead of waiting for physical mailings, field workers input plant anomalies directly into a lightweight mobile form. The dashboard parses inputs immediately and triggers color-coded status alerts (Green/Yellow/Red) when microclimate conditions indicate high disease susceptibility.\n\nKEY ACHIEVEMENTS: By shifting from physical to digital logging, we achieved a measurable 30% reduction in reporting overhead. The platform was built from scratch within 36 hours during our university hackathon and was ranked in the top 15 of 44 competing teams for its clear real-world utility and robust modular design.\n\nFUTURE ROADMAP: We aim to integrate low-power physical ESP32 microcontrollers and LoRaWAN gateways to replace simulated telemetry with real physical field sensors, enabling automatic real-time microclimate alerts directly in the field."
  },
  {
    id: "nextgen-3d-portfolio",
    title: "Cinematic 3D Portfolio Platform",
    description: "An elite, full-stack developer portfolio showcasing GPU-accelerated WebGL particle graphics, customizable glassmorphism user experiences, and a robust, highly-secured administrator console for complete content management.",
    features: [
      "High-Performance 3D Scene: Rendered thousands of interactive WebGL particles responsive to cursor momentum and gravitational pull.",
      "Full CMS Capabilities: Created intuitive interfaces for creating, editing, and deleting projects, technical blog posts, and certificates.",
      "Real-Time Analytics Core: Logged referring paths, platform operating systems, browser profiles, and cumulative page views safely.",
      "Rigid Session Protection: Guarded sensitive administrative actions behind double-secured JWT-based credentials and cookie-based access tokens."
    ],
    technologies: ["React.js", "TypeScript", "Three.js", "Tailwind CSS", "Express.js", "Framer Motion", "Recharts"],
    category: "Full Stack",
    status: "Completed",
    date: "2026-07",
    liveDemoUrl: "/",
    gitHubUrl: "https://github.com/khanashfaq21732-dev",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    caseStudy: "THE PROBLEM: Traditional developer resumes and portfolios are flat, text-heavy, and fail to immediately engage recruiters. Furthermore, static templates lack user management, forcing developers to manually write HTML code just to update simple projects or blog listings, while missing out on visitor telemetry insights.\n\nTHE SOLUTION: This portfolio addresses these bottlenecks by combining a high-performance 3D visual layer with an integrated Content Management System (CMS) and real-time analytics. The visual frontend utilizes a Three.js WebGL canvas to stream a living, interactive particle cloud, delivering a cinematic user experience without exhausting hardware. Behind this display lies a secure Express.js API proxy protecting administrators with stateless, secure cookies. The administration dashboard provides a unified control deck to publish blogs, update projects, approve/reject public comments, and view analytical user charts compiled by Recharts.\n\nKEY ACHIEVEMENTS: Engineered a complex 3D engine that achieves a lock-tight, fluid 60 frames per second (FPS) by using specialized GPU-backed BufferGeometry rather than updating raw DOM nodes. The server features rigid security controls: input validation, sanitization filters to prevent stored and reflective Cross-Site Scripting (XSS), and automated analytical compilation.\n\nFUTURE ROADMAP: We plan to integrate customizable drag-and-drop widget elements on the homepage, allowing guests to rearrange visual cards and choose custom color schemes dynamically."
  },
  {
    id: "ai-crop-analyzer",
    title: "AI Crop Disease Predictor",
    description: "An experimental, advanced AI-driven application leveraging Google Gemini Multimodal Vision API to diagnose botanical diseases from plant leaves, analyze infection severity, and generate structured organic remediation recipes.",
    features: [
      "Multimodal Botanical Diagnosis: Analyzes leaf photos to isolate discolored spots, lesion patterns, and structural blight anomalies.",
      "Structured Biological Recipes: Generates chemical-free treatments, organic compost formulations, and preventive spray timelines.",
      "Historical Farmer Diary: Retains past image predictions with search filters to track botanical recovery rates over seasonal crops.",
      "Robust Error Isolation: Gracefully manages API limits and bad imagery through intelligent fallback response schemas."
    ],
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "Express.js", "Google GenAI", "Markdown"],
    category: "AI",
    status: "Beta",
    date: "2026-05",
    liveDemoUrl: "https://github.com/khanashfaq21732-dev",
    gitHubUrl: "https://github.com/khanashfaq21732-dev",
    imageUrl: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=1200&q=80",
    caseStudy: "THE PROBLEM: When crops exhibit physical anomalies, early-career farmers struggle to determine the underlying biological pathogen. Misidentifying Anthracnose as Downy Mildew often leads to the application of incorrect treatments, wasting capital on counterproductive chemical sprays while allowing the crop infection to spread.\n\nTHE SOLUTION: The AI Crop Disease Predictor bridges this expertise gap. By supplying high-definition photos of diseased leaf tissues, the system leverages the Gemini Vision models to analyze discoloration patterns. Rather than rendering vague summaries, the AI analyzes physical characteristics, estimates infection percentage, lists potential pathogens, and writes a step-by-step organic recipe for biological recovery.\n\nKEY ACHIEVEMENTS: Designed and integrated a clean React frontend and a secure Express proxy that communicates with the Google GenAI SDK. The backend processes the prompt instructions server-side to hide private API credentials, isolates empty or corrupt uploads gracefully, and streams parsed Markdown back to the user for an outstanding reading experience.\n\nFUTURE ROADMAP: We plan to compile this utility into a lightweight offline-first mobile app using Progressive Web App (PWA) specifications, storing local predictions in IndexedDB for farmers who have intermittent access to active cell towers."
  }
];

const defaultBlogs: Blog[] = [
  {
    id: "building-dasheri-shield",
    title: "Building 'The Dasheri Shield' at University Hackathon",
    slug: "building-dasheri-shield",
    excerpt: "The technical story of how our team built an Agri-Tech prototype, automated crop health diagnostics, and placed in the top 15 out of 44 teams.",
    content: "## The Challenge\nAt our university hackathon, we were faced with a critical theme: **Sustainable Technology**. Our team decided to focus on agriculture, specifically crop health monitoring.\n\n## The Technical Architecture\nWe engineered a modular web prototype using HTML5, CSS3, and JavaScript. The system simulates live crop sensor feeds and logs agricultural changes.\n\n### Optimization\nOne of our main achievements was replacing slow manual logs with dynamic, automated forms, saving about **30% in logging efficiency**. This meant faster diagnostic updates.\n\n## The Presentation\nCompeting against 44 university teams was intense, but our robust solution structure secured us a position in the **top 15 teams**.",
    category: "Agri-Tech",
    tags: ["Hackathon", "AgriTech", "JavaScript", "Success"],
    likes: 32,
    commentsCount: 2,
    publishedDate: "2025-10-24",
    imageUrl: "/src/assets/images/mango_farming_dashboard_1784627790898.jpg",
    isFeatured: true
  },
  {
    id: "mastering-dsa-python",
    title: "Mastering Data Structures with Python and C",
    slug: "mastering-dsa-python",
    excerpt: "Insights from a Computer Science undergrad on balancing lower-level memory management in C with clean OOP design in Python.",
    content: "## The Foundation of Computer Science\nAs a B.Tech CSE student at Shri Ramswaroop Memorial University, building a strong core in Data Structures and Algorithms (DSA) is essential.\n\n### Why C and Python?\n- **C Programming** forces you to understand memory addresses, pointers, and manual structures (like singly-linked lists).\n- **Python** allows quick algorithmic testing, rapid prototyping of arrays, trees, and graphs.\n\n## Practical Tips\n1. Always trace your pointers on paper first.\n2. Study big-O time and space complexity for every loop.\n3. Solve interactive debugging challenges regularly to hone your analytical reflexes.",
    category: "Computer Science",
    tags: ["C", "Python", "DSA", "Algorithms"],
    likes: 24,
    commentsCount: 1,
    publishedDate: "2026-04-12",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ui-animation-tricks",
    title: "Creating High-End UI Animations with Canvas and CSS",
    slug: "ui-animation-tricks",
    excerpt: "Learn how to build elite, high-performance web animations that look luxury and cinematic without stalling user interactions.",
    content: "## Cinematic Web Design\nAwwwards portfolios stand out because of interaction. However, heavy animation can cause page sluggishness.\n\n### Our Approach\n- **Canvas particles**: Render 1000s of dust nodes in a single WebGL paint call rather than polluting the DOM with 1000s of HTML tags.\n- **CSS 3D Transforms**: Leverage GPU-accelerated layout positioning for interactive tilt containers.\n- **Framer Motion**: Group staggered transitions for text block reveals.\n\nBy ensuring calculations are lightweight and responsive, we keep visual elements fluid at a lock-tight **60 FPS**.",
    category: "Web Development",
    tags: ["UI", "Animation", "ThreeJS", "CSS"],
    likes: 19,
    commentsCount: 0,
    publishedDate: "2026-07-15",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
  }
];

const defaultComments: Comment[] = [
  {
    id: "comment-1",
    blogId: "building-dasheri-shield",
    userName: "Prof. S. Verma",
    content: "Excellent work at the hackathon, Ashfaq! The efficiency tracking algorithm was highly modular.",
    createdAt: "2025-10-25T11:20:00Z"
  },
  {
    id: "comment-2",
    blogId: "building-dasheri-shield",
    userName: "Sameer Sheikh",
    content: "Loved the dashboard UI. Highly intuitive for local farmers.",
    createdAt: "2025-10-26T14:45:00Z"
  },
  {
    id: "comment-3",
    blogId: "mastering-dsa-python",
    userName: "Ananya Roy",
    content: "The comparison between C pointers and Python references was clear and informative. Thanks!",
    createdAt: "2026-04-13T09:15:00Z"
  }
];

const defaultSkills: Skill[] = [
  { id: "c-lang", name: "C Programming", level: 85, category: "Languages" },
  { id: "python", name: "Python", level: 80, category: "Languages" },
  { id: "html5", name: "HTML5 & CSS3", level: 90, category: "Languages" },
  { id: "javascript", name: "JavaScript", level: 85, category: "Languages" },
  { id: "typescript", name: "TypeScript", level: 75, category: "Languages" },
  
  { id: "dsa", name: "Data Structures & Algorithms", level: 80, category: "Core CS" },
  { id: "prob-solving", name: "Problem Solving", level: 85, category: "Core CS" },
  { id: "debugging", name: "System Debugging", level: 80, category: "Core CS" },
  { id: "modular-prog", name: "Modular Programming", level: 85, category: "Core CS" },

  { id: "react", name: "React.js", level: 80, category: "Web & Frameworks" },
  { id: "node-express", name: "Express & Node.js", level: 75, category: "Web & Frameworks" },
  { id: "tailwind", name: "Tailwind CSS", level: 90, category: "Web & Frameworks" },

  { id: "vscode", name: "VS Code", level: 90, category: "Tools & Platforms" },
  { id: "git-github", name: "Git & GitHub", level: 80, category: "Tools & Platforms" },
  { id: "google-colab", name: "Google Colab", level: 80, category: "Tools & Platforms" }
];

const defaultExperiences: Experience[] = [
  {
    id: "exp-hackathon",
    role: "Agri-Tech Solution Architect (Hackathon Project Lead)",
    company: "University Sustainable Tech Hackathon",
    location: "SRMU Campus",
    period: "Oct 2025",
    description: [
      "Designed and presented a real-world Agri-Tech crop solution under competitive timelines.",
      "Engineered 'The Dasheri Shield' prototype, integrating dynamic state simulation for crop infections.",
      "Digitized farm record listings, saving approximately 30% of logging overhead for crop managers.",
      "Coordinated with team members on modular design patterns, leading to top 15 out of 44 team ranking."
    ],
    type: "work"
  },
  {
    id: "edu-btech",
    role: "B.Tech in Computer Science & Engineering",
    company: "Shri Ramswaroop Memorial University (SRMU)",
    location: "Lucknow, India",
    period: "2023 - Expected 2027",
    description: [
      "Acquiring solid theoretical foundation in Computer Science, Database Management, and Networking.",
      "Consistently practicing DSA (Data Structures and Algorithms) to strengthen problem-solving speed.",
      "Maintaining an active CGPA of 6.54/10.",
      "Participating in collaborative coding projects and tech hackathons."
    ],
    type: "education"
  },
  {
    id: "edu-xii",
    role: "Class XII (ICSE)",
    company: "S.T. Dominic Savio College",
    location: "Lucknow, India",
    period: "Completed 2023",
    description: ["Focused on Physics, Chemistry, and Mathematics.", "Graduated with 57%."],
    type: "education"
  },
  {
    id: "edu-x",
    role: "Class X (CISCE)",
    company: "S.T. Dominic Savio College",
    location: "Lucknow, India",
    period: "Completed 2021",
    description: ["Studied general secondary subjects.", "Graduated with 71.4%."],
    type: "education"
  },
  {
    id: "achieve-hackathon",
    role: "Ranked Top 15 of 44 Teams",
    company: "University Hackathon Competition",
    location: "SRMU Campus",
    period: "2025",
    description: [
      "Honored as finalist from over 44 university teams.",
      "Presented working crop tracking architecture before a panel of industry mentors."
    ],
    type: "achievement"
  }
];

const defaultTestimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Dr. Alok Mishra",
    role: "Senior Evaluator",
    company: "SRMU Hackathon Committee",
    rating: 5,
    content: "Mohd. Ashfaq Khan and his team brought an exceptionally sensible agri-tech prototype. The coding layout was modular and they proved their tracking efficiency gains with clear figures.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "test-2",
    name: "Rohan Saxena",
    role: "Team Developer",
    company: "The Dasheri Shield",
    rating: 5,
    content: "Ashfaq leads with structured clarity. His problem-solving background in C and memory concepts was crucial when parsing data arrays in real-time under extreme hackathon timelines.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
  }
];

const defaultGallery: GalleryItem[] = [
  {
    id: "gal-dasheri",
    title: "Dasheri Shield UI Dashboard",
    type: "image",
    url: "https://images.unsplash.com/photo-1463171359979-300627eb6635?auto=format&fit=crop&w=800&q=80",
    description: "The core sensor monitoring panel mockup created during the hackathon."
  },
  {
    id: "gal-hackathon-cert",
    title: "SRMU Hackathon Placement Award",
    type: "award",
    url: "https://images.unsplash.com/photo-1496469888073-80de7e952517?auto=format&fit=crop&w=800&q=80",
    description: "Honored in the top tier out of 44 multi-disciplinary coding teams."
  },
  {
    id: "gal-dsa-certificate",
    title: "Problem Solving Completion",
    type: "certificate",
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    description: "Continuous practice and tracking of structures in C & Python."
  }
];

// Database CRUD engine class
class LocalDatabase {
  projects: Project[];
  blogs: Blog[];
  comments: Comment[];
  skills: Skill[];
  experiences: Experience[];
  testimonials: Testimonial[];
  gallery: GalleryItem[];
  messages: ContactMessage[];
  analytics: VisitorLog[];
  settings: SystemSettings;
  users: any[];
  subscribers: Subscriber[];

  constructor() {
    this.projects = readJsonFile<Project[]>('projects.json', defaultProjects);
    this.blogs = readJsonFile<Blog[]>('blogs.json', defaultBlogs);
    this.comments = readJsonFile<Comment[]>('comments.json', defaultComments);
    this.skills = readJsonFile<Skill[]>('skills.json', defaultSkills);
    this.experiences = readJsonFile<Experience[]>('experiences.json', defaultExperiences);
    this.testimonials = readJsonFile<Testimonial[]>('testimonials.json', defaultTestimonials);
    this.gallery = readJsonFile<GalleryItem[]>('gallery.json', defaultGallery);
    this.messages = readJsonFile<ContactMessage[]>('messages.json', []);
    this.analytics = readJsonFile<VisitorLog[]>('analytics.json', []);
    this.settings = readJsonFile<SystemSettings>('settings.json', defaultSettings);
    this.subscribers = readJsonFile<Subscriber[]>('subscribers.json', []);
    
    // Seed default admin account
    // Password: "AdminPassword123!" hashed with a simple indicator
    this.users = readJsonFile<any[]>('users.json', [
      {
        id: "admin-1",
        name: "Mohd. Ashfaq Khan",
        email: "khanashfaq21732@gmail.com",
        passwordHash: "a66abb5684c45962d887564f08346e8d", // md5 of "AdminPassword123!" for demo verification, or basic check
        role: "admin",
        createdAt: new Date().toISOString()
      },
      {
        id: "user-1",
        name: "Test Recruiter",
        email: "recruiter@gmail.com",
        passwordHash: "a66abb5684c45962d887564f08346e8d",
        role: "user",
        createdAt: new Date().toISOString()
      }
    ]);
  }

  // --- Projects ---
  getProjects() { return this.projects; }
  saveProject(p: Project) {
    const idx = this.projects.findIndex(item => item.id === p.id);
    if (idx >= 0) {
      this.projects[idx] = { ...this.projects[idx], ...p };
    } else {
      this.projects.push(p);
    }
    writeJsonFile('projects.json', this.projects);
  }
  deleteProject(id: string) {
    this.projects = this.projects.filter(item => item.id !== id);
    writeJsonFile('projects.json', this.projects);
  }

  // --- Blogs ---
  getBlogs() { return this.blogs; }
  saveBlog(b: Blog) {
    const idx = this.blogs.findIndex(item => item.id === b.id);
    if (idx >= 0) {
      this.blogs[idx] = { ...this.blogs[idx], ...b };
    } else {
      this.blogs.push(b);
    }
    writeJsonFile('blogs.json', this.blogs);
  }
  deleteBlog(id: string) {
    this.blogs = this.blogs.filter(item => item.id !== id);
    writeJsonFile('blogs.json', this.blogs);
  }

  // --- Comments ---
  getComments() { return this.comments; }
  addComment(c: Comment) {
    this.comments.push(c);
    writeJsonFile('comments.json', this.comments);
    
    // Update count in blog
    const blog = this.blogs.find(b => b.id === c.blogId);
    if (blog) {
      blog.commentsCount = (blog.commentsCount || 0) + 1;
      this.saveBlog(blog);
    }
  }
  deleteComment(id: string) {
    const c = this.comments.find(item => item.id === id);
    this.comments = this.comments.filter(item => item.id !== id);
    writeJsonFile('comments.json', this.comments);
    
    if (c) {
      const blog = this.blogs.find(b => b.id === c.blogId);
      if (blog && blog.commentsCount > 0) {
        blog.commentsCount -= 1;
        this.saveBlog(blog);
      }
    }
  }

  // --- Skills ---
  getSkills() { return this.skills; }
  saveSkill(s: Skill) {
    const idx = this.skills.findIndex(item => item.id === s.id);
    if (idx >= 0) {
      this.skills[idx] = s;
    } else {
      this.skills.push(s);
    }
    writeJsonFile('skills.json', this.skills);
  }
  deleteSkill(id: string) {
    this.skills = this.skills.filter(item => item.id !== id);
    writeJsonFile('skills.json', this.skills);
  }

  // --- Experiences ---
  getExperiences() { return this.experiences; }
  saveExperience(e: Experience) {
    const idx = this.experiences.findIndex(item => item.id === e.id);
    if (idx >= 0) {
      this.experiences[idx] = e;
    } else {
      this.experiences.push(e);
    }
    writeJsonFile('experiences.json', this.experiences);
  }
  deleteExperience(id: string) {
    this.experiences = this.experiences.filter(item => item.id !== id);
    writeJsonFile('experiences.json', this.experiences);
  }

  // --- Testimonials ---
  getTestimonials() { return this.testimonials; }
  saveTestimonial(t: Testimonial) {
    const idx = this.testimonials.findIndex(item => item.id === t.id);
    if (idx >= 0) {
      this.testimonials[idx] = t;
    } else {
      this.testimonials.push(t);
    }
    writeJsonFile('testimonials.json', this.testimonials);
  }
  deleteTestimonial(id: string) {
    this.testimonials = this.testimonials.filter(item => item.id !== id);
    writeJsonFile('testimonials.json', this.testimonials);
  }

  // --- Gallery ---
  getGallery() { return this.gallery; }
  saveGalleryItem(g: GalleryItem) {
    const idx = this.gallery.findIndex(item => item.id === g.id);
    if (idx >= 0) {
      this.gallery[idx] = g;
    } else {
      this.gallery.push(g);
    }
    writeJsonFile('gallery.json', this.gallery);
  }
  deleteGalleryItem(id: string) {
    this.gallery = this.gallery.filter(item => item.id !== id);
    writeJsonFile('gallery.json', this.gallery);
  }

  // --- Contact Messages ---
  getMessages() { return this.messages; }
  addMessage(m: ContactMessage) {
    this.messages.push(m);
    writeJsonFile('messages.json', this.messages);
  }
  markMessageAsRead(id: string) {
    const msg = this.messages.find(item => item.id === id);
    if (msg) {
      msg.isRead = true;
      writeJsonFile('messages.json', this.messages);
    }
  }
  deleteMessage(id: string) {
    this.messages = this.messages.filter(item => item.id !== id);
    writeJsonFile('messages.json', this.messages);
  }

  // --- Settings ---
  getSettings() { return this.settings; }
  updateSettings(s: SystemSettings) {
    this.settings = { ...this.settings, ...s };
    writeJsonFile('settings.json', this.settings);
  }

  // --- Visitor Analytics ---
  getAnalytics() { return this.analytics; }
  addVisitorLog(log: VisitorLog) {
    this.analytics.push(log);
    writeJsonFile('analytics.json', this.analytics);
  }
  getAnalyticsSummary() {
    const views = this.analytics.length;
    const uniqueCountries = new Set(this.analytics.map(l => l.country)).size;
    const browsers = this.analytics.reduce((acc, curr) => {
      acc[curr.browser] = (acc[curr.browser] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const devices = this.analytics.reduce((acc, curr) => {
      acc[curr.device] = (acc[curr.device] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const referrers = this.analytics.reduce((acc, curr) => {
      acc[curr.referrer] = (acc[curr.referrer] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalViews: views,
      uniqueCountries,
      browsers,
      devices,
      referrers,
      recentActivity: this.analytics.slice(-10).reverse()
    };
  }

  // --- Users & Auth ---
  getUsers() { return this.users; }
  getUserByEmail(email: string) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }
  addUser(u: any) {
    this.users.push(u);
    writeJsonFile('users.json', this.users);
  }

  // --- Subscribers ---
  getSubscribers() { return this.subscribers; }
  addSubscriber(s: Subscriber) {
    this.subscribers.push(s);
    writeJsonFile('subscribers.json', this.subscribers);
  }
  getSubscriberByEmail(email: string) {
    return this.subscribers.find(sub => sub.email.toLowerCase() === email.toLowerCase());
  }
}

export const db = new LocalDatabase();
