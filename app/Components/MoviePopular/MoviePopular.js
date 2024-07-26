

// import { Suspense } from "react"
import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { FaRegStar } from "react-icons/fa";
import { Suspense } from "react";
import LoadingGenreCarousel from "../LoadingUi/LoadingGenreCarousel";
import getPopularMovies from "@/app/libs/DataFetching";
import Link from "next/link";


export default  function MoviePopular({dataPopular}) {
    // const data = await getPopularMovies()
    // const dataPopular = data.results
    // console.log(dataPopular)




    return (
        
        <div className=" mt-8 flex justify-center w-full bg-gradient-to-br from-[black] to-[red] p-6 ">
        <Carousel opts={{
            align: "start",
            loop: true,
        }} className="md:max-w-sm xl:max-w-4xl   w-[80%] 2xl:max-w-6xl" >
            <CarouselContent className=" -ml-1">
                {dataPopular.map((movie,index) => (

                    <CarouselItem key={index} className="  basis-1/5 lg:basis-1/4 md:basis-1/2 2xl:basis-1/7">
                        <Link className=" hover:scale-105" href={`/Movies/${movie.original_title.toLowerCase().replace(/ /g, "_").replace(/[^\w-]+/g, "").replace(/--+/g, "_").replace(/\./g, "")}`}>

                            <Image
                                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                alt={movie.title}
                                width={180} height={180}
                                className=" rounded-md  md:w-[200px]  lg:w-[200px] lg:h-[250px] xl:w-[200px] xl:h-[150px] 2xl:w-[250px] 2xl:h-[150px]  " style={{height:"auto"}}
                                priority={true}
                                
                            />
                            <p className=" font-bold flex justify-start  pt-2 mb-1 2xl:text-2xl ">{movie.title.length > 14 ? movie.title.slice(0, 14) + "..." : movie.title}
                            </p>
                            <div className=" flex justify-between items-center w-full font-semibold 2xl:text-2xl 2xl:font-bold">
                                <p className=" fonb flex justify-between items-center w-full">
                                    {new Date(movie.release_date).getFullYear()}
                                </p>
                                <div className=" ">
                                    <div className=" space-x-1 flex justify-between items-center">
                                    <FaRegStar className="text-[#FFC300]" /> 
                                    <span className="">
                                    {movie.vote_average.toFixed(1)}
                                        </span>
                                    </div>
                                </div>

                            </div>

                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </div>

    )
}