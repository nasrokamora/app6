



export default async function GET(res) {
    const response = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.NEXT_API_KEY}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
            accept: "application/json"
        },
        cache:"no-store",
        method:"GET"
    })
    const data = await response.json()
    
    res.status(200).json(data)
}