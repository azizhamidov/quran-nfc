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
        ); // Arabic + Alafasy recitation
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

  const themes = {
    aurora: isDark
      ? "from-gray-900 via-gray-800 to-gray-700"
      : "from-blue-100 via-purple-50 to-pink-50",
    glass: isDark
      ? "from-gray-800 via-gray-700 to-gray-600"
      : "from-blue-50 via-cyan-50 to-teal-50",
    dawn: isDark
      ? "from-gray-700 via-gray-600 to-gray-500"
      : "from-yellow-50 via-orange-50 to-red-50",
    neo: isDark
      ? "from-gray-600 via-gray-500 to-gray-400"
      : "from-green-50 via-lime-50 to-emerald-50",
    desert: isDark
      ? "from-gray-500 via-gray-400 to-gray-300"
      : "from-amber-50 via-orange-100 to-yellow-50",
    sky: isDark
      ? "from-gray-400 via-gray-300 to-gray-200"
      : "from-blue-50 via-indigo-50 to-violet-50",
    ink: isDark
      ? "from-gray-300 via-gray-200 to-gray-100"
      : "from-purple-50 via-indigo-100 to-blue-50",
    orchid: isDark
      ? "from-gray-200 via-gray-100 to-gray-50"
      : "from-pink-50 via-fuchsia-50 to-purple-50",
  };

  const [currentTheme, setCurrentTheme] = useState("aurora");
  const cardBg = isDark
    ? "bg-gray-800 bg-opacity-30 backdrop-blur-xl"
    : "bg-white bg-opacity-20 backdrop-blur-xl";
  const textColor = isDark ? "text-gray-100" : "text-gray-900";
  const subTextColor = isDark ? "text-gray-300" : "text-gray-500";

  if (loading)
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-b ${themes[currentTheme]}`}>
        <div className="w-24 h-24 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <p className={`mt-6 text-lg ${subTextColor}`}>Fetching a beautiful verse...</p>
      </div>
    );

  return (
    <div className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b ${themes[currentTheme]}`}>
      {/* Theme Switcher */}
      <div className="absolute top-4 left-4 flex space-x-2">
        {Object.keys(themes).map((theme) => (
          <button
            key={theme}
            onClick={() => setCurrentTheme(theme)}
            className={`px-3 py-1 rounded-full text-xs ${currentTheme === theme ? "bg-white bg-opacity-20" : "bg-transparent"}`}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </button>
        ))}
      </div>

      {/* Floating circles */}
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full opacity-20 bg-purple-400 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full opacity-20 bg-pink-400 animate-pulse-slow"></div>

      <h1 className={`text-4xl md:text-5xl mb-12 font-bold tracking-wide animate-fadeInDown ${textColor}`}>
        Today's Peace
      </h1>

      {/* Glassmorphic card */}
      <div className={`relative max-w-2xl w-full ${cardBg} rounded-3xl p-12 flex flex-col items-center text-center shadow-2xl animate-floating`}>
        <p className={`text-3xl md:text-5xl font-quran mb-6 leading-relaxed transition-transform duration-500 transform hover:scale-105 ${textColor}`}>
          {verse.arabic}
        </p>
        <p className={`text-lg italic mb-4 ${subTextColor}`}>{verse.translation}</p>
        <p className={`text-sm mb-6 ${subTextColor}`}>
          Surah {verse.surah}, Ayah {verse.ayah}
        </p>

        {verse.audio && (
          <button
            onClick={() => audio && audio.play()}
            className={`px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl shadow-lg transition-all duration-300`}
          >
            ▶️ Play Recitation
          </button>
        )}
      </div>

      <div className={`absolute bottom-6 text-sm opacity-70 animate-fadeInUp ${subTextColor}`}>
        Reflect and find peace ✨
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInDown {0% {opacity:0; transform:translateY(-30px);} 100% {opacity:1; transform:translateY(0);}}
        @keyframes fadeInUp {0% {opacity:0; transform:translateY(20px);} 100% {opacity:1; transform:translateY(0);}}
        @keyframes pulseSlow {0%,100% {transform:scale(1); opacity:0.2;} 50% {transform:scale(1.2); opacity:0.3;}}
        @keyframes floating {0% {transform:translateY(0px);} 50% {transform:translateY(-15px);} 100% {transform:translateY(0px);}}
        @keyframes spin {0% {transform:rotate(0deg);} 100% {transform:rotate(360deg);}}
        .animate-fadeInDown {animation: fadeInDown 1s ease-out forwards;}
        .animate-fadeInUp {animation: fadeInUp 1s ease-out forwards;}
        .animate-pulse-slow {animation: pulseSlow 8s ease-in-out infinite;}
        .animate-floating {animation: floating 6s ease-in-out infinite;}
        .animate-spin {animation: spin 1s linear infinite;}
      `}</style>
    </div>
  );
}