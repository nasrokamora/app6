"use client";

import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-[#09090b] text-white">
      <div className="text-center text-xl">
        <h1 className="text-3xl font-bold">Loading{dots}</h1>
        <p className="mt-2 text-xl font-semibold text-gray-400">Just a moment, we’re getting things ready !</p>
        <div className="mt-4 w-16 h-1 bg-blue-500 animate-pulse mx-auto"></div>
      </div>
    </div>
  );
}

