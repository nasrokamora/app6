import { SkeletonBackGroundImageGenres } from "@/app/(movies)/Components/BackGoundGenres/SkeletonGenres";
import { getMoviesGenre, getMoviesGenreList, getMoviesId } from "@/app/libs/DataFetching";
// import BackGroundImageGenres from "@/app/(movies)/Components/BackGoundGenres/BackGroundImageGenres";
import dynamic from 'next/dynamic'
import { Suspense } from "react";

const BackGroundImageGenres = dynamic(() => 
    import("@/app/(movies)/Components/BackGoundGenres/BackGroundImageGenres"), 
{ 
    ssr: false 

})

export default async function MoviesGenre({ params }) {
    const { id } = params
    const data = await getMoviesGenre(id)
    const dataResult = data.results
    const ids = dataResult.map(item => item.id)
    const detailsMovies = await getMoviesId(ids)
    // console.log(detailsMovies)
    return (
        <div className=" w-full h-screen ">
            <SkeletonBackGroundImageGenres >
            <BackGroundImageGenres dataResult={dataResult} detailsMovies={detailsMovies} />
            </SkeletonBackGroundImageGenres>
        </div>
    )
}