import { urlImageTv } from "@/app/libs/DataFetchingTv"
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
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function RecommendationTv({dataRecommend}) {
// console.log(dataRecommend)


    return(
        <div className="w-full pt-10 flex justify-center items-center relative h-fit md:mt-4">
        <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-5xl md:max-w-lg 2xl:max-w-6xl"
    >
      <CarouselContent className="-mt-1 ">
        {dataRecommend && dataRecommend.length > 0 ? (
        dataRecommend.map((data) => (
          <CarouselItem key={data.id} className="md:basis-1/2 basis-1/6 lg:basis-1/5">
            <div className="p-1 hover:scale-90 hover:duration-500 hover:hue-rotate-30">
            <Link href={`/Tv/List/${data.id}`}>
                <div className=" ">
                    <div className=" overflow-hidden relative">
                        <Image 
                        src={data.poster_path ? `${urlImageTv}${data.poster_path}`: no_image}
                        alt={data.name}
                        width={300}
                        height={250}
                        style={{width:"auto",borderRadius:"2px"}}
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
        <Alert variant="destructive" className=" ml-4">
        <AlertCircle className="h-6 w-6" />
        <AlertTitle className=" text-xl">Error</AlertTitle>
        <AlertDescription className=" text-xl font-bold">
          No recommended content found.
        </AlertDescription>
      </Alert>
        )
}
        </CarouselContent>
      <div className=" absolute top-[-2rem] left-[93%] md:left-[85%] ">
      <CarouselPrevious />
      <CarouselNext />
      </div>
    </Carousel>
        </div>

    )
}