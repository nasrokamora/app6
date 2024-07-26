


// import { useEffect, useState } from "react"
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import { FaRegStar } from "react-icons/fa";
// import LoadingGenreCarousel from "../LoadingUi/LoadingGenreCarousel";


async function fetchDataTv() {
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_API_KEY}&page=11&timezone=America/New_York`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`
        }
    })
    if (!response.ok) {
        throw new Error("failed to fetch data")
    }
    return response.json()
}




const CarouselTvPopular = ({ dataPopular, isLoading }) => {
    return (
        <div>
            <div>
                {isLoading ? <LoadingGenreCarousel /> : null}
                <div className=" mt-8 flex justify-center w-full bg-gradient-to-tr from-red-900 to-gray-900">
                    <Carousel opts={{
                        align: "start",
                        loop: true,
                    }} className=" md:w-[60%] xl:w-[80%]  glass  w-[80%]">
                        <CarouselContent >
                            {dataPopular.map((tv) => (

                                <CarouselItem key={tv.id} className="  basis-1/7 lg:basis-1/5 md:basis-1/2  xl:basis-1/4">
                                    <div className="">


                                        <Image
                                            src={`https://image.tmdb.org/t/p/original${tv.poster_path}`}
                                            alt={tv.name}
                                            width={300} height={300}
                                            className=" md:w-[150px] h-[200px] lg:w-[200px] lg:h-[200px] xl:w-[320px] xl:h-[320px] 2xl:w-[150px] 2xl:h-[150px]  "
                                            priority={true} />
                                        <h6 className=" font-bold flex justify-start  pt-2 mb-1">{tv.name.length > 14 ? tv.name.slice(0, 14) + "..." : tv.name}
                                        </h6>
                                        <div className=" flex justify-between items-center w-full">
                                            <h6 className=" fonb flex justify-between items-center w-full">
                                                {tv.first_air_date}
                                            </h6>

                                            <div className=" ">
                                                <div className=" space-x-1 flex justify-between items-center">
                                                    <FaRegStar className="text-[#FFC300]" />
                                                    <span className="">
                                                        {tv.vote_average.toFixed(1)}
                                                    </span>
                                                </div>
                                            </div>

                                        </div>


                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </div>
    )
}



export default async function TvPopular() {
    const data = await fetchDataTv()
    const dataPopular = data.results

    // const [dataPopular, setDataPopular] = useState([])
    // const [isLoading, setIsLoading] = useState(true)

    // useEffect(() => {
    //     const fetchDataTv = async () => {
    //         const response = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=11&timezone=America/New_York`,
    //             {
    //                 next:
    //                 {
    //                     revalidate: 60
    //                 }
    //             }, {
    //             headers: {
    //                 Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
    //             }
    //         })
    //         const data = await response.json()
    //         setDataPopular(data.results)
    //         setIsLoading(false)
    //     }
    //     fetchDataTv()
    // }, [])


    return (
        <div>
            <CarouselTvPopular dataPopular={dataPopular} />
        </div>
    )
}