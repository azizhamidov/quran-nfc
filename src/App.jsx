// src/App.jsx
import React, { useEffect, useState } from 'react';
import { verses } from './data';

export default function App() {
  const [verse, setVerse] = useState(null);

  useEffect(() => {
    // Simulate NFC scan by picking a random verse on load
    const randomVerse = verses[Math.floor(Math.random() * verses.length)];
    setVerse(randomVerse);
  }, []);

  if (!verse) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 text-white">
        <p className="text-xl font-semibold tracking-wide animate-pulse">Waiting for NFC scan...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 text-white px-4 py-10 flex flex-col items-center">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide mb-2 drop-shadow-lg glow-text">
          Quran NFC Verse
        </h1>
        <p className="text-lg text-purple-300 italic tracking-wider">Touch your NFC tag to get a blessed verse</p>
      </header>

      <main className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl shadow-xl max-w-3xl w-full p-10 space-y-6 animate-fadeIn">
        <p className="text-5xl font-quran text-right leading-relaxed mb-4 drop-shadow-md">
          {verse.arabic}
        </p>
        <p className="text-lg md:text-xl font-light text-purple-200 leading-relaxed tracking-wide">
          {verse.translation}
        </p>
        <p className="text-sm text-purple-300 italic text-right">Surah {verse.surah}, Ayah {verse.ayah}</p>
      </main>

      <footer className="mt-auto pt-10 text-center text-purple-400 text-sm opacity-70">
        © 2025 Quran NFC • Made with ❤️ and React + Tailwind
      </footer>
    </div>
  );
}
