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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4 text-center select-none bg-[#f7faff]">
      {/* Background Gingham Pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: '#f7faff',
          backgroundImage: `
            linear-gradient(90deg, rgba(136, 185, 237, 0.52) 50%, transparent 50%),
            linear-gradient(0deg, rgba(136, 185, 237, 0.52) 50%, transparent 50%),
            repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.22) 0, rgba(255, 255, 255, 0.22) 2px, transparent 2px, transparent 4px)
          `,
          backgroundSize: '44px 44px, 44px 44px, 6px 6px',
        }}
      />

      {/* Decorative center vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-white/40 to-[#8ebbee]/30 pointer-events-none" />

      <div className="relative z-10 max-w-2xl flex flex-col items-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#b82329] bg-[#fcf7ea] px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#b82329] shadow-[3px_3px_0px_#b82329]">
          <Sparkles className="h-4 w-4 text-[#b82329]" /> Special Birthday Invitation
        </div>

        <div className="flex flex-col items-center">
          <h1 className="puffy-sticker-title text-6xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-center leading-[0.95] select-none my-2">
            HAPPY<br />BIRTHDAY
          </h1>

          <div className="washi-tape-label px-6 py-2 rounded-lg rotate-2 mt-3 inline-block border-2 border-[#b82329] bg-[#fcf7ea] shadow-[4px_4px_0px_#b82329]">
            <span className="text-base sm:text-xl font-black tracking-wider text-[#571317] font-sans">
              ★ {recipientName} ★
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-[#521316] max-w-md mx-auto font-medium">
          Kejutan scrapbook spesial sudah disiapkan khusus untukmu! Klik tombol di bawah untuk membuka stage perayaan dan menyalakan audio.
        </p>

        <button
          onClick={onEnterStage}
          className="group relative inline-flex items-center gap-3 rounded-2xl bg-[#b82329] border-3 border-[#7a1317] px-8 py-4 text-base sm:text-lg font-black uppercase tracking-wider text-[#fcf7ea] shadow-[6px_6px_0px_#7a1317] transition-all duration-300 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_#7a1317] active:scale-95 cursor-pointer"
        >
          <Play className="h-5 w-5 fill-current text-[#fcf7ea]" />
          Buka Panggung Ultah! 💌
        </button>
      </div>
    </div>
  );
};
