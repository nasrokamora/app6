
import Image from "next/image"
import { FaTheaterMasks } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { getMoviesGenreList } from "@/app/libs/DataFetching";
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link";
import { getGenreTvList } from "@/app/libs/DataFetchingTv";
import { MdLiveTv } from "react-icons/md";
import { cva } from "class-variance-authority";
import { IoMdCloseCircle } from "react-icons/io";



export default async function GenresListMovies() {
    const dataGenreMovie = getMoviesGenreList()
    const dataGenresTv = getGenreTvList()
    const [dataGenresMovies, dataGenresListTv] = await Promise.all([dataGenreMovie, dataGenresTv])
    return (
        <div className="drawer  ">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content cursor-pointer ">
                {/* Page content here */}

                <label htmlFor="my-drawer" className=" drawer-button ">
                    <FaTheaterMasks size={25} className="2xl:size-8 hover:text-sky-500 duration-300 cursor-pointer" />
                </label>
            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className=" bg-[#09090b] text-gray-400 h-screen  w-1/2 p-4 md:w-4/5 overflow-y-scroll  ">
                <label htmlFor="my-drawer" aria-label="close sidebar" className=""><IoMdCloseCircle size={25} className="cursor-pointer hover:text-yellow-500 transition-all ease-in-out duration-300 md:active:scale-95 md:active:translate-y-0.5" />
                </label>

                    <div className="mb-6 flex justify-center items-center flex-col mt-4">

                        <h1 className=" text-center text-2xl font-bold bg-gradient-to-r from-[#e0b526] via-[#9c40ff] to-[#e0b526] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient  ">Explore Movie and TV Show By Genres.</h1>
                        <p className="text-center italic pt-2 font-semibold bg-gradient-to-l from-[#60646b] via-[#ffffff] to-[#60646b] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient"> Whether you're a fan of movies or TV shows, there's something here for everyone.</p>
                    </div>
                    {/* Sidebar content here  */}
                    <div className=" flex flex-col gap-4">
                        {/* content genres movies distract  */}
                        <div className=" text-center mb-3">
                            <h1 className=" text-xl font-bold ">Choose your favorite genre from a wide selection of movies.</h1>
                        </div>
                        <div className="flex justify-start items-center flex-wrap gap-2">
                            {dataGenresMovies.genres && dataGenresMovies.genres.length > 0 ? (
                                dataGenresMovies.genres.map((genre) => (
                                    <div key={genre.id} className="  gap-2 text-white">
                                        <Link href={`/movies/genre/${genre.id}`} className={buttonVariants({ variant: "outline" }, cva("hover:bg-red-800 "))}>
                                            <span className=" hover:text-orange-500 md:active:scale-95 ">{genre.name}
                                            </span>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className=" text-red-700 font-bold text-2xl">
                                    <h1>Oops ! No genres available at the moment.</h1>
                                </div>
                            )}
                        </div>

                        {/* content genres tv *-*  */}
                        <div className="text-center mb-3">
                            <h1 className="text-xl font-bold">Choose your favorite TV show genre and dive into endless entertainment.</h1>
                        </div>
                        <div className="flex justify-start items-center flex-wrap gap-2">
                            {dataGenresListTv.genres && dataGenresListTv.genres.length > 0 ? (
                                dataGenresListTv.genres.map((genre) => (
                                    <div key={genre.id} className="  gap-2 text-white ">
                                        <Link href={`/tv/genre/${genre.id}`} className={buttonVariants({ variant: "outline", }, cva("bg-red-700"))}>
                                            <span className="hover:text-sky-500 md:active:scale-95  ">{genre.name}
                                            </span>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className=" text-red-700 font-bold text-2xl">
                                    <h1>Oops ! No genres available at the moment.</h1>
                                </div>
                            )}

                        </div>
                    </div>
                </ul>
            </div>
        </div>
    )
}