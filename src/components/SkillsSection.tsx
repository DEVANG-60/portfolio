import { useState } from 'react';
import { Code2, Wrench, Orbit, Users, Search, Check, Sparkles } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { sound } from '../utils/audio';

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; level: number; description: string } | null>(
    SKILL_CATEGORIES[0].skills[0]
  );

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-4 h-4" />;
      case 'Wrench': return <Wrench className="w-4 h-4" />;
      case 'Orbit': return <Orbit className="w-4 h-4" />;
      case 'Users': return <Users className="w-4 h-4" />;
      default: return <Code2 className="w-4 h-4" />;
    }
  };

  const filteredCategories = SKILL_CATEGORIES.filter(cat => {
    if (activeCategory !== 'all' && cat.title !== activeCategory) return false;
    return true;
  }).map(cat => ({
    ...cat,
    skills: cat.skills.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.skills.length > 0);

  return (
    <section id="skills" className="py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="mb-8 space-y-2">
        <div className="section-label">
          TECHNICAL TOOLKIT // CORE COMPETENCIES
        </div>
        <h2 className="text-2xl sm:text-4xl font-black font-heading text-white tracking-tight uppercase">
          Languages, Tools & <span className="text-[#00f2ff]">Engineering Stack</span>
        </h2>
        <p className="text-[#888888] text-xs sm:text-sm max-w-3xl leading-relaxed">
          Comprehensive breakdown of programming languages, IDE tools, domain research specializations, and leadership capabilities.
        </p>

        {/* Filter and Search Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => {
                sound.playClick();
                setActiveCategory('all');
              }}
              className={`px-3 py-1 text-xs font-mono-code uppercase transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#00f2ff] text-black font-bold'
                  : 'bg-[#111111] text-[#888888] hover:text-white border border-[rgba(0,242,255,0.15)]'
              }`}
            >
              ALL CATEGORIES
            </button>
            {SKILL_CATEGORIES.map(cat => (
              <button
                key={cat.title}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat.title);
                }}
                className={`px-3 py-1 text-xs font-mono-code uppercase transition-all flex items-center gap-1.5 ${
                  activeCategory === cat.title
                    ? 'bg-[#00f2ff] text-black font-bold'
                    : 'bg-[#111111] text-[#888888] hover:text-white border border-[rgba(0,242,255,0.15)]'
                }`}
              >
                {getCategoryIcon(cat.icon)}
                <span>{cat.title}</span>
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" />
            <input
              type="text"
              placeholder="SEARCH SKILLS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-[#080808] border border-[rgba(0,242,255,0.2)] text-xs text-white placeholder:text-[#888888] focus:outline-none focus:border-[#00f2ff] font-mono-code w-56 uppercase"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Categories & Skills Grid */}
        <div className="lg:col-span-8 space-y-4">
          {filteredCategories.map((category) => (
            <div
              key={category.title}
              className="geo-panel p-5 space-y-3 relative"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-[rgba(0,242,255,0.15)] text-xs font-bold font-heading text-white uppercase">
                <span className="p-1 bg-[#080808] text-[#00f2ff] border border-[rgba(0,242,255,0.2)]">
                  {getCategoryIcon(category.icon)}
                </span>
                <span>{category.title}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {category.skills.map((skill) => {
                  const isSelected = selectedSkill?.name === skill.name;
                  return (
                    <div
                      key={skill.name}
                      onClick={() => {
                        sound.playClick();
                        setSelectedSkill(skill);
                      }}
                      className={`p-3 border cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#111111] border-[#00f2ff] shadow-sm shadow-[#00f2ff]/20'
                          : 'bg-[#080808] hover:bg-[#111111] border-[rgba(0,242,255,0.15)] hover:border-[rgba(0,242,255,0.3)]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-white font-mono-code uppercase">
                          {skill.name}
                        </span>
                        <span className="text-[11px] font-mono-code text-[#00f2ff] font-bold">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-1 bg-[#111111] overflow-hidden">
                        <div
                          className="h-full bg-[#00f2ff]"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Selected Skill Detail Inspector */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="geo-panel p-5 space-y-4 relative">
            <div className="corner-bracket corner-tl" />
            <div className="corner-bracket corner-tr" />
            <div className="corner-bracket corner-bl" />
            <div className="corner-bracket corner-br" />

            <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(0,242,255,0.15)]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00f2ff]" />
                <span className="text-xs font-mono-code text-white font-bold uppercase tracking-wider">
                  SKILL DEEP DIVE
                </span>
              </div>
              <span className="geo-badge">
                VERIFIED
              </span>
            </div>

            {selectedSkill ? (
              <div className="space-y-3.5">
                <div>
                  <h3 className="text-lg font-bold font-heading text-white uppercase">
                    {selectedSkill.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 font-mono-code text-xs text-[#00f2ff]">
                    <span>PROFICIENCY: {selectedSkill.level}%</span>
                    <span>•</span>
                    <span className="text-white">PRODUCTION READY</span>
                  </div>
                </div>

                <div className="p-3 bg-[#080808] border border-[rgba(0,242,255,0.15)] text-xs text-[#cccccc] leading-relaxed font-mono-code">
                  {selectedSkill.description}
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-mono-code text-[#888888] uppercase">
                    PRACTICAL REPOSITORIES:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 bg-[#080808] text-[10px] font-mono-code text-[#00f2ff] border border-[rgba(0,242,255,0.2)] uppercase">
                      MailPilot Engine
                    </span>
                    <span className="px-2 py-0.5 bg-[#080808] text-[10px] font-mono-code text-white border border-[rgba(0,242,255,0.2)] uppercase">
                      Face Track AI
                    </span>
                    <span className="px-2 py-0.5 bg-[#080808] text-[10px] font-mono-code text-[#888888] border border-[rgba(0,242,255,0.2)] uppercase">
                      ByteBuddy Suite
                    </span>
                    <span className="px-2 py-0.5 bg-[#080808] text-[10px] font-mono-code text-[#00f2ff] border border-[rgba(0,242,255,0.2)] uppercase">
                      Indian Space Lab
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-[#888888] font-mono-code text-center py-6">
                SELECT ANY SKILL CARD TO INSPECT METRICS.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
