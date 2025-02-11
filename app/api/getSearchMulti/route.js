import { handleRedisCache } from "@/app/libs/handleRedisCache"



export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('query')
    return handleRedisCache(`searchMulti:${query}`, 3600, async () => {        
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_API_KEY}&query=${encodeURIComponent(query)}`, {
                headers:{
                    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                    accept: "application/json"
                }
            })
            const data = await response.json()
            return new Response(JSON.stringify(data),{
                status: 200
            })
    
        } catch (error) {
            if(!process.env.NODE_ENV !== "production") {
                console.log(error, 'Failed to fetch data SearchMulti');
            }
            return new Response(JSON.stringify({ error: true, message: process.env.NODE_ENV === "production" ? 'An unexpected error occurred.' : error.message }), { status: 500 })
        }
    })
}