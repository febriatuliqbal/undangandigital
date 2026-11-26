import React, { useState, useEffect, useRef } from 'react';
import fotoPrewed1 from '../assets/foto2.jpg';
import fotoPrewed2 from '../assets/foto1.jpg';
import fotoPrewed3 from '../assets/foto3.jpg';
import ornamenJawa from '../assets/MOTIF ORNAMEN JAWA.png';

export default function HeroCarousel() {
  const slides = [
    { id: 1, img: fotoPrewed1, title: 'Windi & Iqbal' },
    { id: 2, img: fotoPrewed3, title: 'AKAD : 18 Desember 2026' },
    { id: 3, img: fotoPrewed2, title: 'RESEPSI : 19 Desember 2026' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isHorizontalSwipe = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-slide berhenti sementara saat pengguna sedang menyentuh/menggeser
  useEffect(() => {
    if (isDragging) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length, isDragging]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isHorizontalSwipe.current = null;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartX.current;
    const diffY = currentY - touchStartY.current;

    // Tentukan arah gestur (horizontal vs scroll vertikal) pada gerakan awal
    if (isHorizontalSwipe.current === null) {
      if (Math.abs(diffX) > 6 || Math.abs(diffY) > 6) {
        isHorizontalSwipe.current = Math.abs(diffX) > Math.abs(diffY);
      }
    }

    if (isHorizontalSwipe.current) {
      setDragOffset(diffX);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    const swipeThreshold = 45;

    if (isHorizontalSwipe.current) {
      if (dragOffset < -swipeThreshold) {
        nextSlide();
      } else if (dragOffset > swipeThreshold) {
        prevSlide();
      }
    }

    setDragOffset(0);
    setIsDragging(false);
    isHorizontalSwipe.current = null;
  };

  return (
    <>
      <style>{`
        @keyframes heroOrnamentUpDownLeft {
          0%, 100% { transform: translate3d(0px, -8px, 0) rotate(12deg); }
          50% { transform: translate3d(0px, 10px, 0) rotate(12deg); }
        }
        @keyframes heroOrnamentUpDownRight {
          0%, 100% { transform: translate3d(0px, 10px, 0) rotate(-12deg); }
          50% { transform: translate3d(0px, -8px, 0) rotate(-12deg); }
        }
        .animate-hero-updown-left {
          animation: heroOrnamentUpDownLeft 3.6s ease-in-out infinite;
        }
        .animate-hero-updown-right {
          animation: heroOrnamentUpDownRight 3.6s ease-in-out infinite;
        }
      `}</style>

      <section
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full aspect-[3/4] overflow-hidden group scroll-animate opacity-0 translate-y-6 transition-all duration-700 ease-out z-10 select-none touch-pan-y"
      >
        <img
          src={ornamenJawa}
          alt="Ornamen Jawa Kiri"
          className="absolute top-6 -left-15 w-24 h-auto opacity-35 brightness-75 animate-hero-updown-left pointer-events-none z-20 will-change-transform"
        />
        <img
          src={ornamenJawa}
          alt="Ornamen Jawa Kanan"
          className="absolute top-30 -right-15 w-24 h-auto opacity-35 brightness-75 animate-hero-updown-right pointer-events-none z-20 will-change-transform"
        />

        {/* TRACK SLIDE HORIZONTAL */}
        <div
          style={{
            transform: `translate3d(calc(-${currentSlide * 100}% + ${dragOffset}px), 0, 0)`,
          }}
          className={`flex w-full h-full ${
            isDragging ? 'transition-none' : 'transition-transform duration-500 ease-out'
          }`}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="w-full h-full shrink-0 overflow-hidden">
              <img
                src={slide.img}
                alt={slide.title}
                draggable={false}
                className="w-full h-full object-cover scale-105 pointer-events-none"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#60050c] via-[#60050c]/80 to-transparent z-10 pointer-events-none" />

        <div className="absolute bottom-6 inset-x-0 text-center z-20 font-sans text-xs tracking-widest text-[#ffd875] uppercase drop-shadow-md pointer-events-none">
          {slides[currentSlide].title}
        </div>

        <button
          type="button"
          onClick={prevSlide}
          aria-label="Foto sebelumnya"
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white w-9 h-9 rounded-full flex items-center justify-center transition-all z-20 cursor-pointer"
        >
          ❮
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Foto berikutnya"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white w-9 h-9 rounded-full flex items-center justify-center transition-all z-20 cursor-pointer"
        >
          ❯
        </button>

        <div className="absolute bottom-2 inset-x-0 flex justify-center space-x-1.5 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              aria-label={`Slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentSlide === index ? 'w-5 bg-[#f0c243]' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>
    </>
  );
}