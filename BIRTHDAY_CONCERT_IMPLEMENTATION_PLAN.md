# Birthday Concert & CS-Style Case Opening Web App
## Comprehensive Implementation Plan & Theme Guide

Dokumen ini berisi panduan rancangan arsitektur, instalasi dari nol, konfigurasi GitHub Pages static export, implementasi interaktivitas panggung konser (audio crowd/fireworks, lautan lightstick, stage transition), hingga mekanika gacha roulette ala Counter-Strike dengan guaranteed prize reveal.

---

## 1. Theme & Design System Guide (K-Pop Concert VIP Edition)

Konsep visual mengusung atmosfer panggung konser K-Pop skala stadion di malam hari, dipadukan dengan aksen neon lightstick dan antarmuka industrial gaming ala Counter-Strike case opening.

### 1.1 Color Palette & Tokens
* **Stage Void / Deep Night (Backgrounds):**
  * `bg-void`: `#08070d` (Dasar latar belakang stadion gelap)
  * `bg-stage-dark`: `#110e1b` (Permukaan card/modal/ticket)
  * `bg-stage-glass`: `rgba(22, 17, 38, 0.75)` (Glassmorphism card)
* **Lightstick & Neon Glows (Accents):**
  * `neon-pink`: `#ff2a85` (Aksen lightstick utama / glow highlight)
  * `neon-cyan`: `#00f0ff` (Aksen spotlight kedua & particle flash)
  * `neon-purple`: `#9d4edd` (Transisi gradien panggung)
  * `neon-gold`: `#ffd166` (Rarity tier gacha untuk smartphone / ultimate prize)
* **CS-Style Case Tier Colors:**
  * **Mil-Spec (Blue):** `#4b69ff` (Item umum / filler hadiah lucu)
  * **Restricted (Purple):** `#8847ff` (Item tier menengah)
  * **Classified (Pink):** `#d32ce6` (Item langka)
  * **Covert / Special Rare Item (Gold/Red):** `#ffd700` / `#eb4b4b` (Target utama: Smartphone)

### 1.2 Typography
* **Display / Headings:** Sans-serif tegas berkarakter panggung (`font-black tracking-wider uppercase`).
* **Concert Ticket / VIP Badge:** Monospace font (`font-mono tracking-tight`) untuk memberi nuansa tiket barcode konser resmi.
* **Body / Doa & Pesan:** Bersih dan terbaca jelas (`font-sans leading-relaxed text-zinc-200`).

### 1.3 Audio & Sensory Design System
Browser modern memberlakukan kebijakan *Autoplay Restriction*. Seluruh audio dipicu oleh interaksi user pertama kali pada pintu gerbang "ENTER STAGE".
* `ambient_crowd.mp3`: Suara gemuruh lautan penonton konser (looping volume 0.35).
* `firework_burst.mp3`: Suara ledakan kembang api sinkron dengan partikel canvas confetti.
* `cs_case_open.mp3`: SFX pembuka box case.
* `cs_case_tick.mp3`: SFX desingan slider roulette bergerak per item.
* `prize_fanfare.mp3`: SFX kemenangan dramatis saat jarum mendarat di HP.

---

## 2. Directory Structure & Architecture

Struktur folder Next.js App Router (Pure Client-Side / Static Export):

```text
birthday-concert/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions CI/CD to Pages
├── public/
│   ├── audio/
│   │   ├── crowd.mp3
│   │   ├── firework.mp3
│   │   ├── tick.mp3
│   │   └── fanfare.mp3
│   ├── images/
│   │   ├── sibling-photo.jpg       # Foto adik / kenangan
│   │   ├── hidden-location.jpg     # Foto tempat sembunyi kado
│   │   ├── phone-prize.png         # Foto ilustrasi hadiah HP
│   │   └── filler-items/           # Ilustrasi hadiah lucu/gacha
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── globals.css             # Tailwind custom animations & glow
│   │   ├── layout.tsx              # Root HTML & Metadata
│   │   └── page.tsx                # State Controller Utama
│   ├── components/
│   │   ├── AudioController.tsx     # Howler / HTML5 Audio helper
│   │   ├── StageIntro.tsx          # Pintu masuk, petasan & curtain drop
│   │   ├── ConcertAmbiance.tsx     # Efek lightstick crowd & spotlight
│   │   ├── MainConcertContent.tsx  # VIP Pass Card, ucapan & doa
│   │   ├── CsCaseModal.tsx         # Overlay case opener
│   │   ├── CsRoulette.tsx          # Horizontal item carousel engine
│   │   └── PrizeClaimModal.tsx     # Pop-up petunjuk lokasi kado
│   ├── data/
│   │   └── caseItems.ts            # Pool daftar item gacha & guaranteed target
│   └── types/
│       └── index.ts
├── next.config.mjs                 # Static export & basePath config
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 3. Step-by-Step Implementation Guide

### Tahap 1: Setup Proyek & Konfigurasi Dasar

Jalankan perintah berikut di terminal:

```bash
# 1. Inisialisasi proyek Next.js dengan Tailwind CSS & TypeScript
npx create-next-app@latest birthday-concert --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm

# 2. Pindah ke direktori
cd birthday-concert

# 3. Instal dependensi pendukung animasi & audio
npm install canvas-confetti lucide-react clsx tailwind-merge
npm install -D @types/canvas-confetti
```

### Tahap 2: Konfigurasi Static Export (`next.config.mjs`)

Sesuaikan `next.config.mjs` agar kompatibel dengan GitHub Pages sub-path:

```javascript
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repoName = 'birthday-concert'; // Ganti dengan nama repositori GitHub Anda

const nextConfig = {
  output: 'export',
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
```

### Tahap 3: Konfigurasi Custom Styles & Animasi (`tailwind.config.ts` & `globals.css`)

Tambahkan keyframe pendaran neon, goyangan lightstick, dan spotlight beam pada `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#08070d",
        "stage-dark": "#110e1b",
        "neon-pink": "#ff2a85",
        "neon-cyan": "#00f0ff",
        "neon-purple": "#9d4edd",
        "neon-gold": "#ffd166",
      },
      animation: {
        "lightstick-wave": "wave 2.5s ease-in-out infinite alternate",
        "spotlight-sweep": "sweep 8s ease-in-out infinite alternate",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        wave: {
          "0%": { transform: "rotate(-12deg) translateY(0px)" },
          "100%": { transform: "rotate(12deg) translateY(-8px)" },
        },
        sweep: {
          "0%": { transform: "rotate(-25deg)", opacity: "0.2" },
          "50%": { opacity: "0.6" },
          "100%": { transform: "rotate(25deg)", opacity: "0.2" },
        },
        pulseGlow: {
          "0%, 100%": { filter: "drop-shadow(0 0 15px rgba(255, 42, 133, 0.6))" },
          "50%": { filter: "drop-shadow(0 0 30px rgba(0, 240, 255, 0.8))" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

---

## 4. Source Code Components

### 4.1 Data Definisi Item Gacha (`src/data/caseItems.ts`)

```typescript
export interface CaseItem {
  id: string;
  name: string;
  rarity: 'milspec' | 'restricted' | 'classified' | 'covert' | 'special';
  image: string;
  accentColor: string;
  isGuaranteedTarget?: boolean;
}

export const FILLER_ITEMS: CaseItem[] = [
  { id: '1', name: 'Permen Kaki 1 Pcs', rarity: 'milspec', image: '🍬', accentColor: '#4b69ff' },
  { id: '2', name: 'Zonk: Doa Restu', rarity: 'milspec', image: '🙏', accentColor: '#4b69ff' },
  { id: '3', name: 'Gantungan Kunci Lucu', rarity: 'restricted', image: '🧸', accentColor: '#8847ff' },
  { id: '4', name: 'Kuaci 1 Sachet', rarity: 'milspec', image: '🌻', accentColor: '#4b69ff' },
  { id: '5', name: 'Traktir Es Krim Mixue', rarity: 'classified', image: '🍦', accentColor: '#d32ce6' },
  { id: '6', name: 'Voucher Cuci Piring', rarity: 'milspec', image: '🧼', accentColor: '#4b69ff' },
  { id: '7', name: 'Album Musik Favorit', rarity: 'classified', image: '💿', accentColor: '#d32ce6' },
];

export const GUARANTEED_PRIZE: CaseItem = {
  id: 'winner-prize',
  name: 'Special Covert Drop: New Smartphone',
  rarity: 'special',
  image: '📱',
  accentColor: '#ffd166',
  isGuaranteedTarget: true,
};
```

### 4.2 Efek Ambience Panggung & Lightstick (`src/components/ConcertAmbiance.tsx`)

```tsx
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
```

### 4.3 Intro Stage Screen (`src/components/StageIntro.tsx`)

```tsx
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
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-neon-pink to-neon-purple px-8 py-4 text-sm sm:text-base font-bold uppercase tracking-wider text-white shadow-[0_0_35px_rgba(255,42,133,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Play className="h-5 w-5 fill-current" />
          Enter Concert Stage
        </button>
      </div>
    </div>
  );
};
```

### 4.4 Engine CS-Style Gacha Roulette (`src/components/CsRoulette.tsx`)

```tsx
'use client';
import React, { useState, useEffect, useRef } from 'react';
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
    const tickAudio = new Audio('./audio/tick.mp3');
    tickAudio.volume = 0.5;
    let ticks = 0;
    const tickInterval = setInterval(() => {
      tickAudio.currentTime = 0;
      tickAudio.play().catch(() => {});
      ticks++;
      if (ticks > 45) clearInterval(tickInterval);
    }, 110);

    // Animasi berlangsung selama 6 detik sesuai transition CSS
    setTimeout(() => {
      setIsSpinning(false);
      clearInterval(tickInterval);
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
        className="mt-6 px-8 py-3.5 rounded-lg bg-gradient-to-r from-neon-gold via-amber-500 to-yellow-600 font-extrabold uppercase tracking-wider text-black shadow-[0_0_25px_rgba(255,209,102,0.5)] transition hover:scale-105 active:scale-95 disabled:opacity-50"
      >
        {isSpinning ? 'Rolling Case...' : 'Buka Case Sekarang!'}
      </button>
    </div>
  );
};
```

### 4.5 Pop-up Lokasi Hadiah (`src/components/PrizeClaimModal.tsx`)

```tsx
'use client';
import React, { useState } from 'react';
import { CaseItem } from '@/data/caseItems';
import { MapPin, X, Gift, Sparkles } from 'lucide-react';

interface PrizeClaimModalProps {
  wonItem: CaseItem;
  onClose: () => void;
}

export const PrizeClaimModal: React.FC<PrizeClaimModalProps> = ({ wonItem, onClose }) => {
  const [showLocationPhoto, setShowLocationPhoto] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-neon-gold/40 bg-stage-dark p-6 text-center shadow-[0_0_50px_rgba(255,209,102,0.3)]">
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white transition"
        >
          <X className="h-6 w-6" />
        </button>

        {!showLocationPhoto ? (
          <>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-gold/10 text-neon-gold mb-4 mx-auto border border-neon-gold/30 shadow-[0_0_20px_rgba(255,209,102,0.4)]">
              <Sparkles className="h-8 w-8" />
            </div>

            <span className="text-xs uppercase tracking-widest font-mono text-neon-gold">
              ★ SPECIAL COVERT DROP OBTAINED ★
            </span>

            <h2 className="text-2xl font-black text-white mt-1 mb-2">{wonItem.name}</h2>
            <div className="text-6xl my-4 animate-bounce">{wonItem.image}</div>

            <p className="text-sm text-zinc-300 mb-6">
              Selamat! Hadiah asli ini bukan sekadar virtual. Barangnya sudah disembunyikan di tempat rahasia.
            </p>

            <button
              onClick={() => setShowLocationPhoto(true)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple text-white font-bold uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition"
            >
              <MapPin className="h-5 w-5" />
              Lihat Tempat Sembunyi Hadiah
            </button>
          </>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 text-neon-cyan font-bold text-sm mb-3">
              <Gift className="h-4 w-4" /> Secret Stash Revealed!
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Cari di Spot Ini:</h3>

            {/* Tempat Gambar Lokasi Sembunyi */}
            <div className="relative w-full h-56 rounded-xl overflow-hidden border border-zinc-700 mb-4 bg-zinc-900 flex items-center justify-center">
              <img
                src="./images/hidden-location.jpg"
                alt="Lokasi Hadiah"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback jika foto belum dimasukkan
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="absolute text-xs text-zinc-500 px-4">
                (Taruh file foto lokasi di /public/images/hidden-location.jpg)
              </span>
            </div>

            <p className="text-xs text-zinc-400 mb-5">
              Petunjuk: Periksa laci / kolong meja / lemari kamar sesuai foto di atas. Temukan kotaknya!
            </p>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-lg bg-zinc-800 text-zinc-200 font-semibold hover:bg-zinc-700 transition"
            >
              Saya Sudah Menemukannya! (Tutup)
            </button>
          </>
        )}
      </div>
    </div>
  );
};
```

### 4.6 Main Page Controller (`src/app/page.tsx`)

```tsx
'use client';
import React, { useState, useRef } from 'react';
import { StageIntro } from '@/components/StageIntro';
import { ConcertAmbiance } from '@/components/ConcertAmbiance';
import { CsRoulette } from '@/components/CsRoulette';
import { PrizeClaimModal } from '@/components/PrizeClaimModal';
import { CaseItem } from '@/data/caseItems';
import { Sparkles, Gift, Music2 } from 'lucide-react';

export default function BirthdayPage() {
  const [hasEnteredStage, setHasEnteredStage] = useState(false);
  const [showCaseOpener, setShowCaseOpener] = useState(false);
  const [wonPrize, setWonPrize] = useState<CaseItem | null>(null);

  const crowdAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleEnterStage = () => {
    setHasEnteredStage(true);
    // Jalankan background ambience penonton
    const audio = new Audio('./audio/crowd.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audio.play().catch(() => {});
    crowdAudioRef.current = audio;
  };

  return (
    <main className="min-h-screen bg-void text-zinc-100 relative overflow-x-hidden selection:bg-neon-pink selection:text-white">
      {/* Intro Modal Curtain */}
      {!hasEnteredStage && (
        <StageIntro recipientName="Adik Tercinta" onEnterStage={handleEnterStage} />
      )}

      {/* Dynamic Lightstick & Concert Ambiance */}
      <ConcertAmbiance />

      {/* Main Concert Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 flex flex-col items-center text-center">
        {/* VIP Concert Ticket Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-4 py-1 text-xs font-mono tracking-widest text-neon-cyan mb-6">
          <Music2 className="h-3.5 w-3.5" /> VIP ALL-ACCESS PASS #BDAY-2026
        </div>

        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-4">
          Happy Birthday, <br />
          <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan bg-clip-text text-transparent">
            Adikku Tersayang!
          </span>
        </h1>

        {/* Polaroid Card / Foto Kenangan */}
        <div className="my-8 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(157,78,221,0.2)] max-w-sm rotate-[-2deg] hover:rotate-0 transition duration-300">
          <div className="w-full h-72 rounded-xl bg-zinc-800 overflow-hidden relative flex items-center justify-center">
            <img
              src="./images/sibling-photo.jpg"
              alt="Foto Bersama"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="absolute text-xs text-zinc-500 px-4">
              (Simpan foto adik di /public/images/sibling-photo.jpg)
            </span>
          </div>
          <p className="mt-3 font-mono text-xs text-zinc-400">
            ★ World Tour Edition — Special Moments ★
          </p>
        </div>

        {/* Surat Doa & Harapan */}
        <div className="max-w-xl text-zinc-300 leading-relaxed space-y-4 mb-12 text-sm sm:text-base">
          <p>
            Selamat bertambah usia! Semoga harimu selalu dipenuhi nada-nada bahagia, energi positif tanpa batas, dan mimpi-mimpimu bisa konser di panggung dunia nyata.
          </p>
          <p>
            Terima kasih sudah selalu jadi adik yang hebat dan seru. Di hari spesial ini, ada surprise kotak case eksklusif buat kamu!
          </p>
        </div>

        {/* Section Klaim Hadiah / Trigger Gacha */}
        {!showCaseOpener ? (
          <button
            onClick={() => setShowCaseOpener(true)}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan font-black uppercase tracking-wider text-white shadow-[0_0_30px_rgba(255,42,133,0.5)] hover:scale-105 active:scale-95 transition"
          >
            <Gift className="h-5 w-5" /> Klaim Hadiahmu!
          </button>
        ) : (
          <div className="w-full mt-4">
            <h2 className="text-xl font-bold uppercase tracking-wider text-neon-gold mb-4 flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5" /> Counter-Strike Birthday Case
            </h2>
            <CsRoulette onSpinFinished={(won) => setWonPrize(won)} />
          </div>
        )}
      </div>

      {/* Modal Popup Klaim & Lokasi */}
      {wonPrize && (
        <PrizeClaimModal wonItem={wonPrize} onClose={() => setWonPrize(null)} />
      )}
    </main>
  );
}
```

---

## 5. Deployment Guide ke GitHub Pages via GitHub Actions

1. Buat repositori baru di GitHub dengan nama misal: `birthday-concert`.
2. Buat file `.github/workflows/deploy.yml` dengan isi workflow build Next.js standar.
3. Hubungkan git lokal dan push ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete concert theme birthday web with CS case opening"
   git branch -M main
   git remote add origin https://github.com/<username>/birthday-concert.git
   git push -u origin main
   ```
4. Di halaman GitHub repository:
   * Masuk ke **Settings** > **Pages**.
   * Di bagian **Build and deployment > Source**, ubah dari *Deploy from a branch* menjadi **GitHub Actions**.
5. Tunggu sekitar 1–2 menit, website sudah live dan dapat diakses di `https://<username>.github.io/birthday-concert/`.

---

## 6. Checklist Persiapan Aset Sebelum Antigravity Execution

Sebelum menjalankan proyek, pastikan menyiapkan aset file berikut di folder `public/`:
1. `public/audio/crowd.mp3`: Suara sorak penonton konser.
2. `public/audio/firework.mp3`: Suara petasan/kembang api.
3. `public/audio/tick.mp3`: Suara klik roulette berputar pendek (100–200ms).
4. `public/images/sibling-photo.jpg`: Foto adik atau foto bersama.
5. `public/images/hidden-location.jpg`: Foto spot tempat Anda menyembunyikan kotak HP.
