
import PopularPersonDetails from "@/app/Components/PersonPopular/PopularPersonDetails";
import { RiHeartsFill } from "react-icons/ri";





export default function LayoutPerson({ children}) {
    return(
        <div>
        {children}
        <div className="mt-7 ">
                <div className="ml-6 flex justify-start gap-2 items-center md:flex-wrap">
                    <h1 className="bg-gradient-to-r from-[#ff40c6] via-[#9c40ff] to-[#ff4040] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient font-bold text-3xl scroll-m-20 tracking-tigh md:first:m-0 ">Meet the Stars </h1>
                    <RiHeartsFill size={32} className=" xl:size-[2rem] animate-pulse text-[#ff40c6] " />
                </div>
                {/* popular person details */}
                <PopularPersonDetails  />
            </div>



        </div>
    )
}