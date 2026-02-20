'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Zap, Activity, MessageSquare, Send } from 'lucide-react';
import Link from 'next/link';

// --- Ultra-Fast Sequential Scramble Text Component ---
interface ScrambleProps {
    text: string;
    delay?: number;
    onComplete?: () => void;
    speed?: number;
    className?: string;
}

const ScrambleText = ({ text, delay = 0, onComplete, speed = 1, className = "" }: ScrambleProps) => {
    const [displayText, setDisplayText] = useState('');
    const [isDone, setIsDone] = useState(false);
    const characters = 'abcdefghijklmnopqrstuvxyzwxy#%&-+_?\/\\='.split('');
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px 50px 0px" });

    useEffect(() => {
        let isMounted = true;
        if (isInView && !isDone) {
            const resolve = async () => {
                if (delay > 0) await new Promise(r => setTimeout(r, delay));

                // Dynamic speed: longer text gets faster per character
                const baseInterval = text.length > 100 ? 2 : text.length > 50 ? 4 : 8;
                const iterationsPerChar = text.length > 100 ? 2 : text.length > 50 ? 4 : 6;

                for (let offset = 0; offset <= text.length; offset++) {
                    if (!isMounted) return;
                    const partialString = text.substring(0, offset);

                    for (let iteration = iterationsPerChar; iteration >= 0; iteration--) {
                        if (!isMounted) return;
                        await new Promise(r => setTimeout(r, baseInterval));

                        if (iteration === 0) {
                            setDisplayText(partialString);
                        } else if (partialString.length > 0) {
                            const lastChar = text[offset - 1];
                            if (lastChar === ' ') {
                                setDisplayText(partialString);
                                break; // Reveal space immediately
                            }
                            const randomChar = characters[Math.floor(Math.random() * characters.length)];
                            setDisplayText(partialString.substring(0, partialString.length - 1) + randomChar);
                        }
                    }
                }
                setIsDone(true);
                if (onComplete) onComplete();
            };
            resolve();
        }
    }, [isInView, text, delay, isDone, onComplete]);

    return <span ref={ref} className={`font-mono ${className}`}>{displayText}</span>;
}

export default function ManifestoPage() {
    const [step, setStep] = useState(0);

    return (
        <main className="min-h-screen bg-black text-white selection:bg-gold selection:text-black overflow-x-hidden pt-32 pb-20">
            {/* Background Atmosphere */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gold/5 blur-[120px] rounded-full" />
            </div>

            <nav className="fixed top-0 left-0 right-0 z-50 p-8 flex justify-between items-center backdrop-blur-md border-b border-white/5 bg-black/60">
                <Link href="/" className="flex items-center gap-4 group">
                    <ArrowLeft size={16} className="text-gold group-hover:-translate-x-1 transition-transform" />
                    <span className="font-black text-[10px] uppercase tracking-[0.4em] text-white/50 group-hover:text-white transition-colors">BACK TO SYSTEM CORE</span>
                </Link>
                <div className="flex items-center gap-4">
                    <img src="/aegis-logo.png" className="h-6 w-auto opacity-80" alt="AEZOS" />
                    <span className="font-black text-xs tracking-[0.3em] text-gold uppercase">MANIFESTO V1.0</span>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-10 relative z-10">
                {/* HERO HEADER */}
                <div className="text-center mb-32">
                    <span className="inline-block px-4 py-1 rounded-full border border-gold/20 text-[10px] font-black text-gold/60 tracking-[0.5em] uppercase mb-8">
                        <ScrambleText text="SECURE BROADCAST" onComplete={() => setStep(1)} />
                    </span>
                    {step >= 1 && (
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none uppercase">
                            <ScrambleText text="THE DIVINE MANDATE" onComplete={() => setStep(2)} />
                        </h1>
                    )}
                    {step >= 2 && (
                        <p className="text-white/30 font-mono text-[10px] tracking-[0.6em] uppercase">
                            <ScrambleText text="AUTHENTICATED: FEBRUARY 20, 2026" onComplete={() => setStep(3)} />
                        </p>
                    )}
                </div>

                <div className="space-y-24">
                    {/* SECTION 1 */}
                    {step >= 3 && (
                        <div className="glass-dark p-12 rounded-[3.5rem] border border-white/5 shadow-2xl">
                            <h3 className="text-2xl font-black mb-8 text-gold uppercase tracking-tighter flex items-center gap-4">
                                <span className="text-white/20">01</span>
                                <ScrambleText text="THE COVENANT" onComplete={() => setStep(4)} />
                            </h3>
                            {step >= 4 && (
                                <div className="space-y-8">
                                    <p className="text-xl font-bold text-white leading-relaxed italic border-l-4 border-gold pl-8">
                                        <ScrambleText text="The golden hexagon shield with carbon-fiber wings and the circuit-traced lightning A is not just a logo — it is our covenant." onComplete={() => setStep(5)} />
                                    </p>
                                    {step >= 5 && (
                                        <p className="text-white/60 leading-relaxed text-lg">
                                            <ScrambleText text="AEZOS was forged in the fire of the Pump.fun Build in Public Hackathon. We are building in public — every line of code, every design decision, every Lightning Mark is visible on X and Solana explorers from day one. This is not a stealth project. This is a public oath: we will shield the innocent and strike the predators." onComplete={() => setStep(6)} />
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* SECTION 2 & 3 GRID */}
                    {step >= 6 && (
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="glass-dark p-10 rounded-[2.5rem] border border-red/10 bg-red/[0.02]">
                                <h3 className="text-xl font-black mb-6 text-red uppercase tracking-tighter">
                                    <ScrambleText text="02 THE PROBLEM" onComplete={() => setStep(7)} />
                                </h3>
                                {step >= 7 && (
                                    <p className="text-sm font-semibold text-white/70 leading-loose">
                                        <ScrambleText text="In 2026, scams are no longer smart contracts gone wrong. They are conversations. AI voice clones, deepfakes, and emotional manipulation steal $17B annually. Centralized detectors are too slow. We need something faster than the scammers and more permanent than their lies." onComplete={() => setStep(8)} />
                                    </p>
                                )}
                            </div>
                            {step >= 8 && (
                                <div className="glass-dark p-10 rounded-[2.5rem] border border-green/10 bg-green/[0.02]">
                                    <h3 className="text-xl font-black mb-6 text-green uppercase tracking-tighter">
                                        <ScrambleText text="03 THE SOLUTION" onComplete={() => setStep(9)} />
                                    </h3>
                                    {step >= 9 && (
                                        <p className="text-sm font-semibold text-white/70 leading-loose">
                                            <ScrambleText text="AEZOS is the world's first real-time, decentralized, conversation-level scam defense infrastructure built on Solana. Paste any conversation. In less than 3 seconds, you receive a divine verdict backed by hybrid intelligence and the on-chain Lightning Ledger." onComplete={() => setStep(10)} />
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* SECTION 4 ARCHITECTURE */}
                    {step >= 10 && (
                        <div className="glass-dark p-12 rounded-[3.5rem] border border-white/5 bg-white/[0.01]">
                            <h3 className="text-2xl font-black mb-12 text-gold uppercase tracking-tighter">
                                <ScrambleText text="04 TECHNICAL ARCHITECTURE" onComplete={() => setStep(11)} />
                            </h3>
                            {step >= 11 && (
                                <div className="space-y-12">
                                    {[
                                        { l: "LAYER 01", t: "THE ORACLE", d: "Hybrid Intelligence Engine utilizing Grok and Llama-3.1 tailored for scam heuristics. Verifiable prompts hashed on-chain." },
                                        { l: "LAYER 02", t: "LIGHTNING LEDGER", d: "The source of truth. Immutable Solana-native registry of confirmed malicious signatures and rogue entities." },
                                        { l: "LAYER 03", t: "AEGIS CLIENTS", d: "Omnipresent protection via Web dApps, Telegram Group Monitoring, and Phantom SDK integration." }
                                    ].map((layer, i) => (
                                        <div key={i} className="group flex gap-8">
                                            <div className="flex-shrink-0 w-24 text-[10px] font-black text-white/20 tracking-widest pt-2">
                                                <ScrambleText text={layer.l} />
                                            </div>
                                            <div className="flex-1 space-y-2 border-l border-white/10 pl-8 group-hover:border-gold transition-colors">
                                                <h4 className="font-black text-sm uppercase tracking-widest text-gold/80">
                                                    <ScrambleText text={layer.t} />
                                                </h4>
                                                <p className="text-sm text-white/50 leading-relaxed">
                                                    <ScrambleText text={layer.d} onComplete={() => i === 2 && setStep(12)} />
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* CODE SKELETON */}
                    {step >= 12 && (
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gold/10 blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative glass-dark rounded-3xl border border-white/10 overflow-hidden">
                                <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-b border-white/5">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red/40" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-gold/40" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green/40" />
                                    </div>
                                    <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
                                        <ScrambleText text="programs/aezos/src/lib.rs" onComplete={() => setStep(13)} />
                                    </span>
                                </div>
                                <pre className="p-10 text-[11px] font-mono text-white/60 leading-relaxed overflow-x-auto scrollbar-hide">
                                    <code>{`// --- AEZOS LIGHTNING LEDGER SKELETON ---
use anchor_lang::prelude::*;

declare_id!("AEZOS11111111111111111111111111111111111111");

#[program]
pub mod aezos {
    use super::*;

    pub fn create_lightning_mark(
        ctx: Context<CreateLightningMark>,
        scam_type: u8,
        proof_hash: [u8; 32],
    ) -> Result<()> {
        let mark = &mut ctx.accounts.lightning_mark;
        mark.scammer = ctx.accounts.scammer.key();
        mark.reporter = ctx.accounts.authority.key();
        mark.timestamp = Clock::get()?.unix_timestamp;
        mark.scam_type = scam_type;
        mark.proof_hash = proof_hash;
        mark.votes_for = 1;
        mark.votes_against = 0;
        mark.status = 0; // 0 = pending
        Ok(())
    }

    pub fn vote_on_mark(ctx: Context<VoteOnMark>, vote_for: bool) -> Result<()> {
        let mark = &mut ctx.accounts.lightning_mark;
        require!(mark.status == 0, ErrorCode::AlreadyDecided);
        if vote_for { mark.votes_for += 1; } else { mark.votes_against += 1; }
        Ok(())
    }

    pub fn confirm_mark(ctx: Context<ConfirmMark>) -> Result<()> {
        let mark = &mut ctx.accounts.lightning_mark;
        require!(mark.votes_for * 3 > mark.votes_against * 2, ErrorCode::NotEnoughVotes);
        mark.status = 1; // confirmed
        emit!(MarkConfirmed { scammer: mark.scammer, proof_hash: mark.proof_hash });
        Ok(())
    }
}`}</code>
                                </pre>
                            </div>
                        </div>
                    )}

                    {/* STRIKE FOOTER */}
                    {step >= 13 && (
                        <div className="text-center py-32 space-y-16">
                            <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-relaxed">
                                <ScrambleText text="PROTECT WHAT MATTERS. STRIKE WHAT DOESN'T." onComplete={() => setStep(14)} />
                            </h3>
                            {step >= 14 && (
                                <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                                    <button className="px-16 py-6 bg-gold text-black font-black text-xs uppercase tracking-[0.5em] rounded-full hover:scale-105 transition-all shadow-[0_20px_60px_rgba(245,198,76,0.3)]">
                                        INITIALIZE SECURE SYNC
                                    </button>
                                    <button className="px-16 py-6 border border-white/20 glass text-white font-black text-xs uppercase tracking-[0.5em] rounded-full hover:!bg-gold hover:!text-black transition-all">
                                        CLAIM DIVINE VERDICT
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

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
                            <span className="absolute -top-6 text-[7px] font-black tracking-widest text-gold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase italic text-gold">TG_INITIATING</span>
                        </div>

                        {/* Discord Icon */}
                        <div className="group relative flex flex-col items-center cursor-help">
                            <MessageSquare size={16} className="text-white/20 group-hover:text-white transition-colors" />
                            <span className="absolute -top-6 text-[7px] font-black tracking-widest text-gold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase italic text-gold">DC_ACTIVE_SOON</span>
                        </div>
                    </div>

                    <div className="text-[9px] font-bold text-white/5 uppercase tracking-[0.6em] text-center">
                        <ScrambleText text="AEGIS OF ZEUS DEFENSE PROTO 2026 DIVINE SVRGN ESTABLISHED" />
                    </div>
                </div>
            </footer>
        </main>
    );
}
