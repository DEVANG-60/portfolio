import { useState } from 'react';
import { X, Download, Printer, Copy, Check, FileText, Mail, Phone, ExternalLink, Orbit, BrainCircuit, ShieldAlert, Rocket } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, SKILL_CATEGORIES, ACHIEVEMENTS } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const copyPlainTextResume = () => {
    sound.playClick();
    const resumeText = `
DEVANG SHINDE
Phone: 9322971353 | Email: devangmshinde06@gmail.com | LinkedIn | GitHub
Founder @ ByteBuddy | AI-ML & Space Systems Researcher

EXPERIENCE
1. Indian Space Lab (Summer Intern, May 2026 – June 2026, India)
- Satellite Systems: CanSat and CubeSat satellite programs.
- Aerospace Engineering: Rocketry Science and Advanced Drone Technology.
- Geospatial Analysis: Remote Sensing GIS for data collection and environmental monitoring.
- Crisis Response: Space technology in Disaster Management strategies.

2. PLUTO ACADEMY (AI-ML Intern, May 2026 – July 2026, India)
- Data cleaning, visualization, and built multiple ML models to solve classification problems.
- Compared models using evaluation metrics and selected optimal model.
- Hands-on skills in Python, Pandas, visualization, and Scikit-learn.

3. Eduskill Academy (AI in Cyber Security Intern, June 2026 – Aug. 2026, India)
- Data Preprocessing and Feature Engineering for Cyber Datasets.
- Building and Deploying AI-Powered Intrusion Detection Systems (IDS/IPS), SIEM Enhancement.
- AI-Driven Threat Intelligence Platforms and SOAR with AI.

FOUNDER
ByteBuddy
- Building AI-powered solutions that simplify technology and make learning smarter, faster, and more accessible.
- Student-driven tech startup turning real-world problems into scalable digital solutions.

PROJECTS
1. MailPilot: Automates bulk email sending with personalized recipients and PDF attachments from Excel/CSV data.
2. Face Track AI: AI-powered face recognition automatically identifies students and records attendance in real-time.

SKILLS
- Languages: Python, JavaScript, HTML/CSS, AI/ML
- Tools: Git, GitHub, VS Code, IntelliJ IDEA, Scikit-learn, Pandas
- Soft Skills: Problem Solving, Teamwork, Communication, Public Speaking

ACHIEVEMENTS
- Finalist in Case Quest 2.0 (Maruti Suzuki, MANCOSA, SBUP, Pune)
- Finalist at National Level Ideathon Competition (RGIPT, Uttar Pradesh)
- Research Recipient at TKIET for research in Neuromorphic Computing
- Participated in 30+ Technical Paper Presentations
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-[#080808] border border-[#00f2ff] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden relative">
        <div className="corner-bracket corner-tl" />
        <div className="corner-bracket corner-tr" />
        <div className="corner-bracket corner-bl" />
        <div className="corner-bracket corner-br" />
        
        {/* Modal Bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#111111] border-b border-[rgba(0,242,255,0.2)]">
          <div className="flex items-center gap-2 text-white font-bold font-heading text-xs sm:text-sm uppercase">
            <FileText className="w-4 h-4 text-[#00f2ff]" />
            <span>DEVANG SHINDE // VERIFIED CURRICULUM VITAE</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyPlainTextResume}
              className="px-2.5 py-1 bg-[#080808] hover:bg-[#111111] border border-[rgba(0,242,255,0.2)] text-[11px] font-mono-code text-[#cccccc] flex items-center gap-1.5 transition-colors uppercase"
            >
              {copied ? <Check className="w-3 h-3 text-[#00f2ff]" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'COPIED!' : 'COPY TEXT'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-2.5 py-1 bg-[#00f2ff] hover:bg-[#38f8ff] text-black font-bold text-[11px] font-mono-code flex items-center gap-1.5 transition-colors uppercase"
            >
              <Printer className="w-3 h-3" />
              <span>PRINT / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 text-[#888888] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet Content */}
        <div className="p-6 sm:p-8 overflow-y-auto bg-[#080808] text-[#cccccc] space-y-6 font-mono-code print:bg-white print:text-black">
          
          {/* Header */}
          <div className="border-b border-[rgba(0,242,255,0.2)] pb-4 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight uppercase">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-xs text-[#00f2ff] font-mono-code mt-1 font-bold uppercase">
                Founder @ ByteBuddy | AI-ML & Space Systems Researcher
              </p>
            </div>

            <div className="text-[11px] font-mono-code text-[#888888] space-y-0.5 text-right uppercase">
              <div>PHONE: <strong className="text-white">{PERSONAL_INFO.phone}</strong></div>
              <div>EMAIL: <strong className="text-white">{PERSONAL_INFO.email}</strong></div>
              <div>LOCATION: <strong className="text-white">India</strong></div>
            </div>
          </div>

          {/* Founder Section */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-heading text-[#00f2ff] uppercase tracking-wider flex items-center gap-2 border-b border-[rgba(0,242,255,0.15)] pb-1">
              <Rocket className="w-3.5 h-3.5 text-[#00f2ff]" />
              STARTUP LEADERSHIP
            </h2>
            <div className="space-y-1 bg-[#111111] p-3 border border-[rgba(0,242,255,0.15)]">
              <div className="flex justify-between items-center text-xs font-bold text-white uppercase">
                <span>ByteBuddy</span>
                <span className="geo-badge">FOUNDER</span>
              </div>
              <p className="text-xs text-[#cccccc]">
                • Building AI-powered solutions that simplify technology and make learning smarter, faster, and more accessible.
              </p>
              <p className="text-xs text-[#cccccc]">
                • A student-driven tech startup focused on turning real-world problems into practical, scalable digital solutions.
              </p>
            </div>
          </div>

          {/* Experience Section */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold font-heading text-[#00f2ff] uppercase tracking-wider flex items-center gap-2 border-b border-[rgba(0,242,255,0.15)] pb-1">
              <Orbit className="w-3.5 h-3.5 text-[#00f2ff]" />
              PROFESSIONAL EXPERIENCE
            </h2>

            {EXPERIENCES.filter(e => e.id !== 'bytebuddy').map((exp) => (
              <div key={exp.id} className="space-y-1.5 bg-[#111111] p-3 border border-[rgba(0,242,255,0.15)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-bold text-white uppercase">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00f2ff]">{exp.company}</span>
                    <span className="text-[11px] font-normal text-[#888888]">— {exp.role}</span>
                  </div>
                  <span className="text-[10px] font-mono-code text-[#888888]">{exp.period} | {exp.location}</span>
                </div>

                <ul className="space-y-1 text-xs text-[#cccccc]">
                  {exp.description.map((line, lIdx) => (
                    <li key={lIdx}>• {line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Projects Section */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold font-heading text-[#00f2ff] uppercase tracking-wider flex items-center gap-2 border-b border-[rgba(0,242,255,0.15)] pb-1">
              <BrainCircuit className="w-3.5 h-3.5 text-[#00f2ff]" />
              FEATURED REPOSITORIES
            </h2>

            {PROJECTS.map((proj) => (
              <div key={proj.id} className="space-y-1 bg-[#111111] p-3 border border-[rgba(0,242,255,0.15)]">
                <div className="flex justify-between text-xs font-bold text-white uppercase">
                  <span>{proj.title}</span>
                  <span className="text-[10px] font-mono-code text-[#00f2ff]">{proj.category}</span>
                </div>
                <div className="text-xs text-[#cccccc]">
                  {proj.description.map((d, dIdx) => (
                    <p key={dIdx}>• {d}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold font-heading text-[#00f2ff] uppercase tracking-wider flex items-center gap-2 border-b border-[rgba(0,242,255,0.15)] pb-1">
              <ShieldAlert className="w-3.5 h-3.5 text-[#00f2ff]" />
              TECHNICAL & SOFT CAPABILITIES
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-code text-[#cccccc] bg-[#111111] p-3 border border-[rgba(0,242,255,0.15)]">
              <div><strong className="text-white">LANGUAGES:</strong> Python, JavaScript, HTML/CSS, AI/ML</div>
              <div><strong className="text-white">TOOLS:</strong> Git, GitHub, VS Code, IntelliJ IDEA, Scikit-learn, Pandas</div>
              <div><strong className="text-white">DOMAINS:</strong> CanSat/CubeSat, Remote Sensing GIS, AI Cybersecurity (IDS), Neuromorphic Computing</div>
              <div><strong className="text-white">SOFT SKILLS:</strong> Problem Solving, Teamwork, Communication, Public Speaking</div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-heading text-[#00f2ff] uppercase tracking-wider border-b border-[rgba(0,242,255,0.15)] pb-1">
              KEY ACHIEVEMENTS & RESEARCH GRANTS
            </h2>
            <ul className="space-y-1.5 text-xs text-[#cccccc] bg-[#111111] p-3 border border-[rgba(0,242,255,0.15)]">
              {ACHIEVEMENTS.map((ach) => (
                <li key={ach.id}>
                  • <strong className="text-white uppercase">{ach.title}</strong> — {ach.organizer} ({ach.metrics})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
