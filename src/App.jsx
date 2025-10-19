import { useEffect, useState } from "react";
import { ayat } from "./data";

export default function App() {
  const [verse, setVerse] = useState(null);
  const [audio] = useState(new Audio());

  useEffect(() => {
    const random = ayat[Math.floor(Math.random() * ayat.length)];
    setVerse(random);
    audio.src = random.audio;
    audio.play().catch(() => {
      console.log("Autoplay blocked — user must tap Play.");
    });

    return () => audio.pause();
  }, []);

  if (!verse) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <div className="max-w-lg bg-white shadow-lg rounded-lg p-6">
        <div className="text-gray-600 mb-2">
          Surah {verse.surah} • Ayah {verse.ayah}
        </div>
        <div className="text-3xl md:text-4xl font-arabic mb-4 leading-loose">
          {verse.arabic}
        </div>
        <div className="text-lg text-gray-800 italic mb-6">
          {verse.translation}
        </div>
        <button
          onClick={() => audio.play()}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ▶️ Play Recitation
        </button>
      </div>
    </div>
  );
}
