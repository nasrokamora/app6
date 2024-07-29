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






export default function DetailsSeasonTv({ season }) {
    const sortSeason = season.sort((a, b) => a.season_number - b.season_number)
    return (
        <div>
        <div className=" flex justify-center mt-5">
            <Carousel className=" w-full max-w-4xl" opts={{ align: "start", loop: true }}>
                <CarouselContent className=" -ml-1">
                    {
                        sortSeason.map((item) => (
                            <CarouselItem key={item.id} className="basis-1/5">
                                <div className=" w-full ">
                                    <Card className="">
                                        <CardContent className=" pt-2">
                                            <h1 className=" text-xl font-bold">{item.name}</h1>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
        </div>
    )
}