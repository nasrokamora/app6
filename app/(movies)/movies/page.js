// import LoadMovies from "@/app/Components/LoadMore/LoadMovies";
import dynamic from "next/dynamic";
import ToggleButton from "../Components/ToggleButton/ToggleButton";

export const metadata = {
    title: 'Magix | Movies',
}

const LoadMovies = dynamic(() => import('@/app/Components/LoadMore/LoadMovies'), { ssr: false });



export default function Movies() {

    return (
        <div className=" w-full h-auto">

            <LoadMovies />
            <ToggleButton />
        </div>
    )

}