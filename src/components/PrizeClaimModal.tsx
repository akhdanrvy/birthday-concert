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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#4a1215]/60 backdrop-blur-sm p-4 animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-md rounded-3xl border-4 border-[#b82329] bg-[#fcf7ea] p-6 sm:p-7 text-center shadow-[8px_8px_0px_#b82329]">
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[#b82329] hover:text-[#8f171c] hover:bg-white/60 rounded-full transition cursor-pointer p-1.5"
          aria-label="Tutup Modal"
        >
          <X className="h-5 w-5" />
        </button>

        {!showLocationPhoto ? (
          <>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f4ecdb] text-[#b82329] mb-3 mx-auto border-2 border-[#b82329] shadow-[3px_3px_0px_#b82329]">
              <Sparkles className="h-8 w-8 text-[#b82329]" />
            </div>

            <span className="text-xs uppercase tracking-widest font-black text-[#b82329] block">
              ★ SPECIAL BIRTHDAY DROP UNLOCKED ★
            </span>

            <h2 className="text-2xl font-black text-[#4a1215] mt-1 mb-2 font-sans">{wonItem.name}</h2>
            <div className="text-6xl my-3 animate-bounce">{wonItem.image}</div>

            <p className="text-sm text-[#521316] mb-6 leading-relaxed font-medium">
              Selamat! Hadiah asli ini bukan sekadar virtual. Barangnya sudah disembunyikan di tempat rahasia khusus buat kamu!
            </p>

            <button
              onClick={() => setShowLocationPhoto(true)}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#b82329] border-2 border-[#7a1317] text-[#fcf7ea] font-black uppercase tracking-wider shadow-[4px_4px_0px_#7a1317] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#7a1317] active:scale-95 transition cursor-pointer text-sm sm:text-base"
            >
              <MapPin className="h-5 w-5 text-[#fcf7ea]" />
              Lihat Tempat Sembunyi Hadiah
            </button>
          </>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 text-[#b82329] font-black text-sm mb-2">
              <Gift className="h-4 w-4 text-[#b82329]" /> Tempat Rahasia Kado Terungkap!
            </div>
            <h3 className="text-lg font-black text-[#4a1215] mb-3">Cari di Spot Ini:</h3>

            {/* Tempat Gambar Lokasi Sembunyi */}
            <div className="relative w-full h-56 rounded-2xl overflow-hidden border-2 border-[#b82329] mb-4 bg-[#fffdf8] shadow-inner flex items-center justify-center">
              {!imgFailed ? (
                <img
                  src="./images/hidden-location.jpg"
                  alt="Lokasi Hadiah"
                  className="w-full h-full object-cover"
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-4 text-center">
                  <MapPin className="h-10 w-10 text-[#b82329] mb-2" />
                  <p className="text-xs text-[#4a1215] font-bold">
                    Foto belum dimasukkan
                  </p>
                  <p className="text-[11px] text-[#7a2226] mt-1 font-mono">
                    Simpan file ke: <br />
                    <code className="text-[#b82329] bg-white px-1.5 py-0.5 rounded border border-[#b82329]/30">/public/images/hidden-location.jpg</code>
                  </p>
                </div>
              )}
            </div>

            <p className="text-xs text-[#521316] font-medium mb-5">
              Petunjuk: Periksa laci / kolong meja / lemari kamar sesuai petunjuk di atas. Temukan kotaknya!
            </p>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#fcf7ea] border-2 border-[#b82329] text-[#b82329] font-black uppercase tracking-wider hover:bg-white shadow-[3px_3px_0px_#b82329] transition active:scale-95 cursor-pointer"
            >
              Saya Sudah Menemukannya! (Tutup)
            </button>
          </>
        )}
      </div>
    </div>
  );
};
