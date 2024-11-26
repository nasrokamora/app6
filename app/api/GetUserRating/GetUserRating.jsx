
export default async function handler(req, res) {
    const { id } = req.query
    const URL = `https://api.themoviedb.org/3/tv/${id}/account_states`;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_API_TOKEN}`
    }



    try {
        const response = await fetch(URL, {
            headers: headers
        })
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Error From fetch data' })
        }
        const data = await response.json()


        
        res.status(200).json({ rating: data.rated ? data.rated.value : null })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}