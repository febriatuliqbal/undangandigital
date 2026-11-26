import React, { useState, useEffect, useRef, useCallback } from 'react';
import fotoPrewed from '../assets/galeri3.jpg';
import fotoWanita from '../assets/galeri2.jpg';
import fotoPria from '../assets/galeri1.jpg';
import foto5 from '../assets/galeri5.jpg';
import foto6 from '../assets/galeri6.jpg';
import foto7 from '../assets/galeri7.jpg';
import ornamenJawa from '../assets/MOTIF ORNAMEN JAWA.png';

const GALLERY_PHOTOS = [
  {
    id: 1,
    src: fotoPrewed,
    caption: 'Windi & Iqbal',
    span: 'col-span-2 aspect-[16/10]',
    parallaxSpeed: 16,
    stackRotate: -12,
    dropOffsetY: -35,
    zIndex: 26,
  },
  {
    id: 2,
    src: fotoWanita,
    caption: 'Mempelai Wanita',
    span: 'col-span-1 aspect-[3/4]',
    parallaxSpeed: 12,
    stackRotate: 14,
    dropOffsetY: -22,
    zIndex: 25,
  },
  {
    id: 3,
    src: fotoPria,
    caption: 'Mempelai Pria',
    span: 'col-span-1 aspect-[3/4]',
    parallaxSpeed: -12,
    stackRotate: -10,
    dropOffsetY: -12,
    zIndex: 24,
  },
  {
    id: 4,
    src: foto5,
    caption: 'Momen Bahagia',
    span: 'col-span-2 aspect-[16/9]',
    parallaxSpeed: 18,
    stackRotate: 10,
    dropOffsetY: 5,
    zIndex: 23,
  },
  {
    id: 5,
    src: foto6,
    caption: 'Kemesraan',
    span: 'col-span-1 aspect-[4/5]',
    parallaxSpeed: -14,
    stackRotate: -8,
    dropOffsetY: 18,
    zIndex: 22,
  },
  {
    id: 6,
    src: foto7,
    caption: 'Kasih Sayang',
    span: 'col-span-1 aspect-[4/5]',
    parallaxSpeed: 14,
    stackRotate: 9,
    dropOffsetY: 30,
    zIndex: 21,
  },
];

export default function GaleriSection() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isReadyToClick, setIsReadyToClick] = useState(false);

  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const itemRefs = useRef([]);
  const imgRefs = useRef([]);
  const stackOffsetsRef = useRef([]);
  const rafIdRef = useRef(null);

  // Ref untuk gesture touch swipe pada Lightbox
  const lightboxTouchStartX = useRef(0);
  const lightboxTouchEndX = useRef(0);

  const measureStackOffsets = useCallback(() => {
    const gridEl = gridRef.current;
    if (!gridEl) return;

    itemRefs.current.forEach((el) => {
      if (el) {
        el.style.transform = 'translate3d(0px, 0px, 0px) rotate(0deg) scale(1)';
      }
    });

    const gridRect = gridEl.getBoundingClientRect();
    const stackCenterX = gridRect.left + gridRect.width / 2;
    const stackCenterY = gridRect.top + gridRect.height * 0.1;

    stackOffsetsRef.current = itemRefs.current.map((el, index) => {
      if (!el) return { x: 0, y: 0 };
      const rect = el.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const itemCenterY = rect.top + rect.height / 2;
      const extraY = GALLERY_PHOTOS[index]?.dropOffsetY ?? 0;

      return {
        x: stackCenterX - itemCenterX,
        y: stackCenterY - itemCenterY + extraY,
      };
    });
  }, []);

  const applyScrollTransforms = useCallback(() => {
    rafIdRef.current = null;
    const sectionEl = sectionRef.current;
    const gridEl = gridRef.current;
    if (!sectionEl || !gridEl) return;

    const scrollableParent = sectionEl.closest('.overflow-y-auto') || window;
    const parentRect =
      scrollableParent === window
        ? { top: 0, height: window.innerHeight }
        : scrollableParent.getBoundingClientRect();

    const gridRect = gridEl.getBoundingClientRect();

    const startY = parentRect.top + parentRect.height * 0.65;
    const endY = parentRect.top + parentRect.height * 0.25;
    const rawProgress = (startY - gridRect.top) / Math.max(startY - endY, 1);
    const clamped = Math.min(Math.max(rawProgress, 0), 1);

    const smoothSpread =
      clamped < 0.5
        ? 16 * clamped * clamped * clamped * clamped * clamped
        : 1 - Math.pow(-2 * clamped + 2, 5) / 2;

    const inverseSpread = 1 - smoothSpread;
    const viewportCenter = parentRect.top + parentRect.height / 2;

    itemRefs.current.forEach((cardEl, index) => {
      if (!cardEl) return;
      const photo = GALLERY_PHOTOS[index];
      const stack = stackOffsetsRef.current[index] || { x: 0, y: 0 };

      const cardX = stack.x * inverseSpread;
      const cardY = stack.y * inverseSpread;
      const cardRotate = photo.stackRotate * inverseSpread;
      const cardScale = 1 - inverseSpread * 0.12;

      cardEl.style.transform = `translate3d(${cardX.toFixed(2)}px, ${cardY.toFixed(
        2
      )}px, 0) rotate(${cardRotate.toFixed(2)}deg) scale(${cardScale.toFixed(3)})`;

      const imgEl = imgRefs.current[index];
      if (imgEl) {
        const rect = cardEl.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const normalizedDistance = Math.min(
          Math.max((itemCenter - viewportCenter) / parentRect.height, -1),
          1
        );
        const parallaxY = normalizedDistance * photo.parallaxSpeed;
        imgEl.style.transform = `translate3d(0, ${parallaxY.toFixed(2)}px, 0) scale(1.18)`;
      }
    });

    setIsReadyToClick((prev) => {
      const next = smoothSpread > 0.7;
      return prev === next ? prev : next;
    });
  }, []);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const scrollableParent = sectionEl.closest('.overflow-y-auto') || window;

    const handleScroll = () => {
      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(applyScrollTransforms);
      }
    };

    const handleResizeOrLoad = () => {
      measureStackOffsets();
      handleScroll();
    };

    measureStackOffsets();
    applyScrollTransforms();

    const t1 = setTimeout(handleResizeOrLoad, 150);
    const t2 = setTimeout(handleResizeOrLoad, 500);

    scrollableParent.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResizeOrLoad);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      clearTimeout(t1);
      clearTimeout(t2);
      scrollableParent.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResizeOrLoad);
    };
  }, [measureStackOffsets, applyScrollTransforms]);

  // Handler Navigasi Lightbox (Next / Prev)
  const handlePrevPhoto = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? GALLERY_PHOTOS.length - 1 : prev - 1));
  }, []);

  const handleNextPhoto = useCallback(() => {
    setSelectedIndex((prev) => (prev === GALLERY_PHOTOS.length - 1 ? 0 : prev + 1));
  }, []);

  // Keyboard navigation (Panah Kiri & Kanan)
  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handlePrevPhoto, handleNextPhoto]);

  // Touch Swipe Handlers untuk HP
  const handleTouchStart = (e) => {
    lightboxTouchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    lightboxTouchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diffX = lightboxTouchStartX.current - lightboxTouchEndX.current;
    // Ambang batas swipe minimal 40px
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNextPhoto(); // Swipe kiri -> foto berikutnya
      } else {
        handlePrevPhoto(); // Swipe kanan -> foto sebelumnya
      }
    }
    lightboxTouchStartX.current = 0;
    lightboxTouchEndX.current = 0;
  };

  const selectedPhoto = selectedIndex !== null ? GALLERY_PHOTOS[selectedIndex] : null;

  return (
    <section ref={sectionRef} className="relative px-6 pb-12">
      {/* ORNAMEN JAWA BACKGROUND */}
      <img
        src={ornamenJawa}
        alt="Ornamen Galeri Kiri Atas"
        className="absolute top-2 -left-14 w-44 h-auto opacity-30 brightness-75 animate-ornamen-sway pointer-events-none z-0"
      />
      <img
        src={ornamenJawa}
        alt="Ornamen Galeri Kanan Tengah"
        className="absolute top-1/2 -right-14 w-44 h-auto opacity-30 brightness-75 animate-ornamen-sway-reverse pointer-events-none z-0"
      />
      <img
        src={ornamenJawa}
        alt="Ornamen Galeri Kiri Bawah"
        className="absolute bottom-10 -left-14 w-40 h-auto opacity-25 brightness-75 animate-float pointer-events-none z-0"
      />

      {/* HEADER SECTION */}
      <div className="relative z-10 text-center space-y-1.5 mb-6">
        <p className="text-[10px] tracking-[0.25em] text-[#ffd875]/80 font-sans uppercase">
          Our Moments
        </p>
        <h3 className="text-xl font-bold text-[#ffd875] font-serif tracking-wide">
          Galeri Foto
        </h3>
      </div>

      {/* GRID GALERI 6 FOTO */}
      <div ref={gridRef} className="relative z-10 grid grid-cols-2 gap-3 overflow-visible">
        {GALLERY_PHOTOS.map((photo, index) => (
          <button
            key={photo.id}
            ref={(el) => (itemRefs.current[index] = el)}
            type="button"
            onClick={() => {
              if (isReadyToClick) setSelectedIndex(index);
            }}
            style={{ zIndex: photo.zIndex }}
            className={`${photo.span} relative rounded-xl overflow-hidden border border-[#f0c243]/40 shadow-xl group bg-[#50060c] will-change-transform ${
              isReadyToClick ? 'cursor-pointer' : 'cursor-default'
            }`}
          >
            <img
              ref={(el) => (imgRefs.current[index] = el)}
              src={photo.src}
              alt={photo.caption}
              onLoad={() => {
                measureStackOffsets();
                if (!rafIdRef.current) {
                  rafIdRef.current = requestAnimationFrame(applyScrollTransforms);
                }
              }}
              className="w-full h-full object-cover object-top will-change-transform"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 ${
                isReadyToClick ? 'group-hover:opacity-100' : ''
              } transition-opacity duration-300 flex items-end p-2.5`}
            >
              <span className="text-[11px] font-sans text-[#ffd875] font-medium">
                {photo.caption}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* LIGHTBOX PREVIEW DENGAN SWIPE KIRI-KANAN */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative max-w-[390px] w-full bg-[#50060c] border border-[#f0c243]/50 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center"
          >
            {/* Tombol Close */}
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center text-sm hover:bg-black cursor-pointer border border-[#f0c243]/30"
            >
              ✕
            </button>

            {/* Indikator Urutan Foto (Misal: 1 / 6) */}
            <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-black/60 text-[#ffd875] text-[10px] font-bold border border-[#f0c243]/30">
              {selectedIndex + 1} / {GALLERY_PHOTOS.length}
            </div>

            {/* Tombol Panah Kiri */}
            <button
              type="button"
              onClick={handlePrevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 text-[#ffd875] flex items-center justify-center text-lg hover:bg-black/80 border border-[#f0c243]/40 cursor-pointer active:scale-95 transition-transform"
              aria-label="Foto Sebelumnya"
            >
              ‹
            </button>

            {/* Tombol Panah Kanan */}
            <button
              type="button"
              onClick={handleNextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 text-[#ffd875] flex items-center justify-center text-lg hover:bg-black/80 border border-[#f0c243]/40 cursor-pointer active:scale-95 transition-transform"
              aria-label="Foto Berikutnya"
            >
              ›
            </button>

            {/* Gambar Lightbox */}
            <div className="w-full h-[70dvh] flex items-center justify-center bg-black overflow-hidden relative">
              <img
                key={selectedPhoto.id}
                src={selectedPhoto.src}
                alt={selectedPhoto.caption}
                className="w-full h-full object-contain transition-all duration-300 animate-fadeIn"
              />
            </div>

            {/* Caption */}
            <div className="p-3 text-center font-sans w-full bg-[#50060c]">
              <p className="text-xs font-semibold text-[#ffd875]">{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}