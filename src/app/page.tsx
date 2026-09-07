'use client';
import React, { useState, useRef } from 'react';
import { StageIntro } from '@/components/StageIntro';
import { ConcertAmbiance } from '@/components/ConcertAmbiance';
import { DoodleStarsBackground } from '@/components/DoodleStars';
import { StampFrame } from '@/components/StampFrame';
import { CsRoulette } from '@/components/CsRoulette';
import { PrizeClaimModal } from '@/components/PrizeClaimModal';
import { CaseItem } from '@/data/caseItems';
import { Sparkles, Gift, Music2, Volume2, VolumeX } from 'lucide-react';

export default function BirthdayPage() {
  const [hasEnteredStage, setHasEnteredStage] = useState(false);
  const [showCaseOpener, setShowCaseOpener] = useState(false);
  const [wonPrize, setWonPrize] = useState<CaseItem | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  const crowdAudioRef = useRef<HTMLAudioElement | null>(null);

  // List of photo cards that can be cycled in the memory stamp
  const photoList = [
    './images/photocard-1.jpg',
    './images/photocard-2.jpg',
    './images/photocard-3.jpg',
    './images/photocard-4.jpg',
    './images/photocard-5.jpg',
  ];

  const handleNextPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev + 1) % photoList.length);
  };

  const handleEnterStage = () => {
    setHasEnteredStage(true);
    // Jalankan background ambience penonton
    try {
      const audio = new Audio('./audio/crowd.mp3');
      audio.loop = true;
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Browser autoplay or file not found
      });
      crowdAudioRef.current = audio;
    } catch {
      // Audio initialization fallback
    }
  };

  const toggleMute = () => {
    if (!crowdAudioRef.current) return;
    if (isMuted) {
      crowdAudioRef.current.volume = 0.3;
      setIsMuted(false);
    } else {
      crowdAudioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <main className="min-h-screen relative overflow-x-hidden select-text">
      {/* Hand-drawn Maroon Doodle Stars Background */}
      <DoodleStarsBackground />

      {/* Intro Modal Curtain */}
      {!hasEnteredStage && (
        <StageIntro recipientName="Asha Mecca Mandani" onEnterStage={handleEnterStage} />
      )}

      {/* Ambiance lightsticks without dark overlay */}
      <ConcertAmbiance />

      {/* Floating Audio Toggle (appears after entering stage) */}
      {hasEnteredStage && (
        <button
          onClick={toggleMute}
          className="fixed top-4 right-4 z-40 flex items-center gap-2 rounded-full border-2 border-[#b82329] bg-[#fcf7ea] px-3.5 py-1.5 text-xs font-bold text-[#b82329] shadow-[3px_3px_0px_#b82329] hover:bg-white active:translate-x-0.5 active:translate-y-0.5 transition cursor-pointer"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="h-4 w-4 text-[#b82329]" /> : <Volume2 className="h-4 w-4 text-[#b82329]" />}
          <span>{isMuted ? 'SOUND OFF' : 'LIVE AUDIO'}</span>
        </button>
      )}

      {/* Main Scrapbook Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-10 pb-28 sm:pb-24 flex flex-col items-center text-center">
        {/* VIP Pass Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#b82329] bg-[#fcf7ea] px-4 py-1 text-xs font-bold tracking-widest text-[#b82329] mb-6 shadow-[3px_3px_0px_#b82329]">
          <Music2 className="h-3.5 w-3.5 text-[#b82329]" /> SPECIAL SCRAPBOOK EDITION ★ 2026
        </div>

        {/* HERO SECTION: Two Stamps Flanking Puffy Title */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-4 lg:gap-10 my-4 sm:my-8">
          {/* 1. Left Postage Stamp: Memory Photo (-6deg) with Maroon Paperclip */}
          <div className="order-2 md:order-1 flex flex-col items-center">
            <StampFrame
              type="photo"
              rotation={-6}
              photoSrc={photoList[currentPhotoIdx]}
              fallbackSrc="./images/sibling-photo.jpg"
              title="Foto Kenangan"
              caption={`★ KENANGAN #${currentPhotoIdx + 1} ★`}
              onClick={handleNextPhoto}
              badgeText={`${currentPhotoIdx + 1}/5 Klik`}
            />
          </div>

          {/* 2. Center: Puffy 3D Title + Asha Mecca Mandani Washi Tape */}
          <div className="order-1 md:order-2 flex flex-col items-center justify-center max-w-md mx-auto">
            <h1 className="puffy-sticker-title text-6xl sm:text-7xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-center leading-[0.95] select-none my-1">
              Happy<br />Birthday
            </h1>

            {/* Washi tape sticky note with name tilted to the right */}
            <div className="washi-tape-label px-5 py-2 sm:px-7 sm:py-2.5 rounded-lg rotate-2 sm:rotate-3 mt-2 sm:-mt-1 inline-block border-2 border-[#b82329] bg-[#fcf7ea] shadow-[4px_4px_0px_#b82329] hover:rotate-0 transition-transform">
              <span className="text-sm sm:text-base md:text-lg font-black tracking-wider text-[#571317] font-sans block">
                Asha Mecca Mandani
              </span>
            </div>
          </div>

          {/* 3. Right Postage Stamp: Meme Sticker (+6deg) with Maroon Paperclip */}
          <div className="order-3 flex flex-col items-center">
            <StampFrame
              type="meme"
              rotation={6}
              photoSrc="./images/meme-sticker.png"
              title="Stiker Meme"
              caption="★ MOOD HARI INI ★"
            />
          </div>
        </div>

        {/* Surat Doa & Harapan - Kraft/Cream Memo Paper with Bold Maroon Border & Hard Shadow */}
        <div className="relative max-w-xl w-full bg-[#fcf7ea] border-3 border-[#b82329] rounded-2xl p-6 sm:p-7 shadow-[6px_6px_0px_#b82329] text-[#4a1215] leading-relaxed space-y-3 mt-6 mb-12 text-sm sm:text-base font-medium">
          {/* Washi tape topper accent */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#f4ecdb] border-2 border-[#b82329] px-5 py-0.5 text-[11px] font-black uppercase tracking-widest text-[#b82329] shadow-sm rotate-1 rounded-sm">
            Special Birthday Memo
          </div>
          <p className="pt-1">
            Selamat bertambah usia, <strong className="text-[#b82329] font-bold">Asha Mecca Mandani</strong>! Semoga harimu selalu dipenuhi nada-nada bahagia, energi positif tanpa batas, dan semua impian manismu terwujud nyata.
          </p>
          <p>
            Terima kasih sudah selalu jadi sosok yang hebat, seru, dan penuh keceriaan. Di hari spesial ini, ada surprise kotak kado rahasia khusus buat kamu!
          </p>
        </div>

        {/* Section Klaim Hadiah / Trigger Gacha */}
        {!showCaseOpener ? (
          <button
            onClick={() => setShowCaseOpener(true)}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#b82329] border-3 border-[#7a1317] font-black uppercase tracking-wider text-[#fcf7ea] shadow-[6px_6px_0px_#7a1317] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_#7a1317] active:scale-95 transition cursor-pointer text-base sm:text-lg"
          >
            <Gift className="h-6 w-6 text-[#fcf7ea]" /> Buka Kotak Hadiahmu!
          </button>
        ) : (
          <div className="w-full mt-2 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#fcf7ea] border-2 border-[#b82329] text-[#b82329] font-black uppercase tracking-wider text-sm sm:text-base mb-6 shadow-[4px_4px_0px_#b82329]">
              <Sparkles className="h-5 w-5 text-[#b82329]" /> Hayoo dapet hadiah apa ya..
            </div>
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
