import {urlImage } from "@/app/libs/DataFetching"

import Image from "next/image"
import Link from "next/link"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import MoviesBG from "./MoviesBG"
import { FaRegStar } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { MdOutlineInsights } from "react-icons/md";
import Rating from "../Rated/Rating"
import { IoTrendingUpOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
export default  function MoviesCard({dataDiscoverMovies}) {
    // const data = await getDiscoverMovies()
    // const dataDiscoverMovies = data.results
    // console.log(dataDiscoverMovies);
    return (

        <div className="  w-full 2xl:text-2xl h-fit xl:h-[21rem]  ">
            <div className=" ">

            </div>
            <div className=" flex justify-center items-center pt-2">

                <Carousel className="w-full max-w-sm lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl text-black" opts={{ loop: true, align: "start" }}>
                    <CarouselContent className="-ml-1">
                        {dataDiscoverMovies.map((movie, index) => (
                            <CarouselItem key={index} className="pl-1 md:basis-1/3 lg:basis-1/3 xl:basis-1/5   basis-1/6 2xl:basis-1/7">
                                <div className="  p-1 w-full  flex flex-col hover:scale-90 hover:duration-500 ">
                                <Link varient="link" className="" href={`/Movies/List/${movie.id}`}> 
                                    <div className=' relative'>
                                        <Image
                                            src={`${urlImage}/${movie.poster_path}`}
                                            alt={movie.title}
                                            width={300} height={200}
                                            priority
                                            className="rounded-md lg:w-[200px] lg:h-[200px] xl:w-[200px] xl:h-[150px] md:w-[150px] md:h-[150px] 2xl:w-[300px] "
                                            style={{ height: "auto" }}
                                            draggable={false}
                                            />
                                    </div>
                                        <div className="flex   justify-between items-center xl:pt-4 xl:text-xl">
                                            <Rating rating={Math.round(movie.vote_average / 2)} className="" />
                                            <p className="text-[#ffbf18]">{new Date(movie.release_date).getFullYear()}</p>
                                        </div>


                                </Link>
                                </div>

                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="md:hidden text-white" />
                    <CarouselNext className="md:hidden text-white" />
                </Carousel>
            </div>


        </div>
    )
}