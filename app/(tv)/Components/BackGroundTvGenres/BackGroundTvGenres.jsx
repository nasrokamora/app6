"use client"

import { useEffect, useRef, useReducer, useCallback } from "react"
import { urlImageTv } from "@/app/libs/DataFetchingTv"
import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import blurImage from "../../../../public/image/no_image2.webp"



const initialState = {
    currentTv: {
        image: "",
        name: "",
        firstAirDate: "",
        overview: "",
        voteAverage: "",
        popularity: "",
        voteCount: "",
        isLoading: false
    }
}
const TvReducer = (state, action) => {
    switch (action.type) {
        case "SET_CURRENT_TV":
            return {
                ...state,
                currentTv: action.payload,
                isLoading: false
            }
        case "SET_LOADING":
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state
    }
}
export default function BackGroundTvGenres({ resultTvGenres }) {

    const [state, dispatch] = useReducer(TvReducer, initialState)
    const itemTvRef = useRef([])

    const updateCurretTv = useCallback((tv) => {
        
        dispatch({ type: "SET_LOADING", payload: true })
        
        const newImage = tv.backdrop_path ? `${urlImageTv}/${tv.backdrop_path}` : blurImage
        const img = new window.Image()
        img.src = newImage
        img.onload = () => {
            dispatch({
                type: "SET_CURRENT_TV",
                payload: {
                    image: newImage,
                    name: tv.original_name ? tv.original_name : tv.name,
                    firstAirDate: tv.first_air_date || "N/A",
                    overview: tv.overview || "Unknown",
                    voteAverage: tv.vote_average || "N/A",
                    popularity: tv.popularity || "N/A",
                    voteCount: tv.vote_count || "N/A",
                    isLoading: false
                }
            })
        }
        img.onerror = (error) => {
            if (process.env.NODE_ENV !== "production") {
                console.error(error, "Failed to load image for tv genre")
            }
            dispatch({
                type: "SET_LOADING",
                payload: {
                    isLoading: false
                },

            })
        }
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const tvIndex = entry.target.getAttribute("data-tv")
                    const dataTv = resultTvGenres[tvIndex]
                    updateCurretTv(dataTv)
                }
            })
        }, {
            root: null,
            threshold: 0.5
        })

        //observe all elements with data-tv attribute
        itemTvRef.current.forEach((ref) => {
            if (ref) observer.observe(ref)
        })



        return () => {
            observer.disconnect()
        }
    }, [resultTvGenres, updateCurretTv])



    return (
        <div className="`w-full  h-screen flex justify-center md:h-screen  overflow-hidden relative " style={{
            backgroundImage: `url(${state.currentTv.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 0.5s ease-in-out",
            width: "100%",
            height: "100%"
        }}>
            {state.isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
                </div>
            )}
            <div className="absolute bottom-10 left-10 top-28 inset-0 text-white">
                <h1 className="text-4xl font-bold">{state.currentTv.title}</h1>
                <h2>Release Date: {state.currentTv.releaseDate}</h2>
                <p>Popularity: {state.currentTv.popularity}</p>
                <p>Vote Average: {state.currentTv.voteAverage}</p>
            </div>

            <div className="mb-4 flex justify-center items-end">
                <Carousel className="w-full md:max-w-md  xl:max-w-6xl 2xl:max-w-full lg:max-w-4xl" opts={{ align: "start", loop: true }}>
                    <CarouselContent>
                        {resultTvGenres.map((tv, index) => (
                            <CarouselItem className="basis-1/8 xl:basis-1/6 md:basis-1/3 lg:basis-1/5 2xl:basis-1/6" key={tv.id}
                                data-tv={index}
                                ref={(el) => (itemTvRef.current[index] = el)}
                            >
                                <div
                                    className="cursor-pointer hover:-translate-y-2 transition-all duration-300 ease-in-out"
                                    onClick={() =>
                                        updateCurretTv(tv)
                                    }
                                >
                                    <Image
                                        src={tv.poster_path ?
                                            `${urlImageTv}${tv.poster_path}` : blurImage}
                                        alt="tv poster"
                                        width={150}
                                        height={150}
                                        priority={true}
                                        loading="eager"
                                        style={{ width: "auto", borderRadius: '2px' }}
                                        // unoptimized 
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