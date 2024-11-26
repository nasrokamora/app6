"use client"

import { useEffect, useState } from "react"
import { MdOutlineInsertChartOutlined } from "react-icons/md"

export function AnimateNumberVote({}){}


export default function AnimateNumber({ vote_count }) {

const [persentage, setPersentage] = useState(0)

    // useEffect(() => {
    //     const targetPersentage = (vote_count)
    //     const interval = setInterval(() => {
    //         setPersentage((prev)=>{
    //             if(prev >= targetPersentage){
    //                 clearInterval(interval)
    //                 return targetPersentage
    //             }
    //             return prev + 100
    //         })
    //     },100)
    //     return () => clearInterval(interval)
    // },[vote_count])



    return(
        <div className=" flex justify-start gap-2 items-center">
        <strong className="font-bold text-2xl text-zinc-400 md:text-xl">Vote Count: </strong>
        <h1 className=" text-amber-400  scroll-m-20 text-xl xl:text-2xl  font-semibold flex justify-center items-center gap-2">
            {persentage}
            <span><MdOutlineInsertChartOutlined   size={30} className=" " /></span>
        </h1>
    </div>
    )
}