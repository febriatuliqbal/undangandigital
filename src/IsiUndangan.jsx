import React, { useState, useEffect, useRef } from 'react';
import ProfilSection from './ProfilSection';
import HeroCarousel from './components/HeroCarousel';
import CountdownSection from './components/CountdownSection';
import AcaraLokasiSection from './components/AcaraLokasiSection';
import AmplopUcapanSection from './components/AmplopUcapanSection';
import GaleriSection from './components/GaleriSection';
import LoveJourneySection from './components/LoveJourneySection';

import motifBawah from './assets/MOTIF MINANG BAWAH.png';
import ornamenJawa from './assets/MOTIF ORNAMEN JAWA.png';

export default function IsiUndangan({ guestName, isPlaying, toggleAudio }) {
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const scrollContainerRef = useRef(null);

  // AUTO SCROLLING EFFECT
  useEffect(() => {
    let scrollInterval;
    if (isAutoScrolling) {
      scrollInterval = setInterval(() => {
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          container.scrollBy({ top: 1.5, behavior: 'auto' });

          if (container.scrollTop + container.clientHeight >= container.scrollHeight - 2) {
            setIsAutoScrolling(false);
          }
        }
      }, 25);
    }
    return () => clearInterval(scrollInterval);
  }, [isAutoScrolling]);

  // DETEKSI POSISI SCROLL (BOTTOM CHECK)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const checkBottom = () => {
      const reachedBottom =
        container.scrollTop + container.clientHeight >= container.scrollHeight - 40;
      setIsAtBottom(reachedBottom);
    };

    checkBottom();
    container.addEventListener('scroll', checkBottom, { passive: true });
    window.addEventListener('resize', checkBottom);

    return () => {
      container.removeEventListener('scroll', checkBottom);
      window.removeEventListener('resize', checkBottom);
    };
  }, []);

  // PERBAIKAN ANIMASI SCROLL IN / OUT
  useEffect(() => {
    const getHiddenClasses = (el) => {
      const animType = el.getAttribute('data-anim') || 'bottom';
      if (animType === 'left') return ['opacity-0', '-translate-x-8'];
      if (animType === 'right') return ['opacity-0', 'translate-x-8'];
      return ['opacity-0', 'translate-y-6'];
    };

    const getVisibleClasses = () => [
      'opacity-100',
      'translate-x-0',
      'translate-y-0',
    ];

    const showElement = (el) => {
      el.classList.remove(...getHiddenClasses(el));
      el.classList.add(...getVisibleClasses());
    };

    const hideElement = (el) => {
      el.classList.remove(...getVisibleClasses());
      el.classList.add(...getHiddenClasses(el));
    };

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach((el) => hideElement(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;

          if (entry.isIntersecting) {
            showElement(target);
          } else {
            hideElement(target);
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.15,
        rootMargin: '-5% 0px -5% 0px',
      }
    );

    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleBottomAction = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (isAtBottom) {
      setIsAutoScrolling(false);
      container.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({
        top: Math.round(container.clientHeight * 0.75),
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <style>{`
        @keyframes moveLeftRight {
          0%, 100% { transform: translateX(-6px); }
          50% { transform: translateX(6px); }
        }
        .animate-slide-horizontal { animation: moveLeftRight 6s ease-in-out infinite; }
        
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spinSlow 5s linear infinite; }

        @keyframes floatUpDownStrong {
          0%, 100% { transform: translate3d(0px, 0px, 0) rotate(0deg) scale(1); }
          35% { transform: translate3d(8px, -16px, 0) rotate(6deg) scale(1.04); }
          70% { transform: translate3d(-8px, 12px, 0) rotate(-6deg) scale(0.97); }
        }
        .animate-float { animation: floatUpDownStrong 3.6s ease-in-out infinite; }
        .animate-float-delayed { animation: floatUpDownStrong 3.6s ease-in-out 1.8s infinite; }

        @keyframes swayOrnament {
          0%, 100% { transform: translate3d(0px, 0px, 0) rotate(-14deg); }
          50% { transform: translate3d(14px, -10px, 0) rotate(12deg); }
        }
        .animate-ornamen-sway { animation: swayOrnament 4.2s ease-in-out infinite; }
        .animate-ornamen-sway-reverse { animation: swayOrnament 4.2s ease-in-out 2.1s infinite reverse; }

        @keyframes nudgeDown {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(5px); }
        }
        .animate-nudge-down { animation: nudgeDown 1.2s ease-in-out infinite; }

        @keyframes nudgeUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        .animate-nudge-up { animation: nudgeUp 1.4s ease-in-out infinite; }
      `}</style>

      <div className="min-h-mobile bg-[#3a0509] relative flex items-center justify-center overflow-hidden font-serif">
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#7a0c14] via-[#4a060b] to-[#200204] opacity-90" />
        </div>

        {/* CONTAINER UTAMA HP */}
        <div
          ref={scrollContainerRef}
          className="w-full max-w-[430px] h-mobile lg:h-[880px] lg:max-h-[92vh] relative overflow-y-auto overflow-x-hidden bg-[#7a0c14] flex flex-col shadow-2xl lg:rounded-[36px] lg:border-8 lg:border-[#52090f] z-10 text-white"
        >
          {/* STICKY TOP BADGE & KONTROL */}
          <div className="sticky top-0 z-50 w-full h-0 pointer-events-none">
            <div className="flex justify-between items-start px-4 pt-4">
              <div className="bg-[#50060c]/85 border border-[#ffd875]/40 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5">
                <span className="text-[10px] uppercase text-[#ffd875]/80 font-sans tracking-wider">Dear:</span>
                <span className="text-xs font-bold text-white font-sans capitalize max-w-[130px] truncate">
                  {guestName}
                </span>
              </div>

              <div className="flex flex-col space-y-2.5 pointer-events-auto">
                <button
                  onClick={toggleAudio}
                  className="w-9 h-9 bg-[#f0c243]/90 text-[#50060c] rounded-full flex justify-center items-center shadow-xl border border-[#ffd875] backdrop-blur-md cursor-pointer transition-transform active:scale-90"
                  title={isPlaying ? 'Mute Musik' : 'Play Musik'}
                >
                  <span className={`text-base ${isPlaying ? 'animate-spin-slow' : ''}`}>🎵</span>
                </button>

                <button
                  onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                  className={`w-9 h-9 rounded-full flex justify-center items-center shadow-xl border backdrop-blur-md transition-all active:scale-90 cursor-pointer ${
                    isAutoScrolling
                      ? 'bg-red-600 border-red-400 text-white animate-pulse'
                      : 'bg-[#f0c243]/90 border-[#ffd875] text-[#50060c]'
                  }`}
                >
                  <span className="text-xs font-bold">{isAutoScrolling ? '⏸' : '▶'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* KONTEN UTAMA */}
          <div className="relative flex-1 bg-[#3a0509]">
            {/* HERO CAROUSEL */}
            <div className="sticky top-0 z-10 w-full bg-[#60050c]">
              <HeroCarousel />
            </div>

            {/* LAYER KONTEN UTAMA */}
            <div className="relative z-20 pt-8 pb-24 space-y-12 bg-gradient-to-b from-[#6d070e] via-[#850e18] to-[#6d0912]">
              <img
                src={ornamenJawa}
                alt="Ornamen Jawa Tengah Kiri"
                className="absolute top-[24%] -left-16 w-48 h-auto opacity-30 brightness-75 animate-ornamen-sway pointer-events-none z-0"
              />
              <img
                src={ornamenJawa}
                alt="Ornamen Jawa Tengah Kanan"
                className="absolute top-[50%] -right-16 w-48 h-auto opacity-30 brightness-75 animate-ornamen-sway-reverse pointer-events-none z-0"
              />
              <img
                src={ornamenJawa}
                alt="Ornamen Jawa Bawah Kiri"
                className="absolute top-[76%] -left-14 w-44 h-auto opacity-25 brightness-75 animate-float pointer-events-none z-0"
              />

              <CountdownSection
                isAutoScrolling={isAutoScrolling}
                onToggleAutoScroll={() => setIsAutoScrolling(!isAutoScrolling)}
              />
              <ProfilSection />
              <AcaraLokasiSection />
              <LoveJourneySection />              
              <GaleriSection />
              <AmplopUcapanSection guestName={guestName} />
            </div>
          </div>

          {/* TOMBOL NAVIGASI BOTTOM (PANAH UP/DOWN) */}
          <div className="sticky bottom-14 z-40 w-full h-0 pointer-events-none">
            <div className="flex justify-end pr-4 -translate-y-12">
              <button
                type="button"
                onClick={handleBottomAction}
                aria-label={isAtBottom ? 'Kembali ke paling atas' : 'Scroll ke bawah'}
                className="pointer-events-auto w-9 h-9 rounded-full bg-[#50060c]/90 hover:bg-[#f0c243] text-[#ffd875] hover:text-[#50060c] border border-[#f0c243]/70 shadow-2xl backdrop-blur-md flex items-center justify-center font-sans text-sm font-bold transition-all duration-300 active:scale-90 cursor-pointer"
              >
                {isAtBottom ? (
                  <span className="animate-nudge-up inline-block">↑</span>
                ) : (
                  <span className="animate-nudge-down inline-block">↓</span>
                )}
              </button>
            </div>
          </div>

          {/* MOTIF MINANG BAWAH */}
          <div className="sticky bottom-0 z-30 w-full leading-none overflow-hidden shrink-0 pointer-events-none -mt-12">
            <img
              src={motifBawah}
              alt="Motif Minang Bawah Sticky"
              className="w-full h-full block object-cover animate-slide-horizontal scale-105"
            />
          </div>
        </div>
      </div>
    </>
  );
}