"use client"

import { Button } from "@/components/ui/button"
import React, { useCallback, useEffect, useState } from "react"
import Image from "next/image"
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
import { AlertCircle } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import BlurFade from "@/components/ui/blur-fade"
import { urlImage } from "@/app/libs/UrlImage"



const GenresButton = React.memo(({ selectedGenre, handleClick, genres }) => {
    return (
        genres.map((genre, index) => (
            <CarouselItem key={index} className="p-1 basis-1/7 lg:basis-1/8 md:basis-1/7">
                <Button variant="outline" className={`2xl:text-xl  ${selectedGenre === genre.id ? 'text-red-700' : ' text-zinc-500'}`}
                    onClick={() => handleClick(genre.id)}>{genre.name}</Button>
            </CarouselItem>
        ))
    )

})
const MoviesList = React.memo(({ movieList }) => {
    return (
        movieList.map((movie, index) => (
            <CarouselItem key={index} className="p-2 md:basis-1/2 basis-1/6 lg:basis-1/5">
                <BlurFade key={movie.id} delay={0.2 + index * 0.02} inView>


                    <div className="relative overflow-hidden lg:hover:scale-90 md:active:scale-110 hover:scale-90 duration-500 ">
                        <Link href={`/movies/list/${movie.id}`} >
                            <Image
                                src={`${urlImage}${movie.poster_path}`}
                                alt="movie poster"
                                width={300} height={250}
                                className="rounded-md hover:sepia hover:duration-500"
                                priority
                                unoptimized={true}
                                style={{ width: "auto" }}
                            />
                            <p className="flex justify-start pt-2 mb-1 font-bold ">{movie.title.length > 14 ? movie.title.slice(0, 14) + "..." : movie.title}</p>
                            <div className="flex items-center justify-between w-full ">
                                <p className="flex items-center justify-between w-full font-semibold 2xl:text-2xl">
                                    {new Date(movie.release_date).getFullYear()}
                                </p>
                                <div className=" 2xl:font-bold 2xl:text-2xl">
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
                </BlurFade>
            </CarouselItem>
        )
        ))
})

export default function GenresList() {

    const [movieList, setMovieList] = useState([])
    const [selectedGenre, setSelectedGenre] = useState(null)
    const [genres, setGenres] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingGenres, setIsLoadingGenres] = useState(true)

    useEffect(() => {
        fetchGenres()
    }, [])

    const fetchGenres = async () => {
        try {
            const response = await fetch(`/api/fetchGetGenresList`,)
            const data = await response.json()
            setGenres(data.genres)
            if (data.genres.length > 0) {
                fetchMovies(data.genres[0].id)
                setSelectedGenre(data.genres[0].id)
                setIsLoadingGenres(false)

            }
        } catch (error) {
            if(process.env.NODE_ENV !== "production") {
                console.error(error, "Error fetch data Genres")
            }
            return { error: true, message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message };
        }
    }
    const fetchMovies = useCallback(async (genreId) => {
        try {
            const response = await fetch(`/api/fetchMoviesWithGenres?genreId=${genreId}`,)
            const data = await response.json()
            setMovieList(data.results)
            setIsLoading(false)
        } catch (error) {
            if(process.env.NODE_ENV !== "production") {
                console.error(error, "Error fetch data MoviesWithGenres")
            }
            return { error: true, message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message };
        }
    }, [])

    const handleClick = useCallback(async (genreId) => {
        setIsLoading(true)
        setSelectedGenre(genreId)
        fetchMovies(genreId)
        setIsLoadingGenres(false)
    }, [fetchMovies])



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
                        {isLoadingGenres ? (
                            <div className='flex items-center justify-center w-full'>
                                <LoadingGenreButton />
                            </div>
                        ) : (
                            <GenresButton
                                selectedGenre={selectedGenre}
                                handleClick={handleClick}
                                genres={genres}
                            />
                        )
                        }
                    </CarouselContent>
                    <div className=" absolute top-[-2rem] left-[93%] md:left-[81%] ">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>

            <div className="flex items-center justify-center w-full mt-8 md:mt-12 2xl:text-lg">
                <Carousel opts={{
                    align: "center",
                    loop: true,
                }} className="w-full max-w-5xl md:max-w-md 2xl:max-w-7xl lg:max-w-4xl" >
                    <CarouselContent className="-ml-1 ">
                        {isLoading ? (
                            <div className="flex items-center justify-center w-full ">

                                <LoadingGenreCarousel />
                            </div>
                        ) : movieList && movieList.length > 0 ? (

                            <MoviesList movieList={movieList} />

                        ) : (
                            <Alert variant="destructive" className="ml-4 md:ml-2 md:mr-2 text-xl font-bold">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    Something went wrong. Please try again later.
                                </AlertDescription>
                            </Alert>
                        )
                        }
                    </CarouselContent>
                    <div className=" absolute top-0 left-[93%] md:left-[82%] md:top-[-1rem]">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>
        </div>
    )
    //    Nas@Dev nassreddine abdellouche 
}