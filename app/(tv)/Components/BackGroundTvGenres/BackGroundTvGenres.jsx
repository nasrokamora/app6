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
import { FaStar } from "react-icons/fa";
import { SiSoundcharts } from "react-icons/si";

const initialState = {
    currentTv: {
        image: "",
        name: "",
        firstAirDate: "",
        overview: "",
        voteAverage: "",
        popularity: "",
        voteCount: "",
        detailsTv: {
            homePage: "",
            genres :[
                {
                    name:""
                }
            ],
            episondeRuntime: "",
            createdBy:[
                {
                    name:"",
                    profilePath:""
                }
            ]
        },
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
export default function BackGroundTvGenres({ resultTvGenres}) {

    const [state, dispatch] = useReducer(TvReducer, initialState)
    const itemTvRef = useRef([])

    const updateCurretTv = useCallback((tv) => {

        dispatch({ type: "SET_LOADING", payload: true })

        const newImage = tv.backdrop_path ? `${urlImageTv}/${tv.backdrop_path}` : blurImage
        const img = new window.Image()
        img.src = newImage
        img.onload = () => {
            fetchDetailsTvById(tv.id).then((detailsTv)=>{
                dispatch({
                    type: "SET_CURRENT_TV",
                    payload: {
                        image: newImage,
                        name: tv.original_name ? tv.original_name : tv.name,
                        firstAirDate: tv.first_air_date || "N/A",
                        overview: tv.overview.slice(0, 500) || "Unknown",
                        voteAverage: tv.vote_average.toFixed(1) || "N/A",
                        popularity: tv.popularity || "N/A",
                        voteCount: tv.vote_count || "N/A",
                        detailsTv: detailsTv || {},
                        isLoading: false
                    }       
            })
            console.log(detailsTv)
            })
        }

        const fetchDetailsTvById = async (tvId) => {
            try {
                const response = await fetch(`/api/getDetailsTv?tvId=${tvId}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }
                const data = await response.json()
                return data
            } catch (error) {
                if (process.env.NODE_ENV !== "production") {
                    console.error(error, "Failed to fetch data DetailsTv")
                }
                return {}
            }
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
        <div className="`w-full  h-screen flex justify-center md:h-screen  overflow-hidden relative "
        >
            <Image src={state.currentTv.image || blurImage}
                alt={state.currentTv.name || "image_tv_cover"}
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
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
                </div>
            )}
            <div className="absolute bottom-10 left-10 top-28 right-10 rounded-lg inset-0 text-white bg-black/50 backdrop-blur w-fit h-fit p-3 md:h-fit">
                <div className=" flex flex-col gap-5 ">

                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight md:text-3xl md:text-center">{state.currentTv.name}</h1>
                    <h2 className="font-bold text-2xl text-zinc-200 border-l-2 border-yellow-500 pl-2 md:text-lg">Release Date: {state.currentTv.firstAirDate.replace(/-/g, "/")}</h2>

                    <p className=" font-bold flex justify-start items-center gap-2 text-2xl border-l-2 border-green-500 pl-2 md:text-lg">Popularity: <span className="text-green-500">{(state.currentTv.popularity / 10).toFixed(0)} </span> <span><SiSoundcharts className="text-green-500" />
                    </span></p>
                    <p className=" font-bold flex justify-start items-center gap-2 text-2xl border-l-2 border-oronge-500 pl-2 md:text-lg">Vote Average: <span className="text-yellow-500">{(state.currentTv.voteAverage)} </span> <span><FaStar className="text-yellow-500" /></span></p>
                    <p className=" font-bold text-2xl border-l-2 border-oronge-500 pl-2 md:text-lg md:hidden">Overview: <span className="text-base font-semibold italic">{state.currentTv.overview}</span></p>
                </div>
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