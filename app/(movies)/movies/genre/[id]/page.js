import { getMoviesGenre, getMoviesGenreList } from "@/app/libs/DataFetching";





export default async function MoviesGenre({ params }) {
    const {id} = params
    const data = await getMoviesGenre(id)
    const dataResult = data.results

    return(
        <div className=" w-full h-screen">
            {dataResult.map((movie) => (
                <div key={movie.id}>
                    <h1>{movie.title}</h1>
                </div>
            ))}
        </div>
    )
}