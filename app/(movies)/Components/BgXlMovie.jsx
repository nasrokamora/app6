import { getDiscoverMovies } from "@/app/libs/DataFetching"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import DetailAllMovies from "./DetailMovies"
import DetailImageMovies from "./DetailImageMovies"

// async function Details(movie_Id){

//     const res = await fetch(`https://api.themoviedb.org/3/movie/${movie_Id}?api_key=${process.env.NEXT_API_KEY}`, {
//         headers: {
//             Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`
//         }
//     })
//     if (!res.ok) {
//         throw new Error("failed to fetch data")
//     }
//     return res.json()
// }

//    export async function Fetails({movie_Id}){
//        const detail = await Details(movie_Id)

//         return(
//             <div className=" w-full flex bg-white/30 backdrop-blur">
//                 <Image src={`https://image.tmdb.org/t/p/original${detail.poster_path}`} 
//                 alt={detail.original_title}
//                 width={200} height={200} priority
//                 className=" md:hidden " 
//                 style={{height:"auto"}}
//                 />
//                 <div className="w-full p-5 text-2xl ">
//                     <div className=" flex-1 flex-col">
//                     <h1 className="text-[#000000] font-bold flex justify-center">{detail.original_title}</h1>
//                     <h3 className="font-bold">{detail.release_date.replace(/-/g, "/")}</h3>

//                     </div>
//                 </div>
//             </div>
//         )
//    }
   
    


export default async function BgMoviesXl() {
    const data = await getDiscoverMovies()
    const ImageMovie = data.results
    const urlImage = "https://image.tmdb.org/t/p/original"



    return (
        <div className=" w-full h-screen ">
            <Carousel className=" w-full  ">
                <CarouselContent>
            {ImageMovie.map((movie) => (
                 
                    <CarouselItem className="  " key={movie.id}>
                <div   className=" w-full h-[60vh] md:h-[100vh] relative overflow-hidden border ">

                    <Image src={`${urlImage}${movie.backdrop_path}`} alt="bg-movies-xl"
                        fill
                        priority draggable={false}
                        style={{ objectFit: 'cover', backgroundPosition: "center", maxHeight: "100vh", opacity: "0.3" }}
                    />

                    <div className=" flex jucstify-center items-center">
                    <div className="absolute top-8 left-16 w-4/5">
                        {/* <DetailAllMovies movie_id={movie.id}/> */}
                        {/* <Fetails movie_Id={movie.id} /> */}
                        {/* <DetailImageMovies movie_id={movie.id} /> */}
                    </div>

                    </div>
                </div>
                        </CarouselItem>
            ))}
            </CarouselContent>
            <div className=" max-w-sm ">
                        <CarouselNext className="" />
                        <CarouselPrevious />
                    </div>
            </Carousel>






        </div>

    )
}