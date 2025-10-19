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
      {/* Floating animated circles */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-pink-200 rounded-full opacity-20 animate-pulse-slow"></div>
      <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-blue-200 rounded-full opacity-10 animate-pulse-slower"></div>
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-purple-300 rounded-full opacity-15 animate-pulse-slower"></div>

      <h1 className="text-4xl md:text-5xl mb-12 text-gray-800 font-bold tracking-wide animate-fadeInDown">
        Daily Verse
      </h1>

      {/* Glassmorphic card with floating animation */}
      <div className="relative max-w-2xl w-full bg-white bg-opacity-20 backdrop-blur-xl rounded-3xl p-12 flex flex-col items-center text-center shadow-2xl animate-floating">
        <p className="text-4xl md:text-5xl font-quran text-gray-900 mb-6 leading-relaxed transition-transform duration-500 transform hover:scale-105">
          {verse.arabic}
        </p>
        <p className="text-lg text-gray-700 italic mb-4">{verse.translation}</p>
        <p className="text-sm text-gray-500 mb-6">Surah {verse.surah}, Ayah {verse.ayah}</p>

        <button
          onClick={() => audio && audio.play()}
          className="mt-4 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl shadow-lg transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
        >
          ▶️ Play Recitation
        </button>
      </div>

      <div className="absolute bottom-6 text-gray-400 text-sm opacity-70 animate-fadeInUp">
        Reflect and find peace ✨
      </div>

      {/* Advanced animations */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.3; }
        }

        @keyframes pulseSlower {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.3); opacity: 0.15; }
        }

        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
        .animate-fadeInDown { animation: fadeInDown 1s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; }
        .animate-pulse-slow { animation: pulseSlow 8s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulseSlower 12s ease-in-out infinite; }
        .animate-floating { animation: floating 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
