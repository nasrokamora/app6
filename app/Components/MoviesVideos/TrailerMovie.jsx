"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

export default function TrailerMovie({ movie_Id }) {

    const [dataVideo, setDataVideo] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_Id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
                    }
                })
                const data = await response.json()
                setDataVideo(data.results.slice(9,10))
                setIsLoading(false)
            } catch (error) {
                console.error(error, "Error")
            }
        }
        fetchVideo()
    }, [])
    
    return (
        <div className=" ">
            {isLoading ? (

                <Skeleton />

            ) : (
                <>
                    {dataVideo.map((video) => (
                        <div key={video.key} className="w-fit">
                            <iframe
                                width="300"
                                height="250"
                                src={`https://www.youtube.com/embed/${video.key}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ))}
                </>
            )
            }

        </div>
    )
}