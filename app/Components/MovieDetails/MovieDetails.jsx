

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaLink } from "react-icons/fa6"

async function getDetail(movie_Id) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_Id}?api_key=${process.env.NEXT_API_KEY}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`
        }
    })
    if (!response.ok) {
        throw new Error("failed to fetch dataDetails")
    }
    return  response.json()
}



export default async function MovieDetails({ movie_Id }) {
    const data = await getDetail(movie_Id)
    const detail = data
    // const [detail, setDetail] = useState([])
    // const [isLoading, setIsLoading] = useState(true)
    // const urlImage = 'https://image.tmdb.org/t/p/original'

    // useEffect(() => {
    //     async function getDetail() {
    //         const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_Id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`, {
    //             headers: {
    //                 Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
    //             }
    //         })
    //         const data = await response.json()
    //         setDetail(data)
    //         setIsLoading(false)
    //     }
    //     getDetail()
    // }, [])
    // console.log(detail)
    return (
        // isLoading ? <SkeletonDetail /> :
            <div>
                <div className="  flex gap-4 justify-start items-center  mt-5 flex-wrap">

                    <HoverCard >
                        <HoverCardTrigger asChild>
                            <Button variant="link" className="hover:text-[#cc0101] text-black text-md font-bold flex items-center"><FaLink className="mr-1" /> see more</Button>
                        </HoverCardTrigger>
                            <HoverCardContent className=" w-96  ml-5 bg-white/30 backdrop-blur">
                                <div className="">
                                    <Link className="" href={detail.homepage}>{detail.homepage}</Link>
                                </div>
                            </HoverCardContent>
                    </HoverCard>

                    <div className=" font-bold text-white">
                        <p><span className="text-black font-extrabold">popularity</span> : <span className="text-red-800">{detail.popularity}</span> </p>
                    </div>
                    <div className="">
                        {detail.production_companies.map((item, index) => (
                            <div key={index}>

                                <p  className="font-extrabold text-blue-700"> <span className="text-black">Production companies&nbsp;: </span> {item.name}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        {detail.production_countries.map((item, index) => (
                            <div key={index}>
                                <p  className="font-extrabold text-blue-700"> <span className="text-black">Production countries&nbsp;: </span> {item.name}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        {detail.budget ? (<p className="font-extrabold text-blue-700"> <span className="text-black">Budget&nbsp;: </span> <span className="text-red-800">{detail.budget}$</span> </p>) : null}
                    </div>
                </div >
                </div>

     
            
    )
}