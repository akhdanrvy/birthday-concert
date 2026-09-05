'use client';
import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Play } from 'lucide-react';

interface StageIntroProps {
  recipientName: string;
  onEnterStage: () => void;
}

export const StageIntro: React.FC<StageIntroProps> = ({ recipientName, onEnterStage }) => {
  useEffect(() => {
    // Fireworks blast interval
    const blastFireworks = () => {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff2a85', '#00f0ff', '#ffd166', '#ffffff'],
      });
    };

    // First burst immediately
    blastFireworks();
    const interval = setInterval(blastFireworks, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void px-4 text-center">
      {/* Background Stage Lights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-purple/20 via-void to-void" />

      <div className="relative z-10 max-w-2xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-neon-pink/40 bg-neon-pink/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-neon-pink shadow-lg">
          <Sparkles className="h-4 w-4 animate-spin" /> Live Stage Concert Tour
        </div>

        <h1 className="text-4xl font-black uppercase tracking-wider text-white sm:text-6xl md:text-7xl animate-pulse-glow">
          HAPPY BIRTHDAY
          <span className="block mt-2 bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-gold bg-clip-text text-transparent">
            {recipientName}
          </span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 max-w-md mx-auto">
          Panggung sudah siap, lampu sorot tertuju padamu! Klik tombol di bawah untuk menyalakan audio konser dan membuka VIP stage.
        </p>

        <button
          onClick={onEnterStage}
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-neon-pink to-neon-purple px-8 py-4 text-sm sm:text-base font-bold uppercase tracking-wider text-white shadow-[0_0_35px_rgba(255,42,133,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Play className="h-5 w-5 fill-current" />
          Enter Concert Stage
        </button>
      </div>
    </div>
  );
};
