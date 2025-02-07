"use client"


import { getTrendingMovies, urlImage } from "@/app/libs/DataFetching"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { FaRegStar } from "react-icons/fa";
import Link from "next/link"
import { memo, useCallback, useEffect, useReducer, useState } from "react";
import LoadingGenreCarousel from "@/app/Components/LoadingUi/LoadingGenreCarousel";
import { Button } from "@/components/ui/button";


const initialState = {
    page: 1,
    data: [],
    isLoading: true,
    error: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH SEUCCESS":
            return {
                ...state,
                data: action.payload,
                isLoading: false
            }
        case "INCREMENT_PAGE":
            return {
                ...state,
                page: state.page < 10 ? state.page + 1 : 1,
                isLoading: false
            }
        case "FETCH_ERROR":
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        default:
            return state
    }
}




export default function TrendingMovies() {

    // const [page, setPage] = useState(1)
    // const [dataTrendingMovies, setDataTrendingMovies] = useState([])
    // const [isLoading, setIsLoading] = useState(true)

    const [state, dispatch] = useReducer(reducer, initialState)


    const fetchTredingMovies =useCallback(async(page) => {

        try {
            const response = await fetch(`/api/getTrendingMovies?page=${page}`)
            const data = await response.json()
            dispatch({type: "FETCH SEUCCESS", payload: data.results})
        } catch (error) {
            dispatch({type: "FETCH_ERROR", payload: error.message})
        }
    },[])


    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({type: "INCREMENT_PAGE"})
        }, 15000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        fetchTredingMovies(state.page)
    }, [state.page, fetchTredingMovies])

    return (
        <div className=" w-full">
            <div className=" flex justify-start gap-2 items-center">
                <h1 className="text-3xl md:text-xl font-bold bg-gradient-to-r from-[#b6ac23] via-[#40b9ff] to-[#b6ac23] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">Trending on Magix </h1>
            </div>
            <div className="flex justify-center w-full mt-6">

                <Carousel opts={{
                    align: "start",
                    loop: true,
                }} className=" md:max-w-sm xl:max-w-4xl   w-[80%] 2xl:max-w-6xl" >
                    <CarouselContent className="   ">
                        {state.isLoading ? (
                            <div className=" flex justify-center items-center w-full">
                                <LoadingGenreCarousel />
                            </div>
                        ) : state.error ? (
                            <div>
                                <h1>{state.error}</h1>
                            </div>
                        ) : (
                            state.data.map((movie, index) => (
                                <TrendingMoviesCard movie={movie} key={movie.id} />
                            ))
                        )}

                    </CarouselContent>
                    <CarouselPrevious className=" md:hidden" />
                    <CarouselNext className=" md:hidden" />
                </Carousel>
            </div>
        </div>
    )
}

const TrendingMoviesCard = memo(({ movie }) => {
    const [loaded, setLoaded] = useState(false)
    return(
            <CarouselItem key={movie.id} className="  basis-1/5 lg:basis-1/5 md:basis-1/2 2xl:basis-1/7">
                <Link className=" hover:grayscale hover:duration-500" href={`/movies/list/${movie.id}`}>

                    <Image
                        src={`${urlImage}${movie.poster_path}`}
                        alt={movie.title}
                        width={180} height={180}
                        className={`md:w-[200px]  lg:w-[200px] lg:h-[200px] xl:w-[150px] xl:h-[150px] 2xl:w-[250px] 2xl:h-[150px] transition-opacity duration-100 ${loaded ? "opacity-100" : "opacity-0"}  `}
                        onLoad={() => setLoaded(true)}
                        style={{ height: "auto" }}

                    />
                    <p className=" font-bold flex justify-start  pt-2 mb-1">{movie.title.length > 14 ? movie.title.slice(0, 14) + "..." : movie.title}
                    </p>
                    <div className=" flex justify-between items-center w-full font-semibold">
                        <p className=" fonb flex justify-between items-center w-full">
                            {new Date(movie.release_date).getFullYear()}
                        </p>
                        <div className=" ">
                            <div className=" space-x-1 flex justify-between items-center">
                                <FaRegStar className="text-[#FFC300]" />
                                <span className="">
                                    {movie.vote_average.toFixed(1)}
                                </span>
                            </div>
                        </div>

                    </div>

                </Link>
            </CarouselItem>
    )
})