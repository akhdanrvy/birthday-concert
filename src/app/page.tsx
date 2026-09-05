'use client';
import React, { useState, useRef } from 'react';
import { StageIntro } from '@/components/StageIntro';
import { ConcertAmbiance } from '@/components/ConcertAmbiance';
import { PhotocardStack } from '@/components/PhotocardStack';
import { CsRoulette } from '@/components/CsRoulette';
import { PrizeClaimModal } from '@/components/PrizeClaimModal';
import { CaseItem } from '@/data/caseItems';
import { Sparkles, Gift, Music2, Volume2, VolumeX } from 'lucide-react';

export default function BirthdayPage() {
  const [hasEnteredStage, setHasEnteredStage] = useState(false);
  const [showCaseOpener, setShowCaseOpener] = useState(false);
  const [wonPrize, setWonPrize] = useState<CaseItem | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const crowdAudioRef = useRef<HTMLAudioElement | null>(null);

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
    <main className="min-h-screen bg-void text-zinc-100 relative overflow-x-hidden selection:bg-neon-pink selection:text-white">
      {/* Intro Modal Curtain */}
      {!hasEnteredStage && (
        <StageIntro recipientName="Adik Tercinta" onEnterStage={handleEnterStage} />
      )}

      {/* Dynamic Lightstick & Concert Ambiance */}
      <ConcertAmbiance />

      {/* Floating Audio Toggle (appears after entering stage) */}
      {hasEnteredStage && (
        <button
          onClick={toggleMute}
          className="fixed top-4 right-4 z-40 flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/80 px-3.5 py-2 text-xs font-mono text-zinc-300 backdrop-blur-md shadow-lg hover:border-neon-pink/50 hover:text-white transition cursor-pointer"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4 text-neon-pink" />}
          <span>{isMuted ? 'SOUND OFF' : 'LIVE AUDIO'}</span>
        </button>
      )}

      {/* Main Concert Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-14 pb-28 sm:pb-24 flex flex-col items-center text-center">
        {/* VIP Concert Ticket Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-4 py-1 text-xs font-mono tracking-widest text-neon-cyan mb-6 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
          <Music2 className="h-3.5 w-3.5" /> VIP ALL-ACCESS PASS #BDAY-2026
        </div>

        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-4">
          Happy Birthday, <br />
          <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan bg-clip-text text-transparent">
            Adikku Tersayang!
          </span>
        </h1>

        {/* K-Pop Photocard Stack (5 Photos) */}
        <PhotocardStack />

        {/* Surat Doa & Harapan */}
        <div className="max-w-xl w-full text-zinc-100 leading-relaxed space-y-4 mb-12 text-sm sm:text-base bg-black/50 sm:bg-black/40 backdrop-blur-md px-6 py-5 rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <p className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Selamat bertambah usia! Semoga harimu selalu dipenuhi nada-nada bahagia, energi positif tanpa batas, dan mimpi-mimpimu bisa konser di panggung dunia nyata.
          </p>
          <p className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Terima kasih sudah selalu jadi adik yang hebat dan seru. Di hari spesial ini, ada surprise kotak case eksklusif buat kamu!
          </p>
        </div>

        {/* Section Klaim Hadiah / Trigger Gacha */}
        {!showCaseOpener ? (
          <button
            onClick={() => setShowCaseOpener(true)}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan font-black uppercase tracking-wider text-white shadow-[0_0_30px_rgba(255,42,133,0.5)] hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            <Gift className="h-5 w-5" /> Klaim Hadiahmu!
          </button>
        ) : (
          <div className="w-full mt-4">
            <h2 className="text-xl font-bold uppercase tracking-wider text-neon-gold mb-4 flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5" /> Hayoo dapet hadaiah apa ya..
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
