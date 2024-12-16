import LoadMovies from "@/app/Components/LoadMore/LoadMovies";
import ToggleButton from "../Components/ToggleButton/ToggleButton";
export const metadata = {
    title: 'Magix | Movies',
}


export default function Movies() {

    return (
        <div className=" w-full h-auto">

            <LoadMovies />
            <ToggleButton />
        </div>
    )

}