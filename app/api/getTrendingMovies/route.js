

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')

    try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_API_KEY}&page=${page}`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                accept: "application/json"
            }
        })
        const data = await response.json()
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'cache-control': 'sm-max-age=3600, stale-while-revalidate'
            }
        })
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data TrendingMovies');
        }
        return new Response(JSON.stringify({ error: true, message: error.message }), { status: 500 })
    }

}