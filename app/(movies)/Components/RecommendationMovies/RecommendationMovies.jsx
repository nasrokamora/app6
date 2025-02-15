
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
import { MdOutlineMovieFilter } from "react-icons/md";
import { urlImage } from "@/app/libs/UrlImage"


export default function RecommendationMovies({ dataRecommend }) {


  return (
    <>
      <div className="w-full ">
        <div className=" flex gap-2 items-center justify-start md:justify-center  w-fit rounded-r-full bg-black/50 backdrop-blur border-r-2 border-r-[#3500f4]">
          <h1 className=" border-l-2 border-[#3500f4]  bg-gradient-to-r from-[#3500f4] via-[#ff0000] to-[#f400ab] text-transparent bg-clip-text bg-[length:200%] animate-gradient  text-4xl md:text-center font-extrabold lg:text-3xl  p-4 drop-shadow-lg w-fit">
            Suggested Movies
          </h1>
          <MdOutlineMovieFilter className="text-[#ff0000] rotate-45 md:hidden " size={30} />
        </div>

      </div>
      <div className="  w-full pt-10 flex justify-center items-center relative h-fit md:mt-4">
        <Carousel className=" bg-black/60 backdrop-blur p-4 rounded-md w-full md:max-w-sm max-w-5xl 2xl:max-w-full " opts={{ loop: true, align: "start" }}
        >
          <CarouselContent className="-mt-1 ">
            {dataRecommend && dataRecommend.length > 0 ? (
              dataRecommend.map((data, index) => (
                <CarouselItem key={data.id} className="md:basis-1/2 basis-1/6 lg:basis-1/5">
                  <div className="p-1 hover:scale-90 hover:duration-500">
                    <Link href={`/movies/list/${data.id}`}>
                      <div className=" ">
                        <div className=" overflow-hidden relative">
                          <Image
                            src={data.poster_path ?
                              `${urlImage}${data.poster_path}`
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