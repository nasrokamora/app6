"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { FaRegStar } from "react-icons/fa";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
} from "@/components/ui/select"
import Link from "next/link";






export default function SelectPage() {
    const [currentPage, setCurrentPage] = useState(1)
    const [selected, setSelected] = useState(1)
    const [dataMovie, setDataMovie] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${currentPage}&limit=10`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
                    }
                })
                const data = await response.json()
                setDataMovie(data.results)
                setSelected(data.total_pages)

            } catch (error) {
                console.error(error)
            }
        }
        fetchData()

    }, [currentPage])
    // console.log(dataMovie);
    const handlePageChange = (event) => {
        setCurrentPage(parseInt(event.target.value))
    }

    return (
        <div className="">
            <div className="flex items-center gap-2 ml-28">
                <h4>Select Page:</h4>
                <select className=" w-16 rounded-md text-zinc-800   bg-gradient-to-tr from-[#966af1] to-[#3aafff] cursor-pointer  "
                    value={currentPage} onChange={handlePageChange}>




                    {Array.from({ length: 10 }, (_, i) => i + 1).map((page, index) => (

                        <option className="" key={index} value={page}>{page}</option>


                    ))}

                </select>
            </div>

            <div className="flex justify-center w-full mt-8 ">
                <Carousel opts={{
                    align: "start",
                    loop: true,
                }} className=" md:w-[60%] xl:w-[80%]   w-[80%]" >
                    <CarouselContent className="">
                        {dataMovie.map((movie, index) => (

                            <CarouselItem key={index} className=" basis-1/7 lg:basis-1/5 md:basis-1/2">
                                <div className="overflow-hidden ">
                                    <Link rel="" href={`/Tv/List/${movie.id}`}>
                                        <Image
                                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                            alt={movie.title}
                                            width={100} height={100}
                                            className=" md:w-[150px] h-[200px] lg:w-[200px] lg:h-[200px] xl:w-[120px] xl:h-[150px] 2xl:w-[150px] 2xl:h-[150px]  "
                                            priority={true}
                                        />
                                        <p className="flex justify-start pt-2 mb-1 font-bold ">{movie.name.length > 14 ? movie.name.slice(0, 14) + "..." : movie.name}</p>
                                        <div className="flex items-center justify-between w-full ">
                                            <p className="flex items-center justify-between w-full fonb">
                                                {new Date(movie.first_air_date).getFullYear()}
                                            </p>
                                            <div className="">
                                                <div className="flex items-center justify-between space-x-1 ">
                                                    <FaRegStar className="text-[#FFC300]" />
                                                    <span className="">
                                                        {movie.vote_average.toFixed(1)}
                                                    </span>
                                                </div>
                                            </div>

                                        </div>
                                    </Link>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    )
}