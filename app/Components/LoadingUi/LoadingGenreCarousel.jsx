import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingGenreCarousel() {
    return (
        <div className="flex justify-center items-center ">
            <div className="flex justify-center items-center gap-8 pt-8 md:gap-2  ">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} className="h-[100px] w-[100px] lg:w-[90px] md:w-[60px] rounded-md flex justify-center items-center" />
                ))}
                
                
            </div>
        </div>
    );
}