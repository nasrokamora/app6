


import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDetail() {
  return (
    <div className="flex items-center space-x-4 mt-8">
      
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
