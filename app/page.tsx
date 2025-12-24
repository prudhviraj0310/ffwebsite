"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { Download, Shield, Trophy, Zap, Gamepad2, Swords, Crosshair, ChevronDown, Check, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function LandingPage() {
    const { scrollY } = useScroll();
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
    const heroY = useTransform(scrollY, [0, 500], [0, 200]);

    return (
        <main className="min-h-screen bg-[#050505] text-white overflow-hidden relative selection:bg-red-600/30 font-sans">

            <BackgroundNoise />
            <AmbientLight />

            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md border-b border-white/5 bg-black/20">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="relative">
                            <div className="absolute inset-0 bg-red-600 blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                            <Gamepad2 className="w-8 h-8 text-white relative z-10" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter italic">MAD<span className="text-red-500">GAMERS</span></span>
                    </div>

                    <a
                        href="/madgamers.apk"
                        download
                        className="hidden md:flex bg-white text-black px-6 py-2.5 rounded-full font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] items-center gap-2"
                    >
                        <Download size={18} strokeWidth={3} />
                        DOWNLOAD APK
                    </a>
                </div>
            </nav>

            {/* Hero Section */}
            <motion.section
                style={{ opacity: heroOpacity, y: heroY }}
                className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20"
            >
                {/* Floating Elements */}
                <FloatingIcon Icon={Swords} className="top-[20%] left-[10%] text-red-500" delay={0} />
                <FloatingIcon Icon={Crosshair} className="bottom-[20%] right-[10%] text-orange-500" delay={2} />
                <FloatingIcon Icon={Trophy} className="top-[30%] right-[15%] text-yellow-500" delay={1} />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <span className="px-6 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-bold tracking-[0.2em] animate-pulse">
                        SEASON 5 LIVE NOW
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-7xl md:text-9xl font-black italic tracking-tighter mb-4 leading-none"
                >
                    <span className="block text-white">PLAY.</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 animate-gradient-x">WIN.</span>
                    <span className="block text-white">EARN.</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-lg md:text-2xl text-zinc-400 max-w-2xl mb-12 font-medium"
                >
                    India's Most Aggressive Esports Platform. <br />
                    <span className="text-white font-bold">Daily Tournaments. instant Payouts. No Bullshit.</span>
                </motion.p>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-center gap-4 w-full max-w-md"
                >
                    <DownloadButton />
                    <div className="flex items-center gap-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                        <span className="flex items-center gap-1"><Shield size={12} className="text-green-500" /> 100% Secure</span>
                        <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                        <span className="flex items-center gap-1"><Zap size={12} className="text-yellow-500" /> Instant Withdraw</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <ChevronDown className="w-8 h-8 text-white/20 animate-bounce" />
                </motion.div>
            </motion.section>

            {/* Stats / Trust Bar */}
            <div className="relative z-20 border-y border-white/5 bg-black/50 backdrop-blur-sm overflow-hidden">
                <div className="flex animate-marquee whitespace-nowrap py-4">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex items-center gap-8 mx-8 text-zinc-500 text-sm font-bold tracking-widest uppercase">
                            <span>⚡ 10K+ Daily Players</span>
                            <span>🏆 ₹5L+ Winnings Paid</span>
                            <span>🛡️ Anti-Cheat Active</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features Grid */}
            <section className="relative z-20 py-32 container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-black italic tracking-tighter text-center mb-20"
                >
                    WHY <span className="text-red-600">MADGAMERS?</span>
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={<Trophy className="w-10 h-10 text-yellow-500" />}
                        title="Daily Cash Tournaments"
                        desc="Solo, Duo, Squad. We host matches every hour. Join with low entry fees and win big."
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={<Zap className="w-10 h-10 text-orange-500" />}
                        title="Instant Withdrawals"
                        desc="Win a match? Get paid instantly via UPI, Paytm or GPay. No waiting period."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={<Shield className="w-10 h-10 text-green-500" />}
                        title="Ironclad Anti-Cheat"
                        desc="Zero tolerance for hackers. Our advanced detection system ensures fair play for everyone."
                        delay={0.3}
                    />
                </div>
            </section>

            {/* Installation Steps */}
            <section className="relative z-20 py-32 bg-gradient-to-b from-transparent to-red-900/10">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-12">
                        <div className="md:w-1/3 sticky top-32">
                            <h2 className="text-5xl font-black italic tracking-tighter mb-6 uppercase">
                                Get Started <br />
                                <span className="text-red-500">In Seconds</span>
                            </h2>
                            <p className="text-zinc-400 text-lg mb-8">
                                Follow these simple steps to download and install the MadGamers app on your Android device.
                            </p>
                            <a href="/madgamers.apk" download className="inline-flex items-center gap-2 text-white font-bold hover:text-red-500 transition-colors">
                                Start Download <ChevronDown />
                            </a>
                        </div>

                        <div className="md:w-2/3 flex flex-col gap-8">
                            <StepCard number="01" title="Download APK" desc="Click the download button active to get the latest version (v1.2)." />
                            <StepCard number="02" title="Enable Permissions" desc="Go to Settings > Security > Allow installation from Unknown Sources." />
                            <StepCard number="03" title="Install & Play" desc="Open the file, install it, and login to start your first match." />
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-20 border-t border-white/5 bg-black py-12">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                            <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tighter italic">MADGAMERS</span>
                    </div>
                    <p className="text-zinc-600 text-sm">
                        © 2024 MadGamers. Built for the players.
                    </p>
                </div>
            </footer>

        </main>
    );
}

function DownloadButton() {
    return (
        <a
            href="/madgamers.apk"
            download
            className="group relative w-full h-16 bg-red-600 hover:bg-red-500 transition-all rounded-xl overflow-hidden shadow-[0_0_40px_rgba(220,38,38,0.3)] hover:shadow-[0_0_60px_rgba(220,38,38,0.5)]"
        >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            <div className="absolute inset-0 flex items-center justify-center gap-3">
                <div className="bg-black/20 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <Download className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                    <div className="text-[10px] font-bold text-red-200 uppercase tracking-widest">Android Version</div>
                    <div className="text-xl font-black italic text-white uppercase tracking-wider">Download Now</div>
                </div>
            </div>
            {/* Shine effect */}
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-shine" />
        </a>
    )
}

function FeatureCard({ icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            onMouseMove={handleMouseMove}
            className="group relative p-8 rounded-3xl bg-zinc-900/40 border border-white/5 overflow-hidden hover:bg-zinc-900/60 transition-colors"
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(220, 38, 38, 0.15), transparent 80%)
                    `,
                }}
            />

            <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-red-500/10 transition-all duration-300 border border-white/5 group-hover:border-red-500/20">
                    {icon}
                </div>
                <h3 className="text-2xl font-black italic text-white mb-3 uppercase">{title}</h3>
                <p className="text-zinc-400 font-medium leading-relaxed">{desc}</p>
            </div>
        </motion.div>
    )
}

function StepCard({ number, title, desc }: { number: string, title: string, desc: string }) {
    return (
        <div className="flex gap-6 group">
            <div className="text-6xl font-black italic text-zinc-800 group-hover:text-red-600 transition-colors duration-300 select-none">
                {number}
            </div>
            <div>
                <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                <p className="text-zinc-400 font-medium">{desc}</p>
            </div>
        </div>
    )
}

function FloatingIcon({ Icon, className, delay }: { Icon: any, className: string, delay: number }) {
    return (
        <motion.div
            animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
            }}
            transition={{
                duration: 5,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
            }}
            className={`absolute hidden md:block opacity-20 hover:opacity-100 hover:scale-110 transition-all duration-300 blur-[1px] hover:blur-none cursor-pointer ${className}`}
        >
            <Icon size={64} strokeWidth={1} />
        </motion.div>
    )
}

function BackgroundNoise() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            {/* Gradient Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[120px] animate-mesh" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-yellow-600/10 rounded-full blur-[120px] animate-mesh" />
        </div>
    )
}

function AmbientLight() {
    return (
        <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-red-900/10 to-transparent pointer-events-none z-0" />
    )
}
