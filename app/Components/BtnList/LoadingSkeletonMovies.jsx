import { Skeleton } from "@/components/ui/skeleton"


export function MovieCarouselSkeleton() {
  // Assuming we want to show 3 skeleton items while loading
  return Array(3)
    .fill(null)
    .map((_, index) => (
      <div className="max-w-full h-[50vh] w-full" key={index}>
        <div className="flex justify-between h-[50vh] w-full">
          <div className="bg-transparent w-[50%] flex flex-col justify-center space-y-4 p-4">
            <Skeleton className="h-8 w-3/4" /> {/* Movie title */}
            <Skeleton className="h-4 w-1/2" /> {/* Subtitle or additional info */}
            <Skeleton className="h-20 w-full" /> {/* Description or other content */}
          </div>
          <div className="h-[50vh] w-[70%] overflow-hidden relative">
            <Skeleton className="h-full w-full" /> {/* Image placeholder */}
          </div>
        </div>
      </div>
    ))
}

