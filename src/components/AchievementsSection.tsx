import { useState } from 'react';
import { Trophy, Lightbulb, Cpu, Presentation, Award, Sparkles, CheckCircle, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ACHIEVEMENTS } from '../data/portfolioData';
import { sound } from '../utils/audio';

export function AchievementsSection() {
  const [activeAchievement, setActiveAchievement] = useState<string | null>(null);

  const triggerConfetti = (id: string) => {
    sound.playCyberSuccess();
    setActiveAchievement(id);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#38bdf8', '#34d399', '#fbbf24', '#818cf8']
      });
    } catch {
      // Confetti fallback
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy': return <Trophy className="w-4 h-4 text-[#00f2ff]" />;
      case 'Lightbulb': return <Lightbulb className="w-4 h-4 text-white" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-[#00f2ff]" />;
      case 'Presentation': return <Presentation className="w-4 h-4 text-white" />;
      default: return <Award className="w-4 h-4 text-[#00f2ff]" />;
    }
  };

  return (
    <section id="achievements" className="py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="mb-8 space-y-2">
        <div className="section-label">
          HONORS // COMPETITIONS & GRANTS
        </div>
        <h2 className="text-2xl sm:text-4xl font-black font-heading text-white tracking-tight uppercase">
          Recognitions & <span className="text-[#00f2ff]">Research Grants</span>
        </h2>
        <p className="text-[#888888] text-xs sm:text-sm max-w-3xl leading-relaxed">
          National level ideathon finalist positions, corporate case study accolades, neuromorphic research funding, and 30+ technical research paper presentations.
        </p>
      </div>

      {/* Grid of Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {ACHIEVEMENTS.map((ach) => {
          const isSelected = activeAchievement === ach.id;
          return (
            <div
              key={ach.id}
              id={`achievement-card-${ach.id}`}
              onClick={() => triggerConfetti(ach.id)}
              className={`cursor-pointer geo-panel p-5 transition-all duration-200 relative group ${
                isSelected
                  ? 'border-[#00f2ff] bg-[#111111] shadow-md shadow-[#00f2ff]/20'
                  : 'hover:border-[#00f2ff]'
              }`}
            >
              {isSelected && (
                <>
                  <div className="corner-bracket corner-tl" />
                  <div className="corner-bracket corner-tr" />
                  <div className="corner-bracket corner-bl" />
                  <div className="corner-bracket corner-br" />
                </>
              )}

              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#080808] border border-[rgba(0,242,255,0.2)] group-hover:border-[#00f2ff] transition-colors">
                    {getIcon(ach.icon)}
                  </div>
                  <div>
                    <span className="geo-badge">
                      {ach.badge}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold font-heading text-white mt-1 group-hover:text-[#00f2ff] transition-colors uppercase">
                      {ach.title}
                    </h3>
                  </div>
                </div>

                <div className="text-[11px] font-mono-code text-right">
                  <span className="text-[#00f2ff] font-bold">{ach.metrics}</span>
                </div>
              </div>

              {/* Organizer / Location */}
              <div className="text-xs font-mono-code text-[#888888] mb-2.5 flex items-center gap-1.5 uppercase">
                <span>ORGANIZED BY:</span>
                <span className="text-white font-bold">{ach.organizer}</span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#cccccc] leading-relaxed">
                {ach.description}
              </p>

              {/* Interaction Hint Footer */}
              <div className="mt-4 pt-2.5 border-t border-[rgba(0,242,255,0.15)] flex items-center justify-between text-[10px] font-mono-code text-[#888888]">
                <span className="flex items-center gap-1 text-[#888888] group-hover:text-[#00f2ff] transition-colors uppercase">
                  <Sparkles className="w-3 h-3 text-[#00f2ff]" />
                  CLICK TO TRIGGER CELEBRATION
                </span>
                <span className="text-[#888888] uppercase">
                  {ach.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
