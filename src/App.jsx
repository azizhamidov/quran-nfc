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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 via-blue-50 to-white px-6 py-12 font-sans">
      <h1 className="text-4xl md:text-5xl mb-10 text-gray-800 font-bold tracking-wide">
        Daily Verse
      </h1>

      <div className="max-w-2xl w-full bg-white shadow-lg rounded-3xl p-10 flex flex-col items-center text-center transition-transform transform hover:scale-105 duration-300">
        <p className="text-4xl md:text-5xl font-quran text-gray-900 mb-6 leading-snug">{verse.arabic}</p>
        <p className="text-lg text-gray-700 italic mb-4">{verse.translation}</p>
        <p className="text-sm text-gray-500">Surah {verse.surah}, Ayah {verse.ayah}</p>

        <button
          onClick={() => audio && audio.play()}
          className="mt-8 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md transition-all duration-200 flex items-center gap-2"
        >
          ▶️ Play Recitation
        </button>
      </div>

      <div className="absolute bottom-6 text-gray-400 text-sm opacity-70">
        Reflect and find peace ✨
      </div>
    </div>
  );
}
