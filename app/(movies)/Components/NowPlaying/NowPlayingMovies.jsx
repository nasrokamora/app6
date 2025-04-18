
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import AutoCarousel from "@/app/Components/AutoCarousel/AutoCarousel"
import { IoStarSharp } from "react-icons/io5"
import no_image from '../../../../public/image/no_image4.webp'
import ImagePosterPath from "@/app/libs/ImagePosterPath"

export default function NowPlayingMovies({ dataPlaying }) {

  return (
    <div className=" mt-3 ">
      <div className="relative flex gap-2 items-center justify-start md:justify-center rounded-r-full bg-black/50 backdrop-blur border-r-2 border-r-[#b02d74]  w-fit">
        <h1 className=" border-l-2 border-l-[#ae2f76] bg-gradient-to-r from-[#340b53] via-[#db2777] to-[#340b53] bg-clip-text text-transparent  p-4  scroll-m-20 text-4xl font-extrabold lg:text-3xl"> Now playing <span className="text-white">on</span> Magix</h1>
      </div>


      <div className="relative flex items-center justify-center w-full pt-10 md:mt-4">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full md:max-w-sm max-w-5xl 2xl:max-w-full bg-gradient-to-tr from-black via-purple-700 to-red-800"
        >
          <CarouselContent className="-mt-1 ">
            {dataPlaying && dataPlaying.length > 0 ? (
              dataPlaying.map((data) => (
                <CarouselItem key={data.id} className="p-2 md:basis-1/2 basis-1/6 lg:basis-1/5 ">
                  <div className="p-1 hover:scale-90 hover:duration-500 hover:saturate-50">
                    <Link href={`/movies/list/${data.id}`}>
                      <div className="relative overflow-hidden ">
                        {data.poster_path &&
                          data.backdrop_path ? (
                          <ImagePosterPath
                            width={300}
                            height={250}
                            index={data.id}
                            tmdbPath={data.poster_path}
                            quality={75}
                            alt={data.title ? data.title : data.original_title || "Unknown"}
                            unoptimized
                            draggable={false}
                            priority
                          />
                        ) : (
                          <Image
                            src={no_image}
                            width={300} height={250}
                            quality={75}
                            unoptimized={false}
                            priority
                            draggable={false}
                            alt="no image found"
                            style={{ height: 'auto' }}
                            placeholder="blur"
                          />
                        )}


                      </div>
                      <div>
                        <h1 className=" font-bold flex justify-start  pt-2 mb-1">{data.title ? data.title.slice(0, 11) + "..." : <h1 className=" text-red-700 font-bold">No title</h1>}
                        </h1>
                      </div>
                      <div className=" flex justify-between items-center w-full font-semibold">
                        <h1 className=" fonb flex justify-between items-center w-full">
                          {data.release_date ? new Date(data.release_date.toString()).getFullYear() : "N/A"}
                        </h1>
                        <div className=" ">
                          <div className=" space-x-1 flex justify-between items-center">
                            <IoStarSharp className="text-[#FFC300]" />
                            <span className="">
                              {data.vote_average ? data.vote_average.toFixed(1) : <h1 className=" text-red-700 font-bold">N/A</h1>}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                </CarouselItem>

              ))
            ) : (
              <Alert variant="destructive" className=" bg-black/30 backdrop-blur">
                <AlertCircle className="w-4 h-4" />
                <AlertTitle className="font-bold">Oops!</AlertTitle>
                <AlertDescription className="xl:text-xl 2xl:text-2xl font-semibold">
                  Something went wrong.
                </AlertDescription>
              </Alert>
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