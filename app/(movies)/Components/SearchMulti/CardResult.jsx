"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Link from "next/link"
import no_image from '../../../../public/image/no_image4.webp'



export default function CardResults({ movie, handleClick, handleClose }) {
    /** conmponent for search */
    const hasResults = movie && movie.length > 0


    return (
        <div className="  p-4    z-50 gap-5 w-full ">
            {hasResults && (
                <ScrollArea className="w-full  whitespace-nowrap  h-[80vh] xl:h-[50vh] " >
                    <div className="grid grid-cols-4 xl:grid-cols-5 md:grid-cols-3 md:overflow-hidden gap-3 border rounded-lg w-full h-[180vh] xl:h-[150vh] p-4">

                        {movie.map((movie) => (
                            <div key={movie.id} className=" overflow-hidden">
                                <div onClick={() => handleClick(movie)} className=" hover:scale-105 h-fit hover:duration-300 ">
                                    <Link href={`/${movie.media_type === 'movie' ? 'movies' : 'tv'}/list/${movie.id}`} >
                                        <div className="  overflow-hidden  flex justify-center items-center flex-col " onClick={() => handleClose()} >
                                            <Image src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : no_image}
                                                alt={movie.title || movie.name}
                                                width={100}
                                                height={100}
                                                priority
                                                style={{ width: "auto" }}
                                                className=" rounded-md "
                                                loading="eager"
                                            />
                                            <p className="font-semibold pt-1 ">{(movie.title || movie.name).length > 14 ? (movie.title || movie.name).slice(0, 14) + "..." : (movie.title || movie.name)}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                        <Button variant="outline" onClick={() => handleClose()}>Close</Button>

                    </div>
                    {/* <ScrollBar orientation="vertical" /> */}
                </ScrollArea>


            )
            }
        </div>
    )
}