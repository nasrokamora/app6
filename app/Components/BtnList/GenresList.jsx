"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import { FaRegStar } from "react-icons/fa";
import LoadingGenreButton from "../LoadingUi/LoadingGenreList"
import LoadingGenreCarousel from "../LoadingUi/LoadingGenreCarousel"
import Link from "next/link"



export default function GenresList() {

    const [movieList, setMovieList] = useState([])
    const [selectedGenre, setSelectedGenre] = useState(null)
    const [genres, setGenres] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        fetchGenres()
    }, [])
    // console.log(movieList);

    const fetchGenres = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
                }
            })
            const data = await response.json()
            setGenres(data.genres)
            if (data.genres.length > 0) {
                fetchMovies(data.genres[0].id)
                setSelectedGenre(data.genres[0].id)
                setIsLoading(false)

            }
        } catch (error) {
            console.error(error, "Error")
        }
    }


    const fetchMovies = async (genreId) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=${genreId}`, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
                }
            })
            const data = await response.json()
            setMovieList(data.results)
            setIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

async function handleClick(genreId){    
            setSelectedGenre(genreId)
            fetchMovies(genreId)
    }

    //    Nas@Dev
    return (
        
            <div className="">
                {isLoading ? <LoadingGenreButton /> : null}
                <div className=" flex justify-center ">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className=" md:w-[60%] w-[80%] md:pl-8">
                        <CarouselContent>
                            {genres.map((genre,index) => (
                                <CarouselItem key={index} className=" basis-1/7 lg:basis-1/5 md:basis-1/2">
                                    <Button variant="outline" className={`  ${selectedGenre === genre.id ? 'text-red-700' : ' text-zinc-500'}`}
                                        style={{ color: selectedGenre === genre.id ? 'text-red-500' : ' text-zinc-800' }}
                                        onClick={() => handleClick(genre.id)}>{genre.name}</Button>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
                            {isLoading ? <LoadingGenreCarousel /> : null}
                <div className=" mt-8 flex justify-center w-full 2xl:text-2xl">
                    <Carousel opts={{
                        align: "start",
                        loop: true,
                    }} className=" md:w-[60%] xl:w-[80%]   w-[80%]" >
                        <CarouselContent className="   ">
                            {movieList.map((movie,index) => (

                                <CarouselItem key={index} className="  basis-1/7 lg:basis-1/5 md:basis-1/1  ">
                                    <div className=" overflow-hidden relative lg:hover:scale-90 lg:hover:duration-500 xl:hover:scale-90 xl:hover:duration-500  2xl:hover:scale-90 2xl:hover:duration-500">
                                        <Link href={`/Movies/List/${movie.id}`}>
                                        <Image
                                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                            alt={movie.title}
                                            width={180} height={180}
                                            className="  md:w-[200px]  lg:w-[200px] lg:h-[200px] xl:w-[150px] xl:h-[150px] 2xl:w-[250px]   "
                                            priority
                                            style={{height:"auto"}}
                                            
                                            
                                            />
                                        <p className=" font-bold flex justify-start  pt-2 mb-1">{movie.title.length > 14 ? movie.title.slice(0, 14) + "..." : movie.title}</p>
                                        <div className=" flex justify-between items-center w-full">
                                            <p className=" font-semibold flex justify-between items-center w-full 2xl:text-2xl">
                                                {new Date(movie.release_date).getFullYear()}
                                            </p>
                                            <div className=" 2xl:font-bold 2xl:text-2xl">
                                                <div className=" space-x-1 flex justify-between items-center">
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