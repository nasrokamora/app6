


export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const page = searchParams.get('page')
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_API_KEY}&page=${page}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                    accept: "application/json"
                },
                cache:'force-cache'
            }
        )
        if (!response.ok) {
            throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        return new Response(JSON.stringify(data),
            {
                status: 200,
                headers: {
                    'cache-control': 'sm-max-age=3600, stale-while-revalidate'
                }
            }
        )

    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data TopRated');
        }
        return new Response(JSON.stringify(
            {
                error: true,
                message: process.env.NODE_ENV === "production" ? "An unexpected error occurred." : error.message
            }),
            {
                status: 500
            })
    }
}