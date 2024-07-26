

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
import { getDiscoverTv,urlImageTv } from "@/app/libs/DataFetchingTv"
import CarouselAuto from "./CarouselAuto"
import TvDetails from "../TvDetails/TvDetails"


export default async function DiscoverTv() {
    const data = await getDiscoverTv()
    const dataDiscover = data.results.slice()
    // console.log(dataDiscover);

    // console.log(tvDetail);
    return(
        <div className=" w-full flex justify-center mt-7">
            <CarouselAuto>
                <CarouselContent>
                    {dataDiscover.map((item)=>(
                            <CarouselItem key={item.id} className=" basis-1/1  w-full">
                                <div className=" relative overflow-hidden w-full h-[60vh] lg:h-[65vh]">
                                    <Image src={`${urlImageTv}${item.backdrop_path}`} 
                                    fill 
                                    priority 
                                    style={{objectFit:"cover",backgroundPosition:"center",opacity:"0.3"}}
                                    alt={item.name}
                                    className=""
                                    />
                                    
                                    
                                </div>
                                <CardContent 
                                className="  absolute h-fit  gap-6 w-full   top-8 ">
                                    {/* <div className=" relative overflow-hidden">
                                        <Image width={200} height={150} src={`${urlImageTv}${item.poster_path}`} 
                                        alt={item.name} className=" rounded-md pt-6 md:hidden"
                                        style={{height:"auto",width:"auto"}}
                                        />
                                    </div> */}
                                    <div className=" leading-7 text-stone-50 pt-8 scroll-m-20 text-4xl md:text-2xl font-extrabold tracking-tight lg:text-5xl">

                                        <h1 className="underline decoration-red-500/30">{item.name}</h1>
                                        <p className="leading-7 [&:not(:first-child)]:mt-6 text-base">
                                            {item.overview.length > 250 ? item.overview.slice(0, 200) + "..." : item.overview}
                                        </p>
                                        {/* <h3 className=" pt-3">
                                            {new Date(item.first_air_date).getFullYear()}
                                        </h3> */}
                                        <div>

                                            
                                        </div>
                                        <div className="  text-base">
                                            <TvDetails series_id={item.id} />
                                        </div>
                                    </div>
                                    
                                    
                                </CardContent>
                            </CarouselItem>

                    ))}
                </CarouselContent>

                <CarouselPrevious className=" hidden" />
                    <CarouselNext className=" hidden " />

            </CarouselAuto>

        </div>
    )
}