🌟 Interactive Full-Stack Portfolio & IoT Diagnostics Suite
![alt text](https://img.shields.io/badge/React-18.x-cyan.svg?style=flat-glass&logo=react)

![alt text](https://img.shields.io/badge/TypeScript-5.x-blue.svg?style=flat-glass&logo=typescript)

![alt text](https://img.shields.io/badge/Vite-6.x-purple.svg?style=flat-glass&logo=vite)

![alt text](https://img.shields.io/badge/Tailwind_CSS-4.x-38bdf8.svg?style=flat-glass&logo=tailwind-css)

![alt text](https://img.shields.io/badge/Three.js-WebGL-black.svg?style=flat-glass&logo=three.js)

![alt text](https://img.shields.io/badge/License-Apache_2.0-green.svg?style=flat-glass)

A high-fidelity, interactive full-stack portfolio website and real-time IoT Diagnostics Suite developed for Mohd. Ashfaq Khan (B.Tech Computer Science Engineering). This site combines a futuristic, glassmorphic layout with physical transmissive Three.js particles and an Express backend API database proxy.
🎨 Visual Identity: Frosted Glassmorphism & WebGL
The website features an immersive, responsive frontend experience designed with a "Cosmic Slate" aesthetic, featuring:
Frosted Glassmorphic Layers: Customized .glass-panel, .glass-navbar, and .glass-modal backdrops overlaying a translucent, interactive environment.
Three.js 3D Interactive Background: A real-time particle starfield galaxy with glowing central glass cubes, Torus orbits, and interactive cursor lighting tracking coordinate mouse movements.
Typography Pairings: Pairings of Inter (for streamlined UI readability) and JetBrains Mono (for engineering diagnostic telemetry).
🚀 Key Architectural Highlights
1. Curated Project Case Studies & Sandboxing
Case Study Modal: Translates markdown descriptions into organized retrospectives (Challenge, Solution, Key Achievements, and Future Roadmap).
Detailed Technical Specs: Highlights development periods, categories, and technical stacks alongside sandboxed environments.
2. Live Dasheri Shield IoT Dashboard
An embedded real-time micro-dashboard to track smart agriculture diagnostics:
Live Telemetry: Real-time mock sensors updating Temperature, Humidity, and Activity states with animated indicator gauges.
Interactive Controls: Adjustable threat thresholds, manual override, and simulator trigger switches.
Telemetry Logs & Graphs: Dynamically updating terminal feed and visual graphs powered by Recharts.
3. Full-Stack Node.js/Express Backend Core
A robust, secure backend that handles data persistence and analytical logging:
Server-Side Security: Custom routes (/api/*) proxying data queries and auth checks, hiding administrative secrets.
Visitor Telemetry: Auto-registers analytics logs directly to local persistence.
Interactive Feedback CMS: Integrates an administrative dashboard, a secure markdown blog parser, credentials visualizer, and live feedback boards.
🔑 Demo & Admin Access Credentials
To test or evaluate the Administrative Dashboard:
Admin Login: khanashfaq21732@gmail.com
Recruiter Test Login: recruiter@gmail.com
Password: AdminPassword123!
🎓 Education & Background Details Included
Bachelor of Technology (B.Tech) - Computer Science Engineering: In Progress (2023 - 2027)
Class XII (ISC): S.T. Dominic Savio College, Lucknow, India (Completed 2022)
Class X (CISCE): S.T. Dominic Savio College, Lucknow, India (Completed 2020)
🛠️ Tech Stack & Dependencies
Layer	Technologies	Key Packages
Frontend	React 18, TypeScript, Tailwind CSS v4, HTML5 Canvas	motion/react (for fluid transitions), lucide-react (icons), recharts (charts), three (WebGL scene)
Backend	Node.js, Express, ES Modules, RESTful APIs	express, jsonwebtoken, cookie-parser, tsx, esbuild
Tooling	Vite, PostCSS, ESLint, npm	vite, typescript
📂 Project Directory Structure
├── server/
│   ├── data/                  # Persistent JSON storage (projects, blogs, experiences, users)
│   └── db/                    # Local JSON database driver & initial seeds
├── src/
│   ├── components/            # Interactive layout widgets
│   │   ├── About.tsx          # Biography card & Chronological Journey
│   │   ├── AdminDashboard.tsx # Comprehensive CMS & Analytics Control Panel
│   │   ├── Blog.tsx           # Technical CMS Blog with post comments
│   │   ├── Contact.tsx        # Direct channels form with auto-responder
│   │   ├── Gallery.tsx        # Verified credentials visual lightbox
│   │   ├── Hero.tsx           # Floating entrance card
│   │   ├── Navbar.tsx         # Frosted glass floating navigation bar
│   │   ├── Projects.tsx       # Curated project specs & Dasheri Shield
│   │   ├── Skills.tsx         # Skill galaxy & telemetry gauges
│   │   └── ThreeCanvas.tsx    # WebGL interactive particle background
│   ├── App.tsx                # Client core and active state orchestrator
│   ├── index.css              # Glassmorphic Tailwind classes
│   ├── main.tsx               # App entrypoint
│   └── types.ts               # Shared interfaces & global types
├── server.ts                  # Full-stack Node/Express server & API routes
├── package.json               # Manifest file containing scripts and dependencies
├── vite.config.ts             # Bundler configs
└── README.md                  # Comprehensive GitHub documentation

🔧 Installation & Local Setup
Prerequisites: Ensure you have Node.js (v18 or higher) and npm installed.
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
This compiles the client-side single page app (SPA) into static files inside dist/ and bundles the TypeScript backend server into a single CommonJS (.cjs) file at dist/server.cjs using esbuild:
code
Bash
npm run build
5. Launch Production Server
code
Bash
npm run start
📜 License
This project is licensed under the Apache License 2.0 - see the LICENSE file for details.
