

export async function GET(req){
    const {searchParams} = new URL(req.url)
    const page = searchParams.get('page')
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_API_KEY}&page=${page}`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                accept: "application/json"
            }
        })
        if(!response.ok) {
            throw new Error('Failed to fetch data Tv With Page')
        }
        const data = await response.json()
        return new Response(JSON.stringify(data), {
            status: 200,
        })
    } catch (error) {
        if(process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data TvWithPage');
        }
        return new Response(JSON.stringify({ error: true, message: error.message }), { status: 500 })
    }
}