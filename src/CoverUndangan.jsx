import React, { useState, useEffect } from 'react';

import namaImg from './assets/NAMA.png';
import fotoMempelai from './assets/FOTO.png';
import motifBawah from './assets/MOTIF MINANG BAWAH.png';
import ornamenJawa from './assets/MOTIF ORNAMEN JAWA.png';
import fotoWanita from './assets/fotowanita.jpg';
import fotoPria from './assets/fotopria.jpg';
import fotoPrewed1 from './assets/foto2.jpg';
import fotoPrewed2 from './assets/foto1.jpg';
import fotoPrewed3 from './assets/foto3.jpg';

export default function CoverUndangan({ onOpen, isOpening }) {
  const [guestName, setGuestName] = useState('Tamu Undangan');
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Ambil nama tamu dari URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryGuest = searchParams.get('to') || searchParams.get('n');

    if (queryGuest) {
      setGuestName(decodeURIComponent(queryGuest));
    } else {
      const pathGuest = window.location.pathname.substring(1);
      if (pathGuest && pathGuest !== '/') {
        setGuestName(decodeURIComponent(pathGuest.replace(/\+/g, ' ')));
      }
    }
  }, []);

  // Preload semua aset gambar utama agar tidak patah saat cover dibuka
  useEffect(() => {
    const imageAssets = [
      namaImg,
      fotoMempelai,
      motifBawah,
      ornamenJawa,
      fotoWanita,
      fotoPria,
      fotoPrewed1,
      fotoPrewed2,
      fotoPrewed3
    ];

    let loadedCount = 0;
    const total = imageAssets.length;

    const handleAssetDone = () => {
      loadedCount += 1;
      const percent = Math.round((loadedCount / total) * 100);
      setLoadProgress(percent);

      if (loadedCount >= total) {
        setTimeout(() => setIsLoaded(true), 400);
      }
    };

    imageAssets.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = handleAssetDone;
      img.onerror = handleAssetDone;
    });

    // Fallback maksimal 5 detik jika koneksi sangat lambat
    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 5000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float { animation: floatUpDown 4s ease-in-out infinite; }
        .animate-float-delayed { animation: floatUpDown 4s ease-in-out 2s infinite; }
        
        @keyframes nameGentleSway {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(0.8deg); }
        }
        .animate-name-sway { animation: nameGentleSway 3.5s ease-in-out infinite; }

        @keyframes moveLeftRight {
          0%, 100% { transform: translateX(-6px); }
          50% { transform: translateX(6px); }
        }
        .animate-slide-horizontal { animation: moveLeftRight 6s ease-in-out infinite; }

        @keyframes spinGold {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-gold { animation: spinGold 1.4s linear infinite; }
      `}</style>

      {/* OVERLAY LOADING SEBELUM RESOURCE SELESAI */}
      <div
        className={`fixed inset-0 z-50 bg-[#3a0509] flex flex-col items-center justify-center px-6 transition-all duration-700 ${
          isLoaded ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
        }`}
      >
        <div className="relative w-16 h-16 flex items-center justify-center mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-[#f0c243]/20" />
          <div className="absolute inset-0 rounded-full border-2 border-t-[#f0c243] border-r-transparent border-b-transparent border-l-transparent animate-spin-gold" />
          <span className="font-serif text-sm font-bold text-[#ffd875] tracking-widest">
            W&amp;I
          </span>
        </div>

        <p className="font-serif text-sm text-[#ffd875] tracking-widest uppercase mb-2">
          Memuat Undangan
        </p>

        <div className="w-48 h-1.5 bg-[#50060c] rounded-full overflow-hidden border border-[#f0c243]/30">
          <div
            className="h-full bg-[#f0c243] transition-all duration-300 ease-out rounded-full"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
        <span className="font-sans text-[11px] text-[#ffd875]/80 mt-1.5">
          {loadProgress}%
        </span>
      </div>

      {/* BACKGROUND UTAMA DESKTOP & MOBILE */}
      <div className="min-h-mobile bg-[#3a0509] relative flex items-center justify-center overflow-hidden font-serif">
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#7a0c14] via-[#4a060b] to-[#200204] opacity-90" />
        </div>

        {/* CONTAINER UTAMA HP */}
        <div className="w-full max-w-[430px] h-mobile lg:h-[880px] lg:max-h-[92vh] relative overflow-hidden bg-[#7a0c14] flex flex-col justify-between shadow-2xl lg:rounded-[36px] lg:border-8 lg:border-[#52090f] z-10">
          {/* 1. LAYER FOTO */}
          <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
            <img
              src={fotoMempelai}
              alt="Foto Mempelai Windi & Iqbal"
              className={`w-full h-full object-cover object-center scale-100 translate-y-10 transition-all duration-700 ease-out ${
                isOpening ? 'opacity-0 scale-105' : 'opacity-100'
              }`}
            />
            <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#50060c] via-[#50060c]/75 to-transparent z-1 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#50060c] via-[#50060c]/85 to-transparent z-1 pointer-events-none" />
          </div>

          {/* 2. ORNAMEN JAWA ATAS */}
          <div className="absolute top-0 inset-x-0 pointer-events-none z-10">
            <img
              src={ornamenJawa}
              alt="Ornamen Kiri"
              className={`absolute w-36 sm:w-44 h-auto -top-3 -left-10 opacity-30 brightness-50 rotate-30 transition-all duration-750 ease-in-out ${
                isOpening ? '-translate-y-36 -translate-x-36 opacity-0' : 'animate-float'
              }`}
            />
            <img
              src={ornamenJawa}
              alt="Ornamen Kanan"
              className={`absolute w-36 sm:w-44 h-auto -top-3 -right-10 opacity-30 brightness-50 -rotate-30 transition-all duration-750 ease-in-out ${
                isOpening ? '-translate-y-36 translate-x-36 opacity-0' : 'animate-float-delayed'
              }`}
            />
          </div>

          {/* 3. AREA KONTEN */}
          <div className="relative z-20 flex-1 flex flex-col justify-between items-center px-6 pt-10 pb-4">
            <div
              className={`w-full text-center transition-all duration-700 ease-in-out ${
                isOpening ? '-translate-y-48 opacity-0 scale-90' : 'animate-name-sway'
              }`}
            >
              <img
                src={namaImg}
                alt="Windi & Iqbal"
                className="w-3/5 max-w-[230px] sm:max-w-[250px] mx-auto drop-shadow-[0_5px_15px_rgba(0,0,0,0.6)]"
              />
            </div>

            <div className="w-full flex flex-col items-center space-y-3 text-center font-sans mb-1">
              <div>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#ffd875]/90 font-medium">
                  Kepada Yth; Bapak/Ibu/Saudara/i
                </p>
                <h3 className="text-base sm:text-lg font-bold text-white capitalize drop-shadow-md mt-0.5 max-w-[280px] ">
                  {guestName}
                </h3>
              </div>

              <button
                onClick={() => onOpen(guestName)}
                disabled={isOpening || !isLoaded}
                className="bg-[#f0c243] hover:bg-[#d9ab30] active:scale-95 text-[#50060c] font-sans font-bold text-xs sm:text-sm tracking-wider uppercase py-2.5 px-8 rounded-full shadow-xl border border-[#ffd875] transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                BUKA UNDANGAN
              </button>
            </div>
          </div>

          {/* 4. MOTIF ETHNIC MINANG BAWAH */}
          <div className="relative z-30 w-full leading-none overflow-hidden shrink-0">
            <img
              src={motifBawah}
              alt="Motif Minang Bawah"
              className="w-full h-auto block object-cover animate-slide-horizontal scale-105"
            />
          </div>
        </div>
      </div>
    </>
  );
}