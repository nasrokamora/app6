"use client"


import Image from "next/image"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import DetailsEpisodesTv from "../DetailsEpisodesTv/DetailsEpisodesTv"
import { useEffect, useState } from "react"


export default  function DetailsSeasonTv({ season, id, season_number }) {


    const [data,setData] = useState([])
    
    useEffect(()=>{
        const fetchSeasonDetails = async (id,season_number)=>{
                const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${season_number}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
                {
                    headers:{
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    accept:"application/json"
                    }
                }
            )
            const results = await res.json()
            setData(results)
        }
        fetchSeasonDetails(id,season_number)
    },[])
    // console.log(data)


    return (
        <div className="">
            <div className=" flex justify-center items-center gap-2 scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">
                <strong className="text-[#123eac]" >Season :</strong>
                <h1 className="text-[#ecb329] underline decoration-yellow-500">{season.name}</h1>
            </div>
            <div className="pt-2 flex justify-center items-center text-[#52525b] itelic scroll-m-20 text-xl font-semibold tracking-tight">
                <h3>{season.air_date ? season.air_date.replace(/-/g, '/') : "Undefined"}</h3>
            </div>
            <div className=" flex justify-start gap-2 md:flex-col">
                <div className=" w-fit relative overflow-hidden md:flex md:justify-center md:items-center md:pt-2">
                    <Image src={`https://image.tmdb.org/t/p/original${season.poster_path ? season.poster_path : "Undefined"}`}
                        alt={season.name}
                        width={250}
                        height={150}
                        className=" rounded-md"
                        style={{ height: "auto" }}
                        priority />
                </div>
                <div className="">
                    <div>
                        <h1>
                            {season.name}
                        </h1>
                    </div>
                    <div className=" flex gap-1 flex-wrap justify-start items-center">
                        <strong className="text-[#52525b] font-bold text-2xl md:text-xl">Air Date :</strong>
                        <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            {data.air_date ? data.air_date.replace(/-/g, '/') : "Undefined"}
                        </h1>
                        {data.vote_average}
                    </div>
                </div>
            </div>
        </div>
    )
}