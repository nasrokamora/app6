import { YouTubeEmbed } from '@next/third-parties/google'

// import ReactPlayer from "react-player"


export default function VideosTrailerPalyer({key}){

    return(

            <YouTubeEmbed 
            videoId={key}
            width="100%"
            height="300px"
            params='controls=1'
            />

            


            // <ReactPlayer
            // url={`https://www.youtube.com/watch?v=${item.key}`} 
            // width="100%" 
            // height="300px" 
            // controls={true}
            // /> 
    )

}




