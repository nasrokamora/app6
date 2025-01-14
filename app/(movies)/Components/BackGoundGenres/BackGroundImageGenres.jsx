"use client"

import { useEffect, useRef } from "react"

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
import { useContextMedia } from "@/app/Context/ContextMedia"


export default function BackGroundImageGenres({ dataResult }) {

    const { state, updateCurrentMedia } = useContextMedia()
    const itemRef = useRef([])

    // handle background image
    useEffect(() => {
        //observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const movieIndex = entry.target.getAttribute('data-index')
                    const movie = dataResult[movieIndex]
                    updateCurrentMedia(movie)
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

    }, [dataResult, updateCurrentMedia])

    return (
        <div className={`w-full  h-screen flex justify-center md:h-screen  overflow-hidden relative `}>

            <Image src={state.currentMedia.image || blurImage}
                alt={state.currentMedia.title || "image_cover_movie"}
                fill={true}
                loading="lazy"
                style={{ objectFit: "cover" }}
                draggable={false}
                className=" bg-center"
                quality={100}
                sizes="(max-width: 768px) 100vw"

            />

            {state && state.currentMedia &&
            state.currentMedia.isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
                    <div className="w-12 h-12 border-4 border-t-transparent border-[#c8081e] rounded-full animate-spin"></div>
                </div>
            )}

            <div className="absolute bottom-10 left-10 top-28 inset-0 text-white">
                <div>

                    <h1 className="text-4xl font-bold">{state.currentMedia.title}</h1>
                    <h2>Release Date: {state.currentMedia.releaseDate}</h2>
                    <p>Popularity: {state.currentMedia.popularity}</p>
                    <p>Vote Average: {state.currentMedia.voteAverage}</p>
                </div>
                <div>
                    <h1> {state.currentMedia.detailsMovie.budget || "Unknown"} </h1>
                </div>
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
                                        updateCurrentMedia(movie)
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