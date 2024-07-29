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
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { MdMovieFilter } from "react-icons/md";

export function SeasonDetailsDialog({ season }) {

    return (
        <div>

        </div>
    )
}




export default function DetailsSeasonTv({ season }) {
    const sortSeason = season.sort((a, b) => a.season_number - b.season_number)
    // console.log(sortSeason)
    return (
        <div>
            <div className=" flex justify-center mt-5">
                <Carousel className=" w-full max-w-4xl md:max-w-sm lg:max-w-2xl" opts={{ align: "start", loop: true }}>
                    <CarouselContent className=" -ml-1">
                        {
                            sortSeason.map((item) => (
                                <CarouselItem key={item.id} className="basis-1/7 md:basis-1/1  xl:basis-1/2">
                                    <div className=" w-full ">
                                        <Card className=" md:h-auto w-full border-blue-600 shadow-md shadow-blue-800">
                                            <CardContent className=" pt-2">
                                                <div className=" flex justify-center items-center flex-col ">
                                                    <h1 className=" text-xl font-bold underline decoration-blue-600">{item.name}</h1>
                                                    <h3 className="font-bold text-[#52525b]">{item.air_date ? item.air_date : "Undefined"}</h3>
                                                </div>
                                                <div className=" flex justify-start gap-2 md:flex-col lg:flex-col  pt-2">

                                                    <div className=" relative overflow-hidden w-fit lg:order-2">
                                                        <Image src={`${urlImageTv}${item.poster_path}`}
                                                            width={150} height={150}
                                                            priority
                                                            className=" rounded-md"
                                                            style={{ hieght: 'auto' }}
                                                            alt={item.name}
                                                        />
                                                    </div>
                                                    <div className=" lg:order-1 w-full">

                                                        <Accordion type="single" collapsible className=" w-full">
                                                            <AccordionItem value={item.name}>
                                                                <AccordionTrigger>Overview</AccordionTrigger>
                                                                <AccordionContent>
                                                                    {item.overview}
                                                                </AccordionContent>
                                                            </AccordionItem>
                                                        </Accordion>

                                                <div className=" flex justify-start gap-2 pt-2">
                                                    <strong className="text-[#52525b]">Episodes : </strong>
                                                    <h1 className=" font-bold">{item.episode_count}</h1>
                                                </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                    <CarouselPrevious className=" md:hidden" />
                    <CarouselNext className=" md:hidden" />
                </Carousel>
            </div>
        </div>
    )
}