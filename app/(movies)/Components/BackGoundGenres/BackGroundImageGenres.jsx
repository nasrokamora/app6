"use client"

import { useEffect, useRef, useState } from "react"

import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { urlImageTv } from "@/app/libs/DataFetchingTv"


export default function BackGroundImageGenres({ dataResult }) {
    const [backGoundImage, setBackGoundImage] = useState(
        dataResult[0]?.backdrop_path ? `${urlImageTv}${dataResult[0].backdrop_path}` : ""
    )
    const itemRef = useRef([])


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const movieIndex = entry.target.getAttribute('data-index')
                    const movie = dataResult[movieIndex]
                    setBackGoundImage(movie.backdrop_path ? `${urlImageTv}${movie.backdrop_path}` : "")
                }
            })
        },
            {
                root: null,
                threshold: 0.5
            }

        )
        itemRef.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

    }, [dataResult])

    return (
        <div className="w-full  h-screen overflow-hidden md:overflow-auto flex justify-center md:h-screen " style={{
            backgroundImage: `url(${backGoundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 0.5s ease",
        }}>
            <div className="mb-4 flex justify-center items-end">
                <Carousel className="w-full md:max-w-md  xl:max-w-6xl 2xl:max-w-full lg:max-w-4xl" opts={{ align: "start", loop: true }}>
                    <CarouselContent>
                        {dataResult.map((movie,index) => (
                            <CarouselItem className="basis-1/7 xl:basis-1/6 md:basis-1/3 lg:basis-1/5 2xl:basis-1/6" key={movie.id}
                                data-index={index}
                                ref={(el) => (itemRef.current[index] = el)}
                            >
                                <div
                                    className="cursor-pointer"
                                    onClick={() =>
                                        setBackGoundImage(
                                            movie.backdrop_path
                                                ? `${urlImageTv}${movie.backdrop_path}`
                                                : ""
                                        )
                                    }
                                    onMouseEnter={() =>{
                                        if(window.innerWidth > 1024){
                                            setBackGoundImage(`${urlImageTv}${movie.backdrop_path}`)
                                        }}}>
                                    <Image
                                        src={`${urlImageTv}${movie.poster_path}`}
                                        alt="movie poster"
                                        width={150}
                                        height={150}
                                        priority={true}
                                        loading="eager"
                                        style={{ width: "auto",borderRadius:'2px' }}
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