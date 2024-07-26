import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className=' flex justify-center items-center h-screen'>

    
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[250px] w-[500px] rounded-xl md:w-[100px] md:h-[100px]" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] md:h-[150px]" />
        <Skeleton className="h-4 w-[200px] md:w-[100px]" />
      </div>
    </div>
    </div>
  )
}
