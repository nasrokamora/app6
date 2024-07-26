


import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

async function getVideoMovies(movie_Id){
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_Id}/videos?api_key=${process.env.NEXT_API_KEY}`)
    if(!response.ok){
        throw new Error('failed fetch data videos')
    }
    return response.json()
}


export default async function TrailerMovie({ movie_Id }) {
    const data = await getVideoMovies(movie_Id)
    const dataVideo = data.results.slice(0,1)


    
    return (
        <div className=" ">
 
                <>
                    {dataVideo.map((video) => (
                        <div key={video.key} className="w-fit">
                            <p>{video.name}</p>
                            <h1>{video.site}</h1>
                            <h1>{video.type}</h1>
                            <iframe
                                width="300"
                                height="250"
                                src={`https://www.youtube.com/embed/${video.key}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                SameSite="Strict"
                            ></iframe>
                        </div>
                    ))}
                </>
            


        </div>
    )
}