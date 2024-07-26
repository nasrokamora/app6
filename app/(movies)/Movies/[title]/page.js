
import Image from "next/image"
import Link from "next/link"
import DetailAllMovies from "../../Components/DetailMovies"
import { getPopularMovies } from "@/app/libs/DataFetching"








export async function generateMetadata({params}) {
    const data = await getPopularMovies(params.title)
    const popular = data.results
    return {
        title: popular.title
    }   
}



export default async function DynamicPopularMovies({params}){
    const title = params.title
    const data = await getPopularMovies(params.title)
    const popular = data.results.filter(movie => params.title.toLowerCase().replace(/ /g, "_").replace(/[^\w-]+/g, "").replace(/--+/g, "_").replace(/\./g, "") === movie.title.toLowerCase().replace(/ /g, "_").replace(/[^\w-]+/g, "").replace(/--+/g, "_").replace(/\./g, ""))
    
    // const dataSimilar = await getMovieSimilar(popular.title)
    // console.log(dataSimilar.results)
    
    // console.log(popular);

    // console.log(popular);
    return(
        <div className="w-full h-auto p-4  md:h-auto">
            <div>
                {popular.map(movie => (
                    <div key={movie.id}>
                        <div className=" flex justify-center md:flex-col">
                        <DetailAllMovies id={movie.id} />
                        
                    </div>
            </div>
                ))}
        <div>
        {/* <DynamicMoviesSimilar dataSimilar={dataSimilar} /> */}
        </div>
        </div>


        </div>
    )

}