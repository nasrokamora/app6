

export async function UpComingMovie() {

    const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_API_KEY}`)

    if (!res.ok) {
        throw new Error("failed to fetch data UpComingMovies")
    }
    return res.json()
}

