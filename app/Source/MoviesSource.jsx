"use client"
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
import { VideoPlayerMovies } from "./VideoPlayer"


export default function MoviesSource({ data }) {
    return (
        <div className="w-full ">


            {/* <button className="border p-1 border-zinc-600 rounded-md font-bold hover:text-red-700 hover:border-red-700 duration-500" onClick={() => document.getElementById('my_modal_3').showModal()}>VidSrc.to</button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box max-w-full xl:max-w-7xl w-11/12">
                    <form method="dialog">

                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg"> {data.title ? data.title : "Unknown"} </h3>

                </div>
            </dialog> */}


            <VideoPlayerMovies movieId={data.id} />

            {/* <AlertDialog>
                <AlertDialogTrigger className=" border p-1 border-zinc-600 rounded-md font-bold hover:text-red-700 hover:border-red-700 duration-500">VidSrc.to</AlertDialogTrigger>
                <AlertDialogContent className=" md:h-screen overflow-y-scroll h-screen lg:h-screen max-w-full ">
                    <AlertDialogHeader>
                        <AlertDialogTitle> {data.title ? data.title : "Unknown"} </AlertDialogTitle>
                        <AlertDialogDescription>
                            {data.release_date ? data.release_date : "Unknown"}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog> */}

        </div>
    )
}