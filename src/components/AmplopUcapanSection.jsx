import React, { useState, useEffect } from 'react';
import ornamenJawa from '../assets/MOTIF ORNAMEN JAWA.png';

export default function AmplopUcapanSection({ guestName }) {
  const [copiedAccount, setCopiedAccount] = useState('');
  const [senderName, setSenderName] = useState(
    guestName !== 'Tamu Undangan' ? guestName : ''
  );
  const [ucapanText, setUcapanText] = useState('');

  useEffect(() => {
    if (guestName && guestName !== 'Tamu Undangan') {
      setSenderName(guestName);
    }
  }, [guestName]);

  const handleCopy = (rekeningNum, bankName) => {
    navigator.clipboard.writeText(rekeningNum);
    setCopiedAccount(bankName);
    setTimeout(() => setCopiedAccount(''), 2500);
  };

  const handleSendWA = (e) => {
    e.preventDefault();
    if (!ucapanText.trim()) return;

    const targetPhone = '6282385244193';
    const message = `Halo Windi & Iqbal,\nSaya *${senderName || 'Tamu Undangan'}* ingin mengucapkan:\n\n"${ucapanText}"`;
    const waUrl = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(message)}`;

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
      <section className="relative px-6 scroll-animate opacity-0 translate-y-6 transition-all duration-700 ease-out font-sans">
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
      </section>
    </>
  );
}