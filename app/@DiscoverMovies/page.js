import { getDiscoverMovies, urlImage } from "@/app/libs/DataFetching"

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
// import MoviesBG from "./MoviesBG"
import { FaRegStar } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { MdOutlineInsights } from "react-icons/md";
import Rating from "../Components/Rated/Rating"
import { TfiAlert } from "react-icons/tfi";
import { CiCircleCheck } from "react-icons/ci";

export default async function MoviesCard() {
    const data = await getDiscoverMovies()
    const dataDiscoverMovies = data.results
    // console.log(dataDiscoverMovies);
    return (

        <div className=" bg-gradient-to-b from-[#4f48ec] to-[black] w-full 2xl:text-2xl h-fit">
            <div className=" ">
                
            </div>
            <div className=" flex justify-center items-center pt-8">

                <Carousel className="w-full max-w-sm lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl" opts={{ loop: true,align:"start" }}>
                    <CarouselContent className="-ml-1">
                        {dataDiscoverMovies.map((movie, index) => (
                            <CarouselItem key={index} className="pl-1 md:basis-5/12 lg:basis-1/3 xl:basis-1/1  2xl:basis1/1">
                                <div className="p-1 z-10 2xl:grid 2xl:grid-cols-3 2xl:glass xl:grid xl:grid-cols-3 xl:glass xl:rounded-sm w-full">
                                        <div className=' relative'>
                                            <Image
                                                src={`${urlImage}/${movie.poster_path}`}
                                                alt={movie.title}
                                                width={300} height={200}
                                                priority
                                                className="rounded-md lg:w-[200px] lg:h-[200px] xl:w-[200px] xl:h-[150px] md:w-[150px] md:h-[150px] 2xl:w-[300px] 2xl:h-[300px]"
                                                style={{ height:"auto"}}
                                                draggable={false}
                                                
                                            />
                                        </div>
                                        <CardContent className="  p-3 xl:col-start-2 xl:col-end-4 2xl:col-start-2 2xl:col-end-4">

                                        <div className=" md:hidden lg:hidden mb-4 mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                                            <h5>{movie.release_date.replace(/-/g, '/')}</h5>
                                        </div>
                                        <div className="  md:hidden lg:hidden ">
                                        <p className=" font-semibold">
                                            {movie.overview}
                                        </p>
                                        </div>
                                            <div className="flex xl:w-72  justify-between items-center xl:pt-4">

                                                <Rating rating={Math.round( movie.vote_average /2)} className=""/>
                                                {/* <Link href={`/${movie.title.toLowerCase().replace(/ /g, "_").replace(/[^\w-]+/g, "").replace(/--+/g, "_").replace(/\./g, "")}`} className="flex gap-2 items-center font-semibold link-hover duration-200 hover:text-[#ffbf18] md:gap-1"><FaLink size={18} className=" md:size-3"/> More</Link> */}
                                                <p className=" flex justify-center items-center md:hidden lg:hidden gap-2 ">
                                            <MdOutlineInsights size={20}/>{movie.popularity.toFixed(1)}
                                        </p>
                                            </div>
                                            <div className="flex justify-between items-center mt-4 md:hidden lg:hidden">
                                        <strong className=" flex gap-2"> Adults : {movie.adult ? 'yes':'no' } </strong>

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
    )
}