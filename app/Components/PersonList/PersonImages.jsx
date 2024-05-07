async function fetchImages(person_id) {
    const response = await fetch(`https://api.themoviedb.org/3/person/${person_id}/images?api_key=${process.env.NEXT_API_KEY}`,{
        headers: {
            Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
            accept: 'application/json'
        },
    })
    return response.json()
}