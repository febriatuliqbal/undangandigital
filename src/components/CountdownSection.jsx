import React, { useState, useEffect } from 'react';
import ornamenJawa from '../assets/MOTIF ORNAMEN JAWA.png';

export default function CountdownSection() {
  const targetDate = new Date('2026-12-19T10:00:00+07:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Link Google Calendar Resepsi (Sabtu, 19 Des 2026 10:00 - 15:00 WIB -> UTC 03:00 - 08:00)
  const googleCalendarUrl =
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    '&text=' + encodeURIComponent('Resepsi Pernikahan Windi & Iqbal') +
    '&dates=20261219T030000Z/20261219T080000Z' +
    '&details=' + encodeURIComponent('Acara Resepsi Pernikahan Ns. Maisafa Windi Ilham, S.Kep & Febriatul Iqbal, S.Kom') +
    '&location=' + encodeURIComponent('Simpang Malako Panarian Kecamatan Gunung Talang');

  // Generate file .ics untuk kalender bawaan HP (Apple Calendar / Samsung / dll)
  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Undangan Windi & Iqbal//ID',
      'BEGIN:VEVENT',
      'DTSTART:20261219T030000Z',
      'DTEND:20261219T080000Z',
      'SUMMARY:Resepsi Pernikahan Windi & Iqbal',
      'DESCRIPTION:Acara Resepsi Pernikahan Ns. Maisafa Windi Ilham, S.Kep & Febriatul Iqbal, S.Kom',
      'LOCATION:Simpang Malako Panarian Kecamatan Gunung Talang',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Pernikahan-Windi-Iqbal.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* COUNTDOWN TIMER + ADD TO CALENDAR (TAMPIL LANGSUNG DARI AWAL) */}
      <section className="relative px-6 text-center space-y-4">
        <h3 className="text-lg font-bold text-[#ffd875] tracking-wide">
          Menuju Hari Bahagia
        </h3>

        <div className="grid grid-cols-4 gap-2 text-center font-sans relative z-10">
          <div className="bg-[#50060c]/90 border border-[#f0c243]/40 p-3 rounded-xl shadow-md">
            <span className="text-2xl font-bold text-[#ffd875] block">{timeLeft.days}</span>
            <span className="text-[10px] uppercase text-gray-300 tracking-wider">Hari</span>
          </div>
          <div className="bg-[#50060c]/90 border border-[#f0c243]/40 p-3 rounded-xl shadow-md">
            <span className="text-2xl font-bold text-[#ffd875] block">{timeLeft.hours}</span>
            <span className="text-[10px] uppercase text-gray-300 tracking-wider">Jam</span>
          </div>
          <div className="bg-[#50060c]/90 border border-[#f0c243]/40 p-3 rounded-xl shadow-md">
            <span className="text-2xl font-bold text-[#ffd875] block">{timeLeft.minutes}</span>
            <span className="text-[10px] uppercase text-gray-300 tracking-wider">Menit</span>
          </div>
          <div className="bg-[#50060c]/90 border border-[#f0c243]/40 p-3 rounded-xl shadow-md">
            <span className="text-2xl font-bold text-[#ffd875] block">{timeLeft.seconds}</span>
            <span className="text-[10px] uppercase text-gray-300 tracking-wider">Detik</span>
          </div>
        </div>

        {/* TOMBOL ADD TO CALENDAR */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 font-sans">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#f0c243] hover:bg-[#d9ab30] text-[#50060c] rounded-full text-[11px] font-bold tracking-wide shadow-md transition-all active:scale-95"
          >
            <span>📅 Simpan ke Calendar</span>
          </a>
        </div>
      </section>

      {/* SURAT AR-RUM: 21 */}
      <section
        data-anim="right"
        className="relative px-6 text-center space-y-4 scroll-animate opacity-0 translate-x-8 transition-all duration-700 ease-out"
      >
         <img
          src={ornamenJawa}
          alt="Ornamen Ar-Rum Right"
          className="absolute -top-50 -left-14 w-35 h-auto opacity-25 brightness-50 rotate-315 animate-float-delayed pointer-events-none z-0"
        />

        <img
          src={ornamenJawa}
          alt="Ornamen Ar-Rum Right"
          className="absolute -top-10 -right-14 w-40 h-auto opacity-25 brightness-50 rotate-45 animate-float-delayed pointer-events-none z-0"
        />

        <p className="text-xs tracking-[0.2em] text-[#ffd875] font-sans uppercase relative z-10">
          Maha Suci Allah SWT
        </p>
        <h2 className="text-2xl font-bold text-[#ffd875] relative z-10">QS. Ar-Rum: 21</h2>
        <div className="bg-[#50060c]/70 border border-[#f0c243]/30 p-6 rounded-2xl backdrop-blur-sm shadow-xl space-y-3 relative z-10">
          <p className="text-sm italic font-sans leading-relaxed text-gray-200">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang."
          </p>
        </div>
      </section>
    </>
  );
}
