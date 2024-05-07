

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

async function fetchDataPopular() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?page=50&api_key=${process.env.NEXT_API_KEY}`,{
        headers: {
            Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`
        }
        })
        if (!response.ok) {
            throw new Error("failed to fetch data")
        }
        return response.json()
}



export default async function MoviePopular() {
    const data = await fetchDataPopular()
    const dataPopular = data.results
    console.log(dataPopular)




    return (
        <Suspense fallback={<LoadingGenreCarousel />}>
        <div className=" mt-8 flex justify-center w-full">
        <Carousel opts={{
            align: "start",
            loop: true,
        }} className=" md:w-[60%] xl:w-[80%]   w-[80%]" >
            <CarouselContent className="   ">
                {dataPopular.map((movie,index) => (

                    <CarouselItem key={index} className="  basis-1/7 lg:basis-1/5 md:basis-1/1  ">
                        <div className="">

                            <Image
                                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                alt={movie.title}
                                width={100} height={100}
                                className=" md:w-[150px] h-[170px] lg:w-[200px] lg:h-[180px] xl:w-[120px] xl:h-[150px] 2xl:w-[150px] 2xl:h-[150px]  "
                                priority={true}
                                
                            />
                            <p className=" font-bold flex justify-start  pt-2 mb-1">{movie.title.length > 14 ? movie.title.slice(0, 14) + "..." : movie.title}
                            </p>
                            <div className=" flex justify-between items-center w-full">
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

                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </div>
    </Suspense> 
    )
}