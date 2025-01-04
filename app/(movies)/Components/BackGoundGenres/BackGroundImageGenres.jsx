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
    const [backGoundImage, setBackGoundImage] = useState({
        image: dataResult[0]?.backdrop_path ? `${urlImageTv}/${dataResult[0].backdrop_path}` : "",
        title: dataResult[0]?.original_title
    })
    const itemRef = useRef([])
    const [loading, setLoading] = useState(false)

    
    const handleChangeBackGroundImage = (movie) => {
        setLoading(true)
        const newImage = movie.backdrop_path ? `${urlImageTv}/${movie.backdrop_path}` : ""
        const img = new window.Image()
        img.src = newImage
        img.onload = () => {
            setBackGoundImage({
                image: newImage,
                title: movie.original_title ? movie.original_title : movie.title,
            })
            setLoading(false)
        }
    }



    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const movieIndex = entry.target.getAttribute('data-index')
                    const movie = dataResult[movieIndex]
                    handleChangeBackGroundImage(movie)
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
        return () => {
            observer.disconnect()
        }

    }, [dataResult])

    return (
        <div className={`w-full  h-screen flex justify-center md:h-screen  overflow-hidden relative `}
        // style={{
        //     backgroundImage: loading ? undefined : `url(${backGoundImage.image})`,
        //     backgroundSize: "cover",
        //     backgroundPosition: "center",
        //     transition: "background-image 0.5s ease",
        // }}
        >

            <Image src={backGoundImage.image}
                // loader={()=> loading ? undefined : `${backGoundImage.image}`}
                alt={backGoundImage.title}
                fill={true}
                loading="lazy"
                style={{ objectFit: "cover", }}
                draggable={false}
                className="blur-right bg-center bg-no-repeat "
                sizes="(max-width: 768px) 100vw, 100vw"

            />

            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                </div>
            )}

            <div className="mb-4 flex justify-center items-end">
                <Carousel className="w-full md:max-w-md  xl:max-w-6xl 2xl:max-w-full lg:max-w-4xl" opts={{ align: "start", loop: true }}>
                    <CarouselContent>
                        {dataResult.map((movie, index) => (
                            <CarouselItem className="basis-1/7 xl:basis-1/6 md:basis-1/3 lg:basis-1/5 2xl:basis-1/6" key={movie.id}
                                data-index={index}
                                ref={(el) => (itemRef.current[index] = el)}
                            >
                                <div
                                    className="cursor-pointer"
                                    onClick={() =>
                                        handleChangeBackGroundImage(movie)
                                    }
                                    onMouseEnter={() => {
                                        if (window.innerWidth > 1024) {
                                            handleChangeBackGroundImage(movie)
                                        }
                                    }}>
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
            </div>
        </div>
    )
}