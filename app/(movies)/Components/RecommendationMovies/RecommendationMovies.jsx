import { urlImageTv } from "@/app/libs/DataFetchingTv"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"
import no_image from '../../../../public/image/no_image4.webp'
import { FaRegStar } from "react-icons/fa"


export default function RecommendationMovies({ dataRecommend }) {


  return (
    <>
      <div>
        <h1 className=" bg-gradient-to-r from-[#3500f4] via-[#ff0000] to-[#f400ab] text-transparent bg-clip-text bg-[length:200%] animate-gradient scroll-m-20 text-3xl md:text-2xl font-extrabold   lg:text-2xl   ">Suggested Movies </h1>
      </div>
      <div className="  w-full pt-10 flex justify-center items-center relative h-fit md:mt-4">
        <Carousel className=" bg-black/60 backdrop-blur p-4 rounded-md w-full md:max-w-sm max-w-5xl 2xl:max-w-full " opts={{ loop: true, align: "start" }}
        >
          <CarouselContent className="-mt-1 ">
            {dataRecommend && dataRecommend.length > 0 ? (
              dataRecommend.map((data, index) => (
                <CarouselItem key={index} className="md:basis-1/2 basis-1/6 lg:basis-1/5">
                  <div className="p-1 hover:scale-90 hover:duration-500">
                    <Link href={`/movies/list/${data.id}`}>
                      <div className=" ">
                        <div className=" overflow-hidden relative">
                          <Image
                            src={data.poster_path ?
                              `${urlImageTv}${data.poster_path}`
                              :
                              no_image
                            }
                            alt="image_recommend"
                            width={300}
                            height={250}
                            style={{ width: "auto" }}
                            className="rounded-md "
                            loading="eager"
                            priority
                          />
                        </div>
                        <div>
                          <h1 className=" font-bold flex justify-start  pt-2 mb-1">{data.title.slice(0, 11) + "..."}
                          </h1>
                        </div>
                        <div className=" flex justify-between items-center w-full font-semibold">
                          <h1 className=" fonb flex justify-between items-center w-full">
                            {data.release_date ? new Date(data.release_date.toString()).getFullYear() : "N/A"}
                          </h1>
                          <div className=" ">
                            <div className=" space-x-1 flex justify-between items-center">
                              <FaRegStar className="text-[#FFC300]" />
                              <span className="">
                                {data.vote_average.toFixed(1)}
                              </span>
                            </div>
                          </div>

                        </div>
                      </div>
                    </Link>
                  </div>
                </CarouselItem>
              ))
            ) : (
              <div className=" w-full flex justify-center items-center  ">
                <h1 className=" text-xl text-red-700 font-bold border rounded-md p-5 border-red-700 bg-black">
                  Currently, there are no movies to display.
                </h1>
              </div>
            )
            }
          </CarouselContent>
          <div className=" absolute top-[-2rem] left-[93%] md:left-[85%] ">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </>
  )
}