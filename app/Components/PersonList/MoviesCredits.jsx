import Image from "next/image"

async function getPersonId(person_id) {
    const res = await fetch(`https://api.themoviedb.org/3/person/${person_id}/movie_credits?api_key=${process.env.NEXT_API_KEY}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
            accept: 'application/json'
        }
    })
    return res.json()
}




export default async function MoviesCredits({person_id, urlImage}) {
    const data = await getPersonId(person_id)
    const moviesCredit = data
    // console.log(MovieCredits)






    
    return (
        <div>
            {moviesCredit.original_title}
        </div>
    )
}