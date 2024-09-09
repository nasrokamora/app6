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
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import LoadingGenreCarousel from "../LoadingUi/LoadingGenreCarousel";
import { AlertCircle } from "lucide-react"
import no_image from '../../../public/image/no_image4.webp'

const CarouselTv = ({ dataTv, currentPage, handlePageChange, isLoading }) => {

    return (
        <div className="">
            <div className=" flex flex-col bg-gradient-to-r from-green-400 to-blue-500 ">
                <div className=" flex gap-4 justify-end items-center pr-20 md:pr-12 pt-4">

                    <h4 className="font-bold">Select page</h4>
                    <select className=" w-14 text-white rounded-md bg-black" onChange={handlePageChange} value={currentPage} >

                        {Array.from({ length: 10 }, (_, index) => index + 1).map((page) => (
                            <option value={page} className="text-white" key={page}>
                                {page}
                            </option>
                        )
                        )}

                    </select>
                </div>
                <div>
                    <div className=" mt-8 flex justify-center w-full">
                        <Carousel opts={{
                            align: "center",
                            loop: true,
                        }} className="w-full md:max-w-xl  max-w-5xl 2xl:max-w-7xl lg:max-w-4xl">
                            <CarouselContent>
                                {isLoading ?(

                                    <div className=" flex justify-center items-center w-full h-[12rem]">
                                        <LoadingGenreCarousel />
                                    </div>
                                ):(                       
                                    dataTv && dataTv.length > 0 ? (
                                       dataTv.map((tv) => (

                                           <CarouselItem key={tv.id} className="  p-2  md:basis-1/2 basis-1/6 lg:basis-1/5 ">
                                               <div className=" relative overflow-hidden">
                                                   <Image
                                                       src={tv.poster_path ?
                                                           `https://image.tmdb.org/t/p/original${tv.poster_path}`
                                                       :
                                                       no_image
                                                       }
                                                       alt="image_tv"
                                                       width={300} height={250}
                                                       className=" rounded-md"
                                                       priority
                                                       loading="eager"
                                                       style={{ width: "auto" }}
                                                       draggable={false}
                                                   />
                                                   <h6 className=" font-bold flex justify-start  pt-2 mb-1">{tv.name.length > 14 ? tv.name.slice(0, 14) + "..." : tv.name}
                                                   </h6>
                                                   <div className=" flex justify-between items-center w-full">
                                                       <h6 className=" fonb flex justify-between items-center w-full">
                                                           {new Date(tv.first_air_date).getFullYear()}
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
                                       ))
                                   ) : (
                                       <Alert variant="destructive" className="text-xl border-none">
                                           <AlertCircle className="h-4 w-4" />
                                           <AlertTitle className="font-bold">Error</AlertTitle>
                                           <AlertDescription className="font-bold">
                                               Something went wrong.
                                           </AlertDescription>
                                       </Alert>
                                   )
                                )
                                }
                            </CarouselContent>
                            <div className=" absolute top-0 left-[93%] md:left-[82%] md:top-[-1rem] hidden">
                                <CarouselPrevious />
                                <CarouselNext />
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    )
};





export default function SelectTvPage() {
    const [currentPage, setCurrentPage] = useState(2)
    const [dataTv, setDataTv] = useState([])
    const [totalPages, setTotalPages] = useState(10)
    const [isLoading, setIsLoading] = useState(true)



    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${currentPage}&limit=10`, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
                }
            })
            const data = await response.json()
            setDataTv(data.results)
            setTotalPages(data.total_pages)
            setIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData(currentPage)
    }, [currentPage])
    // console.log(dataTv);



    const handlePageChange = async (event) => {
        setCurrentPage(parseInt(event.target.value))
        setIsLoading(true)
    }

    return (
        <div>

            <CarouselTv isLoading={isLoading} dataTv={dataTv} currentPage={currentPage} handlePageChange={handlePageChange} totalPages={totalPages} />
        </div>
    )

}
