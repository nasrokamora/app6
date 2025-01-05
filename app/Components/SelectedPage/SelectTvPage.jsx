// "use client"

// import { useCallback, useEffect, useState } from "react"
// import Image from "next/image";
// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     CarouselNext,
//     CarouselPrevious
// } from "@/components/ui/carousel";
// import { FaRegStar } from "react-icons/fa";
// import {
//     Alert,
//     AlertDescription,
//     AlertTitle,
// } from "@/components/ui/alert"
// import LoadingGenreCarousel from "../LoadingUi/LoadingGenreCarousel";
// import { AlertCircle } from "lucide-react"
// import no_image from '../../../public/image/no_image4.webp'

// const CarouselTv = ({ dataTv, currentPage, handlePageChange, isLoading }) => {

//     return (
//         <div className="">
//             <div className="flex flex-col bg-gradient-to-r from-green-400 to-blue-500">
//                 <div className="flex items-center justify-end gap-4 pt-4 pr-20 md:pr-12">

//                     <h4 className="font-bold">Select page</h4>
//                     <select className="text-white bg-black rounded-md w-14" onChange={handlePageChange} value={currentPage} >

//                         {Array.from({ length: 10 }, (_, index) => index + 1).map((page) => (
//                             <option value={page} className="text-white" key={page}>
//                                 {page}
//                             </option>
//                         )
//                         )}

//                     </select>
//                 </div>
//                 <div>
//                     <div className="flex justify-center w-full mt-8 ">
//                         <Carousel opts={{
//                             align: "center",
//                             loop: true,
//                         }} className="w-full max-w-5xl md:max-w-xl 2xl:max-w-7xl lg:max-w-4xl">
//                             <CarouselContent>
//                                 {isLoading ? (

//                                     <div className=" flex justify-center items-center w-full h-[12rem]">
//                                         <LoadingGenreCarousel />
//                                     </div>
//                                 ) : (
//                                     dataTv && dataTv.length > 0 ? (
//                                         dataTv.map((tv) => (

//                                             <CarouselItem key={tv.id} className="p-2 md:basis-1/2 basis-1/6 lg:basis-1/5">
//                                                 <div className="flex flex-col ">

//                                                     <div className="relative overflow-hidden ">
//                                                         <Image
//                                                             src={tv.poster_path ?
//                                                                 `https://image.tmdb.org/t/p/original${tv.poster_path}`
//                                                                 :
//                                                                 no_image
//                                                             }
//                                                             alt="image_tv"
//                                                             width={300} height={250}
//                                                             className="rounded-md "
//                                                             priority
//                                                             loading="eager"
//                                                             style={{ width: "auto" }}
//                                                             draggable={false}
//                                                         />
//                                                     </div>
//                                                     <div>
//                                                         <h1 className="pt-2 mb-1 font-bold ">{tv.name.slice(0, 14) + "..."}
//                                                         </h1>
//                                                     </div>
//                                                     <div className="flex items-center justify-between w-full ">
//                                                         <h1 className="">
//                                                             {tv.first_air_date ? new Date(tv.first_air_date).getFullYear() : "Unknown Date"}
//                                                         </h1>

//                                                         <div className="">
//                                                             <div className="flex items-center justify-between space-x-1 ">
//                                                                 <FaRegStar className="text-[#FFC300]" />
//                                                                 <span className="">
//                                                                     {tv.vote_average.toFixed(1)}
//                                                                 </span>
//                                                             </div>
//                                                         </div>

//                                                     </div>


//                                                 </div>
//                                             </CarouselItem>
//                                         ))
//                                     ) : (
//                                         <Alert variant="destructive" className="text-xl border-none">
//                                             <AlertCircle className="w-4 h-4" />
//                                             <AlertTitle className="font-bold">Error</AlertTitle>
//                                             <AlertDescription className="font-bold">
//                                                 Something went wrong.
//                                             </AlertDescription>
//                                         </Alert>
//                                     )
//                                 )
//                                 }
//                             </CarouselContent>
//                             <div className=" absolute top-0 left-[93%] md:left-[82%] md:top-[-1rem] hidden">
//                                 <CarouselPrevious />
//                                 <CarouselNext />
//                             </div>
//                         </Carousel>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// };





// export default function SelectTvPage() {
//     const [currentPage, setCurrentPage] = useState(2)
//     const [dataTv, setDataTv] = useState([])
//     const [totalPages, setTotalPages] = useState(10)
//     const [isLoading, setIsLoading] = useState(true)



//     const fetchData = async () => {

        
        
//         try {
//             const response = await fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${currentPage}&limit=10`, {
//                 headers: {
//                     Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
//                 }
//             })
//             const data = await response.json()
//             setDataTv(data.results)
//             setTotalPages(data.total_pages)
//             setIsLoading(false)
//         } catch (error) {
//             console.error(error)
//         }
//     }

//     useEffect(() => {
//         fetchData(currentPage)
//     }, [currentPage])
//     // console.log(dataTv);



//     const handlePageChange = useCallback(async (event) => {
//         setCurrentPage(parseInt(event.target.value))
//         setIsLoading(true)
//     },[])

//     return (
//         <div>

//             <CarouselTv isLoading={isLoading} dataTv={dataTv} currentPage={currentPage} handlePageChange={handlePageChange} totalPages={totalPages} />
//         </div>
//     )

// }
