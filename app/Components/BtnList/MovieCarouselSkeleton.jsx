import { CarouselItem } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";


export default function MovieCarouselSkeleton (){
    return (
      <>
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <CarouselItem className="max-w-full h-[50vh] w-full md:h-screen" key={index}>
              <div className="flex justify-between h-[50vh] w-full">
                <div className="bg-transparent w-[60%] p-4">
                  <Skeleton className="h-10 w-3/4 mx-auto rounded-md mb-4" />
                  <div className="pt-4">
                    <div className="flex justify-start gap-3 items-center">
                      <Skeleton className="h-8 w-16 rounded-md" />
                      <Skeleton className="h-8 w-16 rounded-md" />
                      <Skeleton className="h-8 w-12 rounded-md" />
                      <Skeleton className="h-8 w-24 rounded-md" />
                    </div>
                    <div className="flex justify-start items-center gap-2 flex-wrap pt-4">
                      {Array(4)
                        .fill(0)
                        .map((_, i) => (
                          <Skeleton key={i} className="h-8 w-20 rounded-md" />
                        ))}
                    </div>
                    <div className="pt-4 md:hidden">
                      <Skeleton className="h-24 w-full rounded-md" />
                    </div>
                  </div>
                </div>
                <div className="h-[50vh] border blur-right w-[100%] overflow-hidden relative">
                  <Skeleton className="h-full w-full" />
                </div>
              </div>
            </CarouselItem>
          ))}
      </>
    )
  }