// components/Loading.js
"use client";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loading() {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="loading-container h-screen w-full flex flex-col justify-center items-center bg-[#09090b]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="font-bold text-xl text-center mb-4">
        Please wait while we prepare your experience.
      </h1>
      <motion.div
        className="relative w-[80%] max-w-md h-6 bg-gray-200 rounded-full overflow-hidden"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute top-0 left-0 h-full bg-[#f30000]"
          style={{ width: `${percentage}%` }}
        ></motion.div>
      </motion.div>
      <span className="mt-2 text-lg font-medium">{percentage}%</span>
    </motion.div>
  );
}
