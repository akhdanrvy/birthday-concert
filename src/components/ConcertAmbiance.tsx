'use client';
import React from 'react';

export const ConcertAmbiance: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {/* Spotlights */}
      <div className="absolute -top-32 left-1/4 h-[600px] w-48 origin-top bg-gradient-to-b from-neon-pink/40 to-transparent blur-3xl animate-spotlight-sweep" />
      <div className="absolute -top-32 right-1/4 h-[600px] w-48 origin-top bg-gradient-to-b from-neon-cyan/40 to-transparent blur-3xl animate-spotlight-sweep [animation-delay:-4s]" />

      {/* Lautan Lightstick Penonton (Siluet Crowd di Bawah) */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent flex items-end justify-around px-4 pb-2">
        {Array.from({ length: 24 }).map((_, i) => {
          const colors = ['#ff2a85', '#00f0ff', '#9d4edd', '#ffd166'];
          const color = colors[i % colors.length];
          const delay = (i * 0.15) % 2.5;

          return (
            <div
              key={i}
              className="flex flex-col items-center animate-lightstick-wave origin-bottom opacity-75"
              style={{
                animationDelay: `-${delay}s`,
                height: `${55 + (i % 5) * 12}px`,
              }}
            >
              {/* Kepala Lightstick Glow */}
              <div
                className="w-3.5 h-7 rounded-full"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 15px ${color}, 0 0 30px ${color}`,
                }}
              />
              {/* Pegangan Lightstick */}
              <div className="w-1 h-8 bg-zinc-800 mt-0.5 rounded-b" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
