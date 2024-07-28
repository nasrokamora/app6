import { getDetailsSeasonTv, urlImageTv } from "@/app/libs/DataFetchingTv"
import Image from "next/image"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"



async function SeasonTv({ id, season_number }) {
    const dataSeason = await getDetailsSeasonTv(id, season_number)
    // console.log(dataSeason)

    return (
        <div>
            <Carousel className=" w-full max-w-sm" opts={{align:"start", loop:true}}>
                <CarouselContent className=" -ml-1">
                    <CarouselItem>...</CarouselItem>

                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}


export default async function DetailsSeasonTv({ id, season }) {

    return (
        <div>
            {season.map((item) => (
                <SeasonTv id={id} season_number={item.season_number} key={item.id} />
            ))}
        </div>
    )
}