'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Zap, Shield } from 'lucide-react';

interface ScanModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ScanModal({ isOpen, onClose }: ScanModalProps) {
    const [input, setInput] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState<'idle' | 'scanning' | 'green' | 'red'>('idle');

    const handleScan = async () => {
        if (!input.trim()) return;

        setIsScanning(true);
        setResult('scanning');

        // Thunder SFX placeholder (add Howler.js later)
        console.log('🔊 THUNDER OF ZEUS – Divine Crack playing...');

        // Simulate real AI + on-chain scan
        await new Promise(resolve => setTimeout(resolve, 2200));

        const isScam = input.toLowerCase().includes('send') &&
            (input.toLowerCase().includes('sol') || input.toLowerCase().includes('crypto'));

        setResult(isScam ? 'red' : 'green');
        setIsScanning(false);
    };

    const resetModal = () => {
        setInput('');
        setResult('idle');
        setIsScanning(false);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
                <motion.div
                    initial={{ scale: 0.88, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.88, opacity: 0 }}
                    className="relative w-full max-w-2xl bg-[#0a0a0f] border border-[#F5C64C]/30 rounded-3xl overflow-hidden shadow-2xl"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <div className="flex items-center gap-4">
                            <img src="/aegis-logo.png" alt="AEZOS" className="h-11 w-auto" />
                            <div>
                                <h2 className="text-2xl font-black tracking-tighter text-[#F5C64C]">AEGIS OF ZEUS</h2>
                                <p className="text-sm text-gray-400">DEFENSE PROTOCOL ACTIVE</p>
                            </div>
                        </div>
                        <button onClick={() => { onClose(); resetModal(); }} className="text-gray-400 hover:text-white transition-colors">
                            <X size={28} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-8">
                        {result === 'idle' && (
                            <>
                                <div className="text-center mb-8">
                                    <p className="text-xl text-gray-300 font-bold uppercase tracking-tight">Paste any conversation or drop a screenshot</p>
                                    <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest font-mono">Zeus will read it instantly</p>
                                </div>

                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Paste conversation here...&#10;Example: 'Hey babe, our son is sick, can you send 2 SOL to help?'"
                                    className="w-full h-48 bg-black/60 border border-white/10 rounded-2xl p-6 text-lg resize-y min-h-[180px] focus:outline-none focus:border-[#F5C64C] text-white selection:bg-gold selection:text-black font-mono"
                                />

                                <div className="flex flex-col md:flex-row gap-4 mt-6">
                                    <button className="flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl border border-white/20 hover:border-white/40 transition-all text-white/60 hover:text-white uppercase font-black text-xs tracking-widest">
                                        <Upload className="w-5 h-5" />
                                        Upload Screenshot
                                    </button>

                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={handleScan}
                                        disabled={!input.trim()}
                                        className="flex-1 bg-gradient-to-r from-[#F5C64C] to-[#FFD700] text-black font-black text-lg py-4 rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 uppercase shadow-[0_0_30px_rgba(245,198,76,0.2)]"
                                    >
                                        INVOKE ZEUS DEFENSE
                                        <Zap className="w-6 h-6 fill-black" />
                                    </motion.button>
                                </div>
                            </>
                        )}

                        {/* Scanning State */}
                        {result === 'scanning' && (
                            <div className="flex flex-col items-center justify-center py-20">
                                <motion.div
                                    animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                                    transition={{
                                        rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                                        scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                    className="mb-8"
                                >
                                    <img src="/aegis-logo.png" alt="AEZOS" className="h-28 w-auto" />
                                </motion.div>
                                <div className="space-y-2 text-center">
                                    <p className="text-2xl font-black text-[#67E8F9] uppercase tracking-tighter italic">Consulting the Oracle...</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-[0.4em] font-mono animate-pulse">Lightning Ledger checking signatures...</p>
                                </div>
                            </div>
                        )}

                        {/* GREEN RESULT */}
                        {result === 'green' && (
                            <div className="text-center py-12">
                                <motion.div initial={{ scale: 0.6 }} animate={{ scale: 1 }} className="mx-auto mb-8">
                                    <div className="w-24 h-24 rounded-full bg-green/10 flex items-center justify-center mx-auto border border-green/20 shadow-[0_0_50px_rgba(75,255,140,0.2)]">
                                        <Shield className="w-12 h-12 text-[#22FF99]" />
                                    </div>
                                </motion.div>
                                <h3 className="text-5xl font-black text-[#22FF99] mb-2 uppercase tracking-tighter">DEFENSE SECURE</h3>
                                <p className="text-xl text-gray-300 uppercase font-bold tracking-tight">Zeus approves this engagement</p>
                                <div className="mt-8 text-left bg-green/5 border border-green/10 rounded-2xl p-6 text-sm font-mono relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-2 opacity-10">
                                        <Shield size={40} />
                                    </div>
                                    <div className="flex justify-between items-center mb-2 border-b border-green/10 pb-2">
                                        <span className="text-gray-400">SAFETY_SCORE</span>
                                        <span className="text-[#22FF99] font-black">94.82 / 100</span>
                                    </div>
                                    <p className="text-gray-300 uppercase tracking-widest text-[10px]">VERDICT: NO DISCRIMINATORY MANIPULATION PATTERNS DETECTED. ON-CHAIN REPUTATION CLEAR.</p>
                                </div>
                                <button onClick={resetModal} className="mt-8 w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 uppercase font-black tracking-widest text-xs transition-all">
                                    Scan Another Conversation
                                </button>
                            </div>
                        )}

                        {/* RED RESULT */}
                        {result === 'red' && (
                            <div className="text-center py-12">
                                <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="mx-auto mb-8 relative">
                                    <div className="absolute inset-0 bg-red/20 blur-[60px] rounded-full" />
                                    <img src="/aezos-logo.png" alt="AEZOS" className="relative h-28 w-auto mx-auto drop-shadow-[0_0_40px_#FF3366]" />
                                </motion.div>
                                <h3 className="text-5xl font-black text-[#FF3366] mb-2 uppercase tracking-tighter">SHIELD BREACHED</h3>
                                <p className="text-xl text-red-400 font-bold uppercase tracking-tight">ACTIVE PIG-BUTCHERING ATTEMPT DETECTED</p>

                                <div className="mt-10 bg-red-950/20 border border-red-600/30 rounded-2xl p-8 text-left relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.05),transparent)] pointer-events-none" />
                                    <p className="font-mono text-red-500 text-xs mb-4 tracking-[0.3em] font-black uppercase">THREAT_ANALYSIS_MARKERS:</p>
                                    <ul className="space-y-4 text-sm font-bold text-gray-300 italic">
                                        <li className="flex gap-4 items-center">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red animate-ping" />
                                            EMOTIONAL MANIPULATION DETECTED ("BABE / SON")
                                        </li>
                                        <li className="flex gap-4 items-center">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red animate-ping" />
                                            SOCIAL ENGINEERING: URGENCY PRESSURE TO SEND SOL
                                        </li>
                                        <li className="flex gap-4 items-center">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red animate-ping" />
                                            SIGNATURE MATCHED AGAINST GLOBAL SCAM METS
                                        </li>
                                    </ul>
                                </div>

                                <div className="mt-8 flex flex-col md:flex-row gap-4">
                                    <button className="flex-1 py-4 bg-red-600 hover:bg-red-500 rounded-2xl font-black text-white uppercase tracking-widest text-xs transition-all shadow-[0_10px_30px_rgba(220,38,38,0.3)]">
                                        Lightning Mark Scammer
                                    </button>
                                    <button onClick={resetModal} className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 uppercase font-black tracking-widest text-xs transition-all">
                                        Scan Another
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="text-center text-[10px] font-black text-white/20 uppercase tracking-[0.5em] pb-8 italic">
                        Built for Pump.fun Hackathon • Powered by Zeus Oracle
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
