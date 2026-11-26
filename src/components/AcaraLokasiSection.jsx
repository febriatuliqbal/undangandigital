import React from 'react';
import ornamenJawa from '../assets/MOTIF ORNAMEN JAWA.png';

export default function AcaraLokasiSection() {
  const gcalAkad =
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    '&text=' + encodeURIComponent('Akad Nikah Windi & Iqbal') +
    '&dates=20261218T020000Z/20261218T050000Z' +
    '&location=' + encodeURIComponent('Simpang Malako Panarian Kecamatan Gunung Talang');

  const gcalResepsi =
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    '&text=' + encodeURIComponent('Resepsi Pernikahan Windi & Iqbal') +
    '&dates=20261219T030000Z/20261219T080000Z' +
    '&location=' + encodeURIComponent('Simpang Malako Panarian Kecamatan Gunung Talang');

  return (
    <>
      {/* JADWAL AKAD NIKAH DAN RESEPSI */}
      <section className="relative px-6 space-y-6 font-sans">
        <img
          src={ornamenJawa}
          alt="Ornamen Jadwal Left"
          className="absolute top-6 -left-14 w-44 h-auto opacity-30 brightness-75 animate-ornamen-sway pointer-events-none z-0"
        />
        <img
          src={ornamenJawa}
          alt="Ornamen Jadwal Right"
          className="absolute bottom-4 -right-14 w-44 h-auto opacity-30 brightness-75 animate-ornamen-sway-reverse pointer-events-none z-0"
        />

        {/* AKAD NIKAH (MASUK DARI KIRI) */}
        <div
          data-anim="left"
          className="scroll-animate opacity-0 -translate-x-8 transition-all duration-700 ease-out bg-[#50060c]/90 border border-[#f0c243]/50 p-6 rounded-2xl text-center space-y-2 shadow-2xl backdrop-blur-sm relative z-10"
        >
          <div className="inline-block px-4 py-1 bg-[#f0c243] text-[#50060c] rounded-full text-xs font-bold uppercase tracking-wider mb-1">
            Akad Nikah
          </div>
          <h4 className="text-lg font-bold text-white font-serif">Jumat, 18 Desember 2026</h4>
          <p className="text-xs text-[#ffd875] font-semibold">Pukul: 09.00 WIB - Selesai</p>
          <p className="text-xs text-gray-300 mt-1">
            Simpang Malako Panarian Kecamatan Gunung Talang
          </p>
          <div className="pt-2">
            <a
              href={gcalAkad}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 bg-[#3a0509] hover:bg-[#f0c243] text-[#ffd875] hover:text-[#50060c] border border-[#f0c243]/40 rounded-full text-[11px] font-semibold transition-all"
            >
              <span>📅 Ingatkan Saya (Kalender)</span>
            </a>
          </div>
        </div>

        {/* RESEPSI (MASUK DARI KANAN) */}
        <div
          data-anim="right"
          className="scroll-animate opacity-0 translate-x-8 transition-all duration-700 ease-out bg-[#50060c]/90 border border-[#f0c243]/50 p-6 rounded-2xl text-center space-y-2 shadow-2xl backdrop-blur-sm relative z-10"
        >
          <div className="inline-block px-4 py-1 bg-[#f0c243] text-[#50060c] rounded-full text-xs font-bold uppercase tracking-wider mb-1">
            Resepsi Pernikahan
          </div>
          <h4 className="text-lg font-bold text-white font-serif">Sabtu, 19 Desember 2026</h4>
          <p className="text-xs text-[#ffd875] font-semibold">Pukul: 10.00 WIB - Selesai</p>
          <p className="text-xs text-gray-300 mt-1">
            Simpang Malako Panarian Kecamatan Gunung Talang
          </p>
          <div className="pt-2">
            <a
              href={gcalResepsi}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 bg-[#3a0509] hover:bg-[#f0c243] text-[#ffd875] hover:text-[#50060c] border border-[#f0c243]/40 rounded-full text-[11px] font-semibold transition-all"
            >
              <span>📅 Ingatkan Saya (Kalender)</span>
            </a>
          </div>
        </div>
      </section>

      {/* LOKASI ACARA & SEMATAN PETA UKURAN SEDANG (MASUK DARI KIRI) */}
      <section
        data-anim="left"
        className="relative scroll-animate opacity-0 -translate-x-8 transition-all duration-700 ease-out px-6 text-center font-sans"
      >
        <img
          src={ornamenJawa}
          alt="Ornamen Lokasi Right"
          className="absolute -bottom-8 -right-12 w-40 h-auto opacity-25 brightness-75 animate-float-delayed pointer-events-none z-0"
        />

        <div className="bg-[#50060c]/90 border border-[#f0c243]/50 p-5 rounded-2xl space-y-3 shadow-2xl backdrop-blur-sm relative z-10">
          <h3 className="text-lg font-bold text-[#ffd875] font-serif">Lokasi Acara</h3>
          <p className="text-xs text-gray-300">
            Simpang Malako Panarian Kecamatan Gunung Talang
          </p>

          {/* EMBED GOOGLE MAPS UKURAN SEDANG (h-56) */}
          <div className="w-full h-56 rounded-xl overflow-hidden border border-[#f0c243]/40 shadow-inner bg-[#3a0509]">
            <iframe
              title="Peta Lokasi Acara Windi & Iqbal"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.3316152068564!2d100.63483367658785!3d-0.8949493353270197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e2b4b0f5b14e133%3A0xbae7caa58ea4aa0e!2sWIN%20CELL!5e0!3m2!1sid!2sid!4v1795630559056!5m2!1sid!2sid"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          <a
            href="https://goo.gl/maps/UPKi87jeNxLraJh6A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 mt-1 px-6 py-2.5 bg-[#f0c243] hover:bg-[#d9ab30] text-[#50060c] rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-lg active:scale-95"
          >
            <span>📍 Buka di Aplikasi Google Maps</span>
          </a>
        </div>
      </section>
    </>
  );
}