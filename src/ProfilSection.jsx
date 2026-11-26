import React, { useState, useEffect, useRef } from 'react';

import fotoWanita from './assets/fotowanita.jpg';
import fotoPria from './assets/fotopria.jpg';

const IG_WANITA = 'https://www.instagram.com/msf_windi?jplx=a2Zpa2thaHphczdz';
const IG_PRIA = 'https://www.instagram.com/fbr_iqbal?avpt=NmR5bmdmb3VqenUy';

export default function ProfilSection() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const el = containerRef.current;
      const scrollableParent = el.closest('.overflow-y-auto');

      const elRect = el.getBoundingClientRect();
      const parentTop = scrollableParent ? scrollableParent.getBoundingClientRect().top : 0;
      const parentHeight = scrollableParent ? scrollableParent.clientHeight : window.innerHeight;

      const totalHeight = elRect.height - parentHeight;
      if (totalHeight <= 0) return;

      const currentScroll = parentTop - elRect.top;
      const progress = Math.min(Math.max(currentScroll / totalHeight, 0), 1);
      setScrollProgress(progress);
    };

    const scrollableParent = containerRef.current?.closest('.overflow-y-auto') || window;
    scrollableParent.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => scrollableParent.removeEventListener('scroll', handleScroll);
  }, []);

  const isPriaActive = scrollProgress >= 0.45;

  // Paralaks halus pada wrapper luar (bukan pada <img> langsung agar bagian atas/kepala tidak ke-crop)
  const wanitaWrapY = (scrollProgress - 0.5) * 18;
  const priaWrapY = (0.5 - scrollProgress) * 18;

  const scrollToProfile = (target) => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const scrollableParent = el.closest('.overflow-y-auto');
    if (!scrollableParent) return;

    const elRect = el.getBoundingClientRect();
    const parentRect = scrollableParent.getBoundingClientRect();
    const sectionOffsetTop = scrollableParent.scrollTop + (elRect.top - parentRect.top);
    const totalScrollableDistance = Math.max(el.offsetHeight - scrollableParent.clientHeight, 0);

    const targetScrollTop =
      target === 'wanita'
        ? sectionOffsetTop
        : sectionOffsetTop + totalScrollableDistance * 0.65;

    scrollableParent.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth',
    });
  };

  return (
    <section ref={containerRef} className="relative h-[200dvh] lg:h-[1650px] w-full">
      {/* Sticky Container mengikuti tinggi layar / kontainer HP */}
      <div className="sticky top-0 h-[100dvh] lg:h-[880px] lg:max-h-[92vh] w-full flex flex-col justify-between overflow-hidden bg-[#7a0c14]">
        {/* FOTO FULL BLEED: paralaks di wrapper, gambar tetap object-cover object-top */}
        <div className="relative w-full h-[65%] overflow-hidden shrink-0">
          {/* Wrapper Mempelai Wanita */}
          <div
            style={{
              transform: `translate3d(0, ${wanitaWrapY.toFixed(1)}px, 0) scale(${isPriaActive ? 1.05 : 1})`,
            }}
            className={`absolute inset-0 w-full h-full will-change-transform transition-all duration-500 ease-out ${
              isPriaActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <img
              src={fotoWanita}
              alt="Mempelai Wanita - Windi"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Wrapper Mempelai Pria */}
          <div
            style={{
              transform: `translate3d(0, ${priaWrapY.toFixed(1)}px, 0) scale(${isPriaActive ? 1 : 1.05})`,
            }}
            className={`absolute inset-0 w-full h-full will-change-transform transition-all duration-500 ease-out ${
              isPriaActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={fotoPria}
              alt="Mempelai Pria - Iqbal"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#7a0c14] via-[#7a0c14]/80 to-transparent z-10 pointer-events-none" />
        </div>

        {/* TEKS PROFIL DI BAWAH FOTO (AGAK MEPET KE ATAS AGAR MUAT RAPI) */}
        <div className="relative z-10 flex-1 -mt-5 bg-[#7a0c14] px-4 pb-14 flex flex-col items-center justify-start pt-1 text-center font-sans">
          {/* TOMBOL INDIKATOR PERPINDAHAN DI ATAS NAMA */}
          <div className="mb-2 flex flex-col items-center">
            <div className="bg-[#50060c]/90 border border-[#f0c243]/40 p-1 rounded-full shadow-md flex items-center space-x-1">
              <button
                type="button"
                onClick={() => scrollToProfile('wanita')}
                className={`px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center space-x-1.5 ${
                  !isPriaActive
                    ? 'bg-[#f0c243] text-[#50060c] shadow-sm'
                    : 'text-[#ffd875]/75 hover:text-white'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    !isPriaActive ? 'bg-[#50060c]' : 'bg-[#ffd875]/40'
                  }`}
                />
                <span>Mempelai Wanita</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToProfile('pria')}
                className={`px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center space-x-1.5 ${
                  isPriaActive
                    ? 'bg-[#f0c243] text-[#50060c] shadow-sm'
                    : 'text-[#ffd875]/75 hover:text-white'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isPriaActive ? 'bg-[#50060c]' : 'bg-[#ffd875]/40'
                  }`}
                />
                <span>Mempelai Pria</span>
              </button>
            </div>

            {/* Progress Bar Tipis Penanda Scroll */}
            <div className="w-32 h-1 bg-[#50060c] rounded-full overflow-hidden mt-1.5 border border-[#f0c243]/20">
              <div
                className="h-full bg-[#f0c243] transition-all duration-150 ease-out rounded-full"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>

          {/* WRAPPER KONTEN TEKS PROFIL */}
          <div className="relative w-full max-w-xs flex items-center justify-center">
            {/* PROFIL WINDI */}
            <div
              className={`transition-all duration-500 ease-out space-y-1 w-full ${
                !isPriaActive
                  ? 'opacity-100 translate-y-0 relative'
                  : 'opacity-0 -translate-y-4 absolute pointer-events-none'
              }`}
            >
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#ffd875] tracking-wide leading-tight">
                Ns. Maisafa Windi Ilham, S.Kep
              </h3>
              <a
                href={IG_WANITA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#50060c]/85 hover:bg-[#f0c243] text-[#ffd875] hover:text-[#50060c] border border-[#f0c243]/40 text-[11px] font-medium transition-colors"
              >
                <span>@msf_windi</span>
              </a>
              <p className="text-[11px] text-gray-300 pt-0.5">Anak ke empat dari:</p>
              <div className="text-xs sm:text-sm font-semibold text-white leading-snug">
                <p>Bapak Suparjo</p>
                <p>Ibu Suwantini</p>
              </div>

              <button
                type="button"
                onClick={() => scrollToProfile('pria')}
                className="inline-flex items-center space-x-1 text-[10px] text-[#ffd875]/80 hover:text-[#ffd875] animate-bounce pt-0.5 cursor-pointer"
              >
                <span>Scroll untuk profil mempelai pria</span>
                <span>↓</span>
              </button>
            </div>

            {/* PROFIL IQBAL */}
            <div
              className={`transition-all duration-500 ease-out space-y-1 w-full ${
                isPriaActive
                  ? 'opacity-100 translate-y-0 relative'
                  : 'opacity-0 translate-y-4 absolute pointer-events-none'
              }`}
            >
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#ffd875] tracking-wide leading-tight">
                Febriatul Iqbal, S.Kom
              </h3>
              <a
                href={IG_PRIA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#50060c]/85 hover:bg-[#f0c243] text-[#ffd875] hover:text-[#50060c] border border-[#f0c243]/40 text-[11px] font-medium transition-colors"
              >
                <span>@fbr_iqbal</span>
              </a>
              <p className="text-[11px] text-gray-300 pt-0.5">Anak pertama dari:</p>
              <div className="text-xs sm:text-sm font-semibold text-white leading-snug">
                <p>Bapak Guspendri (Alm)</p>
                <p>Ibu Pispa Meri Yenti</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}