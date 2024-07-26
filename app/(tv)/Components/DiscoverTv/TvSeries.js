import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import Link from "next/link"
import Image from "next/image"
import { getDiscoverTv, urlImageTv } from "@/app/libs/DataFetchingTv"
import { FaRegStar } from "react-icons/fa6"




export default function TvSeries({dataTv}) {

    
    // const dataTv = data.results
    // console.log(dataTv)
    return (
        <div className=" mt-8 flex justify-center w-full bg-gradient-to-br from-[black] to-[#318ffa] p-6 ">
        <Carousel opts={{
            align: "start",
            loop: true,
        }} className="md:max-w-sm xl:max-w-6xl   w-[80%] 2xl:max-w-6xl" >
            <CarouselContent className="   ">
                {dataTv.map((tv,index) => (

                    <CarouselItem key={index} className="  basis-1/4 lg:basis-1/3 md:basis-1/2 2xl:basis-1/7">
                        <div className="lg:hover:scale-90 lg:hover:duration-500 xl:hover:scale-90 xl:hover:duration-500  2xl:hover:scale-90 2xl:hover:duration-500 relative overflow-hidden">

                        <Link className=" hover:scale-105" href={`/Tv/List/${tv.id}`}>
                            <div className="aspect-square">

                            <Image
                                src={`https://image.tmdb.org/t/p/original${tv.poster_path}`}
                                alt={tv.original_name}
                                width={180} height={180}
                                className="  md:w-[200px]  lg:w-[200px] lg:h-[200px] xl:w-[350px] xl:h-[250px] 2xl:w-[250px] 2xl:h-[150px]  " style={{height:"auto"}}
                                priority={true}
                                
                                />
                                </div>
                            <p className=" font-bold flex justify-start  pt-2 mb-1">{tv.original_name.length > 14 ? tv.original_name.slice(0, 14) + "..." : tv.original_name}
                            </p>
                            <div className="  flex justify-between items-center w-full font-semibold">
                                <p className=" fonb flex justify-between items-center w-full">
                                    {new Date(tv.first_air_date).getFullYear()}
                                </p>
                                <div className=" ">
                                    <div className=" space-x-1 flex justify-between items-center">
                                    <FaRegStar className="text-[#FFC300]" /> 
                                    <span className="">
                                    {tv.vote_average.toFixed(1)}
                                        </span>
                                    </div>
                                </div>

                            </div>

                        </Link>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </div>

    )
}