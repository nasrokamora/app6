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
import { useMediaContext } from "@/app/Context/MediaContext"
import { useContextMedia } from "@/app/Context/ContextMedia"

export default function BackGroundTvGenres({ resultTvGenres }) {

    const { state, updateCurrentMedia } = useContextMedia()
    const itemTvRef = useRef([])


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const tvIndex = entry.target.getAttribute('data-tv')
                    const dataTv = resultTvGenres[tvIndex]
                    updateCurrentMedia(dataTv)
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
    }, [resultTvGenres, updateCurrentMedia])

    const getStatusColor = (status) => {
        switch (status) {
            case "Returning Series":
                return "text-green-500 underline decoration-green-500"
            case "Ended":
                return "text-red-700 underline decoration-red-700"
            case "Canceled":
                return "text-orange-500 underline decoration-orange-500"
            default:
                return "text-white"
        }
    }
    console.log(state)

    return (
        <div className="w-full  h-screen flex justify-center md:h-screen  overflow-hidden relative">
            <ImageCoverGenres state={state} />

            {state && state.currentMedia &&
            state.currentMedia.isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
                </div>
            ):(

            <div className="   bg-black/70 w-fit h-fit absolute bottom-10 left-10 top-28 inset-0 text-white p-4 rounded-md">
                <div className=" flex flex-col gap-3 justify-start ">

                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight md:text-3xl md:text-center flex justify-start items-center gap-6  flex-wrap md:justify-center md:gap-1">{state.currentMedia.name || ""} <span className="text-yellow-500 flex justify-start items-center gap-2"><FaStar className="" /> {(state.currentMedia.voteAverage)}</span> <span className="text-yellow-500"> </span> </h1>
                    <h2 className="font-bold text-2xl text-zinc-200 border-l-2 border-yellow-500 pl-2 md:text-lg">First Air Date: {state.currentMedia.firstAirDate}</h2>

                    <p className=" font-bold flex justify-start items-center gap-2 text-2xl border-l-2 border-green-500 pl-2 md:text-lg">Popularity: <span className="text-green-500">{(state.currentMedia.popularity / 10).toFixed(0)} </span> <span><SiSoundcharts className="text-green-500" />
                    </span></p>

                    {/* genres */}
                    <div className=" flex justify-start items-start gap-2 border-l-2 border-[#00b5ff] pl-2 flex-wrap">
                        <h1 className="font-bold text-2xl  md:text-lg">
                            Genres:
                        </h1>
                        <div className="flex justify-start items-center gap-2 flex-wrap ">
                            {state.currentMedia.detailsMedia?.genres?.length > 0
                                ? state.currentMedia.detailsMedia.genres.map((genre) =>
                                    <Link href={`/tv/genre/${genre.id}`} className="badge badge-info font-semibold hover:bg-blue-600 hover:duration-300 md:active:scale-90 mt-2 md:mt-1" key={genre.id}>
                                        {genre.name}
                                    </Link>
                                )
                                : null}
                        </div>
                    </div>

                    {/* status */}
                    <div className="font-bold text-2xl  md:text-lg border-l-2 border-[#ff9900] pl-2">
                        <h1 >Status: <span className={getStatusColor(state.currentMedia.detailsMedia.status)}>  {state.currentMedia.detailsMedia && state.currentMedia.detailsMedia.status ? (
                            <span className={getStatusColor(state.currentMedia.detailsMedia.status)}>
                                {state.currentMedia.detailsMedia.status}
                            </span>
                        ) : (
                            "Loading..."
                        )} </span> </h1>
                    </div>
                    {/* Number of episodes &  */}
                    <div>
                        <h1 className="font-bold text-2xl  md:text-lg border-l-2 border-[#ff9900] pl-2">Number of episodes & Seasons: <span className=" badge badge-ghost">  {state.currentMedia.detailsMedia?.number_of_episodes || "Loading..."} / S{state.currentMedia.detailsMedia?.number_of_seasons || ""}</span></h1>
                    </div>
                    <div>
                        <SeasonsDialog state={state} />
                    </div>
                </div>
                <div className=" flex flex-col gap-5 ">

                    {/* <div className=" flex justify-start items-center gap-2 ">
                        <h1 className="font-bold flex justify-start items-center gap-2 text-2xl border-l-2 border-oronge-500 pl-2 md:text-lg underline decoration-white">Homepage:</h1>
                        <Link href={`${state.currentMedia.detailsMedia.homepage || "Not available"}`} target="_blank">
                        <ImLink size={32} />
                        </Link>
                        
                        </div> */}
                </div>
            </div>
            )}


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
                                        updateCurrentMedia(tv)
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

                    {state.currentMedia.detailsMedia?.seasons?.length > 0 ?
                        state.currentMedia.detailsMedia.seasons.map((season) =>
                            <div key={season.id} className=" ">
                                <Link href={`/tv/list/${state.currentMedia.detailsMedia.id}/season/${season.season_number}`} className={buttonVariants({ variant: "outline" })}>
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
        <Image src={state.currentMedia.image || blurImage}
            alt={state.currentMedia.name || "image_tv_cover"}
            fill={true}
            loading="lazy"
            style={{ objectFit: "cover" }}
            draggable={false}
            className=" bg-center blur-lg "
            sizes="(max-width: 768px) 100vw"

        />
    )
}