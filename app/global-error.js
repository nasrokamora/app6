'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';




export default function GlobalError({ error, reset }) {
  const [isOnline, setIsOnline] = useState(true);

  const router = useRouter()
  useEffect(() => {
    // Check the connection status when the page loads
    setIsOnline(navigator.onLine);

    // Add event listeners for `online` and `offline` events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <html>
      <body className="w-full flex justify-center items-center p-6">
        {!isOnline ? (
          <div className="w-full flex justify-center items-center flex-col p-6  border border-red-700 text-3xl md:text-xl font-bold">
            <h2 >Internet connection lost!</h2>
            <p>Please check your internet connection and try again.</p>
          </div>
        ) : (
          <div className='w-full flex justify-center items-center flex-col p-6  border border-red-700 text-white'>
            <h2 className=" text-3xl md:text-xl">Something went wrong!</h2>
            <button className=' font-bold py-2 px-4 rounded-full shadow-md hover:bg-red-600' onClick={() => router.refresh()}>Try again</button>
          </div>
        )}
      </body>
    </html>
  )
}

// export default function GlobalError({ error, reset }) {
//   const [isOnline, setIsOnline] = useState(true);
//   const [isSlowConnection, setIsSlowConnection] = useState(false);

//   useEffect(() => {
//     // Check the connection status when the page loads
//     setIsOnline(navigator.onLine);

//     // Measure the time to fetch a resource
//     const testConnectionSpeed = async () => {
//       const startTime = new Date().getTime();
//       try {
//         await fetch('https://example.com/image.jpg'); // استخدم رابط صورة أو أي ملف صغير للاختبار
//         const duration = new Date().getTime() - startTime;
//         if (duration > 3000) { // إذا استغرق التحميل أكثر من 3 ثوانٍ، نعتبره بطيء
//           setIsSlowConnection(true);
//         }
//       } catch (error) {
//         console.error('Error fetching the resource:', error);
//       }
//     };

//     testConnectionSpeed();

//     // Add event listeners for `online` and `offline` events
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);

//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);

//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
//     };
//   }, []);

//   return (
//     <html>
//       <body>
//         {!isOnline ? (
//           <div>
//             <h2>Internet connection lost!</h2>
//             <p>Please check your internet connection and try again.</p>
//           </div>
//         ) : isSlowConnection ? (
//           <div>
//             <h2>Your connection is slow!</h2>
//             <p>The network is slow, which may affect the performance.</p>
//           </div>
//         ) : (
//           <div>
//             <h2>Something went wrong!</h2>
//             <button onClick={() => reset()}>Try again</button>
//           </div>
//         )}
//       </body>
//     </html>
//   )
// }

// import { useEffect, useState } from 'react';


