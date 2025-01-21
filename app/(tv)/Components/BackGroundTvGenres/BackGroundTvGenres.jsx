"use client"

import { useEffect, useRef, useReducer, useCallback } from "react"
import { urlImageTv } from "@/app/libs/DataFetchingTv"
import Image from "next/image"
import Link from "next/link"
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
import { ImLink } from "react-icons/im";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
// import { useMediaContext } from "@/app/Context/MediaContext"
// import { useContextMedia } from "@/app/Context/ContextMedia"
import errorImage from '../../../../public/image/error_image.webp'


const initialState = {
    currentTv: {
        image: "",
        name: "",
        firstAirDate: null,
        overview: null,
        voteAverage: null,
        popularity: null,
        voteCount: null,
        detailsTv: {},
        isLoading: false
    }
}

const tvReducer = (state, action) => {
    switch (action.type) {
        case "SET_CURRENT_TV":
            return {
                ...state,
                currentTv: {
                    ...action.payload,
                    isLoading: false
                }
            }
        case "SET_LOADING":
            return { ...state,
                 currentTv: { 
                    ...state.currentTv,
                     isLoading: action.payload 
                    }
                }
        default:
            return state
    }
}



export default function BackGroundTvGenres({ resultTvGenres,detailsTv }) {

    const [state,dispatch] = useReducer(tvReducer, initialState)
    const itemTvRef = useRef([])

    const updateCurrentTv = useCallback((tv) => {
        dispatch({type: "SET_LOADING", payload: true})
        

        const newImage = tv.backdrop_path ? `${urlImageTv}${tv.backdrop_path}` : errorImage
        const img = new window.Image()
        img.src = newImage
        img.onload =  () => {
            dispatch({
                type: "SET_CURRENT_TV",
                payload: {
                    image: newImage,
                    name: tv.original_name ? tv.original_name : tv.name,
                    firstAirDate: tv.first_air_date.replace(/-/g, "/") || "N/A",
                    overview: tv.overview.slice(0, 500) || "Unknown",
                    voteAverage: tv.vote_average.toFixed(1) || "N/A",
                    popularity: tv.popularity || "N/A",
                    voteCount: tv.vote_count || "N/A",
                    detailsTv: detailsTv || {},
                    isLoading: false
                }
            })
        }
        img.onerror = ()=>{
            if (process.env.NODE_ENV !== "production") {
                console.error("Failed to load image for tv genre")
            }
            dispatch({
                type: "SET_LOADING",
                payload: {
                    isLoading: false
                },
            }),
            dispatch({
                type: "SET_CURRENT_TV",
                payload:{
                    image: errorImage,
                    isLoading: false,
                    detailsTv: detailsTv || {}
                }
            })
        }
        // console.log(detailsTv)
    },[])

    // const fetchDetailsTvById = async (id) => {
    //     console.log("Fetching TV details for ID:", id)
    //     try {
    //         const response = await fetch(`/api/getDetailsTv?tvId=${id}`, {
    //             next: {
    //                 revalidate: 7200
    //             }
    //         })
    //         if (!response.ok) {
    //             throw new Error("Network response was not ok")
    //         }
    //         const data = await response.json()
    //         // console.log(data)
    //         return data
    //     } catch (error) {
    //         if (process.env.NODE_ENV !== "production") {
    //             console.error(error, "Failed to fetch data DetailsTv");
    //         }
    //         return {}
    //     }
    // }

    


    useEffect(() => {

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const tvIndex = entry.target.getAttribute('data-tv')
                    const dataTv = resultTvGenres[tvIndex]
                    updateCurrentTv(dataTv)
                }
            })
        }, {
            root: null,
            threshold: 0.5
        })

        // observe all elements with data-tv attribute
        itemTvRef.current.forEach((ref) => {
            if(ref){
                observer.observe(ref)
            }
        })

        return () => {
            observer.disconnect()
        }
    }, [resultTvGenres, updateCurrentTv])

    const getStatusColor = (status) => {
        switch (status) {
            case "Returning Series":
                return "text-green-500 underline decoration-green-500"
            case "Ended" || null || "Not available" || "Unknown" || "N/A" || "":
                return "text-red-700 underline decoration-red-700"
            case "Canceled":
                return "text-orange-500 underline decoration-orange-500"
                case null:
                    return "text-red-700"
            default:
                return "text-white"
        }
    }
    // console.log(state)

    return (
        <div className="w-full  h-screen flex justify-center md:h-screen  overflow-hidden relative">
            <ImageCoverGenres state={state} />

            {state?.currentTv?.isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
                </div>
            )
        }

            <div className="   bg-black/70 w-fit h-fit absolute bottom-10 left-10 top-28 inset-0 text-white p-4 rounded-md">
                <div className=" flex flex-col gap-3 justify-start ">

                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight md:text-3xl md:text-center flex justify-start items-center gap-6  flex-wrap md:justify-center md:gap-1">{state.currentTv.name  || "N/A"} <span className="text-yellow-500 flex justify-start items-center gap-2"><FaStar className="" /> {(state.currentTv.voteAverage)}</span> <span className="text-yellow-500"> </span> </h1>
                    <h2 className="font-bold text-2xl text-zinc-200 border-l-2 border-yellow-500 pl-2 md:text-lg">First Air Date: {state.currentTv.firstAirDate}</h2>

                    <p className=" font-bold flex justify-start items-center gap-2 text-2xl border-l-2 border-green-500 pl-2 md:text-lg">Popularity: <span className="text-green-500">{(state.currentTv.popularity / 10).toFixed(0)} </span> <span><SiSoundcharts className="text-green-500" />
                    </span></p>

                    {/* genres */}
                    <div className=" flex justify-start items-start gap-2 border-l-2 border-[#00b5ff] pl-2 flex-wrap">
                        <h1 className="font-bold text-2xl  md:text-lg">
                            Genres:
                        </h1>
                        <div className="flex justify-start items-center gap-2 flex-wrap ">
                            {state.currentTv.detailsTv?.genres?.length > 0
                                ? state.currentTv.detailsTv.genres.map((genre) =>
                                    <Link href={`/tv/genre/${genre.id}`} className="badge badge-info font-semibold hover:bg-blue-600 hover:duration-300 md:active:scale-90 mt-2 md:mt-1" key={genre.id}>
                                        {genre.name}
                                    </Link>
                                )
                                : null}
                        </div>
                    </div>

                    {/* status */}
                    <div className="font-bold text-2xl  md:text-lg border-l-2 border-[#ff9900] pl-2">
                        <h1 >Status: <span className={getStatusColor(state.currentTv?.detailsTv?.status)}>  {state.currentTv?.detailsTv?.status || null}
                            </span>
                        </h1>
                    </div>
                    {/* Number of episodes &  */}
                    <div>
                        <h1 className="font-bold text-2xl  md:text-lg border-l-2 border-[#ff9900] pl-2">Number of episodes & Seasons: <span className=" badge badge-ghost">  {state.currentTv.detailsTv?.number_of_episodes || "Loading..."} / S{state.currentTv.detailsTv?.number_of_seasons || ""}</span></h1>
                    </div>
                    <div>
                        <SeasonsDialog state={state} />
                    </div>
                </div>
                <div className=" flex flex-col gap-5 ">

                    {/* <div className=" flex justify-start items-center gap-2 ">
                        <h1 className="font-bold flex justify-start items-center gap-2 text-2xl border-l-2 border-oronge-500 pl-2 md:text-lg underline decoration-white">Homepage:</h1>
                        <Link href={`${state.currentTv.detailsTv.homepage || "Not available"}`} target="_blank">
                        <ImLink size={32} />
                        </Link>
                        
                        </div> */}
                </div>
            </div>


            <div className="mb-4 flex justify-center items-end">
                <Carousel className="w-full md:max-w-md  xl:max-6xl 2xl:max-w-full lg:max-w-4xl" opts={{ align: "start", loop: true }}>
                    <CarouselContent>
                        {resultTvGenres.map((tv, index) => (
                            <CarouselItem className="basis-1/8 xl:basis-1/6 md:basis-1/3 lg:basis-1/5 2xl:basis-1/6" key={tv.id}
                                data-tv={index}
                                ref={(el) => (itemTvRef.current[index] = el)}
                            >
                                <div
                                    className="cursor-pointer rounded-md   hover:border-2 border-[#15b4f8]"
                                    onClick={() =>
                                        updateCurrentTv(tv)
                                    }
                                >
                                    <Image
                                        src={tv.poster_path ?
                                            `${urlImageTv}${tv.poster_path}` : blurImage}
                                        alt="tv poster"
                                        width={150}
                                        height={100}
                                        loading="lazy"
                                        priority={false}
                                        style={{ width: "auto", borderRadius: '2px',height:'auto' }}
                                    // unoptimized 
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className=" absolute top-[-4rem] left-[93%] md:left-[82%] md:top-[-1.5rem]">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>
        </div>

    )
}


function SeasonsDialog({ state }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline"> All seasons </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid grid-cols-5 gap-1">

                    {state.currentTv.detailsTv?.seasons?.length > 0 ?
                        state.currentTv.detailsTv.seasons.map((season) =>
                            <div key={season.id} className=" ">
                                <Link href={`/tv/list/${state.currentTv.detailsTv.id}/season/${season.season_number}`} className={buttonVariants({ variant: "outline" })}>
                                    S{season.season_number}
                                </Link>
                            </div>
                        ) : (
                            "No seasons available"
                        )}

                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

function ImageCoverGenres({ state }) {
    return (
        <Image src={state.currentTv.image || errorImage}
            alt={state.currentTv.name || "image_tv_cover"}
            fill={true}
            loading="lazy"
            style={{ objectFit: "cover" }}
            draggable={false}
            className=" blur-lg "
            sizes="(max-width: 768px) 100vw"

        />
    )
}