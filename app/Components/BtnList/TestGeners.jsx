"use client"

import Image from "next/image";
import React, { memo, useCallback, useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button";
import LoadingGenreButton from "../LoadingUi/LoadingGenreList";

export default function TestGeners() {
    const [genres, setGenres] = useState([]);
    const [isLoadingGenre, setIsLoadingGenre] = useState(true);
    const [movieList, setMovieList] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedGenre, setSelectedGenre] = useState(null)

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
        try {
            const response = await fetch(`/api/fetchMoviesWithGenres?genreId=${genreId}`,)
            if (!response.ok) {
                throw new Error(data.message || "An error occurred while fetching data.")
            }
            const data = await response.json()
            setMovieList(data.results)
            setIsLoading(false)
            setError(null)

        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error(error, "Error fetch data Genres")
            }
            setError(error.message || "An unexpected error occurred");
        }
    }, [])

    useEffect(() => {
        fetchGenres()
    }, [])

    const handleClick = useCallback(async (genreId) => {
        setIsLoading(true)
        fetchMovies(genreId)
        setSelectedGenre(genreId)
        setIsLoading(false)
    }, [fetchMovies])


    return (
        <div className="w-full h-screen">

            {/* content image fill and blur */}
            <Carousel className="w-full h-[50vh] xl:max-w-full"
                opts={{
                    align: "center",
                    loop: true,
                }}
            >

                <div className=" border border-red-700 w-full h-[50vh]  ">
                    {/* content of details movies */}
                    <CarouselContent className="-ml-1">

                        {movieList.length > 0 ? (
                            movieList.map((movie, index) => (
                                <CarouselItem className="max-w-full  h-[50vh] w-full " key={index} >
                                <div className="flex justify-between h-[50vh] w-full ">

                                <div className=" ">
                                    <h1>
                                        goo
                                    </h1>
                                </div>

                                <div className=" h-[50vh] border  blur-right w-[50%] overflow-hidden relative">
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
                        ):(
                            <div>
                                
                            </div>
                        )}

                    </CarouselContent>
                </div>
            </Carousel>
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