
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
import { SiGradleplaypublisher } from "react-icons/si";
import { YouTubeEmbed } from '@next/third-parties/google'




export default function TrailerEpisodes({trailerEpisodes}) {
    const dataTrailerEpisodes = trailerEpisodes.slice(0, 1);


    return(
        <div className="  w-full  md:flex md:justify-center md:items-center">
            <AlertDialog >
                <AlertDialogTrigger className=" border border-[#fffc40] p-2 rounded-md flex justify-center items-center gap-2   hover:scale-110 duration-300 " >
                <h1 className="mt-10 scroll-m-20  text-2xl font-bold tracking-tight transition-colors first:mt-0 bg-gradient-to-r from-[#a0ff58] via-[#fffc40] to-[#a0ff58] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                Trailer
                </h1>
                    <SiGradleplaypublisher size={28} className="text-[#a0ff58] " />

                </AlertDialogTrigger>
                <AlertDialogContent className=" border p-2 2xl:max-w-3xl xl:max-w-xl lg:max-w-xl md:h-screen md:max-w-3xl md:flex md:justify-center md:items-center md:gap-2">
                    {dataTrailerEpisodes && dataTrailerEpisodes.length > 0 ? (
                        dataTrailerEpisodes.map((item) => (
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

<div className="  flex justify-center items-center flex-col">
                            <AlertDialogTitle>Opps !</AlertDialogTitle>
                            <AlertDialogDescription className="text-xl font-bold text-error">
                                Undefined
                            </AlertDialogDescription>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </div>
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