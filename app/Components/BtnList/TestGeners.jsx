"use client"
import { IoStarSharp } from "react-icons/io5";
import Image from "next/image";
import React, { cache, memo, useCallback, useEffect, useRef, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button";
import LoadingGenreButton from "../LoadingUi/LoadingGenreList";
import { MovieCarouselSkeleton } from "./LoadingSkeletonMovies";

export default function TestGeners() {
    const [genres, setGenres] = useState([]);
    const [isLoadingGenre, setIsLoadingGenre] = useState(true);
    const [movieList, setMovieList] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedGenre, setSelectedGenre] = useState(null)
    const [movieDetails, setMovieDetails] = useState([])

    const [api, setApi] = useState();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    const cacheRef = useRef({})

    useEffect(() => {
        fetchGenres()
    }, [])

    const fetchGenres = async () => {


        try {
            const response = await fetch(`/api/fetchGetGenresList`,)
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || "An error occurred while fetching data.")
            }
            setGenres(data.genres)
            if (data.genres.length > 0) {
                fetchMovies(data.genres[0].id)
                setSelectedGenre(data.genres[0].id)
                setIsLoadingGenre(false)
            }
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error(error, "Error fetch data Genres")
            }
            return { error: true, message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message };
        }
    }


    const fetchMovies = useCallback(async (genreId) => {
        if(cacheRef.current[genreId]) {
            setMovieList(cacheRef.current[genreId])
            return
        }
        try {
            const response = await fetch(`/api/fetchMoviesWithGenres?genreId=${genreId}`,)
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "An error occurred while fetching data.")
            }
            setMovieList(data.results)
            cacheRef.current[genreId] = data.results
            const details = await Promise.all(data.results.map(async (movie) => {
                const response = await fetch(`/api/getMoviesById?movieId=${movie.id}`,)
                const dataDetails = await response.json()
                if(!response.ok) {
                    throw new Error(dataDetails.message || "An error occurred while fetching data.")
                }
                return dataDetails
            }))

            setMovieDetails(details)

            setIsLoading(false)
            setError(null)

        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error(error, "Error fetch data Genres")
            }
            setError(error.message || "An unexpected error occurred");
        }
    }, [])

    // const fetchMoviesDetails = useCallback(async (movieId) => {
    //     try {
    //         const response = await fetch(`/api/getMoviesById?movieId=${movieId}`,)
    //         const data = await response.json()
    //         if (!response.ok) {
    //             throw new Error(data.message || "An error occurred while fetching data.")
    //         }

    //         setMovieDetails(data)
    //         setIsLoading(false)
    //         setError(null)


    //     } catch (error) {
    //         if (process.env.NODE_ENV !== "production") {
    //             console.error(error, "Error fetch data Genres")
    //         }
    //         setError(error.message || "An unexpected error occurred");
    //     }
    // }, [])



    const handleClick = useCallback(async (genreId) => {
        setIsLoading(true)
        fetchMovies(genreId)
        // fetchMoviesDetails(genreId)
        setSelectedGenre(genreId)
        setIsLoadingGenre(false)
    }, [fetchMovies])

    console.log(movieDetails)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])
    // console.log(movieList)
    return (
        <div className="w-full h-screen">

            {/* content image fill and blur */}
            <Carousel className="w-full h-[50vh] xl:max-w-full"
                opts={{
                    align: "center",
                    loop: true,
                }}
                setApi={setApi}>

                <div className=" border border-red-700 w-full h-[50vh] md:h-screen">
                    {/* content of details movies */}
                    <CarouselContent className="">
                        {isLoading ? (
                            <MovieCarouselSkeleton />
                        ) : (
                            movieList.length > 0 ? (
                                movieList.map((movie) => (
                                    <CarouselItem className="max-w-full  h-[50vh] w-full md:h-screen " key={movie.id} >
                                        <div className="flex justify-between h-[50vh] w-full ">

                                            <div className=" bg-transparent w-[60%]   p-4">
                                                <h1 className="text-3xl font-bold text-center ">
                                                    {movie.title ? movie.title : movie.original_title || " Unknown"}
                                                </h1>
                                                <div className=" pt-4 font-bold">
                                                    <div className=" flex justify-start gap-3 items-center">
                                                        <div className="bg-white/50 backdrop-blur w-fit p-1 rounded-md flex justify-center gap-2 items-center">

                                                            <h1 className=" font-bold text-yellow-500 ">
                                                                {movie.vote_average ? movie.vote_average.toFixed(1) : "No rating available"}
                                                            </h1>
                                                            <span className=" text-yellow-500">
                                                                <IoStarSharp />
                                                            </span>
                                                        </div>
                                                        {/* release date */}
                                                        <div className="bg-white/50 backdrop-blur w-fit p-1 rounded-md">
                                                            <h1>{new Date(movie.release_date).getFullYear()}</h1>
                                                        </div>
                                                        <div>
                                                            <h1 className="bg-white/50 backdrop-blur w-fit p-1 rounded-md">
                                                                {movie.original_language}
                                                            </h1>
                                                        </div>

                                                        {/* details movies */}

                                                        {movieDetails && movieDetails.length > 0 && movieDetails.some(detail => detail.id === movie.id) && (
                                                            <div className="" key={movie.id}>
                                                                <h1>home page {movieDetails.find(detail => detail.id === movie.id).homepage}</h1>
                                                            </div>
                                                        )}


                                                    </div>
                                                    <p className="text-sm text-center text-muted-foreground font-semibold pt-4">
                                                        {movie.overview ? movie.overview : "No description available"}
                                                    </p>


                                                </div>
                                            </div>

                                            <div className=" h-[50vh]  border  blur-right w-[100%] overflow-hidden relative">
                                                <Image
                                                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                                    alt={movie.title}
                                                    layout="fill"
                                                    fill
                                                    style={{ objectFit: "cover" }}

                                                />
                                            </div>
                                        </div>

                                    </CarouselItem>
                                ))
                            ) : (
                                <div>

                                </div>
                            )
                        )}

                    </CarouselContent>
                </div>
            </Carousel>
            <div className="py-2 text-center text-sm text-muted-foreground">
                {current}
            </div>


            <div className="flex justify-center mt-20">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-5xl md:max-w-xl  2xl:max-w-7xl lg:max-w-4xl">
                    <CarouselContent className="-ml-1">
                        {isLoadingGenre ? (
                            <div className='flex items-center justify-center w-full'>
                                <LoadingGenreButton />
                            </div>
                        ) : (
                            <GenresListType
                                isLoadingGenre={isLoadingGenre}
                                handleClick={handleClick}
                                genres={genres}
                                selectedGenre={selectedGenre}
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

        </div>
    )
}



const GenresListType = React.memo(({ genres, selectedGenre, handleClick }) => {

    return (
        genres.map((genre, index) => (
            <CarouselItem key={genre.id} className="p-1 basis-1/7 lg:basis-1/8 md:basis-1/7 ">
                <Button variant="outline" className={`2xl:text-xl  ${selectedGenre === genre.id ? 'text-red-700' : ' text-zinc-500'}`}
                    onClick={() => handleClick(genre.id)}>{genre.name}</Button>
            </CarouselItem>
        ))
    )



})