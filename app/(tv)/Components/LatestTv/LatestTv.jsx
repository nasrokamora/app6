import { urlImageTv } from "@/app/libs/DataFetchingTv"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { Suspense } from "react"
import Link from "next/link"


export default function LatestTv({dataLatest}) {
// console.log(dataRecommend)


    return(
      <Suspense fallback={<p className=" flex justify-center items-center">Loading feed...</p>}>

        <div className="w-full pt-10 flex justify-center items-center relative h-fit">
        <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-5xl "
    >
      <CarouselContent className="-mt-1 ">

          <CarouselItem key={dataLatest.id} className="pt-1 md:basis-1/2 basis-1/6 lg:basis-1/5">
            <Link href={`/Tv/List/${dataLatest.id}`}>
            <div className="p-1 hover:scale-90 hover:duration-500">
                <div className=" ">
                    <div className=" overflow-hidden relative">
                        <Image 
                        src={`${urlImageTv}${dataLatest.poster_path}`}
                        alt={dataLatest.name}
                        width={400}
                        height={250}
                        style={{width:"auto"}}
                        className="rounded-md"
                        loading="eager"
                        />
                    </div>
                </div>
            </div>
        </Link>
          </CarouselItem>
      </CarouselContent>
      <div className=" absolute top-[-2rem] left-[93%] md:left-[85%]">
      <CarouselPrevious />
      <CarouselNext />
      </div>
    </Carousel>
        </div>
        </Suspense>
    )
}