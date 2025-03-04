import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { YouTubeEmbed } from '@next/third-parties/google'
import Link from "next/link"

import { IoPlayCircleOutline } from "react-icons/io5"




export default async function TrailerMovies({ dataTrailer,data }) {
    const dataTrailermovies = dataTrailer.results.slice(0, 1)
    // console.log(dataVideos)
    return (
        <div>
            <AlertDialog >
                    {/* <Button variant="outline" className="cursor-pointer">Trailer</Button> */}
                <AlertDialogTrigger asChild>
                <IoPlayCircleOutline size={48} className="text-[#f82525] hover:scale-110 duration-300 cursor-pointer" />
                </AlertDialogTrigger>
                <AlertDialogContent className=" lg:max-w-xl md:h-screen md:max-w-3xl md:flex md:justify-center md:items-center md:gap-2">

                <Link href={`https://vidsrc.dev/embed/movie/${data.id}`} className="pb-10">
                                Source
                                </Link>


                    {dataTrailermovies && dataTrailermovies.length > 0 ?(
                    dataTrailermovies.map((item) => (
                        <div key={item.id}>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    {item.name}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    {item.published_at}
                                    {item.type}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <YouTubeEmbed
                                videoId={item.key}
                                height={300}
                                params='controls=1'
                                style=""
                                className=" object-fill rounded-md"
                            />



                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>

                            </AlertDialogFooter>
                        </div>
                    ))
                    ):(
                        <div className="  flex justify-center items-center flex-col">
                            <AlertDialogTitle>Opps !</AlertDialogTitle>
                            <AlertDialogDescription className="text-xl font-bold text-error">
                                Undefined
                            </AlertDialogDescription>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </div>
                    )
}

                </AlertDialogContent>
            </AlertDialog>


        </div>
    )
}