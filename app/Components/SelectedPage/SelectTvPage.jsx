"use client"

import { useEffect, useState } from "react"


import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import { FaRegStar } from "react-icons/fa";

import LoadingGenreCarousel from "../LoadingUi/LoadingGenreCarousel";

const  CarouselTv = ({ dataTv, currentPage, handlePageChange, isLoading }) => {
   
   return(
    <div className="">
         <div className=" flex flex-col bg-gradient-to-r from-green-400 to-blue-500">
            <div className=" flex gap-4 justify-end items-center pr-20 md:pr-12 pt-4">

             <h4 className="font-bold">Select page</h4>
             <select className=" w-14 text-black rounded-md" onChange={handlePageChange} value={currentPage} >
 
                 {Array.from({ length: 10 }, (_, index) => index + 1).map((page) => (
                     <option value={page} className="text-black" key={page}>
                         {page}
                     </option>
                 )
                )}
 
             </select>
                </div>
             <div>
                 {isLoading ? <LoadingGenreCarousel /> : null}
 
                 <div className=" mt-8 flex justify-center w-full ">
                     <Carousel opts={{
                         align: "start",
                         loop: true,
                     }} className=" md:w-[60%] xl:w-[80%]   w-[80%]">
                         <CarouselContent>
                             {dataTv.map((tv) => (
 
                                 <CarouselItem key={tv.id} className="  basis-1/7 lg:basis-1/5 md:basis-1/2  ">
                                     <div className="">


                                         <Image
                                             src={`https://image.tmdb.org/t/p/original${tv.poster_path}`}
                                             alt={tv.name}
                                             width={100} height={100}
                                             className=" md:w-[150px] h-[200px] lg:w-[200px] lg:h-[200px] xl:w-[120px] xl:h-[150px] 2xl:w-[150px] 2xl:h-[150px]  "
                                             priority={true} />
                                         <h6 className=" font-bold flex justify-start  pt-2 mb-1">{tv.name.length > 14 ? tv.name.slice(0, 14) + "..." : tv.name}
                                         </h6>
                                         <div className=" flex justify-between items-center w-full">
                                             <h6 className=" fonb flex justify-between items-center w-full">
                                                 {tv.first_air_date}
                                             </h6>

                                             <div className=" ">
                                                 <div className=" space-x-1 flex justify-between items-center">
                                                     <FaRegStar className="text-[#FFC300]" />
                                                     <span className="">
                                                         {tv.vote_average.toFixed(1)}
                                                     </span>
                                                 </div>
                                             </div>
 
                                         </div>
 

                                     </div>
                                 </CarouselItem>
                             ))}
                         </CarouselContent>
                         <CarouselPrevious />
                         <CarouselNext />
                     </Carousel>
                 </div>
             </div>
         </div>
     </div>
        )
 };

const HoverCardTv = ({ dataTv }) => {
    return (
        <HoverCard>

        </HoverCard>
    )
}



export default function SelectTvPage() {
 const [currentPage, setCurrentPage] = useState(1)
 const [dataTv, setDataTv] = useState([])
 const [totalPages, setTotalPages] = useState(1)
 const [isLoading, setIsLoading] = useState(true)



 const fetchData = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${currentPage}&limit=10`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
            }
        })
        const data = await response.json()
        setDataTv(data.results)
        setTotalPages(data.total_pages)
        setIsLoading(false)
}catch (error) {
        console.error(error)
    }
}

useEffect(() => {
    fetchData(currentPage)
},[currentPage])
// console.log(dataTv);



 const handlePageChange = (event) => {
     setCurrentPage(parseInt(event.target.value))
 }

        return (
            <div>
                
                <CarouselTv isLoading={isLoading} dataTv={dataTv} currentPage={currentPage} handlePageChange={handlePageChange} totalPages={totalPages}/>
            </div>
        )

}
