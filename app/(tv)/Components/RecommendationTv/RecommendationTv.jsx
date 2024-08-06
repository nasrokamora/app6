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



export default async function RecommendationTv({dataRecommend}) {
// console.log(dataRecommend)


    return(
        <div className="w-full pt-10 flex justify-center items-center">
        <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-4xl"
    >
      <CarouselContent className="-mt-1 ">
        {dataRecommend.map((data, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/2 basis-1/4">
            <div className="p-1">
              <Card>
                <CardContent className=" p-6">
                    <div className=" overflow-hidden relative">
                        <Image 
                        src={`${urlImageTv}${data.poster_path}`}
                        alt={data.name}
                        width={400}
                        height={250}
                        style={{maxWidth:"100%",height:"auto"}}
                        className="rounded-md"
                        />
                    </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
        </div>
    )
}