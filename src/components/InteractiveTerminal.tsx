import { useState, useRef, useEffect, type ReactNode, type KeyboardEvent } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Sparkles, CornerDownLeft } from 'lucide-react';
import { sound } from '../utils/audio';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, SKILL_CATEGORIES, ACHIEVEMENTS } from '../data/portfolioData';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunSimulation?: (projectId: string) => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: ReactNode;
  timestamp: string;
}

export function InteractiveTerminal({ isOpen, onClose, onRunSimulation }: InteractiveTerminalProps) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      if (history.length === 0) {
        setHistory([
          {
            id: 'welcome',
            command: 'system.init --user "guest"',
            output: (
              <div className="space-y-1 text-slate-300">
                <div className="text-cyan-400 font-bold">🚀 Devang Shinde CLI [Version 2.6.4-prod]</div>
                <div className="text-slate-400">AI-ML Engineer | Satellite Systems | Founder @ ByteBuddy</div>
                <div className="text-emerald-400 text-xs mt-1">
                  Type <span className="text-amber-300 font-bold bg-amber-950/40 px-1 py-0.5 rounded border border-amber-500/30">help</span> to view available interactive commands.
                </div>
              </div>
            ),
            timestamp: new Date().toLocaleTimeString()
          }
        ]);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    sound.playBeep(900, 0.04, 'square', 0.02);
    setCommandList(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    let outputElement: ReactNode = '';

    switch (mainCmd) {
      case 'help':
        outputElement = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs py-1">
            <div><span className="text-cyan-300 font-bold">about</span> - Brief summary & core focus</div>
            <div><span className="text-cyan-300 font-bold">experience</span> - Internships & space lab roles</div>
            <div><span className="text-cyan-300 font-bold">projects</span> - MailPilot & Face Track AI</div>
            <div><span className="text-cyan-300 font-bold">bytebuddy</span> - Details about ByteBuddy startup</div>
            <div><span className="text-cyan-300 font-bold">skills</span> - Languages, tools & AI domains</div>
            <div><span className="text-cyan-300 font-bold">achievements</span> - Competitions, research & papers</div>
            <div><span className="text-cyan-300 font-bold">contact</span> - Phone, email, GitHub, LinkedIn</div>
            <div><span className="text-cyan-300 font-bold">simulate [mailpilot|facetrack]</span> - Launch live project demo</div>
            <div><span className="text-cyan-300 font-bold">matrix</span> - Stream cyber telemetry</div>
            <div><span className="text-cyan-300 font-bold">clear</span> - Clear terminal screen</div>
          </div>
        );
        break;

      case 'about':
        outputElement = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p><span className="text-cyan-400 font-bold">{PERSONAL_INFO.name}</span> — {PERSONAL_INFO.title}</p>
            <p className="text-slate-400">{PERSONAL_INFO.summary}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2 py-0.5 bg-cyan-950/60 border border-cyan-500/40 rounded text-cyan-300">📍 {PERSONAL_INFO.location}</span>
              <span className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-500/40 rounded text-emerald-300">🚀 Founder @ ByteBuddy</span>
              <span className="px-2 py-0.5 bg-indigo-950/60 border border-indigo-500/40 rounded text-indigo-300">🛰️ CanSat / CubeSat</span>
            </div>
          </div>
        );
        break;

      case 'experience':
      case 'exp':
        outputElement = (
          <div className="space-y-3 py-1">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="border-l-2 border-cyan-500/40 pl-3 space-y-0.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                  <span className="text-cyan-300">{exp.role} @ {exp.company}</span>
                  <span className="text-slate-400 text-[10px] font-mono-code">{exp.period}</span>
                </div>
                <div className="text-[11px] text-slate-400">{exp.description[0]}</div>
                <div className="text-[10px] text-emerald-400 font-mono-code">Stack: {exp.skills.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        outputElement = (
          <div className="space-y-2 py-1">
            {PROJECTS.map((proj) => (
              <div key={proj.id} className="bg-slate-900/60 p-2 rounded border border-slate-800 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-300">{proj.title}</span>
                  <span className="text-[10px] text-cyan-400 font-mono-code">{proj.category}</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-1">{proj.tagline}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 font-mono-code">Tags: {proj.tags.join(' • ')}</div>
              </div>
            ))}
            <div className="text-[11px] text-amber-300">
              💡 Tip: Type <code className="bg-slate-800 px-1 rounded">simulate mailpilot</code> or <code className="bg-slate-800 px-1 rounded">simulate facetrack</code> to run the interactive sandboxes!
            </div>
          </div>
        );
        break;

      case 'bytebuddy':
      case 'founder':
        outputElement = (
          <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-lg text-xs space-y-2">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <span>🚀 ByteBuddy</span>
              <span className="text-[10px] px-1.5 bg-amber-500/20 rounded text-amber-200">Founder</span>
            </div>
            <p className="text-slate-300">
              Building AI-powered solutions that simplify technology and make learning smarter, faster, and more accessible.
            </p>
            <p className="text-slate-400 text-[11px]">
              A student-driven tech startup focused on turning real-world problems into practical, scalable digital solutions.
            </p>
          </div>
        );
        break;

      case 'skills':
        outputElement = (
          <div className="space-y-2 text-xs py-1">
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.title}>
                <div className="font-bold text-cyan-300 text-[11px] mb-0.5">{cat.title}:</div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <span key={s.name} className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-[11px] text-slate-200">
                      {s.name} <span className="text-emerald-400">({s.level}%)</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'achievements':
      case 'awards':
        outputElement = (
          <div className="space-y-1.5 py-1 text-xs">
            {ACHIEVEMENTS.map((ach) => (
              <div key={ach.id} className="flex items-start gap-2 bg-slate-900/40 p-1.5 rounded border border-slate-800/80">
                <span className="text-amber-400">🏆</span>
                <div>
                  <div className="font-bold text-slate-200">{ach.title}</div>
                  <div className="text-[11px] text-slate-400">{ach.organizer}</div>
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        outputElement = (
          <div className="space-y-1 text-xs text-slate-300">
            <div>📞 Phone: <span className="text-cyan-300 font-mono-code">{PERSONAL_INFO.phone}</span></div>
            <div>✉️ Email: <span className="text-cyan-300 font-mono-code">{PERSONAL_INFO.email}</span></div>
            <div>🔗 LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-indigo-400 underline">linkedin.com/in/devang-shinde</a></div>
            <div>🐙 GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-emerald-400 underline">github.com/devangshinde</a></div>
          </div>
        );
        break;

      case 'simulate':
        if (arg.includes('mailpilot') || arg.includes('mail')) {
          outputElement = <span className="text-emerald-400">⚡ Initializing MailPilot batch automation simulation sandbox...</span>;
          sound.playCyberSuccess();
          if (onRunSimulation) {
            setTimeout(() => onRunSimulation('mailpilot'), 400);
          }
        } else if (arg.includes('facetrack') || arg.includes('face')) {
          outputElement = <span className="text-emerald-400">⚡ Initializing Face Track AI computer vision recognition simulator...</span>;
          sound.playCyberSuccess();
          if (onRunSimulation) {
            setTimeout(() => onRunSimulation('facetrack-ai'), 400);
          }
        } else {
          outputElement = <span className="text-amber-400">Unknown simulation target. Try: `simulate mailpilot` or `simulate facetrack`</span>;
        }
        break;

      case 'matrix':
        outputElement = (
          <div className="font-mono-code text-emerald-400 text-[10px] space-y-0.5 animate-pulse">
            <div>[IDS_KERNEL] INTRUSION MONITOR: ONLINE | SCANNING PORTS: 22, 80, 443, 8080</div>
            <div>[ML_INFERENCE] RANDOM_FOREST_V2 CLASSIFICATION LATENCY: 4.8ms | F1: 0.987</div>
            <div>[SATELLITE_DOWNLINK] CANSAT_TELEM: ALT=420.4m | PRES=982hPa | PITCH=1.4°</div>
            <div>[NEUROMORPHIC] SPIKING SYNAPSE FIRING RATE: 142.5 Hz | POWER=0.82mW</div>
            <div>[STATUS] ALL SUBLAYERS OPERATING AT PEAK STABILITY.</div>
          </div>
        );
        sound.playLaserScan();
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      case 'whoami':
        outputElement = <span className="text-cyan-300">guest@devang-shinde-portfolio:~$ visitor</span>;
        break;

      case 'date':
        outputElement = <span className="text-slate-300">{new Date().toString()}</span>;
        break;

      default:
        outputElement = (
          <span className="text-rose-400">
            command not found: {trimmed}. Type <span className="text-amber-300 underline font-bold">help</span> for available commands.
          </span>
        );
        break;
    }

    setHistory(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        command: trimmed,
        output: outputElement,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandList.length) {
          setHistoryIndex(nextIdx);
          setInputVal(commandList[commandList.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandList[commandList.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      id="interactive-terminal-modal"
    >
      <div 
        className={`w-full bg-[#080808] border border-[#00f2ff] shadow-2xl flex flex-col transition-all duration-300 overflow-hidden relative ${
          isExpanded ? 'max-w-5xl h-[85vh]' : 'max-w-3xl h-[65vh]'
        }`}
      >
        <div className="corner-bracket corner-tl" />
        <div className="corner-bracket corner-tr" />
        <div className="corner-bracket corner-bl" />
        <div className="corner-bracket corner-br" />

        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#111111] border-b border-[rgba(0,242,255,0.2)]">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <button 
                onClick={onClose}
                className="w-2.5 h-2.5 bg-rose-500 hover:bg-rose-400 flex items-center justify-center text-[8px] text-black transition-colors"
                title="Close"
              />
              <button 
                onClick={() => setHistory([])}
                className="w-2.5 h-2.5 bg-amber-500 hover:bg-amber-400 transition-colors"
                title="Clear"
              />
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-2.5 h-2.5 bg-[#00f2ff] hover:bg-[#38f8ff] transition-colors"
                title="Maximize"
              />
            </div>
            <div className="ml-2 flex items-center gap-1.5 text-xs font-mono-code text-[#cccccc]">
              <TerminalIcon className="w-3.5 h-3.5 text-[#00f2ff]" />
              <span>DEVANG@SYSTEM:~ (CLI_v2.6)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[10px] font-mono-code px-2 py-0.5 bg-[#080808] border border-[rgba(0,242,255,0.2)] text-[#00f2ff] uppercase">
              INTERACTIVE SHELL
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#888888] hover:text-white p-1"
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="text-[#888888] hover:text-rose-400 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Command Pills */}
        <div className="px-4 py-2 bg-[#080808] border-b border-[rgba(0,242,255,0.15)] flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono-code">
          <span className="text-[#888888] flex items-center gap-1 text-[10px] uppercase">
            <Sparkles className="w-3 h-3 text-[#00f2ff]" /> QUICK:
          </span>
          {['help', 'about', 'experience', 'projects', 'bytebuddy', 'skills', 'achievements', 'contact', 'matrix'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2 py-0.5 bg-[#111111] hover:bg-[#00f2ff] hover:text-black border border-[rgba(0,242,255,0.15)] text-[#cccccc] transition-colors whitespace-nowrap uppercase text-[10px]"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Content Body */}
        <div 
          className="flex-1 p-4 overflow-y-auto font-mono-code text-xs space-y-3 bg-[#050505]"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center gap-2 text-[#888888]">
                <span className="text-[#00f2ff] font-bold">devang@shinde</span>
                <span className="text-[#666666]">:</span>
                <span className="text-white">~</span>
                <span className="text-[#888888]">$</span>
                <span className="text-white font-semibold">{item.command}</span>
                <span className="text-[10px] text-[#666666] ml-auto">{item.timestamp}</span>
              </div>
              <div className="pl-4 text-[#cccccc]">
                {item.output}
              </div>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[#00f2ff] font-bold">devang@shinde</span>
            <span className="text-[#666666]">:</span>
            <span className="text-white">~</span>
            <span className="text-[#888888]">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="TYPE 'help' OR COMMAND..."
              className="flex-1 bg-transparent text-[#00f2ff] outline-none font-mono-code text-xs placeholder:text-[#555555] uppercase"
              autoFocus
            />
            <button 
              onClick={() => handleCommand(inputVal)}
              className="p-1 text-[#888888] hover:text-[#00f2ff]"
              title="Execute"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Footer */}
        <div className="px-4 py-1.5 bg-[#111111] border-t border-[rgba(0,242,255,0.2)] text-[10px] text-[#888888] font-mono-code flex items-center justify-between uppercase">
          <span>PRESS [ESC] TO EXIT • [↑/↓] FOR HISTORY</span>
          <span className="text-[#00f2ff]">DEVANG SHINDE PORTFOLIO CLI</span>
        </div>
      </div>
    </div>
  );
}
