'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Zap,
  Target,
  Activity,
  Search,
  Copy,
  Send,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  ChevronDown,
  Database,
  ScanEye,
  Infinity as InfinityIcon,
  ShieldHalf,
  Cpu,
  Lock
} from 'lucide-react';
import Link from 'next/link';
import ScanModal from '../components/ScanModal';

interface ScrambleProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}

const ScrambleText = ({ text, delay = 0, className = "" }: ScrambleProps) => {
  const [displayText, setDisplayText] = useState('');
  const characters = 'abcdefghijklmnopqrstuvxyzwxy#%&-+_?\/\\='.split('');
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: "0px 0px 200px 0px" });

  useEffect(() => {
    let isMounted = true;
    if (isInView) {
      const resolve = async () => {
        if (delay > 0) await new Promise(r => setTimeout(r, delay));
        for (let offset = 0; offset <= text.length; offset++) {
          if (!isMounted) return;
          const partialString = text.substring(0, offset);
          for (let iteration = 10; iteration >= 0; iteration--) {
            if (!isMounted) return;
            await new Promise(r => setTimeout(r, 6));
            if (iteration === 0) {
              setDisplayText(partialString);
            } else if (partialString.length > 0) {
              const randomChar = characters[Math.floor(Math.random() * characters.length)];
              setDisplayText(partialString.substring(0, partialString.length - 1) + randomChar);
            }
          }
        }
      };
      resolve();
    } else {
      setDisplayText('');
    }
    return () => { isMounted = false; };
  }, [isInView, text, delay]);

  return <span ref={ref} className={`font-mono ${className}`}>{displayText}</span>;
}

export default function AezosLanding() {
  const [currentColor, setCurrentColor] = useState('gold');
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('analyze');
  const [showScanModal, setShowScanModal] = useState(false);

  const { scrollYProgress } = useScroll();

  // High-end parallax for the landing intro
  const yHeroLogo = useTransform(scrollYProgress, [0, 0.2], [0, -80]);
  const opacityHeroPortal = useTransform(scrollYProgress, [0, 0.1, 0.25], [0, 0, 1]);
  const yHeroPortal = useTransform(scrollYProgress, [0, 0.25], [100, 0]);
  const scaleHeroLogo = useTransform(scrollYProgress, [0, 0.2], [1, 0.75]);

  const ySection1 = useTransform(scrollYProgress, [0.1, 0.4], [150, 0]);
  const ySection2 = useTransform(scrollYProgress, [0.4, 0.7], [150, 0]);

  useEffect(() => {
    const colors = ['gold', 'red', 'green'];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % colors.length;
      setCurrentColor(colors[i]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAnalyze = () => {
    if (!query.trim()) return;
    setIsAnalyzed(true);
    setTimeout(() => setIsAnalyzed(false), 2000);
  };

  return (
    <div className="relative w-full bg-[#020204] text-white selection:bg-gold selection:text-black overflow-y-visible">

      {/* Background FX - Divine & Minimal */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-mesh opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="pulse-ring w-[400px] h-[400px] animate-ring-colors" style={{ animationDelay: '0s' }} />
          <div className="pulse-ring w-[750px] h-[750px] animate-ring-colors" style={{ animationDelay: '2s' }} />
          <div className="pulse-ring w-[1100px] h-[1100px] animate-ring-colors" style={{ animationDelay: '4s' }} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-3xl bg-black/40">
        <div className="max-w-7xl mx-auto px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/aegis-logo.png" className="h-8 w-auto" alt="Logo" />
            <span className="font-black text-lg tracking-[-0.05em] text-gold uppercase">AEZOS</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
            <a href="#how-it-works" className="hover:text-gold transition-colors">Protocol</a>
            <a href="#ledger" className="hover:text-gold transition-colors">Lightning Ledger</a>
            <a href="#defense" className="hover:text-gold transition-colors">Shielding</a>
            <button className="px-8 py-2.5 bg-white text-black rounded-full hover:bg-gold transition-all hover:scale-105 active:scale-95 text-[9px] font-black shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              INIT_SYNC
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10">
        {/* HERO SECTION - Initial Focus on Logo ONLY */}
        <header className="relative min-h-screen flex flex-col items-center justify-center pt-20">
          <motion.div
            style={{ y: yHeroLogo, scale: scaleHeroLogo }}
            className="flex flex-col items-center text-center w-full px-6"
          >
            {/* Core Logo Branding - Original Size 500x500 for Sharpness */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: "circOut" }}
              className="relative group"
            >
              <div className={`absolute -inset-40 blur-[150px] opacity-10 transition-colors duration-1000 
                        ${currentColor === 'gold' ? 'bg-gold' : currentColor === 'red' ? 'bg-red' : 'bg-green'}`}
              />
              <img
                src="/aegis-logo.png"
                alt="AEZOS"
                width={500}
                height={500}
                className="w-[300px] md:w-[500px] h-auto relative z-10 animate-glow-cycle"
              />

              {/* Minimal status text below logo - visible only when not scrolled */}
              <motion.div
                style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
                className="mt-12 flex flex-col items-center gap-4"
              >
                <span className="text-[11px] font-black text-gold tracking-[0.8em] uppercase">
                  <ScrambleText text="SYSTEM READY" delay={100} />
                </span>
                <div className="mt-4 flex justify-between text-[8px] font-black text-white tracking-[0.3em]">
                  <span><ScrambleText text="SYNC ESTABLISHED" delay={200} /></span>
                  <span><ScrambleText text="DIVINE ORIGIN" delay={300} /></span>
                </div>
                <div className="animate-bounce">
                  <ChevronDown size={16} className="text-white/10" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Hidden Portal until Scroll */}
          <motion.div
            style={{ opacity: opacityHeroPortal, y: yHeroPortal }}
            className="w-full max-w-2xl px-6 absolute top-[60%] flex flex-col items-center"
          >
            <div className="w-full glass-dark rounded-[2.5rem] overflow-hidden border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.9)]">
              {/* Tabs */}
              <div className="flex border-b border-white/5 bg-white/2">
                <button
                  onClick={() => setActiveTab('analyze')}
                  className={`flex-1 py-4 text-[9px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3 transition-all
                            ${activeTab === 'analyze' ? 'bg-white/5 text-gold border-b border-gold' : 'text-white/20 hover:text-white/40'}`}
                >
                  <ScanEye size={12} /> <ScrambleText text="Analysis" />
                </button>
                <button
                  onClick={() => setActiveTab('ask')}
                  className={`flex-1 py-4 text-[9px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3 transition-all
                            ${activeTab === 'ask' ? 'bg-white/5 text-gold border-b border-gold' : 'text-white/20 hover:text-white/40'}`}
                >
                  <MessageSquare size={12} /> <ScrambleText text="Ask Zeus" />
                </button>
              </div>

              <div className="p-8">
                {activeTab === 'analyze' ? (
                  <div className="relative group">
                    <div className="absolute top-4 right-4 text-white/10 group-hover:text-gold/20 transition-colors cursor-pointer">
                      <Copy size={18} />
                    </div>
                    <textarea
                      placeholder="INPUT_PAYLOAD_FOR_DIVINE_SCANNING..."
                      className="w-full h-32 bg-transparent border-none outline-none text-white font-mono text-xs leading-relaxed placeholder:text-white/5 resize-none scrollbar-hide"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="mt-6 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <span className="text-[9px] font-black text-white/80 uppercase tracking-[0.4em] flex items-center gap-2 group-hover:text-green transition-colors text-glow-green">
                          <ShieldCheck size={12} className="text-green/80" /> <ScrambleText text="AEGIS ACTIVE" delay={500} />
                        </span>
                      </div>
                      <button
                        onClick={() => setShowScanModal(true)}
                        className="px-8 py-3.5 bg-gold text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-xl hover:bg-white hover:scale-105 transition-all shadow-xl active:scale-95"
                      >
                        Execute Scan
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="flex gap-4 items-center">
                      <input
                        type="text"
                        placeholder="QUERY_AEZOS_DATABASE..."
                        className="flex-1 bg-white/5 rounded-xl px-6 py-4 border border-white/5 outline-none text-xs font-bold placeholder:text-white/5"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      <button className="p-4 bg-white text-black rounded-xl hover:bg-gold transition-all">
                        <Send size={16} />
                      </button>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {['SECURITY_REPORT', 'THREAT_MODEL', 'LIQUIDITY_AUDIT', 'VALIDATE_SOURCE'].map((txt, i) => (
                        <div key={txt} className="p-3 bg-white/2 rounded-lg border border-white/5 text-[8px] font-black uppercase tracking-[0.2em] text-white/10 hover:text-gold hover:border-gold/30 cursor-pointer transition-all">
                          <ScrambleText text={txt} delay={i * 100} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Progress Scan Bar */}
              <AnimatePresence>
                {isAnalyzed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/98 z-50 flex flex-col items-center justify-center p-12"
                  >
                    <div className="w-64 h-0.5 bg-white/5 rounded-full mb-8 relative overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gold shadow-[0_0_15px_#F5C64C]"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2 }}
                      />
                    </div>
                    <div className="flex flex-col items-center gap-4">
                      <Activity className="animate-spin text-gold" size={24} />
                      <span className="text-[11px] font-black text-gold tracking-[0.5em] uppercase text-glow-gold">
                        <ScrambleText text="DIVINE_ANALYSIS_IN_PROGRESS" />
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </header>

        {/* THE PROTOCOL SECTIONS with Parallax */}
        <motion.section
          id="how-it-works"
          style={{ y: ySection1 }}
          className="py-32 px-10 relative"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <span className="section-label">01 <ScrambleText text="THE PROTOCOL" delay={500} /></span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none uppercase">
                BORN OF <span className="text-gold text-glow-gold"><ScrambleText text="THUNDER" delay={700} /></span>
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                Aezos is the definitive shield. A digital barrier designed to neutralize deception in the most hostile web3 environments.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: ShieldHalf, title: 'NEURAL_AEGIS', desc: 'Isolate and neutralize malicious intent before it penetrates your signature.' },
                { icon: InfinityIcon, title: 'LIGHTNING_NET', desc: 'Real-time threat heuristics synced across the 40+ chain global grid.' },
                { icon: Lock, title: 'DIVINE_VAULT', desc: 'End-to-end sovereignty for your most sensitive data and conversations.' }
              ].map((item, i) => (
                <div key={i} className="feature-card p-12 rounded-[3.5rem] group backdrop-blur-3xl">
                  <div className="w-16 h-16 bg-white/2 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:bg-gold/10 group-hover:border-gold/20 transition-all">
                    <item.icon className="text-gold/40 group-hover:text-gold" size={28} />
                  </div>
                  <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">
                    <ScrambleText text={item.title} delay={i * 200 + 1000} />
                  </h3>
                  <p className="text-white/85 leading-relaxed text-sm font-semibold">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* LIGHTNING LEDGER SECTION */}
        <motion.section
          id="ledger"
          style={{ y: ySection2 }}
          className="py-32 px-10 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24">
            <div className="flex-1">
              <span className="section-label">02 <ScrambleText text="REAL TIME INTELLIGENCE" delay={1500} /></span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 leading-none uppercase">
                THE <span className="text-gold text-glow-gold"><ScrambleText text="LEDGER" delay={1700} /></span>
              </h2>
              <div className="grid gap-6">
                {[
                  { label: 'THREATS_NEUTRALIZED', val: '142,942', icon: ShieldAlert, color: 'text-red' },
                  { label: 'DIVINE_INFERENCES/SEC', val: '43.2k', icon: Activity, color: 'text-gold' },
                  { label: 'SECURITY_INTEGRITY_INDEX', val: '99.98%', icon: ShieldCheck, color: 'text-green' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 glass-dark rounded-2xl border border-white/5">
                    <div className={`p-4 rounded-xl bg-white/2 ${item.color}`}>
                      <item.icon size={24} />
                    </div>
                    <div className="group/stat">
                      <div className="text-4xl font-black text-white tracking-tighter leading-none mb-1 blur-[8px] group-hover/stat:blur-[4px] transition-all duration-700 select-none">
                        {item.val}
                      </div>
                      <div className="text-[10px] font-black text-white/60 tracking-[0.3em] uppercase">
                        <ScrambleText text={item.label.replace(/_/g, ' ')} delay={100 + i * 100} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 relative flex justify-center group">
              <div className="relative w-full max-w-lg aspect-square">
                {/* High-Integrity Data Mesh Container */}
                <div className="absolute inset-0 glass-dark rounded-[3.5rem] border border-white/10 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] backdrop-blur-3xl">
                  {/* Static Grid Base */}
                  <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />

                  {/* Neural Lattice SVG */}
                  <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full p-16">
                    <defs>
                      <filter id="ledger-glow">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                      <linearGradient id="path-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(245,198,76,0)" />
                        <stop offset="50%" stopColor="rgba(245,198,76,0.5)" />
                        <stop offset="100%" stopColor="rgba(245,198,76,0)" />
                      </linearGradient>
                    </defs>

                    {/* Interconnection Web */}
                    <g className="opacity-20">
                      <path d="M 200 80 L 320 160 L 280 300 L 120 300 L 80 160 Z" fill="none" stroke="white" strokeWidth="0.5" />
                      <path d="M 200 80 L 280 300 M 320 160 L 120 300 M 280 300 L 80 160 M 120 300 L 200 80 M 80 160 L 320 160" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
                    </g>

                    {/* Central Processing Core */}
                    <motion.g style={{ filter: 'url(#ledger-glow)' }}>
                      <motion.circle
                        cx="200" cy="200" r="45"
                        className="fill-gold/10 stroke-gold/40"
                        strokeWidth="1"
                        animate={{ r: [45, 52, 45], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.circle
                        cx="200" cy="200" r="30"
                        className="fill-gold/20 stroke-gold"
                        strokeWidth="2"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <Cpu className="text-gold absolute" x="185" y="185" size={30} />
                    </motion.g>

                    {/* Orbital Data Nodes */}
                    {[
                      { x: 200, y: 80 }, { x: 320, y: 160 },
                      { x: 280, y: 300 }, { x: 120, y: 300 },
                      { x: 80, y: 160 }
                    ].map((pos, i) => (
                      <g key={i}>
                        <motion.circle
                          cx={pos.x} cy={pos.y} r="5"
                          className="fill-gold shadow-[0_0_15px_#F5C64C]"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                        />
                        <motion.circle
                          cx={pos.x} cy={pos.y} r="12"
                          className="stroke-gold/20 fill-none"
                          animate={{ scale: [1, 2], opacity: [0.4, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                        />
                      </g>
                    ))}

                    {/* Data Stream Visualization */}
                    <motion.circle r="3" fill="#F5C64C" style={{ filter: 'url(#ledger-glow)' }}>
                      <animateMotion
                        path="M 200 80 L 320 160 L 280 300 L 120 300 L 80 160 Z"
                        dur="8s"
                        repeatCount="indefinite"
                      />
                    </motion.circle>
                    <motion.circle r="2" fill="#F5C64C" opacity="0.6">
                      <animateMotion
                        path="M 320 160 L 120 300 L 200 80 L 280 300 L 80 160 Z"
                        dur="12s"
                        repeatCount="indefinite"
                      />
                    </motion.circle>
                  </svg>

                  {/* Tactical HUD Data Overlay - Enhanced Design */}
                  <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end">
                    <div className="space-y-4 group/hud">
                      <div className="flex items-center gap-4">
                        <div className="w-1 h-8 bg-green/40 rounded-full" />
                        <div className="flex flex-col">
                          <span className="text-[7px] font-black text-white/30 tracking-[0.4em] uppercase">SYNC_STATUS</span>
                          <span className="text-[11px] font-mono text-green leading-none blur-[6px] group-hover/hud:blur-[2px] transition-all duration-700">
                            99.98%_VERIFIED
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-1 h-8 bg-white/10 rounded-full group-hover/hud:bg-gold/40 transition-colors" />
                        <div className="flex flex-col">
                          <span className="text-[7px] font-black text-white/30 tracking-[0.4em] uppercase">NODE_COUNT</span>
                          <span className="text-[11px] font-mono text-white/90 leading-none blur-[6px] group-hover/hud:blur-[2px] transition-all duration-700">
                            12,842_ACTIVE
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] font-black text-gold mb-2 tracking-widest leading-none">
                        <ScrambleText text="LEDGER_0x_ACTIVE" delay={500} />
                      </div>
                      <div className="h-1 w-32 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gold shadow-[0_0_10px_#F5C64C]"
                          animate={{ width: ['20%', '90%', '40%', '100%'] }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Corner Scanlines */}
                  <div className="absolute top-0 right-0 p-8">
                    <Activity size={24} className="text-gold/20 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FINAL DEFENSE SECTION */}
        <section id="defense" className="py-48 px-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gold/5 opacity-20 blur-[150px] pointer-events-none" />
          <div className="max-w-4xl mx-auto relative z-10">
            <span className="section-label mb-8 inline-block">03 <ScrambleText text="INITIATE PROTOCOLS" delay={500} /></span>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-16 leading-none uppercase">
              UNLEASH <span className="text-gold text-glow-gold"><ScrambleText text="AEGIS" delay={800} /></span>
            </h2>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              <button
                onClick={() => setShowScanModal(true)}
                className="w-full md:w-auto px-16 py-7 bg-gold text-black font-black text-[11px] uppercase tracking-[0.5em] rounded-full hover:scale-105 transition-all shadow-[0_20px_60px_rgba(245,198,76,0.4)] active:scale-95"
              >
                ACTIVATE_SHIELD
              </button>
              <Link
                href="/manifesto"
                className="w-full md:w-auto px-16 py-7 border border-white/10 glass text-white font-black text-[11px] uppercase tracking-[0.5em] rounded-full hover:!bg-gold hover:!text-black transition-all flex items-center justify-center gap-4 group"
              >
                <ScrambleText text="TECHNICAL_MANIFESTO" delay={1200} className="group-hover:text-black" />
                <Zap size={14} className="text-gold group-hover:scale-125 transition-transform group-hover:text-black" />
              </Link>
            </div>
          </div>
        </section>

        {/* COMPACT FOOTER */}
        <footer className="py-12 border-t border-white/5 bg-black/60 relative text-center">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-8 justify-center">
              {/* X Icon */}
              <a
                href="https://x.com/AEZOSofZEUS"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white/20 group-hover:fill-white transition-colors" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" />
                </svg>
                <span className="absolute -top-6 text-[7px] font-black tracking-widest text-gold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase italic">STRIKE_NOW</span>
              </a>

              {/* Telegram Icon */}
              <div className="group relative flex flex-col items-center cursor-help">
                <Send size={16} className="text-white/20 group-hover:text-white transition-colors" />
                <span className="absolute -top-6 text-[7px] font-black tracking-widest text-gold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase italic">TG_INITIATING</span>
              </div>

              {/* Discord Icon */}
              <div className="group relative flex flex-col items-center cursor-help">
                <MessageSquare size={16} className="text-white/20 group-hover:text-white transition-colors" />
                <span className="absolute -top-6 text-[7px] font-black tracking-widest text-gold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase italic">DC_ACTIVE_SOON</span>
              </div>
            </div>

            <div className="text-[9px] font-bold text-white/5 uppercase tracking-[0.6em] text-center">
              <ScrambleText text="AEGIS OF ZEUS DEFENSE PROTO 2026 DIVINE SVRGN ESTABLISHED" />
            </div>
          </div>
        </footer>
      </div>

      {/* SCAN MODAL OVERLAY */}
      <ScanModal isOpen={showScanModal} onClose={() => setShowScanModal(false)} />
    </div>
  );
}
