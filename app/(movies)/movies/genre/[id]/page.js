import SkeletonGenres from "@/app/(movies)/Components/BackGoundGenres/SkeletonGenres";
import { getMoviesGenre, getMoviesId } from "@/app/libs/DataFetching";
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
        <Suspense fallback={<SkeletonGenres />}>
                <BackGroundImageGenres dataResult={dataResult} detailsMovies={detailsMovies} />
  
        </Suspense>
    )
}