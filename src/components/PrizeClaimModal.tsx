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
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-neon-gold/40 bg-stage-dark p-6 text-center shadow-[0_0_50px_rgba(255,209,102,0.3)]">
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white transition cursor-pointer p-1"
          aria-label="Tutup Modal"
        >
          <X className="h-6 w-6" />
        </button>

        {!showLocationPhoto ? (
          <>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-gold/10 text-neon-gold mb-4 mx-auto border border-neon-gold/30 shadow-[0_0_20px_rgba(255,209,102,0.4)]">
              <Sparkles className="h-8 w-8" />
            </div>

            <span className="text-xs uppercase tracking-widest font-mono text-neon-gold block">
              ★ SPECIAL COVERT DROP OBTAINED ★
            </span>

            <h2 className="text-2xl font-black text-white mt-1 mb-2">{wonItem.name}</h2>
            <div className="text-6xl my-4 animate-bounce">{wonItem.image}</div>

            <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
              Selamat! Hadiah asli ini bukan sekadar virtual. Barangnya sudah disembunyikan di tempat rahasia.
            </p>

            <button
              onClick={() => setShowLocationPhoto(true)}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple text-white font-bold uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition cursor-pointer"
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
              {!imgFailed ? (
                <img
                  src="./images/hidden-location.jpg"
                  alt="Lokasi Hadiah"
                  className="w-full h-full object-cover"
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-4 text-center">
                  <MapPin className="h-10 w-10 text-neon-pink mb-2 opacity-80" />
                  <p className="text-xs text-zinc-400 font-mono">
                    Foto belum dimasukkan
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Simpan file ke: <br />
                    <code className="text-zinc-400">/public/images/hidden-location.jpg</code>
                  </p>
                </div>
              )}
            </div>

            <p className="text-xs text-zinc-400 mb-5">
              Petunjuk: Periksa laci / kolong meja / lemari kamar sesuai petunjuk di atas. Temukan kotaknya!
            </p>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-lg bg-zinc-800 text-zinc-200 font-semibold hover:bg-zinc-700 transition cursor-pointer"
            >
              Saya Sudah Menemukannya! (Tutup)
            </button>
          </>
        )}
      </div>
    </div>
  );
};
