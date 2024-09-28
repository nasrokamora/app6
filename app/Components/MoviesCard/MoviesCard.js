import { urlImage } from "@/app/libs/DataFetching"
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import Image from "next/image"
import Link from "next/link"
import no_image from '../../../public/image/no_image4.webp'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Rating from "../Rated/Rating"
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"




export default async function MoviesCard({dataDiscoverMovies  }) {

    return (

        <div className="  w-full 2xl:text-2xl h-fit xl:h-[21rem]  ">
            <div className="">
            </div>
            <div className="flex items-center justify-center pt-2 md:mt-10">
                <Carousel className="w-full max-w-sm text-black lg:max-w-2xl xl:max-w-5xl 2xl:max-w-6xl" opts={{ loop: true, align: "start" }}>
                    <CarouselContent className="-ml-1">
                        {dataDiscoverMovies && dataDiscoverMovies.length > 0 ? (
                        dataDiscoverMovies.map((movie, index) => (
                            <CarouselItem key={index} className="pl-1 md:basis-1/3 lg:basis-1/3 xl:basis-1/6 basis-1/6 2xl:basis-1/7">
                                <div className="flex flex-col w-full p-1 hover:scale-90 hover:duration-500">
                                    <Link varient="link" className="" href={`/Movies/List/${movie.id}`}>
                                        <div className='relative '>
                                            <Image
                                                src={movie.poster_path ?
                                                    `${urlImage}/${movie.poster_path}`
                                                :
                                                no_image
                                                }
                                                alt="image_movies"
                                                width={300} height={200}
                                                priority
                                                className=" hover:grayscale  hover:duration-700 hover:translate-x-6  rounded-md lg:w-[200px] lg:h-[200px] xl:w-[200px] xl:h-[150px] md:w-[150px] md:h-[150px] 2xl:w-[300px] "
                                                style={{ height: "auto" }}
                                                draggable={false}
                                                loading="eager"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between xl:pt-4 xl:text-xl">
                                            <Rating rating={Math.round(movie.vote_average / 2)} className="" />
                                            <p className="text-[#ffbf18]">{new Date(movie.release_date).getFullYear()}</p>
                                        </div>


                                    </Link>
                                </div>

                            </CarouselItem>
                        ))
                        ):(
                            <Alert variant="destructive">
                            <AlertCircle className="w-4 h-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                              Something went wrong.
                            </AlertDescription>
                          </Alert>
                        )
}
                    </CarouselContent>
                    <div className=" absolute top-[-2rem] left-[93%] md:left-[85%] text-white ">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>


        </div>
    )
}