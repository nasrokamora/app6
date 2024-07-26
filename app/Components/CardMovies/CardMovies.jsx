import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
// import { urlImage } from "@/app/libs/Action"
import MotionDiv from "./MotionDiv"


export default function CardMovies({movie, index,id}) {
console.log(movie)
    // const varients = {
    //     hidden:{
    //         opacity:0,
    //     },
    //     visible:{
    //         opacity:1,
    //     }
    // }

    return (    
        <MotionDiv index={index}
        >
            <div >
            <Carousel className="w-full max-w-xs">
                <CarouselContent>
                    <CarouselItem className=" md:basis-1/2" key={movie.id}>
                        <div>
                            <Card>
                                    <Image
                                        src={`${"https://image.tmdb.org/t/p/original"}${movie.poster_path}`}
                                        alt={movie.original_title}
                                        width={150} height={150}
                                        priority
                                        sizes="(min-width: 380px) 300px, calc(53.33vw + 108px)"
                                        className="rounded-md "
                                    />
                                <CardContent>
                                    <div className="flex justify-between">
                                    <h2 className="text-lg font-bold">{movie.title}</h2>
                                    <h6 className="text-lg font-bold">{movie.release_date}</h6>
                                    <h6 className="text-lg font-bold">{movie.vote_average}</h6>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
            </div>
        </MotionDiv>
    )
}