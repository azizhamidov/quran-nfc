import React, { useEffect, useState } from "react";
import { verses } from "./data";

export default function App() {
  const [verse, setVerse] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    // Select random verse on load
    const randomVerse = verses[Math.floor(Math.random() * verses.length)];
    setVerse(randomVerse);
  }, []);

  useEffect(() => {
    if (verse) {
      // Stop previous audio if any
      if (audio) {
        audio.pause();
      }

      // Load new audio
      const newAudio = new Audio(verse.audio);
      setAudio(newAudio);

      // Try to autoplay
      newAudio.play().catch(() => {
        console.log("Autoplay blocked — user must tap Play button.");
      });
    }
  }, [verse]);

  if (!verse) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 text-white px-6 py-12">
      <h1 className="text-4xl md:text-5xl mb-8 glow-text font-extrabold">
        Quran NFC Verse
      </h1>

      <div className="max-w-3xl bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-3xl shadow-xl animate-fadeIn">
        <p className="text-4xl font-quran text-right leading-relaxed mb-4">{verse.arabic}</p>
        <p className="text-lg text-purple-200 italic mb-2">{verse.translation}</p>
        <p className="text-sm text-purple-300 text-right">Surah {verse.surah}, Ayah {verse.ayah}</p>

        <button
          onClick={() => audio && audio.play()}
          className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-lg"
        >
          ▶️ Play Recitation
        </button>
      </div>
    </div>
  );
}
