import React, { useEffect, useState } from "react";

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

  // Fetch Quran data from API
  useEffect(() => {
    fetch("https://alquran-api.pages.dev/api/quran?lang=en")
      .then((res) => res.json())
      .then((data) => {
        // data contains all surahs; pick a random verse
        const surahIndex = Math.floor(Math.random() * data.length);
        const surah = data[surahIndex];
        const ayahIndex = Math.floor(Math.random() * surah.ayahs.length);
        const ayah = surah.ayahs[ayahIndex];

        const verseData = {
          surah: surah.number,
          ayah: ayah.numberInSurah,
          arabic: ayah.text,
          translation: ayah.translation,
          audio: ayah.audio.url, // API has audio URLs
        };

        setVerse(verseData);
      })
      .catch((err) => console.error("Failed to fetch Quran API:", err));
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

  if (!verse) return <div>Loading...</div>;

  // Colors based on theme
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
      {/* Card */}
      <div className={`relative max-w-2xl w-full ${cardBg} rounded-3xl p-12 flex flex-col items-center text-center shadow-2xl animate-floating`}>
        <p className={`text-4xl md:text-5xl font-quran mb-6 leading-relaxed ${textColor}`}>
          {verse.arabic}
        </p>
        <p className={`text-lg italic mb-4 ${subTextColor}`}>{verse.translation}</p>
        <p className={`text-sm mb-6 ${subTextColor}`}>Surah {verse.surah}, Ayah {verse.ayah}</p>

        <button
          onClick={() => audio && audio.play()}
          className={`px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl shadow-lg transition-all duration-300`}
        >
          ▶️ Play Recitation
        </button>
      </div>
    </div>
  );
}
