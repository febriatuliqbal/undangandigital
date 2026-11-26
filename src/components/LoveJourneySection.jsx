import React, { useState } from 'react';
import ornamenJawa from '../assets/MOTIF ORNAMEN JAWA.png';

export default function LoveJourneySection() {
  const [activeTab, setActiveTab] = useState(0);

  const journeySteps = [
    {
      year: '2021',
      title: 'Awal Pertemuan',
      icon: '🌱',
      description: 'Pertama kali saling mengenal dan berbagi cerita. Berawal dari sapaan singkat yang menumbuhkan rasa nyaman.',
    },
    {
      year: '2023',
      title: 'Memulai Komitmen',
      icon: '💬',
      description: 'Sepakat untuk melangkah lebih jauh bersama, saling mendukung di masa perkuliahan hingga meraih gelar bersama.',
    },
    {
      year: '2026',
      title: 'Momen Lamaran',
      icon: '💍',
      description: 'Dengan restu kedua orang tua, kami mantap mengikat janji suci untuk melangkah ke jenjang pernikahan.',
    },
    {
      year: '19 Des 2026',
      title: 'Hari Bahagia',
      icon: '👩‍❤️‍👨',
      description: 'Hari di mana kami mengucap janji suci dalam ikatan pernikahan yang dipenuhi keberkahan.',
    },
  ];

  return (
    <section className="relative px-6 space-y-6 scroll-animate opacity-0 translate-y-6 transition-all duration-700 ease-out font-sans">
      <img
        src={ornamenJawa}
        alt="Ornamen Journey"
        className="absolute -top-8 -left-12 w-40 h-auto opacity-20 brightness-50 pointer-events-none z-0"
      />

      <div className="text-center space-y-1 relative z-10">
        <p className="text-[10px] tracking-[0.25em] text-[#ffd875]/80 uppercase">
          Our Story
        </p>
        <h3 className="text-xl font-bold text-[#ffd875] font-serif">
          Perjalanan Cinta Kami
        </h3>
      </div>

      {/* Stepper Node (Timeline Horizontal Interactive) */}
      <div className="relative z-10 bg-[#50060c]/90 border border-[#f0c243]/40 p-4 rounded-2xl shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-between relative mb-6">
          {/* Line Background */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-[#f0c243]/30 -translate-y-1/2 z-0" />
          
          {/* Active Progress Line */}
          <div
            className="absolute top-1/2 left-4 h-0.5 bg-[#f0c243] -translate-y-1/2 z-0 transition-all duration-500 ease-out"
            style={{ width: `${(activeTab / (journeySteps.length - 1)) * 85}%` }}
          />

          {journeySteps.map((step, index) => {
            const isActive = activeTab === index;
            const isPassed = activeTab >= index;

            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#f0c243] text-[#50060c] scale-110 shadow-lg ring-4 ring-[#ffd875]/30'
                    : isPassed
                    ? 'bg-[#ffd875] text-[#50060c]'
                    : 'bg-[#3a0509] text-gray-400 border border-[#f0c243]/30'
                }`}
              >
                <span>{step.icon}</span>
              </button>
            );
          })}
        </div>

        {/* Card Detail Perjalanan */}
        <div className="bg-[#3a0509]/80 border border-[#f0c243]/30 p-4 rounded-xl text-center space-y-2 transition-all duration-300 min-h-[130px] flex flex-col justify-center items-center">
          <span className="inline-block px-3 py-0.5 bg-[#f0c243]/20 text-[#ffd875] border border-[#f0c243]/40 rounded-full text-[10px] font-bold">
            {journeySteps[activeTab].year}
          </span>
          <h4 className="text-sm font-bold text-white font-serif">
            {journeySteps[activeTab].title}
          </h4>
          <p className="text-xs text-gray-300 leading-relaxed max-w-xs">
            {journeySteps[activeTab].description}
          </p>
        </div>

        {/* Navigation Indicator */}
        <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#f0c243]/20 text-[11px] text-[#ffd875]/80">
          <button
            disabled={activeTab === 0}
            onClick={() => setActiveTab((prev) => prev - 1)}
            className="hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
          >
            ← Sebelumnya
          </button>
          <span>{activeTab + 1} dari {journeySteps.length}</span>
          <button
            disabled={activeTab === journeySteps.length - 1}
            onClick={() => setActiveTab((prev) => prev + 1)}
            className="hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
          >
            Selanjutnya →
          </button>
        </div>
      </div>
    </section>
  );
}