'use client';
import React from 'react';

export const ConcertAmbiance: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none">
      {/* Subtle soft warmth on top */}
      <div className="absolute -top-32 left-1/4 h-[500px] w-64 origin-top bg-gradient-to-b from-[#b82329]/10 to-transparent blur-3xl animate-spotlight-sweep" />
      <div className="absolute -top-32 right-1/4 h-[500px] w-64 origin-top bg-gradient-to-b from-[#8ebbee]/20 to-transparent blur-3xl animate-spotlight-sweep [animation-delay:-4s]" />

      {/* Floating party cheer sticks at bottom without dark shadow */}
      <div className="absolute bottom-0 inset-x-0 h-32 flex items-end justify-around px-4 pb-2">
        {Array.from({ length: 24 }).map((_, i) => {
          const colors = ['#b82329', '#ffd166', '#8ebbee', '#e66870', '#fcf7ea'];
          const color = colors[i % colors.length];
          const delay = (i * 0.15) % 2.5;

          return (
            <div
              key={i}
              className="flex flex-col items-center animate-lightstick-wave origin-bottom opacity-70"
              style={{
                animationDelay: `-${delay}s`,
                height: `${45 + (i % 5) * 10}px`,
              }}
            >
              {/* Kepala Cheer Stick */}
              <div
                className="w-3 h-6 rounded-full border border-white/60"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 10px ${color}80`,
                }}
              />
              {/* Pegangan Stick */}
              <div className="w-1 h-7 bg-[#b82329]/40 mt-0.5 rounded-b" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
