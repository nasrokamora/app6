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
// import { Suspense } from "react"
import Link from "next/link"
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import no_image from '../../../../public/image/no_image4.webp'
import AutoCarousel from "@/app/Components/AutoCarousel/AutoCarousel"

export default function NowPlayingMovies({dataPlaying }) {

  return (
    <div>
      <div>
        <h1 className="mt-10 text-2xl font-bold text-red-800 underline scroll-m-20 md:text-xl decoration-red-800 first:mt-0 black-shadow-text">Now playing on Magix</h1>
      </div>


    <div className="relative flex items-center justify-center w-full pt-10 md:mt-4">
      <AutoCarousel
      >
        <CarouselContent className="-mt-1 ">
          {dataPlaying && dataPlaying.length > 0 ? (
            dataPlaying.map((data) => (
              <CarouselItem key={data.id} className="p-2 md:basis-1/2 basis-1/6 lg:basis-1/5 ">
                  <div className="p-1 hover:scale-90 hover:duration-500 hover:saturate-50">
                <Link href={`/movies/list/${data.id}`}>
                      <div className="relative overflow-hidden ">
                        <Image
                          src={data.poster_path ?
                            `${urlImageTv}${data.poster_path}`
                          :
                          no_image
                          }
                          alt="image now_playing"
                          width={300}
                          height={250}
                          style={{ width: "auto" }}
                          className="rounded-md"
                          loading="eager"
                          priority
                          draggable={false}
                        />
                      </div>
                </Link>
                  </div>
                  
              </CarouselItem>
              
            ))
          ) : (
            <Alert variant="destructive" className=" bg-black/30 backdrop-blur">
            <AlertCircle className="w-4 h-4" />
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
      </AutoCarousel>
    </div>

          </div>
  )
}