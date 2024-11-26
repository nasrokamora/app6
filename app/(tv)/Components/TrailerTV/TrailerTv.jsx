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
// import VideosTrailerPalyer from "./VideoPlayer/VideosTrailerPlayer"
import { YouTubeEmbed } from '@next/third-parties/google'
import { FaRegCirclePlay } from "react-icons/fa6";




export default async function TrailerTv({ dataVideos }) {

    // console.log(dataVideos)
    return (
        <div>
            <AlertDialog >
                <AlertDialogTrigger asChild>
                <FaRegCirclePlay size={48} className="text-[#2556f8] hover:scale-110 duration-300 cursor-pointer" />

                </AlertDialogTrigger>
                <AlertDialogContent className=" lg:max-w-xl md:h-screen md:max-w-3xl md:flex md:justify-center md:items-center md:gap-2">
                    {dataVideos && dataVideos.length > 0 ?(
                    dataVideos.map((item) => (
                        <div key={item.id}>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    {item.name}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    {item.published_at}
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