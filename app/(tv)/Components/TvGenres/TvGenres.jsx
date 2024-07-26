"use client"

import LoadingGenreButton from "@/app/Components/LoadingUi/LoadingGenreList"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { FaRegStar } from "react-icons/fa"
import LoadingGenreCarousel from "@/app/Components/LoadingUi/LoadingGenreCarousel"



export default function TvGenres() {

    

    const [genres, setGenres] = useState([])
    const [selected, setSelected] = useState(null)
    const [TvList, setTvList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchTvWithGenres()
    }, [])

    const fetchTvWithGenres = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`, {
            })
            const data = await response.json()
            setGenres(data.genres)
            if (data.genres.length > 0) {
                getTv(data.genres[0].id)
                setSelected(data.genres[0].id)
                setIsLoading(false)

            }
        } catch (error) {
            console.error(error)
        }
    }

    const getTv = async (genreId) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=${genreId}`, {
            })
            const data = await response.json()
            setTvList(data.results)
            setIsLoading(false)
        } catch (error) {
            console.error(error, 'Error fetch Tv')
        }
    }

    async function handleClick(genreId) {
        setSelected(genreId)
        getTv(genreId)
    }

 

    return (
         <div>

<div className="">
                {isLoading ? <LoadingGenreButton /> : null}
                <div className=" flex justify-center ">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className=" md:max-w-md w-[80%] md:pl-8">
                        <CarouselContent className="-ml-1">
                            {genres.map((genre,index) => (
                                <CarouselItem key={index} className=" basis-1/7  md:basis-1/7 ">
                                    <Button variant="outline" className={` ${selected === genre.id ? 'text-[#1b83e3]' : ' text-zinc-500'}`}
                                        style={{ color: selected === genre.id ? 'text-[#1b83e3]' : ' text-zinc-800' }}
                                        onClick={() => handleClick(genre.id)}>{genre.name}</Button>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious  className="md:hidden"/>
                        <CarouselNext  className="md:hidden"/>
                    </Carousel>
                </div>
                {isLoading ? <LoadingGenreCarousel /> : null}
                <div className=" mt-8 flex justify-center w-full">
                    <Carousel opts={{
                        align: "start",
                        loop: true,
                    }} className=" md:w-[60%] xl:w-[80%]   w-[80%]" >
                        <CarouselContent className="   ">
                            {TvList.map((tv,index) => (

                                <CarouselItem key={index} className="  basis-1/7 lg:basis-1/5 md:basis-1/1  ">
                                    <div className=" overflow-hidden relative lg:hover:scale-90 lg:hover:duration-500 xl:hover:scale-90 xl:hover:duration-500  2xl:hover:scale-90 2xl:hover:duration-500">
                                        <Link href={`/Tv/List/${tv.id}`}>
                                        <Image
                                            src={`https://image.tmdb.org/t/p/original${tv.poster_path}`}
                                            alt={tv.original_name}
                                            width={180} height={180}
                                            className="  md:w-[200px]  lg:w-[200px] lg:h-[200px] xl:w-[150px] xl:h-[150px] 2xl:w-[250px] 2xl:h-[150px]  "
                                            priority
                                            style={{height:"auto"}}
                                            
                                            
                                            />
                                        <p className=" font-bold flex justify-start  pt-2 mb-1">{tv.original_name.length > 14 ? tv.original_name.slice(0, 14) + "..." : tv.original_name}</p>
                                        <div className=" flex justify-between items-center w-full">
                                            <p className=" fonb flex justify-between items-center w-full">
                                                {new Date(tv.first_air_date).getFullYear()}
                                            </p>
                                            <div className=" ">
                                                <div className=" space-x-1 flex justify-between items-center">
                                                <FaRegStar className="text-[#FFC300]" /> 
                                                <span className="">
                                                {tv.vote_average.toFixed(1)}
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
    </div>

    )
}