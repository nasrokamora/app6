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

export default function MoviesSimilar({ similar }) {


    return (
        <div className=" mt-8 ">
            <div>
                <h1 className=" text-yellow-500  md:text-yellow-500   mt-10 scroll-m-20 md:text-xl  text-3xl font-bold tracking-tight transition-colors first:mt-0">Similar Movies : </h1>
                <div className=" underline decoration-red-500 w-2/3 flex justify-center" />
            </div>
            <div className="flex justify-center w-full mt-6">
                <Carousel opts={{
                    align: "start",
                    loop: true,
                }} className=" md:max-w-lg xl:max-w-4xl w-full max-w-5xl 2xl:max-w-full" >
                    <CarouselContent className="  -ml-1">
                        {similar.results && similar.results.length > 0 ? (
                            similar.results.map((movie) => (

                                <CarouselItem key={movie.id} className="  basis-1/5 lg:basis-1/5 md:basis-1/2 2xl:basis-1/7">
                                    <div className="  hover:scale-105 hover:duration-500 hover:saturate-50 hover:grayscale  ">
                                        <Link className="   " href={`/Movies/List/${movie.id}`}>

                                            <Image
                                                src={movie.poster_path ? `
                                    https://image.tmdb.org/t/p/original${movie.poster_path}`
                                                    :
                                                    no_image
                                                }
                                                alt={movie.title}
                                                width={250} height={180}
                                                className=" rounded-md "
                                                style={{ width: "auto" }}
                                                priority={true}
                                                loading="eager"
                                            />
                                            <div>
                                                <p className=" font-bold flex justify-start  pt-2 mb-1">{movie.title.length > 14 ? movie.title.slice(0, 14) + "..." : movie.title}
                                                </p>
                                            </div>
                                            <div className=" flex justify-between items-center w-full font-semibold">
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
                            <div className=" flex justify-center items-center w-full">
                                <h1 className="font-bold text-2xl text-error md:text-xl italic">No data </h1>
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