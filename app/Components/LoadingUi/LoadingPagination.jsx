import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPagination() {
    return (
        <div className="flex justify-center items-center w-full h-[200px] relative">
            <div className="flex justify-center items-center gap-8 pt-8 md:gap-2   p-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} 
                    className=" h-[120px] w-[120px] lg:w-[90px] md:w-[60px] rounded-md flex justify-center items-center" />
                ))}
                
                
            </div>
        </div>
    );
}