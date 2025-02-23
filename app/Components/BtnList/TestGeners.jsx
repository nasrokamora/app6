"use client"
import { IoStarSharp } from "react-icons/io5";
import Image from "next/image";
import React, { cache, memo, useCallback, useEffect, useReducer, useRef, useState } from "react";
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
import { FaLink } from "react-icons/fa6";


const initialState = {
    genres: [],
    isLoadingGenre: true,
    movieList: [],
    isLoading: true,
    selectedGenre: null,
    movieDetails: [],
    error: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_GENRES_SUCCESS":
            return {
                ...state,
                genres: action.payload,
                isLoadingGenre: false
            }
        case "SET_SELECTED_GENRE":
            return {
                ...state,
                selectedGenre: action.payload
            }
        case "FETCH_MOVIES_SUCCESS":
            return {
                ...state,
                movieList: action.payload,
                isLoading: false
            }
        case "FETCH_MOVIES_DETAILS_SUCCESS":
            return {
                ...state,
                movieDetails: action.payload,
                isLoading: false
            }
        case "SET_LOADING":
            return {
                ...state,
                isLoading: action.payload
            }
        case "ERROR":
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
    }
}




export default function TestGeners() {

    const [state, dispatch] = useReducer(reducer, initialState)





    // const [genres, setGenres] = useState([]);
    // const [isLoadingGenre, setIsLoadingGenre] = useState(true);
    // const [movieList, setMovieList] = useState([]);
    // const [error, setError] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [selectedGenre, setSelectedGenre] = useState(null)
    // const [movieDetails, setMovieDetails] = useState([])

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

            dispatch({ type: "FETCH_GENRES_SUCCESS", payload: data.genres })

            if (data.genres.length > 0) {
                fetchMovies(data.genres[0].id)
                dispatch({ type: "SET_SELECTED_GENRE", payload: data.genres[0].id })

                // setIsLoadingGenre(false)
            }
        } catch (error) {
            dispatch({ type: "ERROR", payload: error.message || "An unexpected error occurred" })
        }
    }


    const fetchMovies = useCallback(async (genreId) => {
        if (cacheRef.current[genreId]) {
            dispatch({ type: "FETCH_MOVIES_SUCCESS", payload: cacheRef.current[genreId] })
            return
        }

        dispatch({ type: "SET_LOADING", payload: true })

        try {
            const response = await fetch(`/api/fetchMoviesWithGenres?genreId=${genreId}`,)
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "An error occurred while fetching data.")
            }
            dispatch({ type: "FETCH_MOVIES_SUCCESS", payload: data.results })
            // setMovieList(data.results)
            cacheRef.current[genreId] = data.results

            const details = await Promise.all(data.results.map(async (movie) => {

                const response = await fetch(`/api/getMoviesById?movieId=${movie.id}`,)

                const dataDetails = await response.json()

                if (!response.ok) {
                    throw new Error(dataDetails.message || "An error occurred while fetching data.")
                }

                return dataDetails
            }))
            dispatch({ type: "FETCH_MOVIES_DETAILS_SUCCESS", payload: details })

        } catch (error) {
            dispatch({ type: "ERROR", payload: error.message || "An unexpected error occurred" })
        }
    }, [])

    // console.log(state.movieDetails)

    const handleClick = useCallback((genreId) => {
        if (state.selectedGenre === genreId) return
        dispatch({ type: "SET_SELECTED_GENRE", payload: genreId })
        fetchMovies(genreId)

    }, [fetchMovies, state.selectedGenre])



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


    const ColorTypes = (status) => {
        switch (status) {
            case "Released":
                return "text-green-500"
            case "Upcoming":
                return "text-orange-500"
            case "In Production":
                return "text-blue-500"
            case "Post Production":
                return "text-pink-500"
            default:
                return "text-gray-500"
        }
    }
    const ColorTypesGenres = (genre) => {
        switch (genre) {
            case "Action":
                return "text-red-500"
            case "Adventure":
                return "text-yellow-500"
            case "Animation":
                return "text-green-500"
            case "Comedy":
                return "text-blue-500"
            case "Crime":
                return "text-pink-500"
            case "Drama":
                return "text-indigo-500"
            case "Family":
                return "text-cyan-500"
            case "Fantasy":
                return "text-purple-500"
            case "Horror":
                return "text-rose-500"
            case "Mystery":
                return "text-fuchsia-500"
            case "Romance":
                return "text-sky-500"
            case "Thriller":
                return "text-amber-500"
            case "Western":
                return "text-lime-500"
            case "Science Fiction":
                return "text-teal-500"
            default:
                return "text-white"
        }
    }

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
                        {state.isLoading ? (
                            <MovieCarouselSkeleton />
                        ) : (

                            state.movieList.map((movie, index) => {

                                const details = state.movieDetails[index];
                                return (
                                    <CarouselItem className="max-w-full  h-[50vh] w-full md:h-screen " key={movie.id} >
                                        <div className="flex justify-between h-[50vh] w-full ">

                                            <div className=" bg-transparent w-[60%]   p-4">
                                                <h1 className="text-3xl font-bold text-center ">
                                                    {movie.original_title || " Unknown"}
                                                </h1>
                                                <div className=" pt-4 font-bold ">
                                                    <div className=" flex justify-start gap-3 items-center">
                                                        <div className="bg-white/30 backdrop-blur w-fit p-1 rounded-md flex justify-center gap-2 items-center">

                                                            <h1 className=" font-bold text-yellow-500 ">
                                                                {movie.vote_average?.toFixed(1) || "No rating available"}
                                                            </h1>
                                                            <span className=" text-yellow-500">
                                                                <IoStarSharp />
                                                            </span>
                                                        </div>
                                                        {/* release date */}
                                                        <div className="bg-white/30 backdrop-blur w-fit p-1 rounded-md">
                                                            <h1>{new Date(movie.release_date).getFullYear() || "Unknown"}</h1>
                                                        </div>
                                                        <div>
                                                            <h1 className="bg-white/30 backdrop-blur w-fit p-1 rounded-md">
                                                                {movie.original_language}
                                                            </h1>
                                                        </div>
                                                        {/* status */}
                                                        <div className={`${ColorTypes(details.status)} bg-white/30 backdrop-blur w-fit p-1 rounded-md`}>
                                                            <h1>{details.status}</h1>
                                                        </div>
                                                    </div>
                                                    {/* details movies */}

                                                    {details &&
                                                        <div className=" flex justify-start gap-2 items-center pt-4">

                                                            {/* genres */}
                                                            <div className=" flex justify-start items-center gap-2">
                                                                {details.genres.map((genre) => (
                                                                    <div key={genre.id} className="bg-white/30 backdrop-blur w-fit p-1 rounded-md">
                                                                        <h1 className={``}>{genre.name}</h1>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    }
                                                    <p className="text-sm text-center text-muted-foreground font-semibold pt-4">
                                                        {movie.overview || "No description available"}
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
                                )
                            })
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
                        {state.isLoadingGenre ? (
                            <div className='flex items-center justify-center w-full'>
                                <LoadingGenreButton />
                            </div>
                        ) : (
                            <GenresListType
                                handleClick={handleClick}
                                state={state}

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



const GenresListType = React.memo(({ state, handleClick }) => {

    return (
        state.genres.map((genre) => (
            <CarouselItem key={genre.id} className="p-1 basis-1/7 lg:basis-1/8 md:basis-1/7 ">
                <Button variant="outline" className={`2xl:text-xl  ${state.selectedGenre === genre.id ? 'text-red-700' : ' text-zinc-500'}`}
                    onClick={() => handleClick(genre.id)}>{genre.name}</Button>
            </CarouselItem>
        ))
    )
})


