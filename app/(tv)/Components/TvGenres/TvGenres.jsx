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
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert"
import { FaRegStar } from "react-icons/fa"
import LoadingGenreCarousel from "@/app/Components/LoadingUi/LoadingGenreCarousel"
import { AlertCircle } from "lucide-react"



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
        <div className=" md:mt-16">
            <div className=" flex justify-center ">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full md:max-w-xl max-w-5xl 2xl:max-w-7xl lg:max-w-4xl">
                    <CarouselContent className="-ml-1">
                        {isLoading ? 
                        <div className='flex justify-center items-center w-full'>
                            <LoadingGenreButton />
                        </div>
                       : genres.map((genre, index) => (
                            <CarouselItem key={index} className="p-1 basis-1/7 lg:basis-1/8 md:basis-1/7 ">
                                <Button variant="outline" className={`2xl:text-xl ${selected === genre.id ? 'text-[#1b83e3]' : ' text-zinc-500'}`}
                                    style={{ color: selected === genre.id ? 'text-[#1b83e3]' : ' text-zinc-800' }}
                                    onClick={() => handleClick(genre.id)}>{genre.name}</Button>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className=" absolute top-[-2rem] left-[93%] md:left-[81%] ">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>

            <div className=" mt-8 flex justify-center w-full">
                <Carousel opts={{
                    align: "start",
                    loop: true,
                }} className="w-full md:max-w-xl  max-w-5xl 2xl:max-w-7xl lg:max-w-4xl" >
                    <CarouselContent className=" -ml-1">
                        {isLoading ?
                            <div className=" flex justify-center items-center w-full">
                                <LoadingGenreCarousel />
                            </div>
                            : TvList && TvList.length > 0 ? (
                                TvList.map((tv, index) => (

                                    <CarouselItem key={index} className=" p-2  md:basis-1/2 basis-1/6 lg:basis-1/5 ">
                                        <div className=" overflow-hidden relative lg:hover:scale-90 lg:hover:duration-500 xl:hover:scale-90 xl:hover:duration-500  2xl:hover:scale-90 2xl:hover:duration-500">
                                            <Link href={`/Tv/List/${tv.id}`}>
                                                <Image
                                                    src={`https://image.tmdb.org/t/p/original${tv.poster_path}`}
                                                    alt={tv.original_name}
                                                    width={300} height={250}
                                                    className=" rounded-md"
                                                    priority
                                                    loading="eager"
                                                    style={{ width: "auto" }}
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
                                ))
                            ) : (
                                <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                  Something went wrong.
                                </AlertDescription>
                              </Alert>
                            )
                        }
                    </CarouselContent>
                    <div className=" absolute top-[-2rem] left-[93%] md:left-[82%] hidden ">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>
        </div>


    )
}