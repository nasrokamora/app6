"use client"

import { useEffect, useState,useRef } from "react"
import { urlImageTv } from "@/app/libs/DataFetchingTv"
import Image from "next/image"

export default function BackGroundTvGenres({ resultTvGenres }) {

    const [backgroundImageTvGenre, setBackgroundImageTvGenre] = useState(
        resultTvGenres[0]?.bckdrop_path ? `${urlImageTv}${resultTvGenres[0].bckdrop_path}` : "")

    const isItemRef = (node, index) => {
        if (node) {
            observer.observe(node)
            node.setAttribute('data-index', index)
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const tvIndex = entry.target.getAttribute('data-index')
                    const tv = resultTvGenres[tvIndex]
                    setBackgroundImageTvGenre(tv.bckdrop_path ? `${urlImageTv}${tv.bckdrop_path}` : "")
                }
            })
        },
            {
                root: null,
                threshold: 0.5
            }
        )
        return () => {
            observer.disconnect()
        }
    }, [resultTvGenres])




    return (
        <div className="w-full  h-screen overflow-hidden md:overflow-auto flex justify-center md:h-screen " style={{
            backgroundImage: `url(${backgroundImageTvGenre})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition:"background-image 0.5s easr"
        }}>

        <div className="mb-4 flex justify-center items-end">

        </div>



        </div>
    )


}