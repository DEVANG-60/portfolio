import { useState } from 'react';
import { Orbit, BrainCircuit, ShieldAlert, Rocket, Calendar, MapPin, CheckCircle2, ChevronRight, Activity, Cpu, Radio, ShieldCheck } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';
import { sound } from '../utils/audio';

export function ExperienceSection() {
  const [selectedExpId, setSelectedExpId] = useState<string>(EXPERIENCES[0].id);
  const [satelliteTelemetry, setSatelliteTelemetry] = useState({
    altitude: '420.5 km',
    velocity: '7.68 km/s',
    temp: '-12°C',
    signalStrength: '98%',
    activePayload: 'Multispectral GIS Camera'
  });

  const [mlMetricView, setMlMetricView] = useState<'matrix' | 'roc' | 'features'>('matrix');
  const [cyberScanStatus, setCyberScanStatus] = useState<string>('Normal - Zero Anomalies');
  const [isScanningCyber, setIsScanningCyber] = useState<boolean>(false);

  const triggerSatellitePing = () => {
    sound.playBeep(1200, 0.08, 'sine', 0.04);
    const newAlt = (418 + Math.random() * 5).toFixed(1) + ' km';
    const newVel = (7.65 + Math.random() * 0.08).toFixed(2) + ' km/s';
    const newTemp = Math.floor(-15 + Math.random() * 8) + '°C';
    setSatelliteTelemetry(prev => ({ ...prev, altitude: newAlt, velocity: newVel, temp: newTemp }));
  };

  const runCyberScan = () => {
    sound.playLaserScan();
    setIsScanningCyber(true);
    setCyberScanStatus('Scanning live packet payloads for zero-day exploits...');
    setTimeout(() => {
      sound.playCyberSuccess();
      setIsScanningCyber(false);
      setCyberScanStatus('Threat Prevented: SQLi / Brute-force blocked by AI IDS [Confidence: 99.4%]');
    }, 1200);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Satellite': return <Orbit className="w-5 h-5" />;
      case 'BrainCircuit': return <BrainCircuit className="w-5 h-5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
      case 'Rocket': return <Rocket className="w-5 h-5" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  const selectedExp = EXPERIENCES.find(e => e.id === selectedExpId) || EXPERIENCES[0];

  return (
    <section id="experience" className="py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="mb-8 space-y-2">
        <div className="section-label">
          EXPERIENCE // INTERNSHIPS & RESEARCH
        </div>
        <h2 className="text-2xl sm:text-4xl font-black font-heading text-white tracking-tight uppercase">
          Space Tech & AI Systems <span className="text-[#00f2ff]">Engineering</span>
        </h2>
        <p className="text-[#888888] text-xs sm:text-sm max-w-3xl leading-relaxed">
          Hands-on internships and research tenures covering CubeSat satellite frameworks, AI-ML classification engines, intrusion prevention, and startup engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Interactive Timeline Navigation */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-[11px] font-mono-code text-[#888888] uppercase tracking-wider px-1">
            SELECT TENURE // TIMELINE
          </div>

          {EXPERIENCES.map((exp) => {
            const isSelected = exp.id === selectedExpId;
            return (
              <div
                key={exp.id}
                id={`exp-card-${exp.id}`}
                onClick={() => {
                  sound.playClick();
                  setSelectedExpId(exp.id);
                }}
                className={`cursor-pointer p-4 border transition-all duration-200 relative group ${
                  isSelected
                    ? 'bg-[#111111] border-[#00f2ff] shadow-md shadow-[#00f2ff]/10'
                    : 'bg-[#080808] hover:bg-[#111111] border-[rgba(0,242,255,0.15)] hover:border-[rgba(0,242,255,0.3)]'
                }`}
              >
                {/* Corner brackets when selected */}
                {isSelected && (
                  <>
                    <div className="corner-bracket corner-tl" />
                    <div className="corner-bracket corner-br" />
                  </>
                )}

                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 border ${
                      isSelected 
                        ? 'bg-[#00f2ff] text-black border-[#00f2ff]' 
                        : 'bg-[#111111] text-[#888888] border-[rgba(0,242,255,0.15)] group-hover:text-white'
                    }`}>
                      {getIcon(exp.iconName)}
                    </div>
                    <div>
                      <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#00f2ff] transition-colors uppercase">
                        {exp.company}
                      </h3>
                      <p className="text-[11px] text-[#888888] flex items-center gap-1.5 font-mono-code">
                        <span>{exp.role}</span>
                        <span>•</span>
                        <span className="text-[#00f2ff]">{exp.period}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[#888888] group-hover:text-[#00f2ff] transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>

                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 bg-[#080808] text-[#888888] border border-white/[0.08] font-mono-code uppercase">
                    {exp.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Rich Interactive Detail View */}
        <div className="lg:col-span-7">
          <div className="geo-panel p-6 space-y-5 relative">
            <div className="corner-bracket corner-tl" />
            <div className="corner-bracket corner-tr" />
            <div className="corner-bracket corner-bl" />
            <div className="corner-bracket corner-br" />
            
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[rgba(0,242,255,0.15)]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-[#080808] border border-[#00f2ff] text-[#00f2ff]">
                    {getIcon(selectedExp.iconName)}
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold font-heading text-white uppercase">
                      {selectedExp.role} <span className="text-[#00f2ff]">@ {selectedExp.company}</span>
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono-code text-[#888888] mt-0.5">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#00f2ff]" /> {selectedExp.period}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#00f2ff]" /> {selectedExp.location}</span>
                      <span className="geo-badge">
                        {selectedExp.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bullet Points */}
            <div className="space-y-2.5">
              <div className="text-[11px] font-mono-code text-[#888888] uppercase tracking-wider">
                CORE RESPONSIBILITIES & LAB DELIVERABLES:
              </div>
              <ul className="space-y-2">
                {selectedExp.description.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#cccccc] leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00f2ff] mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Domain Widget based on active internship */}
            <div className="pt-2">
              {selectedExp.id === 'indian-space-lab' && (
                <div className="bg-[#080808] border border-[rgba(0,242,255,0.25)] p-4 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono-code text-[#00f2ff] font-bold uppercase">
                      <Radio className="w-4 h-4 text-[#00f2ff] animate-pulse" />
                      <span>CubeSat & CanSat Orbital Telemetry Simulator</span>
                    </div>
                    <button
                      onClick={triggerSatellitePing}
                      className="px-2.5 py-1 bg-[#111111] hover:bg-[#00f2ff] hover:text-black border border-[#00f2ff] text-[#00f2ff] text-[10px] font-mono-code uppercase transition-all"
                    >
                      📡 Ping Telemetry
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center font-mono-code text-xs">
                    <div className="bg-[#111111] p-2 border border-[rgba(0,242,255,0.15)]">
                      <div className="text-[9px] text-[#888888] uppercase">Altitude</div>
                      <div className="font-bold text-[#00f2ff]">{satelliteTelemetry.altitude}</div>
                    </div>
                    <div className="bg-[#111111] p-2 border border-[rgba(0,242,255,0.15)]">
                      <div className="text-[9px] text-[#888888] uppercase">Orbital Velocity</div>
                      <div className="font-bold text-white">{satelliteTelemetry.velocity}</div>
                    </div>
                    <div className="bg-[#111111] p-2 border border-[rgba(0,242,255,0.15)]">
                      <div className="text-[9px] text-[#888888] uppercase">Payload Temp</div>
                      <div className="font-bold text-[#00f2ff]">{satelliteTelemetry.temp}</div>
                    </div>
                    <div className="bg-[#111111] p-2 border border-[rgba(0,242,255,0.15)]">
                      <div className="text-[9px] text-[#888888] uppercase">Link Quality</div>
                      <div className="font-bold text-white">{satelliteTelemetry.signalStrength}</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-[#888888] flex items-center justify-between font-mono-code pt-1">
                    <span>Active Stream: Remote Sensing GIS Bands (RGB + NIR)</span>
                    <span className="text-[#00f2ff]">Telemetry Synced</span>
                  </div>
                </div>
              )}

              {selectedExp.id === 'pluto-academy' && (
                <div className="bg-[#080808] border border-[rgba(0,242,255,0.25)] p-4 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono-code text-[#00f2ff] font-bold uppercase">
                      <BrainCircuit className="w-4 h-4 text-[#00f2ff]" />
                      <span>ML Model Diagnostics & Confusion Matrix</span>
                    </div>
                    <div className="flex gap-1 text-[10px] font-mono-code uppercase">
                      {(['matrix', 'roc', 'features'] as const).map(tab => (
                        <button
                          key={tab}
                          onClick={() => {
                            sound.playClick();
                            setMlMetricView(tab);
                          }}
                          className={`px-2 py-0.5 border ${
                            mlMetricView === tab 
                              ? 'bg-[#00f2ff] text-black font-bold border-[#00f2ff]' 
                              : 'text-[#888888] hover:text-white border-transparent'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  {mlMetricView === 'matrix' && (
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono-code text-center">
                      <div className="bg-[#111111] border border-[rgba(0,242,255,0.3)] p-2.5">
                        <div className="text-[9px] text-[#888888] uppercase">True Positive (TP)</div>
                        <div className="text-base font-bold text-[#00f2ff]">984 Samples</div>
                        <div className="text-[10px] text-[#888888]">Accuracy: 98.4%</div>
                      </div>
                      <div className="bg-[#111111] border border-[rgba(0,242,255,0.15)] p-2.5">
                        <div className="text-[9px] text-[#888888] uppercase">False Positive (FP)</div>
                        <div className="text-base font-bold text-rose-400">16 Samples</div>
                        <div className="text-[10px] text-[#888888]">Error Rate: 1.6%</div>
                      </div>
                    </div>
                  )}

                  {mlMetricView === 'roc' && (
                    <div className="bg-[#111111] p-3 border border-[rgba(0,242,255,0.15)] text-xs font-mono-code space-y-1.5 text-[#cccccc]">
                      <div className="flex justify-between">
                        <span>ROC-AUC Score:</span>
                        <span className="text-[#00f2ff] font-bold">0.992</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Macro F1-Score:</span>
                        <span className="text-white font-bold">0.968</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Best Model Selected:</span>
                        <span className="text-[#00f2ff] font-bold">Tuned Random Forest + Gradient Boost</span>
                      </div>
                    </div>
                  )}

                  {mlMetricView === 'features' && (
                    <div className="text-xs font-mono-code text-[#cccccc] space-y-1">
                      <div className="text-[10px] text-[#888888] uppercase">Top Weighted Normalized Features:</div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="px-2 py-0.5 bg-[#111111] text-[#00f2ff] border border-[rgba(0,242,255,0.2)]">Feature_Variance (0.34)</span>
                        <span className="px-2 py-0.5 bg-[#111111] text-white border border-[rgba(0,242,255,0.2)]">Entropy_Ratio (0.28)</span>
                        <span className="px-2 py-0.5 bg-[#111111] text-[#888888] border border-[rgba(0,242,255,0.2)]">Skewness (0.19)</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedExp.id === 'eduskill-academy' && (
                <div className="bg-[#080808] border border-[rgba(0,242,255,0.25)] p-4 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono-code text-[#00f2ff] font-bold uppercase">
                      <ShieldCheck className="w-4 h-4 text-[#00f2ff]" />
                      <span>AI Intrusion Detection System (IDS) & SIEM Live Probe</span>
                    </div>
                    <button
                      onClick={runCyberScan}
                      disabled={isScanningCyber}
                      className="px-2.5 py-1 bg-[#111111] hover:bg-[#00f2ff] hover:text-black border border-[#00f2ff] text-[#00f2ff] text-[10px] font-mono-code uppercase transition-all disabled:opacity-50"
                    >
                      {isScanningCyber ? 'Scanning...' : '🛡️ Trigger IDS Scan'}
                    </button>
                  </div>

                  <div className="bg-[#111111] p-3 border border-[rgba(0,242,255,0.15)] font-mono-code text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] uppercase">
                      <span className="text-[#888888]">SIEM Monitor State:</span>
                      <span className={isScanningCyber ? 'text-[#00f2ff] animate-pulse' : 'text-white'}>
                        {isScanningCyber ? 'ACTIVE INTRUSION SCAN' : 'OPERATIONAL'}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#cccccc] p-2 bg-[#080808] border border-[rgba(0,242,255,0.15)]">
                      {cyberScanStatus}
                    </div>
                  </div>
                </div>
              )}

              {selectedExp.id === 'bytebuddy' && (
                <div className="bg-[#080808] border border-[rgba(0,242,255,0.25)] p-4 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono-code text-[#00f2ff] font-bold uppercase">
                      <Rocket className="w-4 h-4 text-[#00f2ff]" />
                      <span>ByteBuddy Startup Mission & Architecture</span>
                    </div>
                    <a
                      href="#bytebuddy"
                      onClick={() => sound.playClick()}
                      className="text-[10px] font-mono-code text-[#00f2ff] hover:underline flex items-center gap-1 uppercase"
                    >
                      View Dedicated Hub →
                    </a>
                  </div>
                  <p className="text-xs text-[#cccccc] leading-relaxed font-mono-code">
                    Architecting AI-powered modules that simplify technology and make learning smarter, faster, and universally accessible for students across universities.
                  </p>
                </div>
              )}
            </div>

            {/* Skills Badges */}
            <div className="pt-2 border-t border-[rgba(0,242,255,0.15)] flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-mono-code text-[#888888] uppercase mr-1">TECH APPLIED:</span>
              {selectedExp.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2.5 py-0.5 bg-[#080808] text-[#00f2ff] border border-[rgba(0,242,255,0.2)] text-xs font-mono-code"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
