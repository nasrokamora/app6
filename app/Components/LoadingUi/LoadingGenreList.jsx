import { Skeleton } from "@/components/ui/skeleton"


export default function LoadingGenreButton(){

    return(
        <div className="flex items-center justify-center ">
        
        <div className=" flex justify-center items-start gap-8 pt-8 md:gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
                
                <Skeleton key={index} className="h-10 w-[100px] lg:w-[75px] md:w-[45px]" />
            ))}
        </div>
      </div>
    )
}