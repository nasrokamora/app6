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
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { PiShootingStarLight } from "react-icons/pi";
import ImagePosterPath from "@/app/libs/ImagePosterPath"

export default function RecommendationTv({ dataRecommend }) {
  return (
    <div className="w-full pt-10 flex justify-center items-center relative h-fit md:mt-4 bg-gradient-to-r from-[#0742a1] via-[#b60c00] to-[#0742a1] bg-[length:200%_auto]  animate-gradient rounded-md">
      <Carousel className="w-full max-w-5xl md:max-w-md 2xl:max-w-full"
      opts={{ align: "center", loop: true }}
      >
        <CarouselContent className="-mt-1 ">
          {dataRecommend && dataRecommend.length > 0 ? (
            dataRecommend.map((data) => (
              <CarouselItem key={data.id} className="md:basis-1/2 basis-1/6 lg:basis-1/5">

                <div className="p-1 hover:scale-90 hover:duration-500 hover:hue-rotate-30">
                  <Link href={`/tv/list/${data.id}`}>
                    <div className=" overflow-hidden  relative">
                      {data.poster_path &&
                      data.poster_path ? (
                        <ImagePosterPath
                          width={300}
                          height={250}
                          index={data.id}
                          tmdbPath={data.poster_path}
                          quality={75}
                          style={{borderRadius: "0.5rem" }}
                          alt={data.name ? data.name : "Magix Movies_poster"}
                          unoptimized
                          draggable={false}
                          priority
                        />
                      ) : (
                        <Image
                          src={no_image}
                          alt={"no_image"}
                          width={300} height={200}
                          priority
                          style={{ width: "auto", borderRadius: "4px" }}
                          draggable={false}
                          loading="eager"
                        />
                      )}

                    </div>
                  </Link>
                  <div className="flex justify-between items-center font-bold">

                    <div className=" flex justify-start gap-1 items-center">
                      <span><PiShootingStarLight className=" text-[#ffe533]" /></span>
                      <h1> {data.vote_average.toFixed(1)} </h1>
                    </div>
                    <div>
                      <h1> {data.first_air_date ? data.first_air_date.split("-")[0] : "Unknown"} </h1>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))
          ) : (
            <Alert variant="destructive" className=" ml-4 bg-black">
              <AlertCircle className="h-6 w-6" />
              <AlertTitle className=" text-xl">Oops!</AlertTitle>
              <AlertDescription className=" text-xl font-bold">
                We couldn’t find any recommended content.
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