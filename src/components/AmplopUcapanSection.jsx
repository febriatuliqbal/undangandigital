import React, { useState, useEffect, useRef } from 'react';
import ornamenJawa from '../assets/MOTIF ORNAMEN JAWA.png';

const DUMMY_COMMENTS = [
  {
    id: 1,
    name: 'Hen***',
    text: 'Selamat ya Windi & Iqbal! Semoga sakinah, mawaddah, warahmah sampai kakek nenek. Yuk tulis doa terbaikmu di sini! ✨',
    time: 'Baru saja',
  },
  {
    id: 2,
    name: 'Nad***',
    text: 'Turut berbahagia untuk kalian berdua! Lancar terus persiapannya sampai hari H, jangan lupa titip doa di atas ya 🤍',
    time: '15 menit lalu',
  },
  {
    id: 3,
    name: 'Dim***',
    text: 'Akhirnya sah juga! Semoga rumah tangganya selalu penuh berkah dan cinta. Silakan tinggalkan ucapan buat Windi & Iqbal 💐',
    time: '1 jam lalu',
  },
];

function maskName(rawName) {
  const trimmed = (rawName || '').trim();
  if (!trimmed) return 'Tam***';
  const prefix = trimmed.slice(0, Math.min(3, trimmed.length));
  return `${prefix}***`;
}

export default function AmplopUcapanSection({ guestName }) {
  const [copiedAccount, setCopiedAccount] = useState('');
  const [senderName, setSenderName] = useState(
    guestName !== 'Tamu Undangan' ? guestName : ''
  );
  const [ucapanText, setUcapanText] = useState('');
  const [comments, setComments] = useState(DUMMY_COMMENTS);
  const [activeSlide, setActiveSlide] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isHorizontalSwipe = useRef(null);

  useEffect(() => {
    if (guestName && guestName !== 'Tamu Undangan') {
      setSenderName(guestName);
    }
  }, [guestName]);

  useEffect(() => {
    if (activeSlide >= comments.length) {
      setActiveSlide(0);
    }
  }, [comments.length, activeSlide]);

  const handleCopy = (rekeningNum, bankName) => {
    navigator.clipboard.writeText(rekeningNum);
    setCopiedAccount(bankName);
    setTimeout(() => setCopiedAccount(''), 2500);
  };

  const nextComment = () => {
    setActiveSlide((prev) => (prev >= comments.length - 1 ? 0 : prev + 1));
  };

  const prevComment = () => {
    setActiveSlide((prev) => (prev <= 0 ? comments.length - 1 : prev - 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isHorizontalSwipe.current = null;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;

    if (isHorizontalSwipe.current === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      isHorizontalSwipe.current = Math.abs(dx) > Math.abs(dy);
    }

    if (isHorizontalSwipe.current) {
      setDragOffset(dx);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    if (isHorizontalSwipe.current) {
      if (dragOffset < -40) nextComment();
      else if (dragOffset > 40) prevComment();
    }
    setDragOffset(0);
    setIsDragging(false);
    isHorizontalSwipe.current = null;
  };

  const handleSendWA = (e) => {
    e.preventDefault();
    if (!ucapanText.trim()) return;

    const cleanName = senderName.trim() || 'Tamu Undangan';
    const cleanText = ucapanText.trim();

    const newItem = {
      id: Date.now(),
      name: maskName(cleanName),
      text: cleanText,
      time: 'Baru saja',
    };

    setComments((prev) => [newItem, ...prev]);
    setActiveSlide(0);

    const targetPhone = '6282385244193';
    const message = `Halo Windi & Iqbal,\nSaya *${cleanName}* ingin mengucapkan:\n\n"${cleanText}"`;
    const waUrl = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(message)}`;

    setUcapanText('');
    window.open(waUrl, '_blank');
  };

  return (
    <>
      {/* AMPLOP DIGITAL */}
      <section className="relative px-6 text-center space-y-4 scroll-animate opacity-0 translate-y-6 transition-all duration-700 ease-out font-sans">
        <img
          src={ornamenJawa}
          alt="Ornamen Amplop Right"
          className="absolute -top-6 -right-14 w-40 h-auto opacity-25 brightness-50 rotate-12 animate-float-delayed pointer-events-none z-0"
        />

        <h3 className="text-lg font-bold text-[#ffd875] font-serif tracking-wide relative z-10">
          Amplop Digital
        </h3>
        <p className="text-xs text-gray-300 relative z-10">
          Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Bagi yang ingin memberikan tanda kasih, dapat melalui rekening berikut:
        </p>

        <div className="space-y-3 relative z-10">
          <div className="bg-[#50060c]/90 border border-[#f0c243]/40 p-4 rounded-xl text-left shadow-lg relative">
            <p className="text-xs font-bold text-[#ffd875] uppercase">BANK MANDIRI / BCA</p>
            <p className="text-base font-bold text-white tracking-widest my-1">1234 5678 9012</p>
            <p className="text-xs text-gray-300">a.n. Maisafa Windi Ilham</p>
            <button
              onClick={() => handleCopy('123456789012', 'Windi')}
              className="absolute right-3 bottom-3 px-3 py-1 bg-[#f0c243] text-[#50060c] text-[10px] font-bold rounded-md hover:bg-[#d9ab30] cursor-pointer"
            >
              {copiedAccount === 'Windi' ? 'Copied!' : 'Salin No'}
            </button>
          </div>

          <div className="bg-[#50060c]/90 border border-[#f0c243]/40 p-4 rounded-xl text-left shadow-lg relative">
            <p className="text-xs font-bold text-[#ffd875] uppercase">BANK BRI / BCA</p>
            <p className="text-base font-bold text-white tracking-widest my-1">9876 5432 1098</p>
            <p className="text-xs text-gray-300">a.n. Febriatul Iqbal</p>
            <button
              onClick={() => handleCopy('987654321098', 'Iqbal')}
              className="absolute right-3 bottom-3 px-3 py-1 bg-[#f0c243] text-[#50060c] text-[10px] font-bold rounded-md hover:bg-[#d9ab30] cursor-pointer"
            >
              {copiedAccount === 'Iqbal' ? 'Copied!' : 'Salin No'}
            </button>
          </div>
        </div>
      </section>

      {/* UCAPAN & DOA */}
      <section className="relative px-6 scroll-animate opacity-0 translate-y-6 transition-all duration-700 ease-out font-sans space-y-4">
        <img
          src={ornamenJawa}
          alt="Ornamen Ucapan Left"
          className="absolute -bottom-6 -left-12 w-44 h-auto opacity-25 brightness-50 -rotate-45 animate-float pointer-events-none z-0"
        />

        <div className="bg-[#50060c]/90 border border-[#f0c243]/40 p-6 rounded-2xl space-y-4 shadow-xl relative z-10">
          <h3 className="text-lg font-bold text-[#ffd875] font-serif text-center">
            Kirim Ucapan &amp; Doa
          </h3>

          <form onSubmit={handleSendWA} className="space-y-3">
            <div>
              <label className="text-[11px] text-gray-300 block mb-1">Nama Anda</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className="w-full bg-[#3a0509]/80 border border-[#f0c243]/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#f0c243]"
                required
              />
            </div>

            <div>
              <label className="text-[11px] text-gray-300 block mb-1">Ucapan &amp; Doa</label>
              <textarea
                rows="3"
                value={ucapanText}
                onChange={(e) => setUcapanText(e.target.value)}
                placeholder="Tuliskan ucapan dan doa terbaik Anda..."
                className="w-full bg-[#3a0509]/80 border border-[#f0c243]/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#f0c243]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-full shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>💬 Kirim Ucapan via WhatsApp</span>
            </button>
          </form>
        </div>

        {/* CAROUSEL KOMENTAR DUMMY AJAKAN BERKOMENTAR */}
        <div className="bg-[#50060c]/90 border border-[#f0c243]/40 p-4 rounded-2xl shadow-xl relative z-10 space-y-3">
          <div className="flex items-center justify-between border-b border-[#f0c243]/20 pb-2">
            <h4 className="text-xs font-bold text-[#ffd875] font-serif uppercase tracking-wider">
              Doa &amp; Ucapan
            </h4>
            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                onClick={prevComment}
                aria-label="Komentar sebelumnya"
                className="w-6 h-6 rounded-full bg-[#3a0509] border border-[#f0c243]/35 text-[#ffd875] text-xs flex items-center justify-center hover:bg-[#f0c243] hover:text-[#50060c] transition-colors cursor-pointer"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={nextComment}
                aria-label="Komentar berikutnya"
                className="w-6 h-6 rounded-full bg-[#3a0509] border border-[#f0c243]/35 text-[#ffd875] text-xs flex items-center justify-center hover:bg-[#f0c243] hover:text-[#50060c] transition-colors cursor-pointer"
              >
                ›
              </button>
            </div>
          </div>

          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="overflow-hidden select-none touch-pan-y"
          >
            <div
              style={{
                transform: `translate3d(calc(-${activeSlide * 100}% + ${dragOffset}px), 0, 0)`,
              }}
              className={`flex ${
                isDragging ? 'transition-none' : 'transition-transform duration-400 ease-out'
              }`}
            >
              {comments.map((item) => (
                <div key={item.id} className="w-full shrink-0 px-0.5">
                  <div className="bg-[#3a0509]/75 border border-[#f0c243]/20 p-3.5 rounded-xl space-y-1.5 text-left min-h-[96px] flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#ffd875]">
                        {item.name}
                      </span>
                      <span className="text-[9px] text-gray-400">{item.time}</span>
                    </div>
                    <p className="text-[11px] text-gray-200 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center space-x-1.5 pt-0.5">
            {comments.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSlide(idx)}
                aria-label={`Slide komentar ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeSlide === idx ? 'w-5 bg-[#f0c243]' : 'w-1.5 bg-white/35'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}