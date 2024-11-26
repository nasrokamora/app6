import { getDetailsSeasonTv, urlImageTv } from "@/app/libs/DataFetchingTv"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Link from "next/link"
import BlurFade from "@/components/ui/blur-fade"





export default function DetailsSeasonTv({ season, id }) {
    const sortSeason = season.sort((a, b) => a.season_number - b.season_number)
    return (
        <div className="w-full">
            <div className="  mt-5 flex justify-center items-center w-full bg-gradient-to-r from-[#0d61e7] via-[#000000] to-[#0d61e7] bg-[length:200%_auto]  animate-gradient rounded-md">

                <ScrollArea className="whitespace-nowrap rounded-md xl:max-w-5xl w-full  ">
                    <div className="w-max flex space-x-4 p-4 backdrop-blur-md  ">

                        {sortSeason.length > 0 ? (

                            sortSeason.map((item, index) => (

                                <div className=" w-full " key={item.id}>
                                    <BlurFade key={item.id} delay={0.25 + index * 0.05} inView>

                                    <Card className=" md:h-auto w-full border-blue-600 shadow-md shadow-blue-800  bg-transparent">
                                        <CardContent className=" pt-2 ">

                                            <div className=" relative lg:order-2 w-full ">
                                                <Image src={`${urlImageTv}${item.poster_path ? item.poster_path : "no-image.png"}`}
                                                    width={100} height={100}
                                                    priority
                                                    className=" rounded-md "
                                                    style={{ width: 'auto' }}
                                                    alt={item.name}
                                                    draggable="false"
                                                />
                                            </div>

                                            <div className=" flex justify-center items-center flex-col ">
                                                <h1 className=" text-xl font-bold underline decoration-blue-600">{item.name}</h1>
                                                <h3 className="font-bold text-[#52525b]">{item.air_date ? item.air_date : "Undefined"}</h3>
                                            </div>


                                            <div className=" flex justify-start gap-2 md:flex-col lg:flex-col  pt-2">
                                                {/* <div className="">
                                                        <h1 className=" font-bold text-[#52525b] text-xl">Overview :</h1>
                                                        <p>{item.overview ? item.overview : "Undefined"}</p>
                                                        </div> */}
                                                <div>
                                                    <Link href={`/Tv/List/${id}/season/${item.season_number}`}
                                                        className=" border p-1 rounded-md bg-black hover:bg-transparent hover:shadow-sm active:scale-105 hover:shadow-red-700 hover:border-l-red-700 hover:duration-500 hover:border-r-red-800 after:border-l-red-600 hover:red-b-red-800 hover:border-red-700 font-semibold"
                                                        >
                                                        See More
                                                    </Link>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </BlurFade>
                                </div>

                            ))
                        ) : (
                             <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    No seasons available for this series.
                                </AlertDescription>
                            </Alert>
                        )
                        }
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>


            </div>
        </div>
    )
}