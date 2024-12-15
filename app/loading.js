"use client";

import { useEffect, useState } from "react";


export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 5 : 100));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (

    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 bg-[url('/images/cinema-bg.jpg')] bg-cover bg-center opacity-10 blur-sm"></div>

      {/* شعار متحرك */}
      <div className="relative z-10 text-center animate-fade-in">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#b62323] via-[#9c40ff] to-[#b62323] animate-text-glow">
          Magix Movies
        </h1>
        <p className="mt-4 text-xl font-medium">Loading {progress}%</p>
      </div>

      {/* شريط تحميل */}
      <div className="relative w-64 h-2 mt-6 bg-gray-700 rounded-full overflow-hidden shadow-lg">
        <div
          className="absolute h-2 bg-gradient-to-r from-[#b62323] via-[#9c40ff] to-[#b62323] transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* دوائر متحركة */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border-4 border-[#b62323] animate-spin-slow opacity-20"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full border-4 border-[#9c40ff] animate-spin-slow opacity-20"></div>
    </div>
  );
  // <motion.div
  //   className="loading-container h-screen w-full flex flex-col justify-center items-center bg-[#09090b]"
  //   initial={{ opacity: 0 }}
  //   animate={{ opacity: 1 }}
  //   exit={{ opacity: 0 }}
  // >
  //   <h1 className="font-bold text-xl text-center mb-4">
  //     Please wait while we prepare your experience.
  //   </h1>
  //   <motion.div
  //     className="relative w-[80%] max-w-md h-6 bg-gray-200 rounded-full overflow-hidden"
  //     initial={{ scaleX: 0 }}
  //     animate={{ scaleX: 1 }}
  //     transition={{ duration: 0.5 }}
  //   >
  //     <motion.div
  //       className="absolute top-0 left-0 h-full bg-[#f30000]"
  //       style={{ width: `${percentage}%` }}
  //     ></motion.div>
  //   </motion.div>
  //   <span className="mt-2 text-lg font-medium">{percentage}%</span>
  // </motion.div>

}
