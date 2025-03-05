import { getDiscoverMovies } from "../libs/DataFetching"


export const metadata = {
    title: 'Source | Magix Movies',
    description: '',
}



export default async function Source({}) {
    const data  = await getDiscoverMovies()
    const movieId = data.results.filter(movie => movie.id === movieId)
    return (
        <div className="w-full flex justify-center items-center py-10">
            <iframe
                src={`https://player.vidsrc.co/embed/movie/${movieId}`}
                width="100%"
                height="500px"
                allowFullScreen
                className="rounded-lg shadow-lg"
            />
        </div>
    )
}