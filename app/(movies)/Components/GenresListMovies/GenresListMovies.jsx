
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
import { MdLiveTv } from "react-icons/md";
import { cva } from "class-variance-authority";




async function ListGenre() {
    const dataGenreMovie = getMoviesGenreList()
    const dataGenresTv = getGenreTvList()
    const [dataGenres, dataGenresListTv] = await Promise.all([dataGenreMovie, dataGenresTv])
    return (
        <div className=" flex justify-start items-center flex-wrap gap-2">

            {dataGenres.genres.length > 0 ? (

                dataGenres.genres.map((genre) => (
                    <SheetClose asChild key={genre.id}>
                        <Link href={`/movies/genre/${genre.id}`} className={buttonVariants({ variant: "outline" }, cva("hover:bg-red-800 "))}>
                            <span className=" hover:btn-link ">{genre.name}
                            </span>
                        </Link>
                    </SheetClose>
                ))
            ) : (
                <div className="flex justify-center items-center">
                    <h1 className="text-2xl font-bold text-red-700">Oops ! No genres available at the moment.</h1>
                </div>
            )
            }
            <br />
            <br />
            <div className="flex justify-start items-center  flex-wrap text-center font-bold text-xl gap-2">
                <h1>Choose your favorite TV show genre and dive into endless entertainment.
                </h1>
                <h2><MdLiveTv size={48} className="" /></h2>
            </div>


            {dataGenresListTv.genres && (
                
                dataGenresListTv.genres.map((genre) => (
                    <SheetClose asChild key={genre.id}>
                        <Link href={`/tv/genre/${genre.id}`} className={buttonVariants({ variant: "outline" })}>
                            {genre.name}
                        </Link>
                    </SheetClose>
                ))
            )
        }
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
                            <h1>Choose your favorite genre from a wide selection of movies.
                            </h1>
                            <h2><BiCameraMovie size={25} className="" /></h2>
                        </div>
                        <div>
                            <ListGenre />
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

        </div>
    )
}