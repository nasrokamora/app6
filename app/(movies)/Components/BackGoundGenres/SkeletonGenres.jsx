import { Skeleton } from "@/components/ui/skeleton"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function SkeletonGenres() {
  return (
    <main className="w-full h-screen md:h-auto bg-gray-900 text-gray-100">
      <Skeleton className="w-full h-[50vh] md:h-[40vh] bg-gray-800" /> {/* ImageMoviesCover placeholder */}
      <div className="h-screen w-full md:h-auto relative">
        <div className="md:pt-28 pt-28 flex justify-start items-start flex-col relative bg-gray-800/60 backdrop-blur mb-4 p-4 rounded-md md:h-[75vh] h-fit overflow-hidden">
          <div className="flex items-center justify-center mb-8 gap-4 md:gap-2 flex-wrap md:text-center w-full">
            <Skeleton className="h-8 w-3/4 md:w-1/2 bg-gray-700" /> {/* Title placeholder */}
            <Skeleton className="h-8 w-16 bg-gray-700" /> {/* Rating placeholder */}
          </div>
          <Skeleton className="h-6 w-1/2 mb-4 bg-gray-700" /> {/* Release date placeholder */}
          <div className="flex justify-start items-center gap-2 flex-wrap relative z-10 w-full">
            <Skeleton className="h-6 w-1/4 bg-gray-700" /> {/* Genres title placeholder */}
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-6 w-20 bg-gray-700" /> /* Genre badges placeholder */
              ))}
            </div>
          </div>
          <div className="w-full mt-4">
            <Skeleton className="h-6 w-1/3 mb-2 bg-gray-700" /> {/* Status title placeholder */}
            <Skeleton className="h-6 w-1/4 bg-gray-700" /> {/* Runtime placeholder */}
          </div>
          <div className="w-full mt-4">
            <Skeleton className="h-6 w-1/4 mb-2 bg-gray-700" /> {/* Overview title placeholder */}
            <Skeleton className="h-24 w-full bg-gray-700" /> {/* Overview content placeholder */}
          </div>
          <div className="w-full mt-4">
            <Skeleton className="h-10 w-24 bg-gray-700" /> {/* Link button placeholder */}
          </div>
        </div>

        {/* Carousel skeleton */}
        <div className="pt-4 h-fit relative flex justify-center items-center w-full">
          <Carousel className="w-full md:max-w-md xl:max-w-6xl 2xl:max-w-full lg:max-w-4xl">
            <CarouselContent>
              {[...Array(6)].map((_, index) => (
                <CarouselItem key={index} className="basis-1/8 xl:basis-1/6 md:basis-1/3 lg:basis-1/5 2xl:basis-1/6">
                  <Skeleton className="h-[225px] w-[150px] bg-gray-700" /> {/* Movie poster placeholder */}
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute top-[-4rem] left-[93%] md:left-[82%] md:top-[-3rem]">
              <CarouselPrevious className="bg-gray-700 text-gray-300 hover:bg-gray-600" />
              <CarouselNext className="bg-gray-700 text-gray-300 hover:bg-gray-600" />
            </div>
          </Carousel>
        </div>
      </div>
    </main>
  )
}

