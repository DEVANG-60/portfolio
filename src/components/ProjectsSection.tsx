import { useState, useRef, useEffect } from 'react';
import { Mail, ScanFace, Sparkles, Cpu, Play, CheckCircle2, ArrowUpRight, FileSpreadsheet, Send, RefreshCw, Camera, UserCheck, ShieldCheck, Download, AlertCircle } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { sound } from '../utils/audio';

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'mailpilot' | 'facetrack' | 'bytebuddy' | 'neuromorphic'>('all');
  const [openSimulatorId, setOpenSimulatorId] = useState<string | null>(null);

  // MailPilot Simulator State
  const [mailPilotProgress, setMailPilotProgress] = useState(0);
  const [isSendingMails, setIsSendingMails] = useState(false);
  const [mailLogs, setMailLogs] = useState<Array<{ id: string; name: string; email: string; file: string; status: 'Ready' | 'Sending' | 'Delivered' | 'Matched' }>>([
    { id: 'STU-101', name: 'Aarav Patel', email: 'aarav.patel@tkiet.ac.in', file: 'Certificate_STU101.pdf', status: 'Ready' },
    { id: 'STU-102', name: 'Sneha Sharma', email: 'sneha.sharma@gmail.com', file: 'GradeSheet_STU102.pdf', status: 'Ready' },
    { id: 'STU-103', name: 'Rohan Deshmukh', email: 'rohan.d@campus.edu', file: 'Internship_STU103.pdf', status: 'Ready' },
    { id: 'STU-104', name: 'Ananya Verma', email: 'ananya.v@tech.io', file: 'Award_STU104.pdf', status: 'Ready' },
    { id: 'STU-105', name: 'Vikram Singh', email: 'vikram.s@univ.edu', file: 'Report_STU105.pdf', status: 'Ready' }
  ]);

  // Face Track AI Simulator State
  const [isScanningFace, setIsScanningFace] = useState(false);
  const [detectedStudent, setDetectedStudent] = useState<{ id: string; name: string; matchScore: number; status: string } | null>({
    id: 'DS-2026',
    name: 'Devang Shinde',
    matchScore: 99.4,
    status: 'Verified Present'
  });
  const [attendanceLedger, setAttendanceLedger] = useState<Array<{ time: string; name: string; id: string; status: string; score: string }>>([
    { time: '09:00:14 AM', name: 'Devang Shinde', id: 'DS-2026', status: 'Present', score: '99.4%' },
    { time: '09:01:22 AM', name: 'Priya Kulkarni', id: 'STU-084', status: 'Present', score: '98.8%' },
    { time: '09:02:40 AM', name: 'Rahul Joshi', id: 'STU-112', status: 'Present', score: '97.6%' }
  ]);

  // Real webcam feed ref if user enables
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [useLiveCamera, setUseLiveCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const startMailPilotDispatch = () => {
    sound.playClick();
    setIsSendingMails(true);
    setMailPilotProgress(5);
    
    // Simulate batch dispatch
    const updated = [...mailLogs];
    let step = 0;
    
    const interval = setInterval(() => {
      if (step < updated.length) {
        updated[step] = { ...updated[step], status: 'Delivered' };
        setMailLogs([...updated]);
        setMailPilotProgress(Math.round(((step + 1) / updated.length) * 100));
        sound.playBeep(800 + step * 100, 0.05, 'triangle', 0.03);
        step++;
      } else {
        clearInterval(interval);
        setIsSendingMails(false);
        sound.playCyberSuccess();
      }
    }, 600);
  };

  const resetMailPilot = () => {
    sound.playClick();
    setMailPilotProgress(0);
    setIsSendingMails(false);
    setMailLogs(prev => prev.map(m => ({ ...m, status: 'Ready' })));
  };

  const triggerFaceRecognitionScan = () => {
    sound.playLaserScan();
    setIsScanningFace(true);
    setDetectedStudent(null);

    const candidates = [
      { id: 'DS-2026', name: 'Devang Shinde', matchScore: 99.4, status: 'Verified Present' },
      { id: 'STU-204', name: 'Aditi Nair', matchScore: 98.7, status: 'Verified Present' },
      { id: 'STU-309', name: 'Kunal Patil', matchScore: 97.9, status: 'Verified Present' }
    ];

    setTimeout(() => {
      const selected = candidates[Math.floor(Math.random() * candidates.length)];
      setDetectedStudent(selected);
      setIsScanningFace(false);
      sound.playCyberSuccess();

      // Add to attendance log
      const now = new Date().toLocaleTimeString();
      setAttendanceLedger(prev => [
        { time: now, name: selected.name, id: selected.id, status: 'Present', score: `${selected.matchScore}%` },
        ...prev.slice(0, 4)
      ]);
    }, 1200);
  };

  const toggleWebcam = async () => {
    sound.playClick();
    if (!useLiveCamera) {
      try {
        setCameraError(null);
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setUseLiveCamera(true);
      } catch (err) {
        setCameraError('Camera access not granted or not available in iframe. Using neural simulation mode.');
        setUseLiveCamera(false);
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setUseLiveCamera(false);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup video stream on unmount
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const getProjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mail': return <Mail className="w-5 h-5" />;
      case 'ScanFace': return <ScanFace className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const filteredProjects = activeTab === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.id === activeTab || (activeTab === 'mailpilot' && p.id === 'mailpilot') || (activeTab === 'facetrack' && p.id === 'facetrack-ai'));

  return (
    <section id="projects" className="py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="mb-8 space-y-2">
        <div className="section-label">
          PROJECTS // ARCHITECTURAL PORTFOLIO
        </div>
        <h2 className="text-2xl sm:text-4xl font-black font-heading text-white tracking-tight uppercase">
          Intelligent Automation & <span className="text-[#00f2ff]">Computer Vision</span>
        </h2>
        <p className="text-[#888888] text-xs sm:text-sm max-w-3xl leading-relaxed">
          Production-grade systems built to eliminate manual bottlenecks, featuring bulk document-matching email dispatch and high-precision biometric vision verification.
        </p>

        {/* Filter Pills in Geometric Style */}
        <div className="flex flex-wrap items-center gap-1.5 pt-3">
          {[
            { id: 'all', label: 'ALL PROJECTS' },
            { id: 'mailpilot', label: 'MAILPILOT [DISPATCH ENGINE]' },
            { id: 'facetrack', label: 'FACE TRACK AI [VISION]' },
            { id: 'bytebuddy-hub', label: 'BYTEBUDDY ECOSYSTEM' },
            { id: 'neuromorphic-gis', label: 'NEUROMORPHIC GIS' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(tab.id as any);
              }}
              className={`px-3 py-1 text-xs font-mono-code uppercase transition-all ${
                activeTab === tab.id
                  ? 'bg-[#00f2ff] text-black font-bold'
                  : 'bg-[#111111] text-[#888888] hover:text-[#00f2ff] border border-[rgba(0,242,255,0.15)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            id={`project-card-${project.id}`}
            className="geo-panel p-6 flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="corner-bracket corner-tl" />
            <div className="corner-bracket corner-tr" />
            <div className="corner-bracket corner-bl" />
            <div className="corner-bracket corner-br" />

            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#080808] border border-[#00f2ff] text-[#00f2ff]">
                    {getProjectIcon(project.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-heading text-white group-hover:text-[#00f2ff] transition-colors flex items-center gap-2 uppercase">
                      {project.title}
                      {project.featured && (
                        <span className="geo-badge">
                          FEATURED
                        </span>
                      )}
                    </h3>
                    <span className="text-[11px] font-mono-code text-[#00f2ff]">
                      {project.category}
                    </span>
                  </div>
                </div>

                {project.liveDemoAvailable && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      setOpenSimulatorId(openSimulatorId === project.id ? null : project.id);
                    }}
                    className="px-3 py-1.5 bg-[#111111] hover:bg-[#00f2ff] hover:text-black border border-[#00f2ff] text-[#00f2ff] text-xs font-mono-code flex items-center gap-1.5 transition-all uppercase font-bold"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{openSimulatorId === project.id ? 'CLOSE DEMO' : 'LIVE DEMO'}</span>
                  </button>
                )}
              </div>

              {/* Tagline & Description */}
              <p className="text-xs sm:text-sm font-semibold text-white">
                {project.tagline}
              </p>

              <div className="space-y-1.5 text-xs text-[#888888] leading-relaxed">
                {project.description.map((desc, dIdx) => (
                  <p key={dIdx}>{desc}</p>
                ))}
              </div>

              {/* Highlights */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] font-mono-code text-[#888888] uppercase tracking-wider">
                  KEY ARCHITECTURAL HIGHLIGHTS:
                </div>
                <ul className="space-y-1">
                  {project.highlights.slice(0, 3).map((hl, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 text-xs text-[#cccccc]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00f2ff] mt-0.5 flex-shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                {project.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="p-2 bg-[#080808] border border-[rgba(0,242,255,0.15)]">
                    <div className="text-[9px] text-[#888888] font-mono-code uppercase">{m.label}</div>
                    <div className="text-xs sm:text-sm font-bold font-mono-code text-[#00f2ff]">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Tags */}
            <div className="mt-5 pt-3 border-t border-[rgba(0,242,255,0.15)] flex flex-wrap items-center gap-1.5">
              {project.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2 py-0.5 text-[10px] font-mono-code bg-[#080808] text-[#888888] border border-white/[0.08] uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Inline Interactive Simulator for MailPilot */}
            {openSimulatorId === project.id && project.id === 'mailpilot' && (
              <div className="mt-4 p-4 bg-[#080808] border border-[#00f2ff] space-y-3 animate-in fade-in duration-200 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono-code text-[#00f2ff] font-bold uppercase">
                    <FileSpreadsheet className="w-4 h-4 text-[#00f2ff]" />
                    <span>MailPilot Automated Batch Dispatch Engine</span>
                  </div>
                  <span className="text-[10px] font-mono-code text-[#888888]">5 RECORDS LOADED</span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono-code text-[#cccccc]">
                    <span>DISPATCH PROGRESS:</span>
                    <span className="text-[#00f2ff] font-bold">{mailPilotProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#111111] overflow-hidden">
                    <div 
                      className="h-full bg-[#00f2ff] transition-all duration-300"
                      style={{ width: `${mailPilotProgress}%` }}
                    />
                  </div>
                </div>

                {/* Simulated Records Table */}
                <div className="max-h-40 overflow-y-auto space-y-1 font-mono-code text-[11px]">
                  {mailLogs.map((row) => (
                    <div 
                      key={row.id} 
                      className="flex items-center justify-between p-2 bg-[#111111] border border-[rgba(0,242,255,0.15)] text-[#cccccc]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[#00f2ff]">{row.id}</span>
                        <span className="text-white font-semibold">{row.name}</span>
                        <span className="text-[#888888] text-[10px] hidden sm:inline">({row.file})</span>
                      </div>
                      <span className={`text-[9px] px-2 py-0.5 uppercase font-bold ${
                        row.status === 'Delivered' 
                          ? 'bg-[#00f2ff] text-black' 
                          : 'bg-[#080808] text-[#888888] border border-[rgba(0,242,255,0.15)]'
                      }`}>
                        {row.status === 'Delivered' ? '✓ DISPATCHED' : 'READY'}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Simulator Controls */}
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={resetMailPilot}
                    className="px-3 py-1 bg-[#111111] hover:bg-white/[0.05] border border-[rgba(0,242,255,0.2)] text-xs font-mono-code text-[#888888] flex items-center gap-1 uppercase"
                  >
                    <RefreshCw className="w-3 h-3" /> RESET
                  </button>
                  <button
                    onClick={startMailPilotDispatch}
                    disabled={isSendingMails || mailPilotProgress === 100}
                    className="px-4 py-1.5 bg-[#00f2ff] hover:bg-[#38f8ff] disabled:opacity-50 text-black font-black text-xs font-mono-code flex items-center gap-1.5 uppercase shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isSendingMails ? 'DISPATCHING...' : mailPilotProgress === 100 ? 'COMPLETE' : 'RUN BATCH SEND'}
                  </button>
                </div>
              </div>
            )}

            {/* Inline Interactive Simulator for Face Track AI */}
            {openSimulatorId === project.id && project.id === 'facetrack-ai' && (
              <div className="mt-4 p-4 bg-[#080808] border border-[#00f2ff] space-y-3 animate-in fade-in duration-200 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono-code text-[#00f2ff] font-bold uppercase">
                    <ScanFace className="w-4 h-4 text-[#00f2ff]" />
                    <span>Face Track AI Real-Time Vision Pipeline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleWebcam}
                      className="px-2 py-1 bg-[#111111] hover:bg-white/[0.05] border border-[rgba(0,242,255,0.2)] text-[10px] font-mono-code text-white flex items-center gap-1 uppercase"
                    >
                      <Camera className="w-3 h-3 text-[#00f2ff]" />
                      {useLiveCamera ? 'DISABLE WEBCAM' : 'TEST REAL WEBCAM'}
                    </button>
                  </div>
                </div>

                {cameraError && (
                  <div className="p-2 bg-[#111111] border border-amber-500/40 text-[10px] text-amber-300 flex items-center gap-1.5 font-mono-code">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{cameraError}</span>
                  </div>
                )}

                {/* Simulated / Live Camera Viewport */}
                <div className="relative w-full h-44 bg-[#050505] border border-[rgba(0,242,255,0.2)] flex items-center justify-center overflow-hidden">
                  {useLiveCamera ? (
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-[#888888] space-y-2">
                      <div className="w-16 h-16 border border-[#00f2ff] flex items-center justify-center relative">
                        <ScanFace className="w-8 h-8 text-[#00f2ff]" />
                        {isScanningFace && (
                          <div className="absolute inset-0 border border-[#00f2ff] animate-ping" />
                        )}
                      </div>
                      <span className="text-[10px] font-mono-code text-[#888888] uppercase">
                        {isScanningFace ? 'EXTRACTING 128-D EMBEDDINGS...' : 'STANDBY MODE'}
                      </span>
                    </div>
                  )}

                  {/* Recognition overlay box */}
                  <div className="absolute inset-4 border border-[rgba(0,242,255,0.4)] pointer-events-none flex flex-col justify-between p-2">
                    <div className="flex justify-between text-[9px] font-mono-code text-[#00f2ff]">
                      <span>[AI_VISION_TRACKER]</span>
                      <span>FPS: 30.2 | RES: 1080p</span>
                    </div>
                    {detectedStudent && !isScanningFace && (
                      <div className="self-center bg-[#080808] border border-[#00f2ff] px-2.5 py-1 text-[10px] font-mono-code text-[#00f2ff] uppercase">
                        ✓ {detectedStudent.name} ({detectedStudent.id}) • MATCH: {detectedStudent.matchScore}%
                      </div>
                    )}
                  </div>
                </div>

                {/* Detection Controls & Attendance Ledger */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono-code text-[#888888] uppercase">ATTENDANCE LEDGER:</span>
                    <button
                      onClick={triggerFaceRecognitionScan}
                      disabled={isScanningFace}
                      className="px-3 py-1 bg-[#00f2ff] hover:bg-[#38f8ff] text-black font-bold text-xs font-mono-code flex items-center gap-1.5 uppercase transition-all disabled:opacity-50"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      {isScanningFace ? 'RECOGNIZING...' : 'SCAN & LOG'}
                    </button>
                  </div>

                  <div className="space-y-1 max-h-28 overflow-y-auto font-mono-code text-[10px]">
                    {attendanceLedger.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-1.5 bg-[#111111] border border-[rgba(0,242,255,0.15)] text-[#cccccc]">
                        <span className="text-[#888888]">{item.time}</span>
                        <span className="text-white font-semibold">{item.name} ({item.id})</span>
                        <span className="text-[#00f2ff] font-bold">{item.status} ({item.score})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
