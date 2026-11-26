import React, { useState, useEffect, useRef } from 'react';
import ornamenJawa from '../assets/MOTIF ORNAMEN JAWA.png';
// Import foto penutup (sesuaikan nama file dan lokasi gambar di project Anda)
import photoThankYou from '../assets/photo-thankyou.jpg';

// URL Logo Bank & e-Wallet
const LOGO_BRI = 'https://upload.wikimedia.org/wikipedia/commons/9/97/Logo_BRI.png?utm_source=id.wikipedia.org&utm_campaign=index&utm_content=original';
const LOGO_DANA = 'https://upload.wikimedia.org/wikipedia/commons/5/52/Dana_logo.png';

// ==========================================
// DATA POOL & GENERATOR KOMENTAR ACAK
// ==========================================
const NAMES_POOL = [
  'Hendra', 'Nadia', 'Dimas', 'Rizky', 'Anisa', 'Bayu', 'Bintang', 'Citra', 
  'Dewi', 'Eka', 'Fajar', 'Gita', 'Hafiz', 'Indah', 'Joko', 'Kartika', 
  'Lestari', 'Maya', 'Nugroho', 'Pratama', 'Putri', 'Rahman', 'Rina', 'Sari', 
  'Taufik', 'Utami', 'Vina', 'Wahyu', 'Yulia', 'Zainal'
];

const TIMES_POOL = [
  'Baru saja', '2 menit lalu', '5 menit lalu', '12 menit lalu', '18 menit lalu',
  '25 menit lalu', '35 menit lalu', '45 menit lalu', '1 jam lalu', '2 jam lalu',
  '3 jam lalu', '4 jam lalu', '5 jam lalu', '6 jam lalu', 'Kemarin'
];

const TEXTS_POOL = [
  'Selamat ya Windi & Iqbal! Semoga sakinah, mawaddah, warahmah sampai kakek nenek ✨',
  'Turut berbahagia untuk kalian berdua! Lancar terus persiapannya sampai hari H 🤍',
  'Akhirnya sah juga! Semoga rumah tangganya selalu penuh berkah dan cinta 💐',
  'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fii khoir. Selamat Windi & Iqbal! 🎉',
  'Happy Wedding Windi & Iqbal! Semoga menjadi pasangan yang selalu menginspirasi 🥳',
  'Selamat menempuh hidup baru sahabatku! Doa terbaik selalu untuk kalian berdua 🤍',
  'Semoga pernikahan kalian dipenuhi kebahagiaan, kedamaian, dan keberkahan selamanya 🕊️',
  'Selamat mengarungi bahtera rumah tangga! Semoga selalu kompak dan bahagia selamanya ✨',
  'Ikut seneng banget ngeliat kalian berdua! Lancar-lancar terus yaa sampai hari H 💕',
  'Selamat yaa! Semoga kelak dikaruniai keturunan yang saleh & salehah, amin 🤲',
  'Cinta kalian sungguh menginspirasi. Selamat menempuh lembaran baru Windi & Iqbal! 🥂',
  'Semoga cinta kalian terus tumbuh setiap harinya. Selamat berbahagia! ❤️'
];

function maskName(rawName) {
  const trimmed = (rawName || '').trim();
  if (!trimmed) return 'Tam***';
  const prefix = trimmed.slice(0, Math.min(3, trimmed.length));
  return `${prefix}***`;
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateRandomComments(count = 10) {
  const shuffledNames = shuffleArray(NAMES_POOL);
  const shuffledTexts = shuffleArray(TEXTS_POOL);
  
  const results = [];
  for (let i = 0; i < count; i++) {
    const randomTime = TIMES_POOL[Math.floor(Math.random() * TIMES_POOL.length)];
    const rawName = shuffledNames[i % shuffledNames.length];
    const text = shuffledTexts[i % shuffledTexts.length];
    
    results.push({
      id: i + 1,
      name: maskName(rawName),
      text: text,
      time: randomTime,
    });
  }
  return results;
}

// ==========================================
// KOMPONEN UTAMA
// ==========================================
export default function AmplopUcapanSection({ guestName }) {
  const [copiedAccount, setCopiedAccount] = useState('');
  const [senderName, setSenderName] = useState(
    guestName !== 'Tamu Undangan' ? guestName : ''
  );
  const [ucapanText, setUcapanText] = useState('');
  
  // Inisialisasi 10 komentar acak tiap kali dibuka
  const [comments, setComments] = useState(() => generateRandomComments(10));
  
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
          WEDDING GIFT
        </h3>
        <p className="text-xs text-gray-300 relative z-10">
          Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Bagi yang ingin memberikan tanda kasih, dapat melalui rekening berikut:
        </p>

        <div className="space-y-3 relative z-10">
          {/* REKENING BRI */}
          <div className="bg-[#50060c]/90 border border-[#f0c243]/40 p-4 rounded-xl text-left shadow-lg relative flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#ffd875] uppercase">BANK BRI</span>
              <img
                src={LOGO_BRI}
                alt="Logo BRI"
                className="h-5 w-auto object-contain brightness-0 invert opacity-90"
              />
            </div>
            <p className="text-base font-bold text-white tracking-widest my-1">
              5552 0101 5749 538
            </p>
            <p className="text-xs text-gray-300">a.n. Maisafa Windi Ilham</p>
            <button
              onClick={() => handleCopy('555201015749538', 'BRI')}
              className="absolute right-3 bottom-3 px-3 py-1 bg-[#f0c243] text-[#50060c] text-[10px] font-bold rounded-md hover:bg-[#d9ab30] cursor-pointer"
            >
              {copiedAccount === 'BRI' ? 'Copied!' : 'Salin No'}
            </button>
          </div>

          {/* REKENING DANA */}
          <div className="bg-[#50060c]/90 border border-[#f0c243]/40 p-4 rounded-xl text-left shadow-lg relative flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#ffd875] uppercase">DANA</span>
              <img
                src={LOGO_DANA}
                alt="Logo DANA"
                className="h-5 w-auto object-contain brightness-0 invert opacity-90"
              />
            </div>
            <p className="text-base font-bold text-white tracking-widest my-1">
              088279556300
            </p>
            <p className="text-xs text-gray-300">a.n. Maisafa Windi Ilham</p>
            <button
              onClick={() => handleCopy('088279556300', 'DANA')}
              className="absolute right-3 bottom-3 px-3 py-1 bg-[#f0c243] text-[#50060c] text-[10px] font-bold rounded-md hover:bg-[#d9ab30] cursor-pointer"
            >
              {copiedAccount === 'DANA' ? 'Copied!' : 'Salin No'}
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

        {/* CAROUSEL KOMENTAR (10 KOMENTAR ACAK) */}
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
              className={`flex ${isDragging ? 'transition-none' : 'transition-transform duration-400 ease-out'
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
                className={`h-1.5 rounded-full transition-all cursor-pointer ${activeSlide === idx ? 'w-5 bg-[#f0c243]' : 'w-1.5 bg-white/35'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* PENUTUP: FOTO + THANK YOU FOR YOUR ATTENDANCE */}
        <div className="relative z-10 text-center mt-12 space-y-4 font-sans pb-8">
          <div className="w-32 h-44 mx-auto rounded-2xl overflow-hidden border-2 border-[#f0c243]/50 shadow-xl">
            <img
              src={photoThankYou}
              alt="Windi & Iqbal"
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="text-sm font-bold tracking-widest text-[#ffd875] font-serif uppercase pt-2">
            THANK YOU FOR YOUR ATTENDANCE
          </h3>

          <p className="text-xs text-gray-300 leading-relaxed max-w-xs mx-auto">
            Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir di hari bahagia kami.
          </p>

          <p className="text-lg font-serif font-bold text-[#ffd875] pt-2">
            Windi &amp; Iqbal
          </p>
        </div>
      </section>
    </>
  );
}