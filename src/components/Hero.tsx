import { useState, useEffect } from 'react';
import { Terminal, ArrowRight, Github, Linkedin, Mail, Phone, Rocket, Sparkles, Cpu, Satellite, ShieldCheck, Download, Code2, Award } from 'lucide-react';
import { sound } from '../utils/audio';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export function Hero({ onOpenTerminal, onOpenResume, onOpenContact }: HeroProps) {
  const roles = [
    "Founder @ ByteBuddy",
    "AI & Machine Learning Intern",
    "Satellite & Drone Systems Explorer",
    "Cyber Security & Threat Intel Specialist",
    "Neuromorphic Computing Researcher"
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  // Typewriter effect
  useEffect(() => {
    const currentFullText = roles[currentRoleIndex];

    const handleType = () => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentFullText.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(handleType, isDeleting ? 35 : typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, typingSpeed, roles]);

  return (
    <section 
      id="hero" 
      className="relative pt-24 pb-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10"
    >
      {/* Blueprint grid frame container */}
      <div className="relative geo-panel p-6 sm:p-10">
        <div className="corner-bracket corner-tl" />
        <div className="corner-bracket corner-tr" />
        <div className="corner-bracket corner-bl" />
        <div className="corner-bracket corner-br" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Bio & Calls to Action */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Section label in Geometric Balance style */}
            <div className="section-label">
              PROFILE // DEVANG SHINDE
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white uppercase leading-none">
                  {PERSONAL_INFO.name}
                </h1>
                <span className="geo-badge">
                  FOUNDER @ BYTEBUDDY
                </span>
              </div>
              
              {/* Dynamic Tagline & Typewriter */}
              <div className="h-9 sm:h-11 flex items-center font-mono-code text-sm sm:text-xl text-[#00f2ff] font-bold">
                <span className="mr-2 text-[#888888]">&gt;</span>
                <span className="uppercase">{displayText}</span>
                <span className="w-2 h-5 bg-[#00f2ff] ml-1 inline-block animate-pulse" />
              </div>
            </div>

            {/* Geometric Tagline Banner */}
            <div className="p-3 bg-[#080808] border-l-2 border-[#00f2ff] border-y border-r border-[rgba(0,242,255,0.15)] text-xs sm:text-sm font-mono-code text-[#cccccc] leading-relaxed">
              SPACE TECH & AI SOLUTIONS • Neuromorphic Computing Research • Satellite Systems & Cybersecurity
            </div>

            {/* Brief Summary */}
            <p className="text-[#888888] text-xs sm:text-sm leading-relaxed max-w-2xl">
              Building intelligent software, analyzing satellite telemetry (CanSat/CubeSat), and engineering cyber threat detection models. Founder of <strong className="text-white font-semibold">ByteBuddy</strong>, turning academic bottlenecks into scalable digital platforms.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                onClick={() => sound.playClick()}
                id="hero-explore-projects-btn"
                className="px-5 py-2.5 bg-[#00f2ff] hover:bg-[#38f8ff] text-black font-black text-xs font-mono-code uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md"
              >
                <span>FEATURED PROJECTS</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </a>

              <button
                onClick={() => {
                  sound.playClick();
                  onOpenTerminal();
                }}
                id="hero-launch-cli-btn"
                className="px-4 py-2.5 bg-[#080808] hover:bg-white/[0.04] border border-[rgba(0,242,255,0.3)] hover:border-[#00f2ff] text-[#00f2ff] font-mono-code text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <Terminal className="w-3.5 h-3.5 text-[#00f2ff]" />
                <span>CLI TERMINAL [⌘K]</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onOpenResume();
                }}
                id="hero-resume-modal-btn"
                className="px-4 py-2.5 bg-[#080808] hover:bg-white/[0.04] border border-[rgba(0,242,255,0.2)] text-white text-xs font-mono-code uppercase tracking-wider flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-[#00f2ff]" />
                <span>RESUME</span>
              </button>
            </div>

            {/* Direct contact links */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono-code">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                onClick={() => sound.playClick()}
                className="text-[#00f2ff] hover:underline flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-[#00f2ff]" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                onClick={() => sound.playClick()}
                className="text-[#00f2ff] hover:underline flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#00f2ff]" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              <div className="flex items-center gap-2 text-[#888888]">
                <span>•</span>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="hover:text-[#00f2ff] transition-colors"
                >
                  LINKEDIN
                </a>
                <span>•</span>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="hover:text-[#00f2ff] transition-colors"
                >
                  GITHUB
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Tech Telemetry Matrix Card */}
          <div className="lg:col-span-5">
            <div 
              className="bg-[#080808] border border-[rgba(0,242,255,0.25)] p-5 relative overflow-hidden group"
              id="hero-telemetry-hud"
            >
              <div className="corner-bracket corner-tl" />
              <div className="corner-bracket corner-tr" />
              <div className="corner-bracket corner-bl" />
              <div className="corner-bracket corner-br" />

              {/* HUD Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(0,242,255,0.15)] relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00f2ff]" />
                  <span className="text-xs font-mono-code text-[#00f2ff] font-bold tracking-wider uppercase">
                    SYSTEM MATRIX // v2.6
                  </span>
                </div>
                <span className="geo-badge">
                  ACTIVE
                </span>
              </div>

              {/* Core Domain Badges */}
              <div className="grid grid-cols-2 gap-2.5 py-4 relative z-10">
                <div className="bg-[#111111] p-3 border border-[rgba(0,242,255,0.15)] flex flex-col gap-1 hover:border-[#00f2ff] transition-colors">
                  <div className="flex items-center justify-between text-[#00f2ff]">
                    <Satellite className="w-4 h-4" />
                    <span className="text-[10px] font-mono-code text-[#888888]">SPACE LAB</span>
                  </div>
                  <div className="text-xs font-bold text-white uppercase">Indian Space Lab</div>
                  <div className="text-[10px] text-[#888888] font-mono-code">CanSat • CubeSat • GIS</div>
                </div>

                <div className="bg-[#111111] p-3 border border-[rgba(0,242,255,0.15)] flex flex-col gap-1 hover:border-[#00f2ff] transition-colors">
                  <div className="flex items-center justify-between text-[#00f2ff]">
                    <Cpu className="w-4 h-4" />
                    <span className="text-[10px] font-mono-code text-[#888888]">AI/ML</span>
                  </div>
                  <div className="text-xs font-bold text-white uppercase">PLUTO ACADEMY</div>
                  <div className="text-[10px] text-[#888888] font-mono-code">Classification Models</div>
                </div>

                <div className="bg-[#111111] p-3 border border-[rgba(0,242,255,0.15)] flex flex-col gap-1 hover:border-[#00f2ff] transition-colors">
                  <div className="flex items-center justify-between text-[#00f2ff]">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-mono-code text-[#888888]">CYBER</span>
                  </div>
                  <div className="text-xs font-bold text-white uppercase">Eduskill Academy</div>
                  <div className="text-[10px] text-[#888888] font-mono-code">AI IDS & Threat Intel</div>
                </div>

                <div className="bg-[#111111] p-3 border border-[rgba(0,242,255,0.15)] flex flex-col gap-1 hover:border-[#00f2ff] transition-colors">
                  <div className="flex items-center justify-between text-[#00f2ff]">
                    <Rocket className="w-4 h-4" />
                    <span className="text-[10px] font-mono-code text-[#00f2ff]">STARTUP</span>
                  </div>
                  <div className="text-xs font-bold text-white uppercase">ByteBuddy</div>
                  <div className="text-[10px] text-[#888888] font-mono-code">Founder & Architect</div>
                </div>
              </div>

              {/* Live Terminal Stream Snippet */}
              <div className="bg-[#050505] p-3 border border-[rgba(0,242,255,0.15)] font-mono-code text-[11px] text-white space-y-1 relative z-10">
                <div className="flex items-center justify-between text-[#888888] border-b border-white/[0.08] pb-1 text-[10px]">
                  <span>&gt; telemetry_engine.py</span>
                  <span className="text-[#00f2ff]">STATUS: 200 OK</span>
                </div>
                <div className="text-[#888888]">
                  <span className="text-[#00f2ff]">researcher:</span> "Devang Shinde"
                </div>
                <div className="text-[#888888]">
                  <span className="text-[#00f2ff]">papers_presented:</span> 30+
                </div>
                <div className="text-[#888888]">
                  <span className="text-[#00f2ff]">domains:</span> ["AI-ML", "CubeSat", "Cyber-IDS"]
                </div>
              </div>

              {/* Bottom mini-metrics bar */}
              <div className="mt-3.5 pt-3 border-t border-[rgba(0,242,255,0.15)] flex items-center justify-between text-[11px] font-mono-code text-[#888888] relative z-10">
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#00f2ff]" />
                  <span>Maruti & RGIPT Finalist</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#00f2ff]">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Python • Scikit • CV</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Strip in Geometric Grid */}
        <div className="mt-8 pt-6 border-t border-[rgba(0,242,255,0.15)] grid grid-cols-2 sm:grid-cols-4 gap-3" id="hero-stats-grid">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#080808] border border-[rgba(0,242,255,0.15)] hover:border-[#00f2ff] flex flex-col items-center text-center transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-black font-heading text-white">
                {stat.value}
              </div>
              <div className="text-[11px] text-[#888888] font-mono-code uppercase mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
