import { getDiscoverMovies } from "@/app/libs/DataFetching"
import Image from "next/image"


export default async function Bg() {
    const data = await getDiscoverMovies()
    const ImageMovie = data.results
    const urlImage = "https://image.tmdb.org/t/p/original"


    return (
        <>
            {ImageMovie.map((movie) => (
                <main key={movie.id} className=" w-full h-[60vh] md:h-[100vh] relative overflow-hidden border">

                    <Image src={`${urlImage}${movie.backdrop_path}`} alt="bg-movies-xl"
                        fill
                        priority draggable={false}
                        style={{ objectFit: 'cover', backgroundPosition: "center", maxHeight: "100vh", opacity: "0.3" }}
                    />


                </main>
            ))}
        </>
    )
}