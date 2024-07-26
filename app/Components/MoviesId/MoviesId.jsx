


import Image from "next/image"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { SkeletonCarousel } from "../LoadingUi/LoadingCarousel"


async function getData(movie_Id) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_Id}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
{
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
    }
  })
  if (!response.ok) {
    throw new Error("failed to fetch data")
  }
  return response.json()
}
export default async function MoviesId({ movie_Id }) {
  const data = await getData(movie_Id)
  const dataImage = data.backdrops
  const urlImage = 'https://image.tmdb.org/t/p/original'







  // const plugin = useRef(Autoplay({delay:2000, stopOnInteraction: true }))
  return (
    // isLoading ? <SkeletonCarousel /> :
    <Carousel

      opts={{
        align: "start",
        loop: true,
      }}
      // plugins={[plugins.current]}
      // onMouseEnter={plugin.current.play}
      // onMouseLeave={plugin.current.stop}
      className="w-full max-w-sm xl:max-w-[90%] lg:max-w-2xl 2xl:max-w-4xl"
    >
      <CarouselContent>
        {dataImage.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/3 2xl:basis-1/4">
            <div className="  flex aspect-square items-center  static ">

              <Image className=" rounded-md"
                src={`${urlImage}${item.file_path}`}
                alt={item.vote_average}
                width={300}
                height={300}
                style={{ width: "auto", height: "auto" }}
                priority={false}
                loading = 'lazy'
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="md:hidden" />
      <CarouselNext className="md:hidden" />
    </Carousel>
  )




}