import { useEffect, useRef, useState, useCallback } from 'react';
import { ParticleNode } from '../types';

interface ParticleCanvasProps {
  mode?: 'neural' | 'space' | 'cyber' | 'constellation';
  onModeChange?: (mode: 'neural' | 'space' | 'cyber' | 'constellation') => void;
}

export function ParticleCanvas({ mode = 'neural', onModeChange }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });
  const [currentMode, setCurrentMode] = useState<'neural' | 'space' | 'cyber' | 'constellation'>(mode);
  const [particleCount, setParticleCount] = useState<number>(65);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<ParticleNode[]>([]);

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  const initParticles = useCallback((width: number, height: number, modeType: string, count: number) => {
    const particles: ParticleNode[] = [];
    const colorsByMode = {
      neural: ['#38bdf8', '#818cf8', '#34d399', '#67e8f9'],
      space: ['#ffffff', '#38bdf8', '#fbbf24', '#c084fc'],
      cyber: ['#10b981', '#06b6d4', '#f43f5e', '#a855f7'],
      constellation: ['#93c5fd', '#c4b5fd', '#e0e7ff', '#67e8f9']
    };

    const colorPalette = colorsByMode[modeType as keyof typeof colorsByMode] || colorsByMode.neural;

    for (let i = 0; i < count; i++) {
      const baseRadius = modeType === 'space' 
        ? Math.random() * 2.5 + 0.8 
        : modeType === 'neural' 
        ? Math.random() * 2.2 + 1.2 
        : Math.random() * 2.0 + 1.0;

      const speedFactor = modeType === 'space' ? 0.4 : modeType === 'cyber' ? 0.8 : 0.5;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speedFactor * 1.5,
        vy: (Math.random() - 0.5) * speedFactor * 1.5,
        radius: baseRadius,
        baseRadius: baseRadius,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        type: i % 8 === 0 ? 'satellite' : i % 5 === 0 ? 'neuron' : 'star'
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles(width, height, currentMode, particleCount);
    };

    window.addEventListener('resize', handleResize);
    initParticles(width, height, currentMode, particleCount);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    const handleMouseLeave = () => {
      mousePos.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      if (!isPaused) {
        time += 0.02;
        ctx.clearRect(0, 0, width, height);

        const particles = particlesRef.current;
        const connectDistance = currentMode === 'neural' ? 140 : currentMode === 'space' ? 100 : 120;
        const mouseRadius = 140;

        // Draw connecting lines / mesh
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];

          // Update position
          p1.x += p1.vx;
          p1.y += p1.vy;

          // Pulse radius
          p1.radius = p1.baseRadius + Math.sin(p1.pulsePhase + time) * 0.5;

          // Wrap edges
          if (p1.x < -20) p1.x = width + 20;
          if (p1.x > width + 20) p1.x = -20;
          if (p1.y < -20) p1.y = height + 20;
          if (p1.y > height + 20) p1.y = -20;

          // Mouse interaction (gentle repulsion / magnetic attraction)
          if (mousePos.current.active) {
            const dx = mousePos.current.x - p1.x;
            const dy = mousePos.current.y - p1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseRadius && dist > 0) {
              const force = (mouseRadius - dist) / mouseRadius;
              // Repulse slightly
              p1.x -= (dx / dist) * force * 2.5;
              p1.y -= (dy / dist) * force * 2.5;

              // Draw line to mouse
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(mousePos.current.x, mousePos.current.y);
              ctx.strokeStyle = currentMode === 'cyber' ? `rgba(16, 185, 129, ${force * 0.4})` : `rgba(56, 189, 248, ${force * 0.4})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }

          // Check pairs
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectDistance) {
              const alpha = (1 - dist / connectDistance) * 0.22;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              
              if (currentMode === 'neural') {
                ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
              } else if (currentMode === 'space') {
                ctx.strokeStyle = `rgba(147, 197, 253, ${alpha * 0.7})`;
              } else if (currentMode === 'cyber') {
                ctx.strokeStyle = `rgba(16, 185, 129, ${alpha * 1.2})`;
              } else {
                ctx.strokeStyle = `rgba(196, 181, 253, ${alpha * 0.9})`;
              }
              
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }

          // Draw node
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, Math.max(0.5, p1.radius), 0, Math.PI * 2);
          ctx.fillStyle = p1.color;
          ctx.fill();

          // Satellite / Special Node Glow
          if (p1.type === 'satellite' && currentMode === 'space') {
            ctx.beginPath();
            ctx.arc(p1.x, p1.y, p1.radius * 2.8, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(251, 191, 36, 0.15)';
            ctx.fill();
            // Satellite orbit ring
            ctx.beginPath();
            ctx.arc(p1.x, p1.y, p1.radius * 4, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(251, 191, 36, 0.25)';
            ctx.lineWidth = 0.6;
            ctx.stroke();
          } else if (p1.type === 'neuron' && currentMode === 'neural') {
            ctx.beginPath();
            ctx.arc(p1.x, p1.y, p1.radius * 2.4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
            ctx.fill();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentMode, particleCount, isPaused, initParticles]);

  const switchMode = (newMode: 'neural' | 'space' | 'cyber' | 'constellation') => {
    setCurrentMode(newMode);
    if (onModeChange) onModeChange(newMode);
    if (canvasRef.current) {
      initParticles(canvasRef.current.width, canvasRef.current.height, newMode, particleCount);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" id="particle-canvas-container">
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-75"
        style={{ pointerEvents: 'auto' }}
      />

      {/* Floating Canvas Mode Selector in bottom left for dynamic interactivity */}
      <div 
        className="fixed bottom-4 left-4 z-20 pointer-events-auto bg-[#0b1120]/80 backdrop-blur-md border border-slate-800/80 rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-xl text-xs"
        id="particle-mode-selector"
      >
        <span className="text-[11px] font-mono-code text-slate-400 pl-1 pr-1 hidden sm:inline">
          FX Mode:
        </span>
        {(['neural', 'space', 'cyber', 'constellation'] as const).map((m) => (
          <button
            key={m}
            id={`canvas-mode-${m}-btn`}
            onClick={() => switchMode(m)}
            className={`px-2.5 py-1 rounded-full capitalize text-[11px] font-medium transition-all ${
              currentMode === m
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {m === 'neural' ? '🧠 Neural' : m === 'space' ? '🛰️ Space' : m === 'cyber' ? '🛡️ Cyber' : '✨ Constellation'}
          </button>
        ))}
      </div>
    </div>
  );
}
