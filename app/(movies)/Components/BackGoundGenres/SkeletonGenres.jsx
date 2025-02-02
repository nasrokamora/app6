import { Skeleton } from "@/components/ui/skeleton"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export function SkeletonBackGroundImageGenres( {children} ) {
  return (
    <div className="w-full h-screen flex justify-center overflow-hidden relative">
      <Skeleton className="absolute inset-0" /> {/* Background image skeleton */}
      {/* Movie details skeleton */}
      <div className="absolute bottom-10 left-10 top-28 right-10 bg-black/60 backdrop-blur h-fit p-4 rounded-md">
        <div className="flex items-center justify-center mb-8 gap-4 flex-wrap">
          <Skeleton className="h-8 w-64" /> {/* Title */}
          <Skeleton className="h-8 w-16" /> {/* Rating */}
        </div>
        <Skeleton className="h-6 w-48 mb-4" /> {/* Release date */}
        <div className="flex gap-2 flex-wrap mb-4">
          <Skeleton className="h-6 w-20" /> {/* Genre */}
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-6 w-32 mb-2" /> {/* Status */}
        <Skeleton className="h-6 w-40" /> {/* Runtime */}
      </div>
      {children}
    </div>
  )
}

