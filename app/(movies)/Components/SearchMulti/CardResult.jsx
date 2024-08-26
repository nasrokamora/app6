"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Link from "next/link"



export default function CardResults({ movie, handleClick, handleClose }) {
        /** conmponent for search */
    
    return(
            <div className="  p-4    z-50 gap-5 w-full ">
                {movie.length > 0 && (
<ScrollArea className="w-full  whitespace-nowrap  h-[80vh] xl:h-[50vh] " >
<div className="grid grid-cols-4 xl:grid-cols-5 md:grid-cols-3 md:overflow-hidden gap-3 border rounded-lg w-full h-[180vh] xl:h-[150vh] p-4">

{movie.map((movie) => (
    <div key={movie.id} className=" overflow-hidden">
        <div onClick={() => handleClick(movie)} className=" hover:scale-105 h-fit hover:duration-300 ">
            <Link href={`/Movies/List/${movie.id}`}>
            <div className="  overflow-hidden  flex justify-center items-center flex-col " onClick={()=> handleClose()} >
                <Image src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} 
                width={150} 
                height={150} 
                priority
                style={{height:"auto"}}
                className=" rounded-md "
                />
            <p className="font-semibold pt-1 ">{movie.title.length > 14 ? movie.title.slice(0, 14) + "..." : movie.title}</p>
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