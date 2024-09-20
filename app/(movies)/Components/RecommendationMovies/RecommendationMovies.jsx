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
import no_image from '../../../../public/image/no_image4.webp'

export default function RecommendationMovies({dataRecommend}) {
// console.log(dataRecommend)


    return(
      <>
      <div>
        <h1 className="scroll-m-20 text-2xl md:text-xl font-extrabold text-amber-600 backdrop-none  lg:text-2xl   black-shadow-text underline decoration-amber-600">Suggested Movies :</h1>
      </div>
        <div className="w-full pt-10 flex justify-center items-center relative h-fit md:mt-4">
        <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-5xl md:max-w-lg 2xl:max-w-6xl"
    >
      <CarouselContent className="-mt-1 ">
        {dataRecommend && dataRecommend.length > 0 ? (
        dataRecommend.map((data,index) => (
          <CarouselItem key={index} className="md:basis-1/2 basis-1/6 lg:basis-1/5">
            <div className="p-1 hover:scale-90 hover:duration-500">
            <Link href={`/Movies/List/${data.id}`}>
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
                        style={{width:"auto"}}
                        className="rounded-md "
                        loading="eager"
                        priority
                        />
                    </div>
                </div>
        </Link>
            </div>
          </CarouselItem>
        ))
      ):(
        <div className="flex justify-items-center w-full">

        <h1 className=" text-xl text-error font-bold">
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