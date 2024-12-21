

export async function GET(request){

    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_API_KEY}&page=${page}`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                accept: "application/json",
            },
            cache:"no-store"
        })
        if(!response.ok) {
            throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        return new Response(JSON.stringify(data), {
            status: 200,
        })
    } catch (error) {
        if(process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data MoviesWithPage');
        }
        return new Response(JSON.stringify({ error: true, message: process.env.NODE_ENV === "production" ? 'An unexpected error occurred.' : error.message }), { status: 500 })
    }
}