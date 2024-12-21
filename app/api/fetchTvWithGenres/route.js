


export async function GET(req) {
    const url = new URL(req.url)
    const genreId = url.searchParams.get('genreId')
    if(!genreId) {
        return new Response(JSON.stringify({error:true, message: 'Missing genreId'}),{status:400})
    }
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_API_KEY}&with_genres=${genreId}`,{
            headers:{
                Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                accept: "application/json"
            },
            cache: 'no-cache'
        })
        if(!response.ok) {
            throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        return new Response(JSON.stringify(data),{status:200})
    } catch (error) {
        if(process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data MoviesWithGenres');
        }
        return new Response(JSON.stringify({error:true, message: process.env.NODE_ENV === "production" ? 'An unexpected error occurred.' : error.message}),{status:500})
    }



}