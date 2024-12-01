import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import { FaTheaterMasks } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { getMoviesGenreList } from "@/app/libs/DataFetching";
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link";
import { getGenreTvList } from "@/app/libs/DataFetchingTv";

async function GenresListTvShows() {
    const data = await getGenreTvList()
    const dataGenresTv = data.genres
    return(
        <div>
            {dataGenresTv.map((genre) => (
            <SheetClose asChild key={genre.id}>
                <Link href={`/tv/genre/${genre.id}`}  className={buttonVariants({ variant: "outline" })}>
                    {genre.name}
                </Link>
            </SheetClose>
            ))}
        </div>
    )
}




async function MoviesListGenre() {
    const data = await getMoviesGenreList()
    const dataGenres = data.genres


    return (
        <div className=" flex justify-start items-center flex-wrap gap-2">

            {dataGenres.map((genre) => (
            <SheetClose asChild key={genre.id}>
                <Link href={`/movies/genre/${genre.id}`}  className={buttonVariants({ variant: "outline" })}>
                    {genre.name}
                </Link>
            </SheetClose>
            ))}
        </div>
    )
}

export default function GenresListMovies() {
    return (
        <div className=" h-auto">

            <Sheet>
                <SheetTrigger>
                    <FaTheaterMasks size={25} />
                </SheetTrigger>
                <SheetContent side="left" className=" h-auto overflow-y-scroll">
                    <SheetHeader>
                        <SheetTitle>Explore Movie and TV Show Genres.</SheetTitle>
                        <SheetDescription>
                            Whether you're a fan of movies or TV shows, there's something here for everyone.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="flex justify-start items-center gap-2 mt-6 flex-col">

                        <div className="flex justify-start items-center  font-bold text-xl gap-2">
                            <h1>Choose your favorite genre from a wide selection of movies
                            </h1>
                            <h2><BiCameraMovie size={25} className="" /></h2>
                        </div>
                        <div>
                            <MoviesListGenre />
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

        </div>
    )
}