

import { getDetailsTv, getGenreTv} from "@/app/libs/DataFetchingTv";
// import BackGroundTvGenres from "@/app/(tv)/Components/BackGroundTvGenres/BackGroundTvGenres";
import ToggleButton from "@/app/(movies)/Components/ToggleButton/ToggleButton";
import dynamic from "next/dynamic";


export const metadata = {
    title: 'Magix Movies | TV Genres',
    description: 'Explore a variety of TV genres and find your favorite shows.',
}

const BackGroundTvGenres = dynamic(() => import('@/app/(tv)/Components/BackGroundTvGenres/BackGroundTvGenres'), { ssr: false })

export default async function GenrePageTv({ params }) {
    const { id } = params
    const genreData = await getGenreTv(id)
    const resultsGenre = genreData.results
    const detailsTVById = resultsGenre.map(item => item.id)
    const detailsTv = await getDetailsTv(detailsTVById)


    return (
        <div className="h-screen w-full">
            <BackGroundTvGenres resultTvGenres={resultsGenre} detailsTv={detailsTv} />
            <ToggleButton />
        </div>
    )
}



