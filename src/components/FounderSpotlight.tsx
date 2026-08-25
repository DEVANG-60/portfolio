import { useState } from 'react';
import { Rocket, Sparkles, BookOpen, Lightbulb, Users, ArrowUpRight, Zap, Target, CheckCircle } from 'lucide-react';
import { sound } from '../utils/audio';

export function FounderSpotlight() {
  const roadmapItems = [
    { title: 'STUDENT LEARNING ACCELERATOR', desc: 'Transforming dense engineering syllabi into intuitive, visual, AI-assisted interactive breakdowns.', icon: BookOpen },
    { title: 'PRACTICAL AUTOMATION MODULES', desc: 'Eliminating routine administrative tasks for colleges, student clubs, and tech teams.', icon: Zap },
    { title: 'COMMUNITY-DRIVEN INNOVATION', desc: 'Empowering student developers to build scalable open-source solutions for campus challenges.', icon: Users },
  ];

  return (
    <section id="bytebuddy" className="py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="geo-panel p-6 sm:p-10 relative overflow-hidden">
        <div className="corner-bracket corner-tl" />
        <div className="corner-bracket corner-tr" />
        <div className="corner-bracket corner-bl" />
        <div className="corner-bracket corner-br" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Founder Manifesto */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="section-label">
              FOUNDER SPOTLIGHT // VENTURE INITIATIVE
            </div>

            <h2 className="text-2xl sm:text-4xl font-black font-heading text-white tracking-tight uppercase">
              Building <span className="text-[#00f2ff]">ByteBuddy</span>
            </h2>

            <p className="text-white text-sm sm:text-base leading-relaxed font-normal">
              ByteBuddy is a student-driven tech startup founded by Devang Shinde with a singular mission: <strong className="text-[#00f2ff] font-semibold">building AI-powered solutions that simplify technology and make learning smarter, faster, and universally accessible.</strong>
            </p>

            <p className="text-[#888888] text-xs sm:text-sm leading-relaxed">
              Instead of theoretical exercises, ByteBuddy takes real-world academic hurdles, study bottlenecks, and workflow friction, turning them into practical, high-impact, scalable digital platforms.
            </p>

            {/* Quick Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="p-3 bg-[#080808] border border-[rgba(0,242,255,0.15)] flex flex-col gap-1">
                <div className="text-[#00f2ff] font-mono-code text-[11px] font-bold flex items-center gap-1.5 uppercase">
                  <Target className="w-3.5 h-3.5" /> Practical
                </div>
                <div className="text-[11px] text-[#888888]">Real problems solved directly for students</div>
              </div>

              <div className="p-3 bg-[#080808] border border-[rgba(0,242,255,0.15)] flex flex-col gap-1">
                <div className="text-white font-mono-code text-[11px] font-bold flex items-center gap-1.5 uppercase">
                  <Zap className="w-3.5 h-3.5 text-[#00f2ff]" /> Scalable
                </div>
                <div className="text-[11px] text-[#888888]">Built on modern AI & lightweight web stacks</div>
              </div>

              <div className="p-3 bg-[#080808] border border-[rgba(0,242,255,0.15)] flex flex-col gap-1">
                <div className="text-[#00f2ff] font-mono-code text-[11px] font-bold flex items-center gap-1.5 uppercase">
                  <Sparkles className="w-3.5 h-3.5" /> Accessible
                </div>
                <div className="text-[11px] text-[#888888]">Democratizing technology for every learner</div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="#projects"
                onClick={() => sound.playClick()}
                className="px-4 py-2 bg-[#00f2ff] hover:bg-[#38f8ff] text-black font-black text-xs font-mono-code flex items-center gap-2 uppercase transition-all shadow-md"
              >
                <span>EXPLORE BYTEBUDDY SUITE</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Startup Architecture Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#080808] border border-[rgba(0,242,255,0.25)] p-5 space-y-3 relative">
              <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(0,242,255,0.15)]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00f2ff] animate-ping" />
                  <span className="text-xs font-mono-code text-[#00f2ff] font-bold uppercase">
                    ByteBuddy Venture Matrix
                  </span>
                </div>
                <span className="text-[10px] font-mono-code text-[#888888]">PHASE 1: ROLLOUT</span>
              </div>

              <div className="space-y-2">
                {roadmapItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3 bg-[#111111] border border-[rgba(0,242,255,0.15)] hover:border-[#00f2ff] flex items-start gap-3 transition-colors group"
                    >
                      <div className="p-2 bg-[#080808] text-[#00f2ff] border border-[rgba(0,242,255,0.2)]">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-[#00f2ff] transition-colors uppercase">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-[#888888] mt-0.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-2.5 bg-[#111111] border border-[rgba(0,242,255,0.15)] text-xs font-mono-code text-[#888888] flex items-center justify-between">
                <span>STATUS: ACTIVE ROLLOUT</span>
                <span className="text-[#00f2ff] font-bold">DEVANG SHINDE (FOUNDER)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
