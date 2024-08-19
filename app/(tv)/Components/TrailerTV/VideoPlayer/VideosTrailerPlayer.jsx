"use client"

import ReactPlayer from "react-player"


export default function VideosTrailerPalyer({item}){

    return(
            <ReactPlayer
            url={`https://www.youtube.com/watch?v=${item.key}`} 
            width="100%" 
            height="300px" 
            controls={true}
            /> 
    )

}




