'use client';
import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CaseItem, FILLER_ITEMS, GUARANTEED_PRIZE } from '@/data/caseItems';

interface CsRouletteProps {
  onSpinFinished: (wonItem: CaseItem) => void;
}

export const CsRoulette: React.FC<CsRouletteProps> = ({ onSpinFinished }) => {
  const [items, setItems] = useState<CaseItem[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [translateX, setTranslateX] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const CARD_WIDTH = 140; // Lebar 1 kartu item (px)
  const TARGET_INDEX = 38; // Posisi drop guaranteed

  useEffect(() => {
    // Generate reel item acak dengan guaranteed item di TARGET_INDEX
    const reel: CaseItem[] = [];
    for (let i = 0; i < 50; i++) {
      if (i === TARGET_INDEX) {
        reel.push(GUARANTEED_PRIZE);
      } else {
        const randomItem = FILLER_ITEMS[Math.floor(Math.random() * FILLER_ITEMS.length)];
        reel.push({ ...randomItem, id: `${randomItem.id}-${i}` });
      }
    }
    setItems(reel);
  }, []);

  const playTickSound = () => {
    try {
      const tickAudio = new Audio('./audio/tick.mp3');
      tickAudio.volume = 0.4;
      tickAudio.play().catch(() => {
        // Fallback Web Audio API synthetic mechanical click
        try {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (!AudioContextClass) return;
          const ctx = new AudioContextClass();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(650, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.035);
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.04);
        } catch {
          // AudioContext not available
        }
      });
    } catch {
      // ignore
    }
  };

  const handleStartSpin = () => {
    if (isSpinning || !containerRef.current) return;
    setIsSpinning(true);

    const containerWidth = containerRef.current.offsetWidth;
    // Hitung offset agar kartu di TARGET_INDEX tepat di jarum tengah
    const targetCardCenter = TARGET_INDEX * CARD_WIDTH + CARD_WIDTH / 2;
    const randomOffset = Math.floor(Math.random() * 40) - 20; // variasi halus ±20px
    const finalOffset = -(targetCardCenter - containerWidth / 2 + randomOffset);

    setTranslateX(finalOffset);

    // Mainkan sound ticking berulang
    let ticks = 0;
    const tickInterval = setInterval(() => {
      playTickSound();
      ticks++;
      if (ticks > 45) clearInterval(tickInterval);
    }, 110);

    // Animasi berlangsung selama 6 detik sesuai transition CSS
    setTimeout(() => {
      setIsSpinning(false);
      clearInterval(tickInterval);

      // Trigger blast confetti for the covert win
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#ffd166', '#ff2a85', '#00f0ff', '#ffffff'],
      });

      onSpinFinished(GUARANTEED_PRIZE);
    }, 6200);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      {/* Viewport Roulette dengan Pointer Indicator */}
      <div
        ref={containerRef}
        className="relative w-full h-44 bg-zinc-950/90 border-2 border-zinc-800 rounded-xl overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.9)]"
      >
        {/* Jarum Pointer CS:GO (Atas & Bawah) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-neon-gold z-30 shadow-[0_0_12px_#ffd166]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-neon-gold z-30 shadow-[0_0_12px_#ffd166]" />
        <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-neon-gold/50 z-20 pointer-events-none" />

        {/* Horizontal Carousel Track */}
        <div
          className="flex h-full items-center transition-transform duration-[6000ms]"
          style={{
            transform: `translateX(${translateX}px)`,
            transitionTimingFunction: 'cubic-bezier(0.12, 0.85, 0.15, 1)',
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 flex flex-col items-center justify-center h-36 mx-1 rounded-lg border p-2 bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 relative"
              style={{
                width: `${CARD_WIDTH - 8}px`,
                borderColor: item.accentColor,
              }}
            >
              <div className="text-3xl mb-1">{item.image}</div>
              <p className="text-[11px] font-bold text-center text-zinc-200 line-clamp-2 px-1">
                {item.name}
              </p>
              <div
                className="absolute bottom-0 inset-x-0 h-1 rounded-b"
                style={{ backgroundColor: item.accentColor }}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleStartSpin}
        disabled={isSpinning}
        className="mt-6 px-8 py-3.5 rounded-lg bg-gradient-to-r from-neon-gold via-amber-500 to-yellow-600 font-extrabold uppercase tracking-wider text-black shadow-[0_0_25px_rgba(255,209,102,0.5)] transition hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
      >
        {isSpinning ? 'Rolling Case...' : 'Gacha Hadiah Ultah!'}
      </button>
    </div>
  );
};
