'use client';
import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Play } from 'lucide-react';

interface StageIntroProps {
  recipientName: string;
  onEnterStage: () => void;
  onStartAudio?: () => void;
}

export const StageIntro: React.FC<StageIntroProps> = ({
  recipientName,
  onEnterStage,
  onStartAudio,
}) => {
  const [hasOpenedCurtain, setHasOpenedCurtain] = useState(false);
  const [isSplitting, setIsSplitting] = useState(false);
  const [isCurtainGone, setIsCurtainGone] = useState(false);

  const fireworksIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timer1Ref = useRef<NodeJS.Timeout | null>(null);
  const timer2Ref = useRef<NodeJS.Timeout | null>(null);
  const hasPlayedSoundRef = useRef(false);

  const playFireworkSoundOnce = () => {
    if (hasPlayedSoundRef.current) return;
    try {
      const audio = new Audio('./audio/firework.mp3');
      audio.volume = 0.25; // Diturunkan agar suaranya lembut dan tidak terlalu keras
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            hasPlayedSoundRef.current = true;
          })
          .catch(() => {});
      }
    } catch {
      // audio fallback
    }
  };

  // Fireworks blast interval with multi-cannon celebration
  const blastFireworks = () => {
    // 1. Center burst
    confetti({
      particleCount: 75,
      spread: 90,
      origin: { x: 0.5, y: 0.45 },
      zIndex: 9999,
      colors: ['#b82329', '#fcf7ea', '#ffd166', '#8ebbee', '#ffffff'],
    });

    // 2. Left cannon burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.65 },
        zIndex: 9999,
        colors: ['#b82329', '#ffd166', '#ffffff'],
      });
    }, 120);

    // 3. Right cannon burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.65 },
        zIndex: 9999,
        colors: ['#8ebbee', '#fcf7ea', '#b82329'],
      });
    }, 240);
  };

  const handleOpenCurtain = () => {
    if (hasOpenedCurtain || isSplitting) return;
    setHasOpenedCurtain(true);
    setIsSplitting(true);

    // 1. Start background music immediately via user click gesture
    onStartAudio?.();

    // 2. Play firework sound once
    playFireworkSoundOnce();

    // 3. Blast confetti fireworks right as the curtain splits
    blastFireworks();
    timer1Ref.current = setTimeout(blastFireworks, 400);
    timer2Ref.current = setTimeout(blastFireworks, 1000);

    // 4. Continue visual fireworks loop
    fireworksIntervalRef.current = setInterval(blastFireworks, 1800);

    // 5. Remove dark curtain panels after animation finishes
    setTimeout(() => {
      setIsCurtainGone(true);
    }, 950);
  };

  useEffect(() => {
    return () => {
      if (timer1Ref.current) clearTimeout(timer1Ref.current);
      if (timer2Ref.current) clearTimeout(timer2Ref.current);
      if (fireworksIntervalRef.current) clearInterval(fireworksIntervalRef.current);
    };
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

      {/* Main Intro Card Content */}
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
          Selamat ulang tahun Acaa!! Klik tombol dibawah untuk kejutan selanjutnya!
        </p>

        <button
          onClick={onEnterStage}
          className="group relative inline-flex items-center gap-3 rounded-2xl bg-[#b82329] border-3 border-[#7a1317] px-8 py-4 text-base sm:text-lg font-black uppercase tracking-wider text-[#fcf7ea] shadow-[6px_6px_0px_#7a1317] transition-all duration-300 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_#7a1317] active:scale-95 cursor-pointer"
        >
          <Play className="h-5 w-5 fill-current text-[#fcf7ea]" />
          Buka Panggung Ultah! 🎂
        </button>
      </div>

      {/* ========================================================= */}
      {/* CINEMATIC DARK CURTAIN WITH SPLIT SCREEN OPENING ANIMATION */}
      {/* ========================================================= */}
      {!isCurtainGone && (
        <div
          onClick={handleOpenCurtain}
          className={`fixed inset-0 z-60 cursor-pointer overflow-hidden transition-all ${
            isSplitting ? 'pointer-events-none' : 'pointer-events-auto'
          }`}
        >
          {/* Left Curtain Door (slides left) */}
          <div
            style={{
              transform: isSplitting ? 'translateX(-100%)' : 'translateX(0%)',
              transition: 'transform 900ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="absolute inset-y-0 left-0 w-1/2 bg-[#120a10] border-r-2 border-[#b82329]/60 shadow-[inset_0_0_80px_rgba(0,0,0,0.9)] flex items-center justify-end"
          >
            {/* Subtle curtain fabric folds texture */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-black/60 pointer-events-none" />
          </div>

          {/* Right Curtain Door (slides right) */}
          <div
            style={{
              transform: isSplitting ? 'translateX(100%)' : 'translateX(0%)',
              transition: 'transform 900ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="absolute inset-y-0 right-0 w-1/2 bg-[#120a10] border-l-2 border-[#b82329]/60 shadow-[inset_0_0_80px_rgba(0,0,0,0.9)] flex items-center justify-start"
          >
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/30 to-black/60 pointer-events-none" />
          </div>

          {/* Center Interactive Seal Prompt */}
          <div
            className={`absolute inset-0 z-30 flex flex-col items-center justify-center px-4 transition-all duration-500 ${
              isSplitting ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
            }`}
          >
            <div className="relative group flex flex-col items-center gap-5">
              {/* Glowing wax seal / birthday cake badge */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#b82329] border-4 border-[#ffd166] flex items-center justify-center shadow-[0_0_50px_rgba(184,35,41,0.85)] animate-bounce">
                <span className="text-4xl sm:text-5xl select-none leading-none">🎂</span>
                {/* Subtle radial ping ring */}
                <div className="absolute inset-0 rounded-full border-2 border-[#ffd166] animate-ping opacity-35 pointer-events-none" />
              </div>

              {/* Text badge */}
              <div className="flex flex-col items-center gap-1 px-6 sm:px-8 py-3 rounded-2xl bg-[#1c0e14]/90 border-2 border-[#b82329] shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
                <p className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#ffd166] flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#ffd166] animate-spin" /> Special Birthday Surprise
                </p>
                <span className="text-base sm:text-lg font-black text-[#fcf7ea] tracking-wide">
                  ✨ Klik untuk membuka ✨
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
