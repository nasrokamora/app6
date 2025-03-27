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
import { VideoPlayerMovies, VideoPlayerMoviesSRC, VideoPlayerSRCTo } from "./VideoPlayer"


export default function MoviesSource({ data }) {
    return (
        <div className="w-full flex justify-start gap-3 items-center flex-wrap">


            <button className="border p-1 border-zinc-600 rounded-md font-bold hover:text-red-700 hover:border-red-700 duration-500" onClick={() => document.getElementById('my_modal_3').showModal()}>VidSrc.pro</button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box max-w-full xl:max-w-7xl w-11/12 max-h-full bg-black/70 backdrop-blur">
                    <form method="dialog">

                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg"> {data.title ? data.title : "Unknown"} </h3>

                    <VideoPlayerMovies movieId={data.id} />
                </div>
            </dialog>

            <button className="border p-1 border-zinc-600 rounded-md font-bold hover:text-[#007bba] hover:border-[#007bba] duration-500" onClick={() => document.getElementById('my_modal_3').showModal()}>VID <span className="text-[#007bba]">SRC</span></button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box max-w-full xl:max-w-7xl w-11/12 max-h-full bg-black/70 backdrop-blur">
                    <form method="dialog">

                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg"> {data.title ? data.title : "Unknown"} </h3>

                    <VideoPlayerMoviesSRC movieId={data.id} />
                </div>
            </dialog>
            
            <button className="border p-1 border-[#fcd893] rounded-md font-bold hover:text-[#fece83] hover:border-[#fece83] duration-500" onClick={() => document.getElementById('my_modal_3').showModal()}>Vid. <span className="text-[#fece83]">to</span></button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box max-w-full xl:max-w-7xl w-11/12 max-h-full bg-black/70 backdrop-blur">
                    <form method="dialog">

                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg"> {data.title ? data.title : "Unknown"} </h3>

                    <VideoPlayerSRCTo movieId={data.id} />
                </div>
            </dialog>



            {/* <AlertDialog>
             https://vidsrc.xyz/embed/movie
             https://player.vidsrc.co/embed/movie/
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