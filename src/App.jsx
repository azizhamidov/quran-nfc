import React, { useEffect, useState } from "react";
import { verses } from "./data";

export default function App() {
  const [verse, setVerse] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const randomVerse = verses[Math.floor(Math.random() * verses.length)];
    setVerse(randomVerse);
  }, []);

  useEffect(() => {
    if (verse) {
      if (audio) audio.pause();

      const newAudio = new Audio(verse.audio);
      setAudio(newAudio);

      newAudio.play().catch(() => {
        console.log("Autoplay blocked — user must tap Play button.");
      });
    }
  }, [verse]);

  if (!verse) return null;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blue-100 via-purple-50 to-pink-50">
      {/* Floating circles for soft animation */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-pink-200 rounded-full opacity-20 animate-pulse-slow"></div>

      <h1 className="text-4xl md:text-5xl mb-12 text-gray-800 font-bold tracking-wide">
        Daily Verse
      </h1>

      <div className="relative max-w-2xl w-full bg-white bg-opacity-20 backdrop-blur-xl rounded-3xl p-12 flex flex-col items-center text-center shadow-xl animate-fadeIn">
        <p className="text-4xl md:text-5xl font-quran text-gray-900 mb-6 leading-relaxed transition-transform duration-500 transform hover:scale-105">
          {verse.arabic}
        </p>
        <p className="text-lg text-gray-700 italic mb-4">{verse.translation}</p>
        <p className="text-sm text-gray-500 mb-6">Surah {verse.surah}, Ayah {verse.ayah}</p>

        <button
          onClick={() => audio && audio.play()}
          className="mt-4 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          ▶️ Play Recitation
        </button>
      </div>

      <div className="absolute bottom-6 text-gray-400 text-sm opacity-70">
        Reflect and find peace ✨
      </div>

      {/* Animations for Tailwind */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }

        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.3; }
        }

        .animate-pulse-slow {
          animation: pulseSlow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
