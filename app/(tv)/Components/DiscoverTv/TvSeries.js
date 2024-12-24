import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link"
import Image from "next/image"
import { FaRegStar } from "react-icons/fa6"
import BlurFade from "@/components/ui/blur-fade"
import no_image from '../../../../public/image/no_image4.webp'
import { urlImageTv } from "@/app/libs/DataFetchingTv"
import CarouselAutoshow from "@/app/Animations/CarouselAuto/AutoCarousel"

export default function TvSeries({ dataTv }) {

    return (
        <div className=" mt-12 flex justify-center w-full bg-gradient-to-br from-[black] to-[#318ffa] p-6 2xl:text-lg ">
            <CarouselAutoshow  >
                <CarouselContent className="   ">
                    {dataTv.map((tv, index) => (

                        <CarouselItem key={tv.id} className="md:basis-1/2 basis-1/6 lg:basis-1/5">
                            <BlurFade key={tv.id} delay={0.5 + index * 0.05} inView>

                                <div className="hover:duration-500 hover:scale-90 ">

                                    <Link className="" href={`/tv/list/${tv.id}`} rel="noopener noreferrer" as={`/tv/list/${tv.id}`}>
                                        <div className="relative overflow-hidden  rounded-md">

                                            <Image
                                                src={tv.poster_path ?
                                                    `${urlImageTv}${tv.poster_path}` : no_image}
                                                alt="image_tv_Show"
                                                width={300} height={250}
                                                className="  rounded-lg"
                                                style={{ width: "auto" }}
                                                priority
                                                draggable="false"
                                            />
                                        </div>
                                        <p className=" font-bold flex justify-start  pt-2 mb-1">{tv.original_name.length > 14 ? tv.original_name.slice(0, 14) + "..." : tv.original_name}
                                        </p>
                                        <div className="  flex justify-between items-center w-full font-semibold">
                                            <p className=" fonb flex justify-between items-center w-full">
                                                {new Date(tv.first_air_date).getFullYear()}
                                            </p>
                                            <div className=" ">
                                                <div className=" space-x-1 flex justify-between items-center">
                                                    <FaRegStar className="text-[#FFC300]" />
                                                    <span className="">
                                                        {tv.vote_average.toFixed(1)}
                                                    </span>
                                                </div>
                                            </div>

                                        </div>

                                    </Link>
                                </div>
                            </BlurFade>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className=" absolute top-[-4rem] left-[93%] md:left-[82%] md:top-[-3rem]">
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </CarouselAutoshow>
        </div>

    )
}