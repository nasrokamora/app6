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
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { RiStarSLine } from "react-icons/ri";

export default function TrendingTv({ dataTrending }) {
  // console.log(dataTrending)



  return (


    <div className="w-full pt-10 flex justify-center items-center relative h-fit ">
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full max-w-5xl md:max-w-md bg-[#2D132C] 2xl:max-w-full"
      >
        <CarouselContent className="-mt-1  ">
          {dataTrending && dataTrending.length > 0 ? (
            dataTrending.map((data, index) => (
              <CarouselItem key={index} className="pt-1 md:basis-1/2 basis-1/6 lg:basis-1/5 ">
                <div className="p-1 hover:scale-90 hover:duration-500 hover:hue-rotate-90">
                  <Link href={`/Tv/List/${data.id}`}>
                    <div className=" ">
                      <div className=" overflow-hidden relative">
                        <Image
                          src={`${urlImageTv}${data.poster_path}`}
                          alt={data.name}
                          width={300}
                          height={250}
                          style={{ width: "auto" }}
                          className="rounded-md "
                          loading="eager"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              </CarouselItem>
            ))
          ) : (
            <Alert variant="destructive" className=" ml-4 bg-black">
              <AlertCircle className="h-6 w-6" />
              <AlertTitle className=" text-xl">Oops!</AlertTitle>
              <AlertDescription className=" text-xl font-bold">
                We couldn’t find any  content.
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

  )
}