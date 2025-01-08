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

const initialState = {
    currentMovie: {
        image: "",
        title: "",
        releaseDate: "",
        voteAverage: "",
        overview: "",
        popularity: "",
        voteCount: "",
        isLoading: false
    }
}

const movieReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MOVIE':
            return {
                ...state,
                currentMovie: action.payload,
                isLoading: false
            }
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state
    }
}





export default function BackGroundImageGenres({ dataResult }) {

    const [state, dispatch] = useReducer(movieReducer, initialState)
    const itemRef = useRef([])
    
    // handle background image and loading with reducer
    const updateCurretMovie = useCallback((movie) => {

        //set loading state
        dispatch({ type: "SET_LOADING", payload: true })

        const newImage = movie.backdrop_path ? `${urlImageTv}${movie.backdrop_path}` : blurImage
        const img = new window.Image()
        img.src = newImage
        
        //image load and set state
        img.onload = () => {
            dispatch({
                type: "SET_MOVIE",
                payload: {
                    image: newImage,
                    title: movie.original_title ? movie.original_title : movie.title,
                    releaseDate: movie.release_date || "N/A",
                    voteAverage: movie.vote_average || "N/A",
                    overview: movie.overview || "Unknown",
                    popularity: movie.popularity || "N/A",
                    voteCount: movie.vote_count || "N/A",
                    isLoading: false
                }
            })
        }
    },[]) 


    // handle background image
    useEffect(() => {
        //observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const movieIndex = entry.target.getAttribute('data-index')
                    const movie = dataResult[movieIndex]
                    updateCurretMovie(movie)
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
            if (ref) observer.observe(ref);
        });
        
        //cleanup
        return () => {
            observer.disconnect()
        }

    }, [dataResult,updateCurretMovie])

    return (
        <div className={`w-full  h-screen flex justify-center md:h-screen  overflow-hidden relative `}  
        // style={{
        //     backgroundImage: `url(${state.currentMovie.image || blurImage})`,
        //     backgroundSize: "cover",
        //     backgroundPosition: "center",
        //     transition: "background-image 0.5s ease",
        //     width: "100%",
        //     height: "100%",
        //   }}
          >
            
            <Image src={state.currentMovie.image || blurImage}
                alt={state.currentMovie.title || "image_cover_movie"}
                fill={true}
                loading="lazy"
                style={{ objectFit: "cover" }}
                draggable={false}
                className=" bg-center"
                quality={100}
                sizes="(max-width: 768px) 100vw"

            />

            {state.isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
                    <div className="w-12 h-12 border-4 border-t-transparent border-[#c8081e] rounded-full animate-spin"></div>
                </div>
            )}
      <div className="absolute bottom-10 left-10 top-28 inset-0 text-white">
        <h1 className="text-4xl font-bold">{state.currentMovie.title}</h1>
        <h2>Release Date: {state.currentMovie.releaseDate}</h2>
        <p>Popularity: {state.currentMovie.popularity }</p>
        <p>Vote Average: {state.currentMovie.voteAverage }</p>
      </div>
            <div className="mb-4 flex justify-center items-end">
                <Carousel className="w-full md:max-w-md  xl:max-w-6xl 2xl:max-w-full lg:max-w-4xl" opts={{ align: "start", loop: true }}>
                    <CarouselContent>
                        {dataResult.map((movie, index) => (
                            <CarouselItem className="basis-1/8 xl:basis-1/6 md:basis-1/3 lg:basis-1/5 2xl:basis-1/6" key={movie.id}
                                data-index={index}
                                ref={(el) => (itemRef.current[index] = el)}
                            >
                                <div
                                    className="cursor-pointer hover:-translate-y-2 transition-all duration-300 ease-in-out"
                                    onClick={() =>
                                        updateCurretMovie(movie)
                                    }
                                    // onMouseEnter={() => {
                                    //     if (window.innerWidth > 1024) {
                                    //         updateCurretMovie(movie)
                                    //     }
                                    // }}
                                    >
                                    <Image
                                        src={`${urlImageTv}${movie.poster_path}`}
                                        alt="movie poster"
                                        width={150}
                                        height={150}
                                        className=""
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
            </div>
        </div>
    )
}