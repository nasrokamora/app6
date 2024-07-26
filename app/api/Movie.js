
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const movieId = searchParams.get('id')

    if(!movieId){
        return new Response('bad request', {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const response = await fetch(`https://api.themoviedb.org/3/tv/${movieId}?api_key=${process.env.NEXT_API_KEY}`)
    const data = await response.json()

    return new Response(JSON.stringify(data), {
        headers :{
            'Content-type': 'application/json'
        }
    })

}