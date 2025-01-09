
export async function GET(Request) {
    const { searchParams } = new URL(Request.url)
    const movieId = searchParams.get('movieId')
    if (!movieId)
        return new Response(JSON.stringify({
            error: true,
            message: 'Missing movieId'
        }), { status: 400 })
    try {
        const response = await fetch(`${process.env.TMDB_BASE_URL}/movie/${movieId}?api_key=${process.env.NEXT_API_KEY}`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                accept: "application/json"
            },
            next: {
                revalidate: 3600
            }
        })
        if (!response.ok) {
            throw new Error('Failed to fetch data MoviesById')
        }
        const data = await response.json()
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'cache-control': 'sm-max-age=3600, stale-while-revalidate'
            }
        })
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data MoviesById');
        }
        return new Response.JSON.stringify({
            error: true,
            message: process.env.NODE_ENV === "production" ? 'An unexpected error occurred.' : error.message,
            status: 500
        })
    }
}