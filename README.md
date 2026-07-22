🌟 Interactive Full-Stack Portfolio & IoT Diagnostics Suite
![alt text](https://img.shields.io/badge/React-18.x-cyan.svg?style=flat-glass&logo=react)

![alt text](https://img.shields.io/badge/TypeScript-5.x-blue.svg?style=flat-glass&logo=typescript)

![alt text](https://img.shields.io/badge/Vite-6.x-purple.svg?style=flat-glass&logo=vite)

![alt text](https://img.shields.io/badge/Tailwind_CSS-4.x-38bdf8.svg?style=flat-glass&logo=tailwind-css)

![alt text](https://img.shields.io/badge/Three.js-WebGL-black.svg?style=flat-glass&logo=three.js)

![alt text](https://img.shields.io/badge/License-Apache_2.0-green.svg?style=flat-glass)
A high-fidelity, interactive full-stack portfolio website and real-time IoT Diagnostics Suite developed for Mohd. Ashfaq Khan (B.Tech Computer Science Engineering). This application combines a futuristic, glassmorphic UI with interactive Three.js 3D particles, a built-in admin content management dashboard, and a robust Express backend API with persistent storage.
🎨 Visual Identity & Aesthetic
The website features an immersive, responsive layout designed with a "Cosmic Slate" aesthetic:
Frosted Glassmorphism: Customized .glass-panel, .glass-navbar, and .glass-modal backdrops overlaying a translucent, interactive environment.
Three.js 3D Interactive Background: A real-time WebGL particle starfield with glowing central geometry (cubes, torus rings) and dynamic cursor lighting tracking mouse movements.
Typography Pairings: Inter for clean UI readability paired with JetBrains Mono for engineering telemetry & diagnostic data.
🚀 Key Architectural Highlights
1. Curated Project Case Studies & Sandboxing
Case Study Modal: Translates descriptions into organized retrospectives (Challenge, Solution, Key Achievements, and Roadmap).
Detailed Technical Specs: Highlights development periods, categories, live preview links, and technical stacks.
2. Live Dasheri Shield IoT Dashboard
An embedded real-time micro-dashboard to track smart agriculture diagnostics:
Live Telemetry: Real-time mock sensors updating Temperature, Humidity, and Activity states with animated indicator gauges.
Interactive Controls: Adjustable threat thresholds, manual override, and simulator trigger switches.
Telemetry Logs & Graphs: Dynamically updating terminal feed and visual graphs powered by Recharts.
3. Full-Stack Node.js/Express Backend Core
A robust backend that handles data persistence, authentication, and visitor analytics:
Server-Side Security: Custom routes (/api/*) proxying data queries and auth checks.
JWT & Cookie/Header Authentication: Multi-layered auth supporting HTTP-only cookies and Bearer tokens for iframe compatibility.
Visitor Telemetry & Analytics: Auto-registers analytics logs (page views, referrers, unique visitors) directly to persistent local JSON databases.
Administrative CMS Dashboard: Full CRUD management for Projects, Blog Articles, Contact Messages, Testimonials, Skills, and System Settings.
🔑 Demo & Admin Access Credentials
To test or evaluate the Administrative Dashboard:
Admin Login: khanashfaq21732@gmail.com
Recruiter Test Login: recruiter@gmail.com
Password: AdminPassword123!
🛠️ Tech Stack & Dependencies
Layer	Technologies	Key Packages
Frontend	React 18, TypeScript, Tailwind CSS v4, HTML5 Canvas	motion/react (animations), lucide-react (icons), recharts (charts), three (WebGL 3D background)
Backend	Node.js, Express, ES Modules, REST APIs	express, jsonwebtoken, cookie-parser, tsx, esbuild
Tooling	Vite, PostCSS, ESLint, npm	vite, typescript, @tailwindcss/postcss
📂 Project Directory Structure
code
Text
├── server/
│   ├── data/                  # Persistent JSON storage (projects, blogs, experiences, users)
│   └── db/                    # Local JSON database driver & initial seeds
├── src/
│   ├── components/            # Interactive layout widgets
│   │   ├── About.tsx          # Biography card & Chronological Education Journey (B.Tech CSE, Class XII ISC, Class X CISCE)
│   │   ├── AdminDashboard.tsx # Comprehensive CMS & Analytics Control Panel
│   │   ├── Blog.tsx           # Technical CMS Blog with post comments
│   │   ├── Contact.tsx        # Direct channels form with auto-responder
│   │   ├── Gallery.tsx        # Verified credentials visual lightbox
│   │   ├── Hero.tsx           # Floating entrance card
│   │   ├── Navbar.tsx         # Frosted glass floating navigation bar
│   │   ├── Projects.tsx       # Curated project specs & Dasheri Shield IoT
│   │   ├── Skills.tsx         # Skill galaxy & telemetry gauges
│   │   └── ThreeCanvas.tsx    # WebGL interactive particle background
│   ├── App.tsx                # Client core and active state orchestrator
│   ├── index.css              # Glassmorphic Tailwind styling
│   ├── main.tsx               # App entrypoint
│   └── types.ts               # Shared interfaces & global types
├── server.ts                  # Full-stack Express backend server & REST API endpoints
├── package.json               # Manifest file containing scripts and dependencies
├── vite.config.ts             # Bundler configs
└── README.md                  # Comprehensive documentation

🔧 Installation & Local Setup
1. Clone the Repository
code
Bash
git clone https://github.com/yourusername/portfolio-iot-suite.git
cd portfolio-iot-suite
2. Install Project Dependencies
code
Bash
npm install
3. Launch Development Server
Runs both the Vite bundler asset-pipeline and the Express backend API in parallel on port 3000:
code
Bash
npm run dev
Open your browser and navigate to http://localhost:3000.
4. Build for Production
Compiles the client SPA into dist/ and bundles the TypeScript backend server into dist/server.cjs using esbuild:
code
Bash
npm run build
5. Launch Production Server
code
Bash
npm run start
