import { getAllTrending, urlImageTv } from "@/app/libs/DataFetchingTv"
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
import { FaRegStar } from "react-icons/fa"


export default async function TrendingTvAll() {
  const dataTrending = await getAllTrending();
  const data = dataTrending.results





  return (

    <div className="">
      <div className="text-4xl md:mb-3  tracking-tight lg:text-3xl ml-6 md:ml-0  title font-extrabold md:flex md:justify-center md:items-center  md:mt-3 ">
        <h1 className="text-[#FFC107]">Best of the Week</h1>
      </div>

      <div className="w-full pt-4 flex justify-center items-center relative h-fit bg-gradient-to-r from-[#000000] via-[#FFC107] to-[#000000] bg-[length:200%_auto] animate-gradient">
        <Carousel
          opts={{
            align: "center",
          }}
          className="w-full max-w-5xl md:max-w-lg"
        >
          <CarouselContent className="-mt-1 ">
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <CarouselItem key={index} className="pt-1 md:basis-1/3 basis-1/6 lg:basis-1/5">
                  <div className="p-1 hover:scale-90 hover:duration-500 hover:hue-rotate-90">
                    <Link href={`/tv/list/${item.id}`}>
                      <div className=" ">
                        <div className=" overflow-hidden relative">
                          <Image
                            src={`${urlImageTv}${item.poster_path}`}
                            alt={item.name}
                            width={300}
                            height={250}
                            style={{ width: "auto" }}
                            className="rounded-md md:w-[200px] md:h-[200px]"
                            loading="eager"
                          />
                        </div>
                        <div>
                          <h1 className=" font-bold flex justify-start  pt-2 mb-1">{item.name ? item.name.slice(0, 11) + "..." : item.original_name ? item.original_name.slice(0, 11) + "..." : "N/A"}
                          </h1>
                        </div>
                        <div className=" flex justify-between items-center w-full font-semibold">
                          <h1 className=" fonb flex justify-between items-center w-full">
                            {item.first_air_date ? new Date(item.first_air_date.toString()).getFullYear() : "N/A"}
                          </h1>
                          <div className=" ">
                            <div className=" space-x-1 flex justify-between items-center">
                              <FaRegStar className="text-[#FFC300]" />
                              <span className="">
                                {item.vote_average.toFixed(1)}
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
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Oops !</AlertTitle>
                <AlertDescription>
                  There is no data.
                </AlertDescription>
              </Alert>
            )
            }
          </CarouselContent>
          <div className=" absolute top-[-2rem] left-[93%] md:left-[80%] md:mr-3">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>

    </div>
  )
}