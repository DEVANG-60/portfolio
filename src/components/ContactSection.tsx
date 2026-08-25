import { useState, type FormEvent } from 'react';
import { Mail, Phone, Linkedin, Github, Send, Copy, Check, Sparkles, MessageSquare, Terminal, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface ContactSectionProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export function ContactSection({ onOpenTerminal, onOpenResume }: ContactSectionProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const copyToClipboard = (text: string, field: string) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sound.playLaserScan();
    setIsSending(true);

    setTimeout(() => {
      sound.playCyberSuccess();
      setIsSending(false);
      setSendSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSendSuccess(false), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="mb-8 space-y-2">
        <div className="section-label">
          TRANSMISSION // DIRECT COMMUNICATIONS
        </div>
        <h2 className="text-2xl sm:text-4xl font-black font-heading text-white tracking-tight uppercase">
          Let's Build the <span className="text-[#00f2ff]">Next Solution</span>
        </h2>
        <p className="text-[#888888] text-xs sm:text-sm max-w-3xl leading-relaxed">
          Open for software engineering opportunities, AI-ML research initiatives, ByteBuddy collaborations, and technical paper speaking invitations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Direct Info Cards */}
        <div className="lg:col-span-5 space-y-3.5">
          
          {/* Email Card */}
          <div className="geo-panel p-4 flex items-center justify-between group transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#080808] text-[#00f2ff] border border-[rgba(0,242,255,0.2)]">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono-code text-[#888888] uppercase">DIRECT EMAIL</div>
                <a 
                  href={`mailto:${PERSONAL_INFO.email}`} 
                  className="text-xs sm:text-sm font-bold font-mono-code text-white hover:text-[#00f2ff] transition-colors"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
              className="p-2 bg-[#080808] border border-[rgba(0,242,255,0.15)] text-[#888888] hover:text-[#00f2ff] transition-colors"
              title="Copy Email"
            >
              {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-[#00f2ff]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Phone Card */}
          <div className="geo-panel p-4 flex items-center justify-between group transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#080808] text-[#00f2ff] border border-[rgba(0,242,255,0.2)]">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono-code text-[#888888] uppercase">MOBILE // WHATSAPP</div>
                <a 
                  href={`tel:${PERSONAL_INFO.phone}`} 
                  className="text-xs sm:text-sm font-bold font-mono-code text-white hover:text-[#00f2ff] transition-colors"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
              className="p-2 bg-[#080808] border border-[rgba(0,242,255,0.15)] text-[#888888] hover:text-[#00f2ff] transition-colors"
              title="Copy Phone"
            >
              {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-[#00f2ff]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Location & Links */}
          <div className="geo-panel p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono-code text-[#888888]">
              <MapPin className="w-3.5 h-3.5 text-[#00f2ff]" />
              <span>LOCATION: <strong className="text-white uppercase">India (Open to Remote & Global Work)</strong></span>
            </div>

            <div className="pt-2.5 border-t border-[rgba(0,242,255,0.15)] flex items-center justify-between">
              <span className="text-[10px] font-mono-code text-[#888888] uppercase">PROFILES:</span>
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-[#080808] border border-[rgba(0,242,255,0.2)] text-xs font-mono-code text-[#00f2ff] hover:bg-[#00f2ff] hover:text-black transition-colors uppercase"
                >
                  <Linkedin className="w-3.5 h-3.5" /> LINKEDIN
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-[#080808] border border-[rgba(0,242,255,0.2)] text-xs font-mono-code text-white hover:bg-[#00f2ff] hover:text-black transition-colors uppercase"
                >
                  <Github className="w-3.5 h-3.5" /> GITHUB
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Dispatch Console */}
        <div className="lg:col-span-7">
          <div className="geo-panel p-6 sm:p-7 relative space-y-4">
            <div className="corner-bracket corner-tl" />
            <div className="corner-bracket corner-tr" />
            <div className="corner-bracket corner-bl" />
            <div className="corner-bracket corner-br" />

            <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(0,242,255,0.15)]">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00f2ff]" />
                <span className="text-xs font-mono-code text-white font-bold uppercase">
                  DIRECT DISPATCH CONSOLE
                </span>
              </div>
              <span className="geo-badge">
                SECURE STREAM
              </span>
            </div>

            {sendSuccess && (
              <div className="p-3 bg-[#080808] border border-[#00f2ff] text-xs font-mono-code text-[#00f2ff] flex items-center gap-2 uppercase">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>Message queued successfully! Devang Shinde will respond promptly to your email.</span>
              </div>
            )}

            <form onSubmit={handleSendMessage} className="space-y-3 font-mono-code text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-[#888888] uppercase">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Rajesh Rao"
                    className="w-full px-3 py-2 bg-[#080808] border border-[rgba(0,242,255,0.2)] text-white placeholder:text-[#555555] focus:outline-none focus:border-[#00f2ff] transition-colors uppercase"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-[#888888] uppercase">YOUR EMAIL *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. rajesh@lab.org"
                    className="w-full px-3 py-2 bg-[#080808] border border-[rgba(0,242,255,0.2)] text-white placeholder:text-[#555555] focus:outline-none focus:border-[#00f2ff] transition-colors uppercase"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#888888] uppercase">SUBJECT / TOPIC</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. AI-ML Collaboration / ByteBuddy / Speaking"
                  className="w-full px-3 py-2 bg-[#080808] border border-[rgba(0,242,255,0.2)] text-white placeholder:text-[#555555] focus:outline-none focus:border-[#00f2ff] transition-colors uppercase"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#888888] uppercase">MESSAGE *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="ENTER PROJECT SPECIFICATIONS OR OPPORTUNITY DETAILS..."
                  className="w-full px-3 py-2 bg-[#080808] border border-[rgba(0,242,255,0.2)] text-white placeholder:text-[#555555] focus:outline-none focus:border-[#00f2ff] transition-colors resize-none uppercase"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={onOpenTerminal}
                  className="text-[#888888] hover:text-[#00f2ff] text-[10px] uppercase flex items-center gap-1 font-mono-code"
                >
                  <Terminal className="w-3 h-3" /> OR SEND VIA CLI TERMINAL
                </button>

                <button
                  type="submit"
                  disabled={isSending}
                  className="px-5 py-2 bg-[#00f2ff] text-black font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#38f8ff] transition-colors disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSending ? 'TRANSMITTING...' : 'DISPATCH MESSAGE'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Strip */}
      <footer className="mt-16 pt-6 border-t border-[rgba(0,242,255,0.15)] text-center text-xs font-mono-code text-[#888888] flex flex-col sm:flex-row items-center justify-between gap-4 uppercase">
        <div>
          © {new Date().getFullYear()} <span className="text-white font-semibold">{PERSONAL_INFO.name}</span>. ALL SYSTEMS NOMINAL.
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span className="text-[#00f2ff]">FOUNDER @ BYTEBUDDY</span>
          <span>•</span>
          <span className="text-white">AI-ML & SPACE TECH</span>
          <span>•</span>
          <span className="text-[#00f2ff]">30+ PAPER PRESENTATIONS</span>
        </div>
      </footer>
    </section>
  );
}
