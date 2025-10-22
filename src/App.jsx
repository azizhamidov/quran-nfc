import React, { useEffect, useState } from "react";

export default function App() {
  const [verse, setVerse] = useState(null);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  // Detect system theme
  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(darkThemeMq.matches);
    const listener = (e) => setIsDark(e.matches);
    darkThemeMq.addEventListener("change", listener);
    return () => darkThemeMq.removeEventListener("change", listener);
  }, []);

  // Fetch a random ayah
  useEffect(() => {
    const fetchVerse = async () => {
      try {
        const surah = Math.floor(Math.random() * 114) + 1; // Surah 1-114
        const surahRes = await fetch(`https://api.alquran.cloud/v1/surah/${surah}`);
        const surahData = await surahRes.json();
        const ayahCount = surahData.data.numberOfAyahs;
        const ayahNumber = Math.floor(Math.random() * ayahCount) + 1;

        const ayahRes = await fetch(
          `https://api.alquran.cloud/v1/ayah/${surah}:${ayahNumber}/ar.alafasy`
        );
        const ayahData = await ayahRes.json();

        const translationRes = await fetch(
          `https://api.alquran.cloud/v1/ayah/${surah}:${ayahNumber}/en.sahih`
        );
        const translationData = await translationRes.json();

        setVerse({
          arabic: ayahData.data.text,
          audio: ayahData.data.audio,
          translation: translationData.data.text,
          surah: ayahData.data.surah.number,
          ayah: ayahData.data.numberInSurah,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVerse();
  }, []);

  // Handle audio
  useEffect(() => {
    if (verse?.audio) {
      if (audio) audio.pause();
      const newAudio = new Audio(verse.audio);
      setAudio(newAudio);
    }
  }, [verse]);

  const bgGradient = isDark
    ? "from-gray-900 via-gray-800 to-gray-700"
    : "from-blue-100 via-purple-50 to-pink-50";
  const cardBg = isDark
    ? "bg-gray-800 bg-opacity-30 backdrop-blur-xl"
    : "bg-white bg-opacity-20 backdrop-blur-xl";
  const textColor = isDark ? "text-gray-100" : "text-gray-900";
  const subTextColor = isDark ? "text-gray-300" : "text-gray-500";

  if (loading)
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-b ${bgGradient}`}
      >
        <div className="w-24 h-24 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <p className={`mt-6 text-lg ${subTextColor}`}>
          Fetching a beautiful verse...
        </p>
      </div>
    );

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b ${bgGradient}`}
    >
      {/* ✨ Blurry Floating Circles ✨ */}
      <div className="absolute top-10 left-10 w-56 h-56 rounded-full bg-purple-400 opacity-30 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-pink-400 opacity-30 blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-blue-400 opacity-20 blur-3xl animate-pulse-slow"></div>

      <h1
        className={`text-4xl md:text-5xl mb-12 font-bold tracking-wide animate-fadeInDown ${textColor}`}
      >
        Today's Peace
      </h1>

      {/* Glassmorphic card */}
      <div
        className={`relative max-w-2xl w-full ${cardBg} rounded-3xl p-12 flex flex-col items-center text-center shadow-2xl animate-floating`}
      >
        <p
          className={`text-3xl md:text-5xl font-quran mb-6 leading-relaxed transition-transform duration-500 transform hover:scale-105 ${textColor}`}
        >
          {verse.arabic}
        </p>
        <p className={`text-lg italic mb-4 ${subTextColor}`}>
          {verse.translation}
        </p>
        <p className={`text-sm mb-6 ${subTextColor}`}>
          Surah {verse.surah}, Ayah {verse.ayah}
        </p>

        {verse.audio && (
          <button
            onClick={() => audio && audio.play()}
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl shadow-lg transition-all duration-300"
          >
            ▶️ Play Recitation
          </button>
        )}
      </div>

      <div
        className={`absolute bottom-6 text-sm opacity-70 animate-fadeInUp ${subTextColor}`}
      >
        Reflect and find peace ✨
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulseSlow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.25;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.35;
          }
        }
        @keyframes floating {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 1s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulseSlow 8s ease-in-out infinite;
        }
        .animate-floating {
          animation: floating 6s ease-in-out infinite;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
