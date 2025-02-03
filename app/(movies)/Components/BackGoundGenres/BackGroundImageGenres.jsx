"use client"

import { useCallback, useEffect, useReducer, useRef, useState } from "react"
import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { urlImageTv } from "@/app/libs/DataFetchingTv"
import blurImage from '../../../../public/image/blurImage.webp'
import { useMediaContext } from "@/app/Context/MediaContext"
import { urlImage } from "@/app/libs/DataFetching"
import BlurFade from "@/components/ui/blur-fade"
import { FaRegStar } from "react-icons/fa";
import Link from "next/link"
import { SkeletonBackGroundImageGenres } from "./SkeletonGenres"
import { LiaImdb } from "react-icons/lia";
import { FiExternalLink } from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";

const initialState = {
    currentMovie: {
        image: "",
        title: "",
        releaseDate: null,
        voteAverage: null,
        overview: null,
        popularity: null,
        voteCount: null,
        detailsMovies: {},
        isLoading: false
    }
}

const MoviesReducer = (state, action) => {
    switch (action.type) {
        case "SET_CURRENT_MOVIE":
            return {
                ...state,
                currentMovie: {
                    ...action.payload,
                    isLoading: false
                }
            }
        case "SET_LOADING":
            return {
                ...state,
                currentMovie: {
                    ...state.currentMovie,
                    isLoading: action.payload
                }
            }
        default:
            return state
    }
}

export default function BackGroundImageGenres({ dataResult, detailsMovies }) {

    const [state, dispatch] = useReducer(MoviesReducer, initialState)
    const itemRef = useRef([])
    const [isLoaded, setIsLoaded] = useState(false)


    const updateCurrentMovie = useCallback((movie) => {
        dispatch({ type: "SET_LOADING", payload: true })

        const newImage = movie.backdrop_path ? `${urlImage}${movie.backdrop_path}` : blurImage
        const img = new window.Image()
        img.src = newImage
        img.onload = () => {
            dispatch({
                type: "SET_CURRENT_MOVIE",
                payload: {
                    image: newImage,
                    title: movie.title ? movie.title : "Unknown",
                    releaseDate: movie.release_date.replace(/-/g, "/") ? movie.release_date.replace(/-/g, "/") : "Unknown",
                    voteAverage: movie.vote_average ? movie.vote_average.toFixed(1) : "Not Rated",
                    overview: movie.overview ? movie.overview : "No overview available",
                    popularity: movie.popularity ? movie.popularity : "Unknown",
                    voteCount: movie.vote_count ? movie.vote_count : "Unknown",
                    detailsMovies: detailsMovies || {},
                    isLoading: false,

                }
            })
        }
        img.onerror = () => {
            if (process.env.NODE_ENV !== "production") {
                console.error("Failed to load image for movies genre")
            }
            dispatch({
                type: "SET_LOADING",
                payload: {
                    isLoading: false
                },
            }),
                dispatch({
                    type: "SET_CURRENT_MOVIE",
                    payload: {
                        image: blurImage,
                        isLoading: false,
                        detailsTv: detailsMovies || {}
                    }
                })
        }

    }, [])


    // handle background image
    useEffect(() => {
        //observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const movieIndex = entry.target.getAttribute('data-index')
                    const movie = dataResult[movieIndex]
                    updateCurrentMovie(movie)
                }
            })
        },
            {
                root: null,
                threshold: 0.5
            }
        )
        //observer
        itemRef.current.forEach((ref) => {
            ref && observer.observe(ref);
        });

        //cleanup
        return () => {
            observer.disconnect()
        }

    }, [dataResult, updateCurrentMovie])

    const getStatusMovies = (status) => {
        switch (status) {
            case "Released":
                return "text-green-500"
            case "Upcoming":
                return "text-orange-500"
            case "In Production":
                return "text-yellow-500"
            default:
                return "text-white"
        }
    }

    return (
        <main className="w-full h-screen md:h-auto ">
            <ImageMoviesCover state={state} blurImage={blurImage} />

            <div className={`   h-screen w-full md:h-auto relative`}>


                {/* loading */}
                {state && state.currentMovie &&
                    state.currentMovie.isLoading && (

                        <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50">
                            <div className="w-12 h-12 border-4 border-t-transparent border-[#c8081e] rounded-full animate-spin"></div>
                        </div>
                    )}

                {/* card details movie */}


                <div className=" md:pt-28 pt-28  flex justify-start items-start flex-col relative   text-white bg-black/60 backdrop-blur  mb-4 p-4 rounded-md md:h-[80vh] h-fit overflow-hidden">

                    <div className="flex items-center justify-center mb-8 gap-4 md:gap-2 flex-wrap md:text-center">
                        <h1 className="text-4xl font-bold underline text-gray-300 decoration-red-600 md:text-2xl">{state.currentMovie.title}</h1>
                        <span className="font-extrabold flex justify-start items-center gap-1 text-yellow-500  text-4xl md:text-2xl">{state.currentMovie.voteAverage}<FaRegStar className=" font-extrabold md:size-8" size={32} /> </span>

                    </div>
                    <h2 className=" text-gray-300 font-bold text-xl border-l-2 border-l-red-600 pl-2">Release Date <span className="text-white">{state.currentMovie.releaseDate}</span> </h2>
                    <div className=" flex justify-start items-center gap-2 flex-wrap relative z-10">
                        <h2 className=" text-gray-300 font-bold text-xl border-l-2 border-l-red-600 pl-2">Genres</h2>
                        {state.currentMovie.detailsMovies?.genres && (
                            state.currentMovie.detailsMovies.genres.map(genre => (
                                <Link href={`/movies/genre/${genre.id}`} className="badge bg-orange-600 text-black font-semibold hover:bg-red-600 hover:duration-300 md:active:scale-90 mt-2 md:mt-1" key={genre.id}>
                                    {genre.name}
                                </Link>

                            )))}
                    </div>
                    <div className="text-gray-300 font-bold text-xl border-l-2 border-l-red-600 pl-2">
                        <h1 className=' '> status:  <span className={`${getStatusMovies(state.currentMovie?.detailsMovies?.status || "Unknown")}`}>{state.currentMovie?.detailsMovies?.status || "Loading..."}</span></h1>
                        <h1 className="flex justify-start items-center gap-1">Runtime: <span className=" flex justify-start items-center gap-1 text-white">{state.currentMovie?.detailsMovies?.runtime} <span className="text-orange-700">min</span>
                        </span></h1>
                    </div>
                    <div className="text-gray-300 font-bold text-xl border-l-2 border-l-red-600 pl-2">
                        <h1>overview:</h1>
                        <p className=" italic font-semibold text-slate-200 text-base underline decoration-slate-700 ">{state.currentMovie.overview}</p>
                    </div>
                    <div className=" border-l-2 pt-2 border-l-red-600  font-bold text-xl  flex-col flex justify-start items-start text-gray-300 gap-1">
                        <div className=" pl-2 flex justify-start items-center gap-4">
                        <h1>link:</h1>
                            <Link target="_blank" className=" hover:" href={`https://www.imdb.com/title/${state.currentMovie?.detailsMovies?.imdb_id}`}><LiaImdb size={42} /></Link>
                            <span> <FiExternalLink size={35} /> </span>
                            <span><TbListDetails size={35} /></span>
                        </div>
                    </div>
                </div>


                {/* carousel */}
                <BlurFade inView className="pt-40  h-fit relative flex justify-center items-center w-full">


                    <Carousel className="w-full md:max-w-md  xl:max-w-6xl 2xl:max-w-full lg:max-w-4xl" opts={{ align: "start", loop: true }}>
                        <CarouselContent>
                            {dataResult.map((movie, index) => (
                                <CarouselItem className="basis-1/8 xl:basis-1/6 md:basis-1/3 lg:basis-1/5 2xl:basis-1/6" key={movie.id}
                                    data-index={index}
                                    ref={(el) => (itemRef.current[index] = el)}
                                >
                                    <div
                                        className="cursor-pointer hover:-translate-y-2 transition-all duration-300 ease-in-out"
                                        onClick={() => updateCurrentMovie(movie)}>
                                        <Image
                                            src={`${urlImageTv}${movie.poster_path}`}
                                            alt="movie poster"
                                            width={150}
                                            height={150}
                                            priority={true}
                                            loading="eager"
                                            style={{ width: "auto", borderRadius: '2px' }}
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className=" absolute top-[-4rem] left-[93%] md:left-[82%] md:top-[-3rem]">
                            <CarouselPrevious />
                            <CarouselNext />
                        </div>
                    </Carousel>
                </BlurFade>
            </div>
        </main>
    )
}


const ImageMoviesCover = ({ state, blurImage }) => {
    return (
        <div className=" h-screen w-full fixed overflow-hidden p-0 ml-0 left-0">

            <Image src={state.currentMovie.image || blurImage}
                alt={state.currentMovie.title || "image_cover_movie"}
                fill={true}
                loading="eager"
                style={{ objectFit: "cover" }}
                draggable={false}
                className={`bg-center animated-bg `}
                quality={100}
                priority
                sizes="(max-width: 768px) 100vw"

            />
        </div>
    )
}