import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import PluginsCarousel from "./Bg"
import { getImageMoviesId } from "@/app/libs/DataFetching"


export default async function DetailImageMovies({ id }) {
    const data = await getImageMoviesId(id)
    const dataImage = data.backdrops
    return (
        <div className=' flex justify-center relative '>
            <Carousel opts={{
                align: "start",
                loop: true,
            }} className=" md:w-[85%] xl:max-w-4xl 2xl:max-w-6xl lg:max-w-xl" >
                <CarouselContent className=" -ml-1">
                    {dataImage.map((item, index) => (

                        <CarouselItem key={index} className="  basis-1/7 lg:basis-1/3 md:basis-1/2 2xl:basis-1/5">

                                    <div key={index} className=" overflow-hidden relative">
                                        <Image src={`https://image.tmdb.org/t/p/original${item.file_path}`}
                                            alt={item.file_path}
                                            width={200} height={200} style={{width:"auto"}} priority
                                            className=" rounded-md  2xl:h-[200px] md:h-|150px]" />
                                    </div>
      
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="md:hidden" />
                <CarouselNext  className="md:hidden"/>
            </Carousel>
        </div>
    )
}