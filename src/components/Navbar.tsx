import { useState, useEffect } from 'react';
import { Terminal, Volume2, VolumeX, FileText, Menu, X, Rocket, Sparkles, Shield, Orbit } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export function Navbar({ onOpenTerminal, onOpenResume, onOpenContact }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section
      const sections = ['hero', 'experience', 'projects', 'bytebuddy', 'skills', 'achievements', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { name: 'Experience', href: '#experience', icon: Orbit },
    { name: 'Projects', href: '#projects', icon: Sparkles },
    { name: 'ByteBuddy', href: '#bytebuddy', icon: Rocket },
    { name: 'Skills', href: '#skills', icon: Shield },
    { name: 'Achievements', href: '#achievements', icon: FileText },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-2.5 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={() => sound.playClick()}
          id="nav-brand-logo"
          className={`pointer-events-auto relative flex items-center gap-3 px-3.5 py-1.5 border transition-all duration-300 ${
            scrolled 
              ? 'bg-[#111111]/95 border-[rgba(0,242,255,0.3)] backdrop-blur-xl shadow-lg' 
              : 'bg-[#080808]/90 border-[rgba(0,242,255,0.15)] backdrop-blur-md'
          }`}
        >
          {/* Corner brackets */}
          <div className="corner-bracket corner-tl" />
          <div className="corner-bracket corner-br" />

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#00f2ff] flex items-center justify-center text-black font-mono-code font-black text-xs">
              DS
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black tracking-tight text-white uppercase">
                  DEVANG SHINDE
                </span>
                <span className="geo-badge hidden sm:inline-flex">
                  FOUNDER @ BYTEBUDDY
                </span>
              </div>
            </div>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav 
          aria-label="Main Navigation"
          className={`pointer-events-auto hidden md:flex items-center gap-1 px-3 py-1.5 border transition-all duration-300 ${
            scrolled 
              ? 'bg-[#111111]/95 border-[rgba(0,242,255,0.25)] backdrop-blur-xl' 
              : 'bg-[#080808]/90 border-[rgba(0,242,255,0.15)] backdrop-blur-md'
          }`}
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                id={`nav-link-${link.name.toLowerCase()}`}
                onClick={() => sound.playClick()}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono-code uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-[#00f2ff] text-black font-bold'
                    : 'text-[#888888] hover:text-[#00f2ff] hover:bg-white/[0.03]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Action Controls: Sound, Terminal, Resume, Contact */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            id="sound-toggle-btn"
            title={isMuted ? 'Unmute audio effects' : 'Mute audio effects'}
            className="p-2 bg-[#111111] border border-[rgba(0,242,255,0.2)] text-[#888888] hover:text-[#00f2ff] hover:border-[#00f2ff] transition-colors"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#555555]" /> : <Volume2 className="w-3.5 h-3.5 text-[#00f2ff]" />}
          </button>

          {/* Terminal Launcher */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenTerminal();
            }}
            id="open-terminal-btn"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#111111] border border-[rgba(0,242,255,0.25)] hover:border-[#00f2ff] text-xs font-mono-code text-[#00f2ff] transition-all group"
          >
            <Terminal className="w-3.5 h-3.5 text-[#00f2ff]" />
            <span>CLI</span>
            <span className="text-[10px] px-1 bg-black text-[#00f2ff]/80 border border-[rgba(0,242,255,0.2)]">
              ⌘K
            </span>
          </button>

          {/* Resume Modal Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenResume();
            }}
            id="view-resume-nav-btn"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-[#111111] hover:bg-white/[0.05] border border-[rgba(0,242,255,0.2)] text-xs font-mono-code text-white transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-[#00f2ff]" />
            <span>RESUME</span>
          </button>

          {/* Contact Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenContact();
            }}
            id="nav-contact-btn"
            className="px-3.5 py-1.5 bg-[#00f2ff] hover:bg-[#38f8ff] text-black font-black text-xs font-mono-code uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
          >
            CONNECT
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle-btn"
            className="md:hidden p-2 bg-[#111111] border border-[rgba(0,242,255,0.2)] text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          className="pointer-events-auto md:hidden mt-2 p-4 bg-[#080808] border border-[rgba(0,242,255,0.3)] shadow-2xl flex flex-col gap-3 relative animate-in fade-in slide-in-from-top duration-200"
          id="mobile-drawer-menu"
        >
          <div className="corner-bracket corner-tl" />
          <div className="corner-bracket corner-br" />

          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    sound.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-mono-code uppercase text-[#888888] hover:text-[#00f2ff] hover:bg-white/[0.03] transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#00f2ff]" />
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[rgba(0,242,255,0.15)] flex items-center justify-between gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#111111] border border-[rgba(0,242,255,0.2)] text-xs font-mono-code text-[#00f2ff]"
            >
              <Terminal className="w-3.5 h-3.5" />
              CLI TERMINAL
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#111111] border border-[rgba(0,242,255,0.2)] text-xs font-mono-code text-white"
            >
              <FileText className="w-3.5 h-3.5 text-[#00f2ff]" />
              RESUME
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
