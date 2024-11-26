

export async function GET(){
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      }
    })
    const data = await res.json()
    return new Response(JSON.stringify(data), { status: 200 })
}