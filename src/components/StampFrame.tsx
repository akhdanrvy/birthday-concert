'use client';
import React, { useState } from 'react';
import { Paperclip } from 'lucide-react';

// Maroon Paperclip Wire SVG matching reference image
export const PaperclipMaroon: React.FC<{ className?: string; rotation?: number }> = ({
  className = '',
  rotation = -22,
}) => (
  <div
    style={{ transform: `rotate(${rotation}deg)` }}
    className={`select-none pointer-events-none drop-shadow-[2px_3px_2px_rgba(0,0,0,0.28)] ${className}`}
  >
    <svg
      width="34"
      height="68"
      viewBox="0 0 36 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 28 V50 C12 55 15 59 21 59 C27 59 30 55 30 50 V18 C30 11 25 6 18 6 C11 6 6 11 6 18 V52 C6 61 13 67 22 67 C31 67 36 61 36 53 V26"
        stroke="#b82329"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Light specular highlight for real 3D metal wire reflection */}
      <path
        d="M12 30 V48 C12 53 14 56 19 57"
        stroke="#f07278"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

// High-fidelity Meme Sticker illustration (crying shout with mic matching reference)
export const MemeStickerDefault: React.FC = () => (
  <svg
    viewBox="0 0 200 200"
    className="w-full h-full object-contain p-2 bg-[#fdfcf7]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background yellow tint burst */}
    <circle cx="100" cy="100" r="88" fill="#fcf7ea" />
    
    {/* Shouting Meme Face */}
    {/* Open roaring mouth */}
    <ellipse cx="120" cy="120" rx="38" ry="32" fill="#4a1518" stroke="#000" strokeWidth="4" />
    {/* Teeth top */}
    <path d="M88 108 Q120 116 152 108 L150 116 Q120 122 90 116 Z" fill="#ffffff" stroke="#000" strokeWidth="2" />
    {/* Teeth bottom */}
    <path d="M92 136 Q120 128 148 136 L146 142 Q120 134 94 142 Z" fill="#ffffff" stroke="#000" strokeWidth="2" />
    {/* Tongue */}
    <ellipse cx="120" cy="140" rx="18" ry="10" fill="#e63946" />

    {/* Eyes crying tears */}
    <path d="M78 78 Q95 72 108 82" stroke="#000" strokeWidth="5" strokeLinecap="round" fill="none" />
    <path d="M128 82 Q142 72 158 78" stroke="#000" strokeWidth="5" strokeLinecap="round" fill="none" />
    {/* Gushing blue tears */}
    <path d="M85 86 C80 105 75 130 78 150 C86 150 90 120 90 90 Z" fill="#38bdf8" opacity="0.9" />
    <path d="M152 86 C158 105 162 130 159 150 C151 150 148 120 147 90 Z" fill="#38bdf8" opacity="0.9" />

    {/* Microphone hand holding mic */}
    <path d="M42 145 L62 110" stroke="#000" strokeWidth="10" strokeLinecap="round" />
    <circle cx="68" cy="100" r="16" fill="#333333" stroke="#000" strokeWidth="3" />
    {/* Mic grille texture */}
    <line x1="60" y1="96" x2="76" y2="104" stroke="#888" strokeWidth="2" />
    <line x1="60" y1="104" x2="76" y2="96" stroke="#888" strokeWidth="2" />

    {/* Funny sweat drops */}
    <path d="M165 65 Q175 60 170 75 Q160 72 165 65 Z" fill="#38bdf8" />
  </svg>
);

// Memory Photo Default (Cat with microphone / funny pose matching reference)
export const CatMemoryDefault: React.FC = () => (
  <svg
    viewBox="0 0 200 200"
    className="w-full h-full object-cover bg-[#efe8d8]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="200" height="200" fill="#f4ede1" />
    {/* Cat body (tuxedo cat) */}
    <ellipse cx="100" cy="140" rx="48" ry="40" fill="#222" />
    <ellipse cx="100" cy="145" rx="30" ry="26" fill="#ffffff" />
    
    {/* Cat head */}
    <circle cx="100" cy="85" r="38" fill="#222" />
    {/* White snout */}
    <ellipse cx="100" cy="95" rx="16" ry="12" fill="#ffffff" />
    {/* Ears */}
    <polygon points="70,62 82,32 94,56" fill="#222" />
    <polygon points="76,58 82,38 90,54" fill="#fca5a5" />
    <polygon points="106,56 118,32 130,62" fill="#222" />
    <polygon points="110,54 118,38 124,58" fill="#fca5a5" />
    
    {/* Eyes funny sideways glance */}
    <circle cx="88" cy="84" r="7" fill="#fbbf24" />
    <circle cx="90" cy="84" r="3.5" fill="#000" />
    <circle cx="112" cy="84" r="7" fill="#fbbf24" />
    <circle cx="114" cy="84" r="3.5" fill="#000" />
    <polygon points="98,92 102,92 100,96" fill="#f43f5e" />

    {/* Microphone / toy held by paw */}
    <rect x="75" y="105" width="55" height="12" rx="6" transform="rotate(35 85 110)" fill="#111" stroke="#444" strokeWidth="2" />
    <circle cx="130" cy="142" r="14" fill="#333" stroke="#888" strokeWidth="2" />
    {/* Paw */}
    <circle cx="88" cy="115" r="9" fill="#ffffff" stroke="#ccc" strokeWidth="1" />
  </svg>
);

export interface StampFrameProps {
  type: 'photo' | 'meme';
  rotation?: number;
  className?: string;
  photoSrc?: string;
  fallbackSrc?: string;
  title?: string;
  caption?: string;
  onClick?: () => void;
  badgeText?: string;
}

export const StampFrame: React.FC<StampFrameProps> = ({
  type,
  rotation = 0,
  className = '',
  photoSrc,
  fallbackSrc,
  title,
  caption,
  onClick,
  badgeText,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.3s ease, filter 0.3s ease',
      }}
      className={`relative inline-block select-none cursor-pointer group hover:scale-105 ${className}`}
      onClick={onClick}
      title={onClick ? 'Klik untuk interaksi / ganti foto' : title}
    >
      {/* Paperclip Maroon pinned over top corner */}
      <div className="absolute -top-5 -left-3 z-30 pointer-events-none">
        <PaperclipMaroon rotation={-24} />
      </div>

      {/* Outer Postage Stamp Frame with Serrated Perforated White Edges */}
      <div className="postage-stamp-paper p-2.5 sm:p-3 bg-white w-36 h-44 sm:w-44 sm:h-52 md:w-48 md:h-56 flex flex-col items-center justify-between">
        {/* Inner Bordered Photo / Sticker Container */}
        <div className="relative w-full flex-1 rounded-sm overflow-hidden border border-zinc-200 bg-[#fbf8f0] flex items-center justify-center">
          {type === 'photo' ? (
            photoSrc && !imgError ? (
              <img
                src={photoSrc}
                alt={title || 'Foto Kenangan'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  if (fallbackSrc && (e.target as HTMLImageElement).src !== fallbackSrc) {
                    (e.target as HTMLImageElement).src = fallbackSrc;
                  } else {
                    setImgError(true);
                  }
                }}
              />
            ) : (
              <CatMemoryDefault />
            )
          ) : (
            photoSrc && !imgError ? (
              <img
                src={photoSrc}
                alt={title || 'Stiker Meme'}
                className="w-full h-full object-contain p-1"
                onError={() => setImgError(true)}
              />
            ) : (
              <MemeStickerDefault />
            )
          )}

          {/* Badge Overlay (e.g. Photo 1/5) */}
          {badgeText && (
            <div className="absolute bottom-1 right-1 bg-[#b82329]/85 text-[#fcf7ea] text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
              {badgeText}
            </div>
          )}
        </div>

        {/* Caption beneath stamp image */}
        {caption && (
          <div className="w-full pt-1 text-center">
            <span className="text-[10px] sm:text-[11px] font-bold text-[#b82329] tracking-wider truncate block font-sans">
              {caption}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
