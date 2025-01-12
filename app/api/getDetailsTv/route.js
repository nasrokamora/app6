


export async function GET(Request){
    const { searchParams } = new URL(Request.url)
    const tvId = searchParams.get('tvId')
    if(!tvId) return new Response(JSON.stringify({error: true, message: 'Missing tvId'}),{status:400})
    try {
        const response = await fetch(`${process.env.TMDB_BASE_URL}/tv/${tvId}?api_key=${process.env.NEXT_API_KEY}`,{
            headers: {
                Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                accept: "application/json"
            },
            next: {
                revalidate: 7200
            }
        })
        if(!response.ok) {
            throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        return new Response(JSON.stringify(data),{
            status: 200,
            headers: {
                'cache-control': 'sm-max-age=7200, stale-while-revalidate'
            }
        })
    } catch (error) {
        if(process.env.NODE_ENV !== "production") { 
            console.log(error, 'Failed to fetch data DetailsTv');
        }
        return new Response(JSON.stringify({
            error: true, 
            message: process.env.NODE_ENV === "production" ? 'An unexpected error occurred.' : error.message}),
            {
                status:500
            })
    }
}