"use client";

import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import LoadingGenreCarousel from "@/app/Components/LoadingUi/LoadingGenreCarousel";
import no_image from '../../../../public/image/no_image4.webp';

export default function PaginationTvShow() {
    const [currentPage, setCurrentPage] = useState(1); // الحالة الحالية للصفحة
    const [dataTv, setDataTv] = useState([]); // لتخزين بيانات المسلسلات
    const [isLoading, setIsLoading] = useState(true); // حالة التحميل
    const [error, setError] = useState(null); // لتخزين أي خطأ أثناء الجلب
    const cacheRef = useRef({}); // لتخزين البيانات المجلوبة مؤقتًا

    useEffect(() => {
        fetchTvShow(currentPage);
    }, [currentPage]);

    const fetchTvShow = async (page) => {
        // إذا كانت البيانات موجودة في الكاش، استخدمها بدلاً من جلبها مجددًا
        // if (cacheRef.current[page]) {
        //     setDataTv(cacheRef.current[page]);
        //     setIsLoading(false);
        //     return;
        // }

        setIsLoading(true);
        setError(null); // إعادة تعيين الخطأ قبل بدء الجلب

        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    accept: "application/json",
                },
                // خيارات التخزين المؤقت يمكن تعديلها حسب الحاجة

            });

            if (!response.ok) {
                throw new Error("حدث خطأ أثناء جلب البيانات");
            }

            const data = await response.json();
            setDataTv(data.results);
            // cacheRef.current[page] = data.results; // تخزين البيانات في الكاش
        } catch (error) {
            console.log('فشل جلب البيانات => PaginationTvShow', error);
            setError(error.message || "حدث خطأ غير متوقع");
        }

        setIsLoading(false);
    };

    // دالة لتغيير الصفحة الحالية
    const handleChangePageTv = (newPage) => {
        if (newPage < 1) return; // منع الانتقال إلى صفحات سالبة
        setCurrentPage(newPage); // تحديث الحالة الحالية للصفحة
    };

    return (
        <div className="w-full h-auto">
            <div className="flex justify-center mb-2">
                <h1>Tv Show</h1>
            </div>

            <div className="flex items-center justify-center w-full">
                {isLoading ? (
                    <LoadingGenreCarousel />
                ) : error ? (
                    <div className="text-center">
                        <h1>Error: {error}</h1>
                        <button
                            onClick={() => fetchTvShow(currentPage)}
                            className="px-4 py-2 mt-2 text-white bg-red-500 rounded"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <div className="w-full gap-2 flex justify-center ">

                    <ScrollArea className="max-w-6xl  p-4 whitespace-nowrap ">
                        <div className="flex items-center justify-start gap-2 w-max ">

                        {dataTv && dataTv.length > 0 ? (
                            dataTv.map((tv) => (
                                <div key={tv.id} className=" max-w-5xl p-3">

                                        <div className=" ">
                                            <Image
                                                src={
                                                    tv.poster_path
                                                        ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
                                                        : no_image
                                                }
                                                alt="image_tv"
                                                width={120}
                                                height={150}
                                                className="rounded-md "
                                                priority={true}  
                                                style={{width:'auto'}}
                                                draggable={false}
                                            />
                                        </div>
                                    </div>
                            ))
                        ) : (
                            <div className="text-center">
                                <h1>No TV shows found</h1>
                            </div>
                        )}
                                </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            className="cursor-pointer"
                            onClick={() => handleChangePageTv(currentPage - 1)}
                            disabled={currentPage === 1}
                        />
                    </PaginationItem>

                    {Array(5).fill(0).map((_, index) =>(
                        <PaginationItem key={index}>
                            <PaginationLink
                                className="cursor-pointer"
                                onClick={() => handleChangePageTv(index + 1)}
                                isActive={currentPage === index + 1}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationNext
                            className="cursor-pointer"
                            onClick={() => handleChangePageTv(currentPage + 1)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}







// import Image from "next/image"
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
// import { useEffect, useRef, useState } from "react";
// import {
//     Pagination,
//     PaginationContent,
//     PaginationEllipsis,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious,
// } from "@/components/ui/pagination";
// import LoadingGenreCarousel from "@/app/Components/LoadingUi/LoadingGenreCarousel";
// import no_image from '../../../../public/image/no_image4.webp'


// export default function PaginationTvShow() {

//     const [currentPage, setCurrentPage] = useState(1)
//     const [dataTv, setDataTv] = useState([])
//     const [isLoading, setIsLoading] = useState(true)
//     const cacheRef = useRef({})

//     useEffect(() => {
//         fetchTvShow()
//     }, [currentPage])

//     const fetchTvShow = async () => {
//         setIsLoading(true)

//         if(cacheRef.current[currentPage]) {
//                  // إذا كانت البيانات موجودة في الكاش، استخدمها بدلاً من جلبها مجددًا
//             setDataTv(cacheRef.current[currentPage])
//             setIsLoading(false)
//             return
//         }

//         try {
//             const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${currentPage}`, {
//                     headers: {
//                         Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
//                         accept: "application/json"
//                     }
//             })
//             const data = await response.json()
//             setDataTv(data.results)
//             cacheRef.current[currentPage] = data.results
//         } catch (error) {
//             console.log('failed fetch data =>pagination tv show', error)
//         }
//         setIsLoading(false)
//     }

//     console.log(data);
    
//      function handleChangePageTv(newPage) {
//         if(newPage < 1) return;
//         setCurrentPage(newPage)
//     }

//     // const handleChangePageTv = (newPage) => {
//     //     setCurrentPage(newPage)
//     // }
//     return (
//         <div className="w-full h-auto">
//             <div className="flex justify-center mb-2">
//                 <h1>Tv Show</h1>
//             </div>
//             <div className="flex items-center justify-center w-full h-[20rem]">

//                 {isLoading ? (
//                     <LoadingGenreCarousel />
//                 ) : (
//                     <ScrollArea className="max-w-3xl p-4 border rounded-md whitespace-nowrap">
//                         {dataTv && (
//                             dataTv.map((tv) => (
//                                 <div key={tv.id} className="flex items-center justify-start w-full gap-3 ">

//                                     <div className="flex justify-start w-full ">
//                                         <div className="relative overflow-hidden ">
//                                             <Image
//                                                 src={tv.poster_path ?
//                                                     `https://image.tmdb.org/t/p/original${tv.poster_path}`
//                                                     :
//                                                     no_image
//                                                 }
//                                                 alt="image_tv"
//                                                 width={140} height={140}
//                                                 className="rounded-md "
//                                                 priority
//                                                 loading="eager"
//                                                 style={{ width: "auto" }}
//                                                 draggable={false}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                         <ScrollBar orientation="horizontal" />
//                     </ScrollArea>
//                 )
//                 }
//             </div>

//             <Pagination>
//                 <PaginationContent>
//                     <PaginationItem>
//                         <PaginationPrevious
//                             className="cursor-pointer"
//                             onClick={() => handleChangePageTv(currentPage - 1)}
//                             disabled={currentPage === 1}
//                         />
//                     </PaginationItem>

//                     {[...Array(5).map((_, index) => (
//                         <PaginationItem key={index}>
//                             <PaginationLink
//                                 className='cursor-pointer'
//                                 onClick={() => handleChangePageTv(index + 1)}
//                                 isActive={currentPage === index + 1}
//                             >

//                                 {index + 1}
//                             </PaginationLink>
//                         </PaginationItem>

//                     ))]}
//                     <PaginationItem>
//                         <PaginationEllipsis />
//                     </PaginationItem>
//                     <PaginationItem>
//                         <PaginationNext
//                             className='cursor-pointer'
//                             onClick={() => handleChangePageTv(currentPage + 1)}
//                         />
//                     </PaginationItem>
//                 </PaginationContent>
//             </Pagination>
//         </div>
//     )
// }


