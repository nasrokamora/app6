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
import BlurFade from "@/components/ui/blur-fade"
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"




export default async function MoviesCard({dataDiscoverMovies  }) {
//     const keyStr =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  
//   const triplet = (e1, e2, e3) =>
//     keyStr.charAt(e1 >> 2) +
//     keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
//     keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
//     keyStr.charAt(e3 & 63);
  
//   const rgbDataURL = (r, g, b) =>
//     `data:image/gif;base64,R0lGODlhAQABAPAA${
//       triplet(0, r, g) + triplet(b, 255, 255)
//     }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;
    return (

        <div className="  w-full 2xl:text-2xl h-fit xl:h-[21rem]  ">
            <div className="">
            </div>
            <div className="flex items-center justify-center pt-2 md:mt-10">
                <Carousel className="w-full max-w-5xl md:max-w-md text-black  2xl:max-w-full" opts={{ loop: true, align: "start" }}>
                    <CarouselContent className="-ml-1">
                        {dataDiscoverMovies && dataDiscoverMovies.length > 0 ? (
                        dataDiscoverMovies.map((movie, index) => (
                            <CarouselItem key={index} className="pl-1 md:basis-1/3 lg:basis-1/5 xl:basis-1/5 basis-1/6 ">
                                <BlurFade delay={0.10} inView>

                                <div className="flex flex-col w-full p-1 hover:scale-90 hover:duration-500">
                                    <Link varient="link" className="" href={`/Movies/List/${movie.id}`}>
                                        <div className='relative  hover:grayscale  hover:duration-700 hover:translate-x-6 '>
                                            <Image
                                                src={movie.poster_path ?
                                                    `${urlImage}/${movie.poster_path}`
                                                    :
                                                    no_image
                                                }
                                                alt="image_movies"
                                                width={300} height={200}
                                                priority={index < 6 }
                                                className=" rounded-md  "
                                                style={{ width: "auto" }}
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
                                                </BlurFade>

                            </CarouselItem>
                        ))
                        ):(
                            <Alert variant="destructive" className=" animate-pulse flex justify-center items-center flex-col text-3xl font-bold">
                            <AlertCircle className="w-8 h-8" />
                            <AlertTitle className="text-3xl">Error</AlertTitle>
                            <AlertDescription className=" text-2xl">
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