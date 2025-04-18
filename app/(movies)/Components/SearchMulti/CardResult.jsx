"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Link from "next/link"
import no_image from '../../../../public/image/no_image4.webp'

import ImagePosterPath from "@/app/libs/ImagePosterPath"



export default function CardResults({ movie, handleClick, handleClose }) {
    /** conmponent for search */
    const hasResults = movie && movie.length > 0

    // switch path by media type
    const getMediaTypePath = (mediaType) => {
        switch (mediaType) {
            case 'movie':
                return 'movies/list';
            case 'tv':
                return 'tv/list';
            case 'person':
                return 'person';
            default:
                return 'unknown';
        }
    }
    //path image in search 

    return (
        <div className="  p-4    z-50 gap-5 w-full ">
            {
                hasResults && (
                    <ScrollArea className="w-full  whitespace-nowrap  h-[80vh] xl:h-[50vh] " >
                        <div className="grid grid-cols-4 xl:grid-cols-5 md:grid-cols-3 md:overflow-hidden gap-3 border rounded-lg w-full h-[180vh] xl:h-[150vh] p-4">

                            {movie.map((movie) => (
                                <div key={movie.id} className=" overflow-hidden">
                                    <div onClick={() => handleClick(movie)} className=" hover:scale-105 h-fit hover:duration-300 ">
                                        <Link href={`/${getMediaTypePath(movie.media_type)}/${movie.id}`} >
                                            <div className="  overflow-hidden  flex justify-center items-center flex-col p-2 " onClick={() => handleClose()} >
                                                {movie.poster_path  && movie.poster_path.length > 0 ? (
                                                    <ImagePosterPath
                                                        width={100}
                                                        height={100}
                                                        index={movie.id}
                                                        tmdbPath={movie.poster_path || movie.profile_path || movie.backdrop_path}
                                                        quality={75}
                                                        style={{ height: "auto" }}
                                                        alt={movie.title || movie.name}
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <Image
                                                        src={no_image}
                                                        width={100}
                                                        height={100}
                                                        quality={75}
                                                        unoptimized={false}
                                                        priority
                                                        draggable={false}
                                                        alt="no image"
                                                    />
                                                )}

                                                <p className="font-semibold pt-1 md:hidden">{(movie.title || movie.name).length > 14 ? (movie.title || movie.name).slice(0, 14) + "..." : (movie.title || movie.name)}</p>
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