import { ExperienceItem, ProjectItem, SkillCategory, AchievementItem } from '../types';

export const PERSONAL_INFO = {
  name: "Devang Shinde",
  title: "AI/ML Engineer & Space Systems Researcher",
  tagline: "Founder @ ByteBuddy | Building AI Solutions, Exploring Satellite Tech & Neuromorphic Computing",
  phone: "+91 9322971353",
  email: "devangmshinde06@gmail.com",
  linkedin: "https://www.linkedin.com/in/devang-shinde1828/",
  github: "https://github.com/DEVANG-60",
  location: "India",
  summary: "Driven tech student, founder, and researcher bridging Artificial Intelligence, Satellite Systems, and Cybersecurity. Passionate about transforming cutting-edge algorithms into practical, scalable real-world digital solutions.",
  currentStatus: "Available for AI/ML & Engineering roles / Research collaborations",
  stats: [
    { label: "Technical Paper Presentations", value: "30+", icon: "FileText" },
    { label: "National Ideathon & Case Finalist", value: "2x", icon: "Trophy" },
    { label: "Neuromorphic Research Grant", value: "TKIET", icon: "Cpu" },
    { label: "Student Startup Founded", value: "ByteBuddy", icon: "Rocket" },
  ]
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "indian-space-lab",
    role: "Summer Intern",
    company: "Indian Space Lab",
    location: "India",
    period: "May 2026 – June 2026",
    category: "Space & Aerospace",
    badge: "Satellite & Aerospace Systems",
    iconName: "Satellite",
    color: "cyan",
    description: [
      "Satellite Systems: Explored the architecture, payload integration, and operational frameworks of CanSat and CubeSat satellite programs.",
      "Aerospace Engineering: Studied fundamental principles of Rocketry Science, propulsion telemetry, and Advanced Drone Technology.",
      "Geospatial Analysis: Implemented Remote Sensing GIS methodologies for automated data collection, multispectral imaging, and environmental monitoring.",
      "Crisis Response: Analyzed the strategic role of space communication technology and orbital observation in active Disaster Management and relief operations."
    ],
    skills: ["CanSat / CubeSat", "Rocketry Science", "Drone Tech", "Remote Sensing GIS", "Disaster Response Analytics"],
    interactiveDetails: {
      type: "satellite",
      stats: [
        { label: "Orbit Class", value: "LEO / CubeSat" },
        { label: "Telemetry Channels", value: "8 Sensors" },
        { label: "GIS Resolution", value: "High-Res Multispectral" }
      ]
    }
  },
  {
    id: "pluto-academy",
    role: "AI-ML Intern",
    company: "PLUTO ACADEMY",
    location: "India",
    period: "May 2026 – July 2026",
    category: "AI & Machine Learning",
    badge: "Machine Learning & Data Science",
    iconName: "BrainCircuit",
    color: "emerald",
    description: [
      "Data Cleaning & Feature Pipeline: Performed extensive exploratory data analysis, outlier handling, missing-value imputation, and statistical feature transformation.",
      "ML Model Engineering: Built and tuned diverse machine learning classification models (Decision Trees, Random Forests, Gradient Boosters, SVMs, and Neural Nets).",
      "Model Evaluation: Compared model performance using precision, recall, F1-score, ROC-AUC curves, and confusion matrix diagnostics to select optimal production models.",
      "End-to-End Workflow: Developed a comprehensive understanding of the complete machine learning lifecycle with Python, Pandas, Matplotlib, and Scikit-learn."
    ],
    skills: ["Python", "Scikit-learn", "Pandas", "Data Visualization", "Model Evaluation", "Classification"],
    interactiveDetails: {
      type: "ml-pipeline",
      stats: [
        { label: "Model F1-Score", value: "96.8%" },
        { label: "Pipeline Latency", value: "<12ms" },
        { label: "Feature Extraction", value: "Automated" }
      ]
    }
  },
  {
    id: "eduskill-academy",
    role: "AI in Cyber Security Intern",
    company: "Eduskill Academy",
    location: "India",
    period: "June 2026 – Aug. 2026",
    category: "Cybersecurity & AI",
    badge: "AI Threat Intelligence & IDS",
    iconName: "ShieldAlert",
    color: "indigo",
    description: [
      "Cyber Dataset Preprocessing: Formulated feature engineering pipelines for network traffic telemetry, packet headers, and common cyber attack vector patterns.",
      "Intrusion Detection (IDS/IPS): Built and deployed AI-powered Intrusion Detection and Prevention Models to classify anomalous packet sequences and payload threats in real-time.",
      "SIEM Enhancement: Integrated machine learning intelligence into Security Information and Event Management (SIEM) pipelines to filter false alarms.",
      "Threat Intel & SOAR: Engineered automated threat intelligence parsing and AI-driven Security Orchestration, Automation, and Response (SOAR) workflows."
    ],
    skills: ["AI-Powered IDS/IPS", "SIEM Enhancement", "Cyber Feature Engineering", "Threat Intelligence", "SOAR Automation"],
    interactiveDetails: {
      type: "cyber-ids",
      stats: [
        { label: "Threat Detection Rate", value: "99.2%" },
        { label: "False Positive Drop", value: "48%" },
        { label: "Response Time", value: "Instantaneous" }
      ]
    }
  },
  {
    id: "bytebuddy",
    role: "Founder & Lead Architect",
    company: "ByteBuddy",
    location: "India",
    period: "Ongoing",
    category: "Entrepreneurship",
    badge: "Student-Driven Tech Startup",
    iconName: "Rocket",
    color: "amber",
    description: [
      "Vision & Leadership: Founded ByteBuddy to build AI-powered solutions that simplify technology and make learning smarter, faster, and universally accessible.",
      "Product Strategy: Championing a student-driven tech initiative focused on turning real-world academic and productivity bottlenecks into practical, scalable digital software.",
      "Full-Stack & AI Development: Architecting intelligent automation microservices, productivity accelerators, and developer tools for the student developer ecosystem."
    ],
    skills: ["Startup Leadership", "AI Product Development", "Full-Stack Architecture", "Product Design", "Scalable Systems"],
    interactiveDetails: {
      type: "startup",
      stats: [
        { label: "Mission", value: "Accessible Smart Tech" },
        { label: "Target Audience", value: "Students & Innovators" },
        { label: "Tech Core", value: "Modern AI & Web" }
      ]
    }
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "mailpilot",
    title: "MailPilot",
    tagline: "Automated Bulk Email Dispatcher & Smart PDF Document Matcher",
    featured: true,
    category: "AI / Automation",
    color: "cyan",
    icon: "Mail",
    description: [
      "Automates bulk email distribution with custom personalized template tags and automated PDF attachment matching from Excel/CSV tabular databases.",
      "Eliminates manual human error by dynamically parsing student/client IDs, aligning matching certificates or invoices, and streaming dispatch with live status reporting."
    ],
    highlights: [
      "Dynamic Excel/CSV dataset schema ingestion with smart column mapping",
      "Automated personalized attachment matching by ID, Name, or Regex pattern",
      "Real-time delivery telemetry, error retry queue, and status log exporter",
      "Integrated template previewer with variable interpolation ({Name}, {ID}, {Score})"
    ],
    tags: ["Python", "Automation", "Excel/CSV Parsing", "SMTP", "Document Matching", "Batch Processing"],
    metrics: [
      { label: "Time Saved", value: "95%" },
      { label: "Matching Accuracy", value: "100%" },
      { label: "Batch Speed", value: "500+ mails/min" }
    ],
    liveDemoAvailable: true
  },
  {
    id: "facetrack-ai",
    title: "Face Track AI",
    tagline: "AI-Powered Real-Time Face Recognition & Automated Attendance System",
    featured: true,
    category: "Computer Vision",
    color: "emerald",
    icon: "ScanFace",
    description: [
      "AI-powered computer vision system that automatically detects, verifies, and records student attendance using high-speed facial feature embedding.",
      "Significantly reduces manual attendance overhead, prevents proxy logging, and provides classroom instructors with instant analytical attendance summaries."
    ],
    highlights: [
      "Ultra-low latency facial bounding box detection and landmark alignment",
      "Vector cosine similarity matching against registered student roster database",
      "Anti-spoofing liveness verification to prevent photo and video replay attacks",
      "Instant exportable attendance ledger with timestamps and confidence score logs"
    ],
    tags: ["Computer Vision", "Face Recognition", "Python", "Deep Learning", "Real-Time AI", "OpenCV"],
    metrics: [
      { label: "Recognition Accuracy", value: "98.7%" },
      { label: "Verification Latency", value: "<80ms" },
      { label: "Manual Effort Reduction", value: "90%" }
    ],
    liveDemoAvailable: true
  },
  {
    id: "bytebuddy-hub",
    title: "ByteBuddy Tech Platform",
    tagline: "AI-Powered Learning & Smart Automation Suite for Next-Gen Tech Students",
    featured: true,
    category: "EdTech",
    color: "amber",
    icon: "Sparkles",
    description: [
      "The flagship digital ecosystem built under ByteBuddy to democratize technology learning, break down complex concepts into interactive modules, and automate daily student developer workflows."
    ],
    highlights: [
      "Interactive concept visualizers for complex computer science algorithms",
      "AI study assistant tailored for rapid engineering exam and project prep",
      "Open student collaborative codebase and tooling sandbox"
    ],
    tags: ["Full-Stack", "AI Assistance", "Startup Tech", "Student Community", "React", "TypeScript"],
    metrics: [
      { label: "Target Scope", value: "Pan-India Colleges" },
      { label: "Concept Clarity", value: "10x Faster" },
      { label: "Student Modules", value: "Continuous Rollout" }
    ],
    liveDemoAvailable: true
  },
  {
    id: "neuromorphic-gis",
    title: "Neuromorphic GIS & CubeSat Telemetry",
    tagline: "Spiking Neural Processing & Remote Sensing Geospatial Disaster Analysis",
    featured: false,
    category: "Hardware & Neural",
    color: "indigo",
    icon: "Cpu",
    description: [
      "Research prototype inspired by CanSat/CubeSat telemetry and TKIET Neuromorphic research, applying event-driven bio-inspired neural compute to remote sensing GIS crisis response."
    ],
    highlights: [
      "Low-power event-based spatial pattern recognition for disaster thermal hotspots",
      "Multispectral satellite band ratio processing for flood and fire mapping",
      "Simulated CubeSat telemetry downlink packet parsing"
    ],
    tags: ["Neuromorphic Computing", "Remote Sensing GIS", "CubeSat Telemetry", "Aerospace AI"],
    metrics: [
      { label: "Energy Efficiency", value: "10x vs Standard CNN" },
      { label: "Spatial Bands", value: "RGB + NIR + Thermal" }
    ],
    liveDemoAvailable: true
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: "Code2",
    color: "cyan",
    skills: [
      { name: "Python", level: 95, description: "Core language for AI/ML pipelines, automation scripts, computer vision, data manipulation with Pandas, and backend microservices." },
      { name: "JavaScript", level: 88, description: "Modern ES6+, interactive frontend dynamics, asynchronous event systems, DOM manipulation, and React integrations." },
      { name: "HTML / CSS", level: 92, description: "Semantic markup, responsive UI layouts, CSS3 animations, Tailwind CSS utility architecture, and accessible web standards." },
      { name: "AI / ML Frameworks", level: 90, description: "Scikit-learn, classification algorithms, feature engineering, OpenCV computer vision, and neural network workflows." }
    ]
  },
  {
    title: "Developer Tools & IDEs",
    icon: "Wrench",
    color: "emerald",
    skills: [
      { name: "Git & GitHub", level: 92, description: "Version control, branching strategies, collaborative PR workflows, repository automation, and issue tracking." },
      { name: "VS Code", level: 95, description: "Primary environment with custom linting, terminal multiplexing, remote SSH, and productivity extensions." },
      { name: "IntelliJ IDEA", level: 85, description: "IDE proficiency for enterprise architecture, object-oriented development, debugging, and profiling." },
      { name: "Data Science Stack", level: 90, description: "Pandas, NumPy, Matplotlib, Jupyter Notebooks, Scikit-learn pipelines, and evaluation metrics." }
    ]
  },
  {
    title: "Domain Knowledge & Research",
    icon: "Orbit",
    color: "indigo",
    skills: [
      { name: "Satellite & Aerospace Systems", level: 88, description: "CanSat and CubeSat operational frameworks, rocketry fundamentals, advanced drone tech, and space disaster telemetry." },
      { name: "Remote Sensing & GIS", level: 86, description: "Geospatial data collection, multispectral image interpretation, environmental monitoring, and disaster management." },
      { name: "AI in Cybersecurity (IDS/SIEM)", level: 89, description: "Intrusion detection (IDS/IPS), threat intelligence analysis, SIEM anomaly enhancement, and SOAR automation." },
      { name: "Neuromorphic Computing", level: 85, description: "Brain-inspired computing architectures, spiking neural research at TKIET, and low-power event-driven compute." }
    ]
  },
  {
    title: "Soft Skills & Leadership",
    icon: "Users",
    color: "amber",
    skills: [
      { name: "Problem Solving", level: 96, description: "Algorithmic mindset, translating complex theoretical challenges into pragmatic and maintainable software implementations." },
      { name: "Teamwork & Collaboration", level: 94, description: "Effective cross-functional group synergy in hackathons, research labs, and academic presentation teams." },
      { name: "Communication", level: 92, description: "Articulating technical research, writing structured project documentation, and pitching startup visions clearly." },
      { name: "Public Speaking", level: 90, description: "Proven experience with 30+ technical paper presentations, stage pitches, and academic defense sessions." }
    ]
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "case-quest",
    title: "Finalist in Case Quest 2.0",
    organizer: "Maruti Suzuki, MANCOSA, & SBUP Pune",
    location: "Pune, India",
    category: "Competition",
    icon: "Trophy",
    badge: "National Finalist",
    description: "Earned finalist standing among hundreds of competitive submissions in Case Quest 2.0, solving high-stakes corporate innovation, market strategy, and operational challenges judged by Maruti Suzuki and academic leaders.",
    metrics: "Top Tier Selection"
  },
  {
    id: "rgipt-ideathon",
    title: "Finalist at National Level Ideathon Competition",
    organizer: "RGIPT (Rajiv Gandhi Institute of Petroleum Technology)",
    location: "Uttar Pradesh, India",
    category: "Ideathon",
    icon: "Lightbulb",
    badge: "National Level Finalist",
    description: "Pitched visionary technology solutions addressing real-world industrial and sustainability problems, qualifying for the prestigious grand finale at RGIPT Uttar Pradesh.",
    metrics: "Pan-India Recognition"
  },
  {
    id: "neuromorphic-grant",
    title: "Research Recipient for Neuromorphic Computing",
    organizer: "TKIET Research Council",
    location: "India",
    category: "Research",
    icon: "Cpu",
    badge: "Research Recipient",
    description: "Selected as Research Recipient at TKIET to conduct advanced exploration into Neuromorphic Computing — investigating brain-inspired neuromorphic hardware paradigms and energy-efficient event-driven algorithms.",
    metrics: "Funded Research Initiative"
  },
  {
    id: "paper-presentations",
    title: "30+ Technical Paper Presentations",
    organizer: "Multiple State & National Level Academic Conferences",
    location: "Pan-India",
    category: "Technical Presentation",
    icon: "Presentation",
    badge: "30+ Presentations",
    description: "Presented research papers covering AI-ML applications, satellite technology, geospatial analytics, and cybersecurity across 30+ university and professional symposiums.",
    metrics: "30+ Papers Delivered"
  }
];
