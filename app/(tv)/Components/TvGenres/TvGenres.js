"use client"

import LoadingGenreButton from "@/app/Components/LoadingUi/LoadingGenreList"
import { useCallback, useEffect, useState } from "react"
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
import no_image from "../../../../public/image/no_image4.webp"
import { urlImageTv } from "@/app/libs/DataFetchingTv"



export default function TvGenres() {

    const [genres, setGenres] = useState([])
    const [selected, setSelected] = useState(null)
    const [TvList, setTvList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const[isLoadingGenre,setIsLoadingGenre] = useState(true)

    useEffect(() => {
        fetchTvWithGenres()
    }, [])

    // Fetch genres with tv shows
    const fetchTvWithGenres = async () => {
        try {
            const response = await fetch(`/api/fetchGenresTvList`)
            const data = await response.json()
           
            if (!response.ok) {
                throw new Error('Failed to fetch data')
            }
           
            setGenres(data.genres)
            if (data.genres.length > 0) {
                getTv(data.genres[0].id)
                setSelected(data.genres[0].id)
                setIsLoadingGenre(false)

            }
            
        } catch (error) {
            if(process.env.NODE_ENV !== "production") {
                console.error(error, "Error fetch data Genres")
            }
            return { error: true, message: process.env.NODE_ENV === 'production' ? "An unexpected error occurred." : error.message };
        }
    }

    // Fetch tv shows with genres
    const getTv = useCallback(async (genreId) => {
        setIsLoading(true); 
        try {
          const response = await fetch(`/api/fetchTvWithGenres?genreId=${genreId}`);    
          if (!response.ok) {
            throw new Error("Failed to fetch TV shows");
          }
    
          const data = await response.json();
          setTvList(data.results);
        } catch (error) {
            if(process.env.NODE_ENV !== "production"){

                console.error(error.message, "Error fetching genres TV");
            }
        } finally {
          setIsLoading(false); 
        }

      }, []);

      // Handle click event for genres button
    const handleClick = useCallback( async(genreId) =>{
        setIsLoading(true)
        setSelected(genreId)
       await getTv(genreId)
        setIsLoadingGenre(false)
    }, [getTv])



    return (
        <div className=" md:mt-16">
            <div className="flex justify-center ">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-5xl md:max-w-xl 2xl:max-w-7xl lg:max-w-4xl">
                    <CarouselContent className="-ml-1">
                        {isLoadingGenre ? (
                        <div className='flex items-center justify-center w-full'>
                            <LoadingGenreButton />
                        </div>
                        ):(                     
                            genres.map((genre, index) => (
                                <CarouselItem key={index} className="p-1 basis-1/7 lg:basis-1/8 md:basis-1/7 ">
                                    <Button variant="outline" className={`2xl:text-xl ${selected === genre.id ? 'text-[#1b83e3]' : ' text-zinc-500'}`}
                                        onClick={() => handleClick(genre.id)}>{genre.name}</Button>
                                </CarouselItem>
                            ))
                        )}
                    </CarouselContent>
                    <div className=" absolute top-[-2rem] left-[93%] md:left-[81%] ">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>

            <div className="flex justify-center w-full mt-8 ">
                <Carousel opts={{
                    align: "start",
                    loop: true,
                }} className="w-full max-w-5xl md:max-w-xl 2xl:max-w-7xl lg:max-w-4xl" >
                    <CarouselContent className="-ml-1 ">
                        {isLoading ?
                            <div className="flex items-center justify-center w-full ">
                                <LoadingGenreCarousel />
                            </div>
                            : TvList && TvList.length > 0 ? (
                                TvList.map((tv) => (

                                    <CarouselItem key={tv.id} className="p-2 md:basis-1/2 basis-1/6 lg:basis-1/5">
                                        <div className="relative overflow-hidden lg:hover:scale-90 lg:hover:duration-500 xl:hover:scale-90 xl:hover:duration-500 2xl:hover:scale-90 2xl:hover:duration-500">
                                            <Link href={`/tv/list/${tv.id}`}  as={`/tv/list/${tv.id}`}>
                                                <Image
                                                    src={tv.poster_path ?
                                                        
                                                        `${urlImageTv}${tv.poster_path}`
                                                        :
                                                        no_image
                                                    }
                                                    alt={tv.original_name}
                                                    width={300} height={250}
                                                    className="rounded-md "
                                                    style={{ width: "auto" }}
                                                    priority
                                                />
                                                <p className="flex justify-start pt-2 mb-1 font-bold ">{tv.original_name.length > 14 ? tv.original_name.slice(0, 14) + "..." : tv.original_name}</p>
                                                <div className="flex items-center justify-between w-full ">
                                                    <p className="flex items-center justify-between w-full 2xl:font-bold font-semibold ">
                                                        {tv.first_air_date && new Date(tv.first_air_date).getFullYear()}
                                                    </p>
                                                    <div className="font-semibold 2xl:text-xl">
                                                        <div className="flex items-center justify-between space-x-1 ">
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
                                <AlertCircle className="w-4 h-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                  Something went wrong.
                                </AlertDescription>
                              </Alert>
                            )
                        }
                    </CarouselContent>
                    <div className=" absolute top-0 left-[93%] md:left-[82%] md:top-[-1rem] md:hidden">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>
        </div>


    )
}