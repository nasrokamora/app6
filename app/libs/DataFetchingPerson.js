
export const urlImagesPerson = "https://image.tmdb.org/t/p/original"

const Headers = {
    "Authorization": `Bearer ${process.env.NEXT_API_TOKEN}`,
    "accept": "application/json"
}

export async function getPersonsImage(id) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/person/${id}/images`, {
            headers: Headers,
            cache:'force-cache'
        })
        if(!response.ok){
            throw new Error('failed to fetch Image Person')
        }
        return response.json()
    } catch (error) {
        return console.log(error, "failed to fetch data Image Person")
    }
}

export async function getExternelIdsPerson(id){
    const response = await  fetch(`https://api.themoviedb.org/3/person/${id}/external_ids`,{
        headers:Headers,
        cache:'force-cache'
    })
    if(!response.ok){
        throw new Error('failed to fetch Externel Ids Person')
    }
    return response.json()
}
export async function getCombinedCreditPerson(id) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits`, {
            headers: Headers
        })
        if(!response.ok){
            throw new Error('failed to fetch Person')
        }
        return response.json()
    } catch (error) {
        return console.log(error, "failed to fetch data Person")
    }
}

