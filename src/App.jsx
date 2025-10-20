import React, { useEffect, useState } from "react";
import { verses } from "./data";

export default function App() {
  const [verse, setVerse] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isDark, setIsDark] = useState(false);

  // Detect device theme
  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(darkThemeMq.matches);
    const listener = (e) => setIsDark(e.matches);
    darkThemeMq.addEventListener("change", listener);
    return () => darkThemeMq.removeEventListener("change", listener);
  }, []);

  // Pick random verse
  useEffect(() => {
    const randomVerse = verses[Math.floor(Math.random() * verses.length)];
    setVerse(randomVerse);
  }, []);

  // Handle audio
  useEffect(() => {
    if (verse) {
      if (audio) audio.pause();
      const newAudio = new Audio(verse.audio);
      setAudio(newAudio);
      newAudio.play().catch(() => console.log("Autoplay blocked."));
    }
  }, [verse]);

  if (!verse) return null;

  // Define color themes
  const bgGradient = isDark
    ? "from-gray-900 via-gray-800 to-gray-700"
    : "from-blue-100 via-purple-50 to-pink-50";
  const cardBg = isDark
    ? "bg-gray-800 bg-opacity-30 backdrop-blur-xl"
    : "bg-white bg-opacity-20 backdrop-blur-xl";
  const textColor = isDark ? "text-gray-100" : "text-gray-900";
  const subTextColor = isDark ? "text-gray-300" : "text-gray-500";

  return (
    <div className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b ${bgGradient}`}>
      {/* Floating circles */}
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full opacity-20 bg-purple-400 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full opacity-20 bg-pink-400 animate-pulse-slow"></div>

      <h1 className={`text-4xl md:text-5xl mb-12 font-bold tracking-wide animate-fadeInDown ${textColor}`}>
        Today's Peace
      </h1>

      {/* Glassmorphic card */}
      <div className={`relative max-w-2xl w-full ${cardBg} rounded-3xl p-12 flex flex-col items-center text-center shadow-2xl animate-floating`}>
        <p className={`text-4xl md:text-5xl font-quran mb-6 leading-relaxed transition-transform duration-500 transform hover:scale-105 ${textColor}`}>
          {verse.arabic}
        </p>
        <p className={`text-lg italic mb-4 ${subTextColor}`}>{verse.translation}</p>
        <p className={`text-sm mb-6 ${subTextColor}`}>Surah {verse.surah}, Ayah {verse.ayah}</p>

        {/* Modern device-settings-like button */}
        <button
          onClick={() => audio && audio.play()}
          className={`relative inline-flex items-center justify-center px-8 py-3 rounded-full shadow-lg transition-all duration-300 group overflow-hidden ${
            isDark
              ? "bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 hover:from-purple-600 hover:to-purple-500 text-white"
              : "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 hover:from-blue-500 hover:to-blue-600 text-white"
          }`}
        >
          <span className="relative z-10 text-lg font-medium flex items-center gap-2">
            ▶️ Play Recitation
          </span>
          <span className="absolute inset-0 bg-white opacity-10 rounded-full transform scale-0 group-hover:scale-150 transition-transform duration-500"></span>
        </button>
      </div>

      <div className={`absolute bottom-6 text-sm opacity-70 animate-fadeInUp ${subTextColor}`}>
        Reflect and find peace ✨
      </div>

      {/* Animations */}
      <style jsx>{`
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
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-fadeInDown { animation: fadeInDown 1s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; }
        .animate-pulse-slow { animation: pulseSlow 8s ease-in-out infinite; }
        .animate-floating { animation: floating 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}