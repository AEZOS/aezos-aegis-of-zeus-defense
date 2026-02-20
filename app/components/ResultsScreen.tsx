'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';

interface ResultsScreenProps {
    result: 'green' | 'red';
    score: number;
    scamType?: string;
    reasons?: string[];
    proofHash?: string;
    originalText: string;
    onNewScan: () => void;
}

export default function ResultsScreen({
    result,
    score,
    scamType = '',
    reasons = [],
    proofHash = '',
    originalText,
    onNewScan,
}: ResultsScreenProps) {
    const isSafe = result === 'green';

    return (
        <div className="min-h-screen bg-[#050507] text-white flex flex-col selection:bg-gold selection:text-black">
            {/* Top Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 text-[#F5C64C] hover:text-white transition-colors group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-black text-[10px] uppercase tracking-[0.4em]">Back to Shield</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <img src="/aegis-logo.png" alt="AEZOS" className="h-8 w-auto" />
                        <span className="font-black text-xs tracking-tighter uppercase text-gold">AEGIS OF ZEUS</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-6 pt-24 relative overflow-hidden">
                {/* Background FX */}
                <div className={`absolute inset-0 opacity-10 blur-[120px] pointer-events-none transition-colors duration-1000 ${isSafe ? 'bg-green' : 'bg-red'}`} />

                <div className="max-w-2xl w-full relative z-10">
                    {/* Logo + Status */}
                    <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="flex justify-center mb-8"
                    >
                        <div className="relative group">
                            <div className={`absolute -inset-10 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity ${isSafe ? 'bg-green' : 'bg-red'}`} />
                            <img
                                src="/aegis-logo.png"
                                alt="AEZOS"
                                className={`h-40 w-auto relative z-10 drop-shadow-2xl transition-all duration-1000 ${isSafe ? '' : 'hue-rotate-15 saturate-150'}`}
                            />
                        </div>
                    </motion.div>

                    {/* Main Result */}
                    <div className="text-center mb-12">
                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className={`text-6xl md:text-8xl font-black tracking-tighter mb-4 uppercase ${isSafe ? 'text-[#22FF99] drop-shadow-[0_0_30px_rgba(34,255,153,0.3)]' : 'text-[#FF3366] drop-shadow-[0_0_30px_rgba(255,51,102,0.3)]'}`}
                        >
                            {isSafe ? 'DEFENSE SECURE' : 'SHIELD BREACHED'}
                        </motion.h1>

                        <p className={`text-2xl font-black uppercase tracking-[0.2em] italic ${isSafe ? 'text-[#22FF99]/80' : 'text-[#FF3366]/80'}`}>
                            {isSafe ? 'ZEUS APPROVES' : 'ACTIVE SCAM DETECTED'}
                        </p>
                    </div>

                    {/* Score & Type */}
                    <div className="glass-dark border border-white/10 rounded-[2.5rem] p-10 mb-8 shadow-2xl overflow-hidden relative">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8 pb-8 border-b border-white/5">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 tracking-[0.5em] mb-4 uppercase">DIVINE SAFETY SCORE</p>
                                <p className="text-7xl font-black text-[#F5C64C] tracking-tighter">
                                    {score}<span className="text-2xl text-gold/40">/100</span>
                                </p>
                            </div>
                            {scamType && (
                                <div className="md:text-right">
                                    <p className="text-[10px] font-black text-gray-400 tracking-[0.5em] mb-4 uppercase">SCAM CATEGORY</p>
                                    <p className="text-xl font-black text-red-400 uppercase tracking-tight italic">{scamType}</p>
                                </div>
                            )}
                        </div>

                        {!isSafe && reasons.length > 0 && (
                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-red-500 tracking-[0.4em] uppercase">THREAT_MARKERS_IDENTIFIED:</p>
                                <ul className="space-y-4">
                                    {reasons.map((reason, i) => (
                                        <li key={i} className="flex gap-4 text-sm font-bold text-gray-300 italic group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red mt-1.5 animate-pulse" />
                                            <span className="group-hover:text-white transition-colors">{reason.toUpperCase()}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {isSafe && (
                            <div className="flex gap-4 items-center p-4 bg-green/5 border border-green/10 rounded-2xl">
                                <Shield className="text-green w-5 h-5" />
                                <p className="text-xs font-bold text-green/80 uppercase tracking-widest leading-loose">No discriminatory patterns identified on current heuristic pass. Monitoring continued.</p>
                            </div>
                        )}

                        {/* Proof Hash HUD Element */}
                        {proofHash && (
                            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                                <span className="text-[8px] font-black text-white/20 tracking-[0.4em] uppercase">PROOF_SIG</span>
                                <span className="text-[10px] font-mono text-white/40">{proofHash}</span>
                            </div>
                        )}
                    </div>

                    {/* Original Text Preview */}
                    <div className="bg-white/[0.02] rounded-2xl p-6 text-sm text-gray-500 border border-white/5 mb-10 italic">
                        <p className="uppercase text-[9px] font-black tracking-[0.4em] mb-4 text-white/20">INPUT_PAYLOAD_PREVIEW</p>
                        <p className="leading-relaxed">“{originalText}”</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        {isSafe ? (
                            <button
                                onClick={onNewScan}
                                className="flex-1 py-6 bg-gradient-to-r from-[#22FF99] to-[#67E8F9] text-black font-black text-xs uppercase tracking-[0.5em] rounded-full hover:scale-105 transition-all shadow-[0_20px_60px_rgba(34,255,153,0.2)] active:scale-95"
                            >
                                Scan Another Mission
                            </button>
                        ) : (
                            <>
                                <button className="flex-1 py-6 bg-red text-white font-black text-xs uppercase tracking-[0.5em] rounded-full hover:scale-105 transition-all flex items-center justify-center gap-4 shadow-[0_20px_60px_rgba(255,51,102,0.3)] active:scale-95">
                                    <Zap className="w-4 h-4 fill-white" />
                                    Lightning Mark This Scammer
                                </button>
                                <button
                                    onClick={onNewScan}
                                    className="flex-1 py-6 border border-white/10 glass text-white font-black text-xs uppercase tracking-[0.5em] rounded-full hover:!bg-white hover:!text-black transition-all active:scale-95"
                                >
                                    Scan Another
                                </button>
                            </>
                        )}

                        <button className="px-8 py-6 border border-white/10 glass rounded-full flex items-center justify-center hover:bg-gold hover:text-black transition-all group">
                            <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            <footer className="text-center py-12 text-[10px] font-black text-white/10 uppercase tracking-[0.5em] italic">
                Aegis Registry Active • Built for Pump.fun Hackathon • © AEZOS 2026
            </footer>
        </div>
    );
}
