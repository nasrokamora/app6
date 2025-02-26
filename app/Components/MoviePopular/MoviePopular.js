
import { AlertCircle } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { FaRegStar } from "react-icons/fa";
import Link from "next/link";
import BlurFade from "@/components/ui/blur-fade";
import { urlImage } from "@/app/libs/UrlImage";
import AnimationAllComponents from "@/app/Animations/FadeIn/AnimationAllComponents";
import ImagePosterPath from "@/app/libs/ImagePosterPath";


export default function MoviePopular({ dataPopular }) {

    return (


        <div className=" mt-10 flex justify-center w-full bg-gradient-to-br from-[black] to-[red] p-6 ">
            <Carousel opts={{
                align: "start",
                loop: true,
            }} className="w-full max-w-5xl md:max-w-lg   2xl:max-w-full" >
                <CarouselContent className=" -ml-1">
                    {dataPopular && dataPopular.results ? (
                        dataPopular.results.map((movie, idx) => (

                            <CarouselItem key={movie.id} className="  basis-1/5 lg:basis-1/4 md:basis-1/2 2xl:basis-1/7">


                                    <div className="hover:scale-105  duration-500 w-full ">

                                        <Link className=" " href={`/movies/list/${movie.id}`}>
                                            <ImagePosterPath
                                            index={idx} 
                                            tmdbPath={movie.poster_path} 
                                            width={300} 
                                            height={200} 
                                            className=" hover:saturate-50 hover:duration-500 rounded-md   " 
                                            />
                                            {/* <Image
                                                src={`${urlImage}${movie.poster_path}`}
                                                alt={movie.title}
                                                width={300} height={200}
                                                className=" hover:saturate-50 hover:duration-500 rounded-md   "
                                                style={{ width: "auto" }}
                                                priority
                                          

                                            /> */}
                                            <p className=" font-bold flex justify-start  pt-2 mb-1 2xl:text-2xl ">{movie.title.length > 14 ? movie.title.slice(0, 14) + "..." : movie.title}
                                            </p>
                                            <div className=" flex justify-between items-center w-full font-semibold 2xl:text-2xl 2xl:font-bold">
                                                <p className=" fonb flex justify-between items-center w-full">
                                                    {new Date(movie.release_date).getFullYear()}
                                                </p>
                                                <div className=" ">
                                                    <div className=" space-x-1 flex justify-between items-center">
                                                        <FaRegStar className="text-[#FFC300]" />
                                                        <span className="">
                                                            {movie.vote_average.toFixed(1)}
                                                        </span>
                                                    </div>
                                                </div>

                                            </div>

                                        </Link>
                                    </div>

                            </CarouselItem>
                        ))
                    ) : (
                        <Alert variant="destructive" className="bg-gradient-to-r from-white to-red-600 text-red-800 border border-red-300 shadow-md text-xl">
                            <AlertCircle className="h-6 w-6" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
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

    )
}