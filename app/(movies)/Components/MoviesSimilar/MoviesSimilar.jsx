import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { FaRegStar } from "react-icons/fa";
import Link from "next/link"
import no_image from '../../../../public/image/no_image4.webp'
import { urlImage } from "@/app/libs/UrlImage";
import ImagePosterPath from "@/app/libs/ImagePosterPath";

export default function MoviesSimilar({ similar }) {

    return (
        <div className=" mt-8  ">
            <div className="border-l-yellow-500 border-l-2 pl-2 flex justify-start items-center md:justify-center md:items-center w-fit rounded-r-full border-r-2  border-r-yellow-500  relative bg-black/50 backdrop-blur ">
                <h1 className="  bg-gradient-to-r from-[#f4c700] via-[#00ccff] to-[#f4c700] bg-clip-text text-transparent     mt-10 scroll-m-20 p-4 md:text-wrap  text-4xl font-bold tracking-tight  first:mt-0">Similar Movies on Magix </h1>

            </div>
            <div className="flex justify-center w-full mt-6 md:mt-16 bg-black/50 backdrop-blur p-4 rounded-md">
                <Carousel opts={{
                    align: "start",
                    loop: true,
                }} className=" md:max-w-lg xl:max-w-5xl w-full max-w-5xl 2xl:max-w-full" >
                    <CarouselContent className="  -ml-1">
                        {similar.results && similar.results.length > 0 ? (
                            similar.results.map((movie) => (

                                <CarouselItem key={movie.id} className="  basis-1/6 lg:basis-1/5 md:basis-1/2 2xl:basis-1/6">
                                    <div className="  hover:scale-105 hover:duration-500  hover:grayscale  ">
                                        <Link className="" href={`/movies/list/${movie.id}`} rel="noopener noreferrer">
                                            <div className=" relative overflow-hidden">
                                                {movie.poster_path &&
                                                movie.poster_path ? (
                                                    <ImagePosterPath
                                                        width={250}
                                                        height={180}
                                                        index={movie.id}
                                                        tmdbPath={movie.poster_path}
                                                        quality={75}
                                                        alt={movie.title ? movie.title : movie.original_title || "Unknown"}
                                                        unoptimized
                                                        draggable={false}
                                                        priority
                                                    />
                                                ) : (
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
                                            <div>
                                                <h1 className=" font-bold flex justify-start  pt-2 mb-1">{movie.title.slice(0, 11) + "..."}
                                                </h1>
                                            </div>
                                            <div className=" flex justify-between items-center w-full font-semibold">
                                                <h1 className=" fonb flex justify-between items-center w-full">
                                                    {movie.release_date ? new Date(movie.release_date.toString()).getFullYear() : "N/A"}
                                                </h1>
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
                            <div className=" flex justify-center items-center w-full  ">
                                <h1 className="border rounded-md border-red-700 w-fit bg-black p-2 font-bold text-2xl text-red-700 md:text-xl italic animate-pulse ">there is no similar movies.</h1>
                            </div>
                        )
                        }
                    </CarouselContent>
                    <div className=" absolute top-[-2rem] left-[93%] md:left-[85%]">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}