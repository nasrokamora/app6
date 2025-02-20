"use client"

import { useCallback, useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

export default function TestGeners() {
    const [genres, setGenres] = useState([]);
    const [isLoadingGenre, setIsLoadingGenre] = useState(true);
    const [movieList, setMovieList] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchGenres = async () => {
        try {
            const response = await fetch(`/api/fetchGetGenresList`,)
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message || "An error occurred while fetching data.")
            }
            setGenres(data.genres)
            if(data.genres.length > 0){
                fetchMovies(data.genres[0].id)
                setIsLoadingGenre(false)
            }
        } catch (error) {
            if(process.env.NODE_ENV !== "production"){
                console.error(error, "Error fetch data Genres")
            }
            return { error: true, message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message };
        }
    }


    const fetchMovies = useCallback(async (genreId) => {
        try {
            const response = await fetch(`/api/fetchMoviesWithGenres?genreId=${genreId}`,)
            if(!response.ok){
                throw new Error(data.message || "An error occurred while fetching data.")
            }
            const data = await response.json()
            setMovieList(data.results)
            setIsLoading(false)
            setError(null)
            
        } catch (error) {
            if(process.env.NODE_ENV !== "production"){
                console.error(error, "Error fetch data Genres")
            }
            setError(error.message || "An unexpected error occurred");
        }
    },[])

    useEffect(() => {
        fetchGenres()
    }, [])

    const handleClick = useCallback(async (genreId) => {
        setIsLoading(true)
        fetchMovies(genreId)
        setIsLoading(false)
    }, [fetchMovies])


    return(
        <div className="w-full h-screen">

            {/* content image fill and blur */}
            <div className=" border border-red-700 w-full h-[50vh] blur-left flex justify-between items-center"> 
                {/* content of details movies */}
                    <div className="bg-slate-900 w-[50%] blur-left h-[50vh]">

                    </div>

                <div className=" h-[30vh] border border-sky-700">

                </div>

            </div>

        </div>
    )
}