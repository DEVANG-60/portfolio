import { useState, useEffect } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { FounderSpotlight } from './components/FounderSpotlight';
import { SkillsSection } from './components/SkillsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ContactSection } from './components/ContactSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ResumeModal } from './components/ResumeModal';
import { sound } from './utils/audio';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [particleMode, setParticleMode] = useState<'neural' | 'space' | 'cyber' | 'constellation'>('neural');

  // Global keyboard shortcuts (Cmd+K / Ctrl+K for CLI terminal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sound.playClick();
        setTerminalOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        if (terminalOpen) setTerminalOpen(false);
        if (resumeOpen) setResumeOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [terminalOpen, resumeOpen]);

  const handleOpenContact = () => {
    sound.playClick();
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRunSimulationFromTerminal = (projectId: string) => {
    setTerminalOpen(false);
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#080808] text-white selection:bg-[#00f2ff]/30 selection:text-[#00f2ff] blueprint-bg">
      
      {/* Interactive Particle FX Canvas */}
      <ParticleCanvas 
        mode={particleMode} 
        onModeChange={(m) => setParticleMode(m)} 
      />

      {/* Floating Navbar with Geometric Balance */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
        onOpenContact={handleOpenContact}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-16 pb-16">
        <Hero
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
          onOpenContact={handleOpenContact}
        />

        <ExperienceSection />

        <ProjectsSection />

        <FounderSpotlight />

        <SkillsSection />

        <AchievementsSection />

        <ContactSection
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
        />
      </main>

      {/* Interactive Terminal Modal */}
      <InteractiveTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onRunSimulation={handleRunSimulationFromTerminal}
      />

      {/* Resume Digital Sheet Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
