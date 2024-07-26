import { getMoviesPopular, getMoviesTopRated,urlImage } from "@/app/libs/ActionMovies"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import { FaRegStar } from "react-icons/fa";
// import { FaLink } from "react-icons/fa";



export default async function LinkMovies() {
    const dataPopular = await getMoviesPopular()
    const dataRated = await getMoviesTopRated()

    const [popular, topRated] = await Promise.all([dataPopular, dataRated])
    const dataPopularMovies = popular.results.slice(0,3)
    const dataTopRatedMovies = topRated.results.slice(0,3)
    return (
        <div className=" w-full">

                <div className="title text-4xl text-[#4f48ec] font-bold md:flex md:justify-center md:items-center md:mt-3">
                    <h1>Popular</h1>
                </div>

            <div className=" flex justify-center items-center mt-7">
                <Carousel className=" z-10 w-full max-w-sm lg:max-w-2xl xl:max-w-4xl" opts={{ loop: true }}>
                    <CarouselContent className="-ml-1">
                        {dataPopularMovies.map((popular, index) => (
                            <CarouselItem key={index} className="pl-1 md:basis-6/12 lg:basis-1/3 xl:basis-1/6">
                                <div className="p-1">

                                    <div className=' relative'>
                                        <Image
                                            src={`${urlImage}/${popular.poster_path}`}
                                            alt={popular.title}
                                            width={200} height={150}
                                            priority
                                            className="rounded-md "
                                            draggable={false}

                                        />
                                    </div>
                                    <CardContent className=" p-3">
                                        <div className="flex  justify-between items-center">

                                            <h5 className=" flex gap-1 items-center font-semibold text-lg"><FaRegStar size={18} className=" text-[#ffbf18]" /> {popular.vote_average.toFixed(1)}</h5>
                                            {/* <Link href={`/${popular.id}`} className="flex gap-1 items-center font-semibold link-hover duration-200 hover:text-[#ffbf18]"><FaLink size={18} /> More</Link> */}
                                        </div>
                                    </CardContent>

                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="md:hidden" />
                    <CarouselNext className="md:hidden" />
                </Carousel>
                        </div>
                {/* fetch data top rated */}

                <div className=" w-full mt-12">
                <div className="title text-4xl text-[#4f48ec] font-bold md:flex md:justify-center md:items-center md:mt-3">
                        <h1>Top Rated</h1>
                    </div>
                    <div className=" flex justify-center items-center mt-7">

                        <Carousel className="w-full max-w-sm lg:max-w-2xl xl:max-w-4xl" opts={{ loop: true }}>
                            <CarouselContent className="-ml-1">
                                {dataTopRatedMovies.map((rated, index) => (
                                    <CarouselItem key={index} className="pl-1 md:basis-6/12 lg:basis-1/3 xl:basis-1/6 ">
                                        <div className="p-1">

                                            <div className=' relative'>
                                                <Image
                                                    src={`${urlImage}/${rated.poster_path}`}
                                                    alt={rated.title}
                                                    width={200} height={150}
                                                    priority
                                                    className="rounded-md "
                                                    draggable={false}

                                                />
                                            </div>
                                            <CardContent className=" p-3">
                                                <div className="flex  justify-between items-center">

                                                    <h5 className=" flex gap-1 items-center font-semibold text-lg"><FaRegStar size={18} className=" text-[#ffbf18]" /> {rated.vote_average.toFixed(1)}</h5>
                                                    {/* <Link href={`/${rated.id}`} className="flex gap-1 items-center font-semibold link-hover duration-200 hover:text-[#ffbf18]"><FaLink size={18} /> More</Link> */}
                                                </div>
                                            </CardContent>

                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="md:hidden" />
                            <CarouselNext className="md:hidden" />
                        </Carousel>
                    </div>


                </div>


        </div>
    )
}