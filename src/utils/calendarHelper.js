export const EVENT_DETAILS = {
  akad: {
    title: 'Akad Nikah Windi & Iqbal',
    startUTC: '20261218T020000Z', // Jumat, 18 Des 2026 09:00 WIB
    endUTC: '20261218T050000Z',   // Jumat, 18 Des 2026 12:00 WIB
    location: 'Simpang Malako Panarian Kecamatan Gunung Talang',
    description:
      'Acara Akad Nikah Ns. Maisafa Windi Ilham, S.Kep & Febriatul Iqbal, S.Kom. Lokasi: https://goo.gl/maps/UPKi87jeNxLraJh6A',
  },
  resepsi: {
    title: 'Resepsi Pernikahan Windi & Iqbal',
    startUTC: '20261219T030000Z', // Sabtu, 19 Des 2026 10:00 WIB
    endUTC: '20261219T080000Z',   // Sabtu, 19 Des 2026 15:00 WIB
    location: 'Simpang Malako Panarian Kecamatan Gunung Talang',
    description:
      'Acara Resepsi Pernikahan Ns. Maisafa Windi Ilham, S.Kep & Febriatul Iqbal, S.Kom. Lokasi: https://goo.gl/maps/UPKi87jeNxLraJh6A',
  },
};

/**
 * Menghasilkan Data URI .ics yang langsung membuka aplikasi Kalender bawaan
 * di iPhone (iOS), Android, Mac, dan Windows (Outlook/Calendar).
 */
export function getNativeCalendarUri(eventKey = 'resepsi') {
  const ev = EVENT_DETAILS[eventKey] || EVENT_DETAILS.resepsi;

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Undangan Pernikahan Windi & Iqbal//ID',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${eventKey}-windi-iqbal-2026@undangan`,
    `DTSTAMP:20260101T000000Z`,
    `DTSTART:${ev.startUTC}`,
    `DTEND:${ev.endUTC}`,
    `SUMMARY:${ev.title}`,
    `DESCRIPTION:${ev.description}`,
    `LOCATION:${ev.location}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:Pengingat: Besok ${ev.title}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsLines)}`;
}

/**
 * Fallback link langsung ke Google Calendar (berguna jika dibuka dari in-app browser WA/IG di Android)
 */
export function getGoogleCalendarUrl(eventKey = 'resepsi') {
  const ev = EVENT_DETAILS[eventKey] || EVENT_DETAILS.resepsi;
  return (
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    `&text=${encodeURIComponent(ev.title)}` +
    `&dates=${ev.startUTC}/${ev.endUTC}` +
    `&details=${encodeURIComponent(ev.description)}` +
    `&location=${encodeURIComponent(ev.location)}`
  );
}