import { getTrendingMovies } from "@/app/libs/DataFetching"
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




export default async function TrendingMovies() {
    const data = await getTrendingMovies()
    const dataTrendingMovies = data.results
    // console.log(dataTrendingMovies)
    return (
        <div className=" w-full">
            <div>
                <h1>Trending Movies on Magix Movies</h1>
            </div>
            <div className="flex justify-center w-full mt-6">

                <Carousel opts={{
                    align: "start",
                    loop: true,
                }} className=" md:max-w-sm xl:max-w-4xl   w-[80%] 2xl:max-w-6xl" >
                    <CarouselContent className="   ">
                        {dataTrendingMovies.map((movie, index) => (

                            <CarouselItem key={index} className="  basis-1/5 lg:basis-1/5 md:basis-1/2 2xl:basis-1/7">
                                <Link className=" " href={`/Movies/List/${movie.id}`}>

                                    <Image
                                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                        alt={movie.title}
                                        width={180} height={180}
                                        className=" md:w-[200px]  lg:w-[200px] lg:h-[200px] xl:w-[150px] xl:h-[150px] 2xl:w-[250px] 2xl:h-[150px]  " style={{ height: "auto" }}
                                        priority={true}

                                    />
                                    <p className=" font-bold flex justify-start  pt-2 mb-1">{movie.title.length > 14 ? movie.title.slice(0, 14) + "..." : movie.title}
                                    </p>
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
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className=" md:hidden" />
                    <CarouselNext className=" md:hidden" />
                </Carousel>
            </div>
        </div>
    )
}