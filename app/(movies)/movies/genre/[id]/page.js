import { getMoviesGenre, getMoviesGenreList, getMoviesId } from "@/app/libs/DataFetching";
import BackGroundImageGenres from "@/app/(movies)/Components/BackGoundGenres/BackGroundImageGenres";


export default async function MoviesGenre({ params }) {
    const {id} = params
    const data = await getMoviesGenre(id)
    const dataResult = data.results
    const ids = dataResult.map(item => item.id)
    const detailsMovies = await getMoviesId(ids)
    // console.log(detailsMovies)
    return(
        <div className=" w-full h-auto ">
            <BackGroundImageGenres dataResult={dataResult} detailsMovies={detailsMovies} />
        </div>
    )
}