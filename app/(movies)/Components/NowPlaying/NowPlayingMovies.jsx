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
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import no_image from '../../../../public/image/no_image4.webp'

export default function NowPlayingMovies({dataPlaying }) {

  return (


    <div className="w-full pt-10 flex justify-center items-center relative h-fit">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full md:max-w-sm max-w-5xl 2xl:max-w-full"
      >
        <CarouselContent className="-mt-1 ">
          {dataPlaying && dataPlaying.length > 0 ? (
            dataPlaying.map((data) => (
              <CarouselItem key={data.id} className="pt-1 md:basis-1/2 basis-1/6 lg:basis-1/5 ">
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
                          alt={data.title? data.title : "image not found"}
                          width={300}
                          height={250}
                          style={{ width: "auto" }}
                          className="rounded-md"
                          loading="eager"
                          priority
                        />
                      </div>
                    </div>
                </Link>
                  </div>
              </CarouselItem>
            ))
          ) : (
            <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
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

  )
}