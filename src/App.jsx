import React, { useState, useRef, useEffect } from 'react';
import CoverUndangan from './CoverUndangan';
import IsiUndangan from './IsiUndangan';
import laguBackground from './assets/lagu.mp3';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const wasPlayingBeforeHideRef = useRef(false);

  // Jeda musik saat keluar tab/aplikasi, dan lanjutkan lagi saat tab dibuka kembali
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;

      if (document.hidden) {
        if (!audioRef.current.paused) {
          wasPlayingBeforeHideRef.current = true;
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          wasPlayingBeforeHideRef.current = false;
        }
      } else {
        if (wasPlayingBeforeHideRef.current && isOpen) {
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
              wasPlayingBeforeHideRef.current = false;
            })
            .catch((err) => {
              console.log('Auto-resume diblokir browser:', err);
              setIsPlaying(false);
            });
        }
      }
    };

    const handlePageHide = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('beforeunload', handlePageHide);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('beforeunload', handlePageHide);
    };
  }, [isOpen]);

  // Dengarkan tombol Back (Kembali) di HP / Browser
  useEffect(() => {
    const handlePopState = () => {
      if (isOpen) {
        setIsOpen(false);
        setIsTransitioning(false);
        wasPlayingBeforeHideRef.current = false;

        // Hentikan dan reset musik saat kembali ke Cover
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setIsPlaying(false);
        }

        // Keluar dari fullscreen jika sedang aktif
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isOpen]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        wasPlayingBeforeHideRef.current = false;
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log('Gagal memutar audio:', err));
      }
    }
  };

  const handleOpen = (name) => {
    if (name) setGuestName(name);

    // Tambahkan entry ke riwayat browser agar tombol Back kembali ke Cover
    window.history.pushState({ undanganOpen: true }, '', window.location.href);

    setIsTransitioning(true);

    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Gagal memutar audio:', err));
    }

    setTimeout(() => {
      setIsOpen(true);
      setIsTransitioning(false);
    }, 750);
  };

  return (
    <>
      <style>{`
        @keyframes smoothContentEnter {
          0% {
            opacity: 0;
            transform: scale(0.96) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0px);
          }
        }
        .animate-content-entry {
          animation: smoothContentEnter 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Audio Global */}
      <audio ref={audioRef} src={laguBackground} loop preload="auto" />

      {!isOpen ? (
        <CoverUndangan onOpen={handleOpen} isOpening={isTransitioning} />
      ) : (
        <div className="animate-content-entry w-full h-full">
          <IsiUndangan
            guestName={guestName}
            isPlaying={isPlaying}
            toggleAudio={toggleAudio}
          />
        </div>
      )}
    </>
  );
}