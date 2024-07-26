import { getMoviesUpcoming } from "@/app/libs/ActionMovies"




export default async function DynamicUpComingMovies({params}) {
    const data = await getMoviesUpcoming(params.title)
    const dataUpComing = data.results.filter(movie => movie.title.toLowerCase().replace(/ /g, "_").replace(/[^\w-]+/g, "").replace(/--+/g, "_").replace(/\./g, "") === movie.title.toLowerCase().replace(/ /g, "_").replace(/[^\w-]+/g, "").replace(/--+/g, "_").replace(/\./g, ""))
    
    console.log(dataUpComing)
    
    return(
        <div>

        </div>
    )
}