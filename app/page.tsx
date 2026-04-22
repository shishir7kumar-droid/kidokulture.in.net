"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  ShieldCheck, 
  Smartphone, 
  Code2, 
  Cpu, 
  Globe, 
  ArrowRight, 
  AlertCircle,
  BrainCircuit,
  Rocket
} from "lucide-react";

// --- Components ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`backdrop-blur-md bg-slate-900/40 border border-slate-700/50 rounded-2xl shadow-2xl ${className}`}>
    {children}
  </div>
);

const SectionHeading = ({ children, urgency = false }: { children: React.ReactNode; urgency?: boolean }) => (
  <h2 className={`text-3xl md:text-5xl font-bold tracking-tight mb-6 ${urgency ? "text-rose-500" : "text-emerald-400"}`}>
    {children}
  </h2>
);

// --- Main Page ---

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30 overflow-x-hidden relative">
      
      {/* Blueprint Texture Overlay */}
      <div className="absolute inset-0 bg-blueprint pointer-events-none opacity-40" />

      {/* The Glow: Moving Sacred Gold Radial Glow */}
      <motion.div 
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="fixed top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#D4AF37]/10 blur-[150px] rounded-full pointer-events-none -z-10" 
      />
      
      {/* Subtle Deep Rose accent in opposite corner */}
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-900/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Hero Section: PARENT HOOK */}
      <section className="relative pt-24 pb-20 px-6 md:px-12 lg:px-24 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8">
            Is your child watching <span className="text-rose-500">meaningless reels?</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Every minute scrolled is a missed opportunity for cognitive growth. Stop the passive consumption. 
            <span className="text-emerald-400 font-semibold"> Build school momentum instead.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="https://kidokulture.info"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/20 transition-colors flex items-center justify-center gap-2"
            >
              Enter The Playhouse
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* The Switch: Interactive Component */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <SectionHeading urgency>The Digital Default vs. The KidoKulture Way</SectionHeading>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto">
              Standard apps are engineered to maximize "Time Spent" via dopamine loops. 
              We've architected a playground designed for "Knowledge Gained" through high-performance 
              interactive curriculum.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
              {[
                "Brain Rot Reels",
                "Passive Consumption",
                "Decreased Attention Span",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-slate-300 bg-rose-500/5 px-4 py-2 rounded-full border border-rose-500/20">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  {item}
                </div>
              ))}
            </div>

            <p className="text-slate-500 text-sm mb-4 font-medium uppercase tracking-wider">For more info on website architecture:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="mailto:01hans.rk@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/20 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                01hans.rk@gmail.com
              </motion.a>
              <motion.a
                href="https://wa.me/917302125050"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                WhatsApp: +91 73021 25050
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800 text-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} KidoKulture Network. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
