'use client';
import React from 'react';

// Hand-drawn 8-pointed doodle burst star SVG
export const DoodleBurstStar: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 72,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none drop-shadow-sm ${className}`}
  >
    {/* Central burst & 8 spiky organic hand-drawn points */}
    <path
      d="M50 4 
         C50 26, 53 38, 59 41 
         C68 36, 80 24, 96 18 
         C82 32, 69 44, 64 50 
         C76 56, 88 68, 96 82 
         C78 74, 66 61, 59 59 
         C55 69, 54 84, 50 96 
         C46 84, 45 69, 41 59 
         C34 61, 22 74, 4 82 
         C12 68, 24 56, 36 50 
         C31 44, 18 32, 4 18 
         C20 24, 32 36, 41 41 
         C47 38, 50 26, 50 4 Z"
      fill="#b82329"
    />
    {/* Inner hand-drawn sketched core */}
    <path
      d="M50 22 L53 45 L76 34 L60 50 L82 66 L55 56 L50 78 L45 56 L18 66 L40 50 L24 34 L47 45 Z"
      fill="#8f171c"
      opacity="0.8"
    />
  </svg>
);

// Hand-drawn 5-pointed doodle star SVG
export const DoodleFiveStar: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 28,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none drop-shadow-sm ${className}`}
  >
    <path
      d="M25 2 
         L31.5 16.5 
         L48 18 
         L35.5 29.5 
         L39 46 
         L25 37.5 
         L11 46 
         L14.5 29.5 
         L2 18 
         L18.5 16.5 Z"
      fill="#b82329"
      stroke="#8f171c"
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

export const DoodleStarsBackground: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none">
      {/* 1. Large 8-pointed doodle star: Top Left */}
      <div className="absolute top-8 sm:top-12 left-4 sm:left-14 animate-doodle-pulse">
        <DoodleBurstStar size={84} />
      </div>

      {/* 2. Small doodle star: Top Center-Left */}
      <div className="absolute top-16 sm:top-20 left-1/3 sm:left-[32%] animate-float-slow">
        <DoodleFiveStar size={24} />
      </div>

      {/* 3. Small doodle star: Top Center */}
      <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 animate-gentle-tilt">
        <DoodleFiveStar size={26} />
      </div>

      {/* 4. Small doodle star: Top Right */}
      <div className="absolute top-14 sm:top-16 right-1/4 sm:right-[26%] animate-float-slow [animation-delay:-2s]">
        <DoodleFiveStar size={22} />
      </div>

      {/* 5. Small doodle star: Far Top Right */}
      <div className="absolute top-24 sm:top-28 right-6 sm:right-16 animate-gentle-tilt [animation-delay:-1s]">
        <DoodleFiveStar size={20} />
      </div>

      {/* 6. Small doodle star: Bottom Left */}
      <div className="absolute bottom-28 sm:bottom-36 left-6 sm:left-24 animate-gentle-tilt [animation-delay:-3s]">
        <DoodleFiveStar size={28} />
      </div>

      {/* 7. Small doodle star: Bottom Center-Left */}
      <div className="absolute bottom-16 sm:bottom-20 left-[42%] animate-float-slow [animation-delay:-1.5s]">
        <DoodleFiveStar size={22} />
      </div>

      {/* 8. Large 8-pointed doodle star: Bottom Right */}
      <div className="absolute bottom-10 sm:bottom-16 right-4 sm:right-16 animate-doodle-pulse [animation-delay:-2.5s]">
        <DoodleBurstStar size={92} />
      </div>
    </div>
  );
};
