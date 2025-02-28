
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
import { urlImage } from "@/app/libs/UrlImage"
import ImagePosterPath from "@/app/libs/ImagePosterPath"


export default function MoviesCard({ dataDiscoverMovies }) {
    return (
        <>
            <div className="  w-full 2xl:text-2xl h-fit xl:h-[21rem]  ">
                <div className="flex items-center justify-center pt-2 md:mt-10">
                    <Carousel className="w-full max-w-5xl md:max-w-sm text-white xl:max-w-6xl  2xl:max-w-full" opts={{ loop: true, align: "center" }}>
                        <CarouselContent className="-ml-1">
                            {dataDiscoverMovies && dataDiscoverMovies.length > 0 ? (
                                dataDiscoverMovies.map((movie) => (
                                    <CarouselItem key={movie.id} className="pl-1 md:basis-1/2 lg:basis-1/5 xl:basis-1/6 basis-1/6 ">
                                        <div className="flex flex-col w-full p-1 hover:scale-90 duration-1000">
                                            <Link varient="link" className="hover:grayscale  hover:duration-700 hover:translate-x-6" href={`/movies/list/${movie.id}`}>
                                                <div className='relative rounded-md  '>
                                                    {movie.poster_path.length > 0 ?(

                                                            <ImagePosterPath
                                                            width={300}
                                                            height={200}
                                                            index={movie.id}
                                                            tmdbPath={movie.poster_path}
                                                            className="rounded-md"
                                                            quality={75}
                                                            unoptimized
                                                            />    
                                                            // <Image
                                                        //     src={`${urlImage}/${movie.poster_path}`}
                                                        //     alt={movie.title ? movie.title : movie.original_title || "Unknown"}
                                                        //     width={300} height={200}
                                                        //     priority
                                                        //     style={{ width: "auto", borderRadius: "4px" }}
                                                        //     draggable={false}
                                                        //     loading="eager"
                                                        //     />
                                                    ):(
                                                        <Image
                                                            src={no_image}
                                                            alt={movie.title ? movie.title : movie.original_title || "Unknown"}
                                                            width={300} height={200}
                                                            priority
                                                            style={{ width: "auto", borderRadius: "4px" }}
                                                            draggable={false}
                                                            loading="eager"
                                                        />
                                                    )}


                                                </div>
                                                <div className="flex items-center justify-between xl:pt-4 xl:text-xl">
                                                    <Rating rating={Math.round(movie.vote_average / 2)} className="" />
                                                    <p className="text-[#ffbf18]">{new Date(movie.release_date).getFullYear()}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </CarouselItem>
                                ))
                            ) : (
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
                        <div className=" absolute top-[-2rem] left-[93%] md:left-[80%] text-white ">
                            <CarouselPrevious />
                            <CarouselNext />
                        </div>
                    </Carousel>
                </div>
            </div>
        </>
    )
}