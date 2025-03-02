

// import { Skeleton } from "@/components/ui/skeleton"

import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonLoadMoreTv() {

  const placeholderItems = Array.from({ length: 10 }, (_, i) => i)

  return (
    <div className="grid grid-cols-6 gap-8 p-8 md:grid-cols-3 lg:grid-cols-5 pt-28 ">
      {placeholderItems.map((item) => (
        <div key={item}>
          <div className="relative flex flex-col items-center justify-center overflow-hidden">
            <Skeleton className="w-[200px] h-[150px] rounded-md" />
            <Skeleton className="h-4 w-20 mt-2 md:hidden" />
          </div>
        </div>
      ))}
    </div>
  )
}

