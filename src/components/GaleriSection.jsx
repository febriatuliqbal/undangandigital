import React, { useState, useEffect, useRef, useCallback } from 'react';
import fotoPrewed from '../assets/galeri3.jpg';
import fotoWanita from '../assets/galeri2.jpg';
import fotoPria from '../assets/galeri1.jpg';
import foto5 from '../assets/galeri5.jpg';
import ornamenJawa from '../assets/MOTIF ORNAMEN JAWA.png';

const GALLERY_PHOTOS = [
  {
    id: 1,
    src: fotoPrewed,
    caption: 'Windi & Iqbal',
    span: 'col-span-2 aspect-[16/10]',
    parallaxSpeed: 12,
    stackRotate: -10,
    dropOffsetY: -28,
    zIndex: 24,
  },
  {
    id: 2,
    src: fotoWanita,
    caption: 'Mempelai Wanita',
    span: 'col-span-1 aspect-[3/4]',
    parallaxSpeed: 9,
    stackRotate: 12,
    dropOffsetY: -16,
    zIndex: 23,
  },
  {
    id: 3,
    src: fotoPria,
    caption: 'Mempelai Pria',
    span: 'col-span-1 aspect-[3/4]',
    parallaxSpeed: -9,
    stackRotate: -11,
    dropOffsetY: -8,
    zIndex: 22,
  },
  {
    id: 4,
    src: foto5,
    caption: 'Momen Bahagia',
    span: 'col-span-2 aspect-[16/9]',
    parallaxSpeed: 14,
    stackRotate: 8,
    dropOffsetY: 6,
    zIndex: 21,
  },
];

export default function GaleriSection() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isReadyToClick, setIsReadyToClick] = useState(false);

  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const itemRefs = useRef([]);
  const imgRefs = useRef([]);
  const stackOffsetsRef = useRef([]);
  const rafIdRef = useRef(null);

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
    const stackCenterY = gridRect.top + gridRect.height * 0.12;

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

    // Mulai menyebar turun ketika grid melewati 62% tinggi layar, selesai di 20% layar
    const startY = parentRect.top + parentRect.height * 0.62;
    const endY = parentRect.top + parentRect.height * 0.2;
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
      const cardScale = 1 - inverseSpread * 0.14;

      cardEl.style.transform = `translate3d(${cardX.toFixed(2)}px, ${cardY.toFixed(2)}px, 0) rotate(${cardRotate.toFixed(2)}deg) scale(${cardScale.toFixed(3)})`;

      const imgEl = imgRefs.current[index];
      if (imgEl) {
        const rect = cardEl.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const normalizedDistance = Math.min(
          Math.max((itemCenter - viewportCenter) / parentRect.height, -1),
          1
        );
        const parallaxY = normalizedDistance * photo.parallaxSpeed * smoothSpread;
        imgEl.style.transform = `translate3d(0, ${parallaxY.toFixed(2)}px, 0) scale(1.14)`;
      }
    });

    setIsReadyToClick((prev) => {
      const next = smoothSpread > 0.75;
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

  return (
    <section ref={sectionRef} className="relative px-6 pb-8">
      {/* ORNAMEN JAWA GALERI */}
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

      <div className="relative z-10 text-center space-y-1.5 mb-5">
        <p className="text-[10px] tracking-[0.25em] text-[#ffd875]/80 font-sans uppercase">
          Our Moments
        </p>
        <h3 className="text-xl font-bold text-[#ffd875] font-serif tracking-wide">
          Galeri Foto
        </h3>
      </div>

      {/* GRID GALERI: AWALNYA MELIPAT/NUMPUK DI ATAS, MENYEBAR TURUN KE POSISI GRID SAAT DI-SCROLL */}
      <div ref={gridRef} className="relative z-10 grid grid-cols-2 gap-2.5 overflow-visible">
        {GALLERY_PHOTOS.map((photo, index) => (
          <button
            key={photo.id}
            ref={(el) => (itemRefs.current[index] = el)}
            type="button"
            onClick={() => {
              if (isReadyToClick) setSelectedPhoto(photo);
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
              className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 ${
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

      {/* PENUTUP SINGKAT */}
      <div className="relative z-10 text-center mt-8 space-y-1 font-sans">
        <p className="text-xs text-gray-300">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.
        </p>
        <p className="text-base font-serif font-bold text-[#ffd875] pt-2">
          Windi &amp; Iqbal
        </p>
      </div>

      {/* LIGHTBOX PREVIEW SAAT FOTO DIKLIK */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[390px] w-full bg-[#50060c] border border-[#f0c243]/50 rounded-2xl overflow-hidden shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center text-sm hover:bg-black cursor-pointer"
            >
              ✕
            </button>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.caption}
              className="w-full max-h-[75dvh] object-contain bg-black"
            />
            <div className="p-3 text-center font-sans">
              <p className="text-xs font-semibold text-[#ffd875]">{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}