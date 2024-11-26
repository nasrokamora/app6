import ReactPlayer from "react-player";
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
import { FaRegCirclePlay } from "react-icons/fa6";
import { LuMonitorPlay } from "react-icons/lu";


export default function TrailerSeason({ dataTrailerSeason }) {
    // console.log(dataTrailerSeason.results);
    const dataTrailer = dataTrailerSeason.results.slice(0, 1)

    return (
        <div className=" w-fit">
            <AlertDialog >
                <AlertDialogTrigger asChild>
                    <LuMonitorPlay size={48} className="text-[#1cccc3] hover:scale-110 duration-300 cursor-pointer" />

                </AlertDialogTrigger>
                <AlertDialogContent className=" 2xl:max-w-3xl xl:max-w-xl lg:max-w-xl md:h-screen md:max-w-3xl md:flex md:justify-center md:items-center md:gap-2">
                    {dataTrailer && dataTrailer.length > 0 ? (
                        dataTrailer.map((item) => (
                            <div key={item.id} >
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        {item.name}
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className=" pb-3">
                                        {item.published_at}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <YouTubeEmbed
                                    videoId={item.key}
                                    height={400}
                                    params='controls=1'
                                    style=""
                                    className=" object-fill rounded-md"
                                />

                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                                </AlertDialogFooter>
                            </div>
                        ))
                    ) : (
                        <div className="  flex justify-center items-center flex-col">
                            <h1 className="text-xl font-bold text-error">Undefined</h1>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </div>
                    )
                    }

                </AlertDialogContent>
            </AlertDialog>
        </div>
    )

}