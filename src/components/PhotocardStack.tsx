'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

export interface PhotocardItem {
  id: number;
  src: string;
  fallbackSrc?: string;
  title: string;
  caption: string;
  badge: string;
  color: string;
  rotation: number;
}

const PHOTOCARDS: PhotocardItem[] = [
  {
    id: 1,
    src: './images/photocard-1.jpg',
    fallbackSrc: './images/sibling-photo.jpg',
    title: 'Adik Tercinta',
    caption: 'Special Concert Tour Edition',
    badge: '★ ULTRA RARE FOIL',
    color: '#ff2a85',
    rotation: -3,
  },
  {
    id: 2,
    src: './images/photocard-2.jpg',
    fallbackSrc: './images/sibling-photo.jpg',
    title: 'Momen Manis',
    caption: 'Backstage Memories Candid',
    badge: '★ HOLOGRAPHIC VIP',
    color: '#00f0ff',
    rotation: 4,
  },
  {
    id: 3,
    src: './images/photocard-3.jpg',
    fallbackSrc: './images/sibling-photo.jpg',
    title: 'Senyum Terbaik',
    caption: 'Center Stage Spotlight Moment',
    badge: '★ SPECIAL GOLD EDITION',
    color: '#ffd166',
    rotation: -5,
  },
  {
    id: 4,
    src: './images/photocard-4.jpg',
    fallbackSrc: './images/sibling-photo.jpg',
    title: 'Cool & Energetic',
    caption: 'Encore Stage Memory',
    badge: '★ NEON PURPLE REFLECT',
    color: '#9d4edd',
    rotation: 5,
  },
  {
    id: 5,
    src: './images/photocard-5.jpg',
    fallbackSrc: './images/sibling-photo.jpg',
    title: 'The Birthday Star',
    caption: 'Grand Finale Milestone',
    badge: '★ SECRET CHASE CARD',
    color: '#ff6b81',
    rotation: -2,
  },
];

export const PhotocardStack: React.FC = () => {
  const [topIndex, setTopIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [imgErrors, setImgErrors] = useState<{ [key: number]: boolean }>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = PHOTOCARDS.length;

  const nextCard = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    // After animation slide-out, change index and reset
    setTimeout(() => {
      setTopIndex((prev) => (prev + 1) % total);
      setIsAnimating(false);
    }, 380);
  }, [isAnimating, total]);

  const prevCard = useCallback(() => {
    if (isAnimating) return;
    setTopIndex((prev) => (prev - 1 + total) % total);
  }, [isAnimating, total]);

  // Auto slide every 3.5 seconds when not paused
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextCard();
    }, 3500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextCard, isPaused]);

  const handleImageError = (id: number) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="w-full flex flex-col items-center my-6 select-none">
      {/* K-Pop Collector Header Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-pink/10 border border-neon-pink/30 text-[11px] font-mono tracking-wider text-neon-pink mb-3 shadow-[0_0_12px_rgba(255,42,133,0.3)]">
        <Sparkles className="h-3 w-3 animate-spin" /> OFFICIAL PHOTOCARD DECK (5 PCS)
      </div>

      {/* Photocard Stack Container */}
      <div
        className="relative w-72 h-[390px] sm:w-80 sm:h-[430px] flex items-center justify-center cursor-pointer group"
        onClick={nextCard}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        title="Klik untuk melihat kartu berikutnya"
      >
        {PHOTOCARDS.map((card, index) => {
          // Calculate offset position relative to current topIndex
          const offset = (index - topIndex + total) % total;
          const isTop = offset === 0;
          const isExiting = isTop && isAnimating;

          // Depth styling based on offset in stack
          let transform = '';
          let zIndex = total - offset;
          let opacity = 1;
          let scale = 1 - offset * 0.05;
          let translateY = offset * 9;
          let translateX = (offset % 2 === 1 ? 1 : -1) * (offset * 7);
          let rotate = isTop ? 0 : (offset % 2 === 1 ? 1 : -1) * (offset * 3.5);

          if (isExiting) {
            // Smoothly slide card up and to the side as it moves to the back of the deck
            transform = `translate(-115%, -25px) rotate(-18deg) scale(0.92)`;
            opacity = 0;
            zIndex = 40;
          } else {
            transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale})`;
            opacity = Math.max(0.3, 1 - offset * 0.18);
          }

          const hasFailed = imgErrors[card.id];

          return (
            <div
              key={card.id}
              className="absolute inset-0 rounded-2xl p-2.5 bg-gradient-to-b from-zinc-800/90 via-zinc-900 to-black border-2 shadow-2xl transition-all duration-500 ease-out flex flex-col justify-between overflow-hidden backdrop-blur-md"
              style={{
                borderColor: isTop ? card.color : 'rgba(255, 255, 255, 0.12)',
                boxShadow: isTop
                  ? `0 0 35px ${card.color}40, 0 20px 40px rgba(0,0,0,0.8)`
                  : '0 10px 25px rgba(0,0,0,0.6)',
                transform,
                zIndex,
                opacity,
                pointerEvents: isTop ? 'auto' : 'none',
              }}
            >
              {/* Holographic Rainbow Sheen Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-20 mix-blend-overlay" />

              {/* Holographic Header Bar */}
              <div className="relative z-10 flex items-center justify-between px-2 pt-1 pb-2">
                <span
                  className="text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full border shadow-sm"
                  style={{
                    backgroundColor: `${card.color}20`,
                    borderColor: `${card.color}60`,
                    color: card.color,
                  }}
                >
                  {card.badge}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 font-bold">
                  NO.{card.id.toString().padStart(2, '0')} / 05
                </span>
              </div>

              {/* Photo Frame */}
              <div className="relative z-10 w-full flex-1 rounded-xl bg-zinc-950 overflow-hidden border border-white/10 flex items-center justify-center">
                {!hasFailed ? (
                  <img
                    src={card.src}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Try fallbackSrc first (sibling-photo.jpg)
                      if (card.fallbackSrc && (e.target as HTMLImageElement).src !== card.fallbackSrc) {
                        (e.target as HTMLImageElement).src = card.fallbackSrc;
                      } else {
                        handleImageError(card.id);
                      }
                    }}
                  />
                ) : (
                  /* High Quality Photocard Placeholder if file not yet uploaded */
                  <div className="w-full h-full p-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-zinc-900 to-black relative">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-lg"
                      style={{
                        backgroundColor: `${card.color}20`,
                        border: `1px solid ${card.color}60`,
                      }}
                    >
                      <Sparkles className="h-8 w-8" style={{ color: card.color }} />
                    </div>
                    <p className="text-sm font-bold text-white mb-1">{card.title}</p>
                    <p className="text-[11px] text-zinc-400 font-mono mb-2">
                      Photocard #{card.id}
                    </p>
                    <div className="text-[10px] text-zinc-500 bg-black/60 px-2.5 py-1.5 rounded-lg border border-white/5 font-mono">
                      Simpan file di: <br />
                      <span className="text-neon-cyan">/public/images/photocard-{card.id}.jpg</span>
                    </div>
                  </div>
                )}

                {/* Subtle Inner Glow on Photo */}
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] pointer-events-none" />
              </div>

              {/* Bottom Card Footer */}
              <div className="relative z-10 pt-2 px-1 text-center">
                <p className="text-xs font-bold text-zinc-200 tracking-wide">{card.title}</p>
                <p className="text-[10px] font-mono text-zinc-400 truncate">
                  ★ {card.caption} ★
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Controls & Indicator Dots */}
      <div className="flex items-center justify-center gap-4 mt-4 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevCard();
          }}
          className="p-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
          title="Kartu sebelumnya"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* 5 Dots Indicators */}
        <div className="flex items-center gap-1.5">
          {PHOTOCARDS.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setTopIndex(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                topIndex === idx
                  ? 'w-6 bg-gradient-to-r from-neon-pink to-neon-cyan'
                  : 'w-2 bg-zinc-700 hover:bg-zinc-500'
              }`}
              title={`Lihat Photocard #${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextCard();
          }}
          className="p-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
          title="Kartu berikutnya"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <p className="text-[11px] font-mono text-zinc-500 mt-2">
        (Klik kartu atau geser otomatis setiap 3.5 detik)
      </p>
    </div>
  );
};
