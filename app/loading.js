// import { Skeleton } from "@/components/ui/skeleton"

// export default function Loading() {
//   return (
//     <div className=' flex justify-center items-center h-screen'>

    
//     <div className="flex flex-col space-y-3">
//       <Skeleton className="h-[250px] w-[500px] rounded-xl md:w-[100px] md:h-[100px]" />
//       <div className="space-y-2">
//         <Skeleton className="h-4 w-[250px] md:h-[150px]" />
//         <Skeleton className="h-4 w-[200px] md:w-[100px]" />
//       </div>
//     </div>
//     </div>
//   )
// }

// components/Loading.js
"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import icon_magix from '../public/Icon_magix.png'

export default function Loading(){
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
    }, 50); // يمكنك تعديل سرعة التحميل عن طريق تغيير قيمة 30

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="loading-container h-screen w-full"

      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className=' flex justify-center items-center  overflow-hidden relative flex-col gap-4 h-screen'>
        <h1 className='font-bold text-xl text-wrap'>
          Please wait while we prepare your experience for your visit.
        </h1>
        {/* <Image src={icon_magix} width={300} height={300} alt="logo" priority className=' animate-pulse'
        /> */}
        <motion.h1
        initial={{opacity:0,}}
        animate={{opacity:1, }}
        transition={{duration:2, delay:0.5}}
        className=' font-bold text-xl text-wrap'>Just a moment, your experience is on its way!</motion.h1>
      </div>
      <motion.div
        className="loading-bar  h-1 bg-[#f30000] mb-5 rounded-md fixed top-0 left-0 right-0 origin-left"
        initial={{ width: '0%' }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5 }}
      />

    </motion.div>
  );
};



