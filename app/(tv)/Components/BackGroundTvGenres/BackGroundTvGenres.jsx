"use client"

import { useEffect, useState, useRef, useReducer } from "react"
import { urlImageTv } from "@/app/libs/DataFetchingTv"
import Image from "next/image"


const initialState = {
    currentTv: {
        image: "",
        name: "",
        firstAirDate: "",
        overview: "",
        voteAverage: "",
        popularity: "",
        voteCount: "",
        isLoading: false
    }
}
const TvReducer = (state, action) => {
    switch (action.type) {
        case "SET_CURRENT_TV":
            return {
                ...state,
                currentTv: action.payload
            }
        case "SET_LOADING":
            return {
                ...state,
                isLoading: action.payload
            }
    }
}
export default function BackGroundTvGenres({ resultTvGenres }) {


    const [state, dispatch] = useReducer(TvReducer, initialState)



    // const [backgroundImageTvGenre, setBackgroundImageTvGenre] = useState(
    //     resultTvGenres[0]?.bckdrop_path ? `${urlImageTv}${resultTvGenres[0].bckdrop_path}` : "")

    // const isItemRef = (node, index) => {
    //     if (node) {
    //         observer.observe(node)
    //         node.setAttribute('data-index', index)
    //     }
    // }
    const updateCurrentTv = (tv) => {
        dispatch({ type: "SET_LOADING", payload: true })

        const newImage = tv.bckdrop_path ? `${urlImageTv}${tv.bckdrop_path}` : "";
        const img = new window.Image()
        img.src = newImage
        img.onload = () => {
            dispatch({
                type: "SET_CURRENT_TV",
                payload: {
                    image: newImage,
                    name: tv.name,
                    firstAirDate: tv.first_air_date,
                    overview: tv.overview,
                    voteAverage: tv.vote_average,
                    popularity: tv.popularity,
                    voteCount: tv.vote_count,
                    isLoading: false
                }
            })
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const tvIndex = entry.target.getAttribute('data-index')
                    const tv = resultTvGenres[tvIndex]
                    updateCurrentTv(tv)
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
            backgroundImage: `url(${state.backgroundImageTvGenre})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 0.5s easr"
        }}>

            <div className="mb-4 flex justify-center items-end">

            </div>



        </div>
    )


}