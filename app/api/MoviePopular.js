
export async function handler(req,res){
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
    res.status(200).json(data.results)
}