import React, { useState } from 'react';

export default function GenerateKirimWA() {
  const [recipientName, setRecipientName] = useState('');
  const [phone, setPhone] = useState('');
  const [copied, setCopied] = useState(false);

  // Ubah sesuai domain utama Vercel kamu
  const BASE_URL = 'https://iqbalwindi.vercel.app';

  const cleanName = recipientName.trim() || 'Nama Penerima';
  const encodedName = encodeURIComponent(cleanName);
  const invitationLink = `${BASE_URL}/?to=${encodedName}`;

  // Teks template undangan
  const messageText = `Yth. ${cleanName}

Assalamualaikum Warahmatullahi Wabarakatuh

Dengan memohon Rahmat dan Ridho Allah SWT, dan tanpa mengurangi rasa hormat melalui pesan ini kami mengundang Bapak/Ibu/Saudara/I untuk menghadiri acara pernikahan kami :

Windi & Iqbal

Berikut link undangan kami, untuk info lengkap dari acara bisa kunjungi :
${invitationLink}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Mohon maaf perihal undangan hanya di bagikan melalui pesan ini.

Note :
Jika link tidak bisa dibuka, silahkan copy link kemudian paste di Chrome atau Browser lainnya.
Untuk tampilan terbaik, silahkan akses melalui Browser Chrome / Safari dan non-aktifkan Dark Mode / Mode Gelap.

Terima kasih banyak atas perhatiannya.

Wassalamualaikum Warahmatullahi Wabarakatuh`;

  // Salin pesan ke clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Kirim langsung via WhatsApp
  const handleSendWA = (e) => {
    e.preventDefault();
    if (!recipientName.trim()) return;

    let target = phone.replace(/[^0-9]/g, '');
    if (target.startsWith('0')) {
      target = '62' + target.slice(1);
    }

    const waUrl = target
      ? `https://api.whatsapp.com/send?phone=${target}&text=${encodeURIComponent(messageText)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(messageText)}`;

    window.open(waUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#3a0509] text-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg bg-[#50060c] border border-[#f0c243]/40 rounded-2xl p-6 shadow-2xl space-y-5">
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold text-[#ffd875] font-serif">
            Generator Link Undangan WA
          </h1>
          <p className="text-xs text-gray-300">
            Windi &amp; Iqbal Wedding Invitation
          </p>
        </div>

        <form onSubmit={handleSendWA} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-200 mb-1">
              Nama Penerima / Tamu *
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Contoh: Gefrin dan Keluarga"
              className="w-full bg-[#3a0509] border border-[#f0c243]/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f0c243]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-200 mb-1">
              No. WhatsApp Penerima (Opsional)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Contoh: 081234567890 (kosongkan jika mau kirim via share menu)"
              className="w-full bg-[#3a0509] border border-[#f0c243]/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#f0c243]"
            />
          </div>

          {/* Preview Teks */}
          <div>
            <label className="block text-xs font-semibold text-gray-200 mb-1">
              Preview Teks Pesan:
            </label>
            <textarea
              readOnly
              rows="10"
              value={messageText}
              className="w-full bg-[#200204] border border-[#f0c243]/20 rounded-lg p-3 text-xs text-gray-300 font-mono leading-relaxed focus:outline-none"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 py-2.5 bg-[#f0c243] hover:bg-[#d9ab30] text-[#50060c] font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <span>{copied ? '✅ Berhasil Disalin!' : '📋 Copy Teks'}</span>
            </button>

            <button
              type="submit"
              className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <span>💬 Kirim ke WA</span>
            </button>
          </div>
        </form>

        <div className="text-center pt-2 border-t border-[#f0c243]/20">
          <a
            href="/"
            className="text-[11px] text-[#ffd875] hover:underline"
          >
            ← Kembali ke Halaman Utama Undangan
          </a>
        </div>
      </div>
    </div>
  );
}