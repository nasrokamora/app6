import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCarousel() {
  return (
    <div className=" grid grid-cols-3 gap-8 md:flex md:justify-center md:items-center lg:grid-cols-2 ">

    <div className="flex flex-col space-y-3 ">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    <div className="flex flex-col space-y-3 md:hidden">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    <div className="flex flex-col space-y-3 md:hidden lg:hidden">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    </div>
  )
}
