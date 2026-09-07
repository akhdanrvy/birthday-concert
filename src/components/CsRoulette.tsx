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
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center select-none">
      {/* Viewport Roulette dengan Pointer Pin / Paperclip Merah */}
      <div
        ref={containerRef}
        className="relative w-full h-44 bg-[#fcf7ea] border-4 border-[#b82329] rounded-2xl overflow-hidden shadow-[6px_6px_0px_#b82329]"
      >
        {/* Ornamen Pin / Paperclip Penunjuk Merah (Atas) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none drop-shadow-md">
          {/* Red pushpin head / clip marker */}
          <div className="w-5 h-5 bg-[#b82329] rounded-full border-2 border-white shadow-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-[#fcf7ea] rounded-full" />
          </div>
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#b82329] -mt-0.5" />
        </div>

        {/* Ornamen Pin / Marker Penunjuk Merah (Bawah) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none drop-shadow-md">
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-[#b82329] -mb-0.5" />
          <div className="w-5 h-5 bg-[#b82329] rounded-full border-2 border-white shadow-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-[#fcf7ea] rounded-full" />
          </div>
        </div>

        {/* Garis Penunjuk Tengah Merah */}
        <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-[#b82329]/60 z-20 pointer-events-none border-r border-dashed border-[#b82329]" />

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
              className="flex-shrink-0 flex flex-col items-center justify-center h-36 mx-1 rounded-xl border-2 p-2 bg-white relative shadow-sm hover:shadow-md transition-shadow"
              style={{
                width: `${CARD_WIDTH - 8}px`,
                borderColor: item.isGuaranteedTarget ? '#b82329' : `${item.accentColor}70`,
                boxShadow: item.isGuaranteedTarget ? '0 0 14px rgba(184, 35, 41, 0.35)' : undefined,
              }}
            >
              {item.isGuaranteedTarget && (
                <span className="absolute top-1 text-[8px] font-black uppercase tracking-wider bg-[#b82329] text-[#fcf7ea] px-1.5 py-0.5 rounded-full">
                  ★ SPECIAL ★
                </span>
              )}
              <div className="text-3xl mb-1">{item.image}</div>
              <p className="text-[11px] font-extrabold text-center text-[#4a1215] line-clamp-2 px-1 leading-tight">
                {item.name}
              </p>
              <div
                className="absolute bottom-0 inset-x-0 h-1.5 rounded-b-lg"
                style={{ backgroundColor: item.accentColor || '#b82329' }}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleStartSpin}
        disabled={isSpinning}
        className="mt-6 px-8 py-3.5 rounded-xl bg-[#b82329] border-3 border-[#7a1317] font-black uppercase tracking-wider text-[#fcf7ea] shadow-[5px_5px_0px_#7a1317] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_#7a1317] active:scale-95 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed text-sm sm:text-base"
      >
        {isSpinning ? 'Sedang Membuka Boks...' : 'Gacha Hadiah Ultah! 🎁'}
      </button>
    </div>
  );
};
