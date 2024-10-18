
export const urlImagesPerson = "https://image.tmdb.org/t/p/original"

const Headers = {
    "Authorization": `Bearer ${process.env.NEXT_API_TOKEN}`,
    "accept": "application/json"
}




export async function getPersonsId(personId) {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/person/${personId}`, {
        headers: Headers,
        next:{
            revalidate:7200
        }
      }
      )
      return response.json()
  
    } catch (error) {
      return console.log(error, "failed to fetch data Person Id")
    }
  }


export async function getPersonsImage(personId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/person/${personId}/images`, {
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

export async function getExternelIdsPerson(personId){
    const response = await  fetch(`https://api.themoviedb.org/3/person/${personId}/external_ids`,{
        headers:Headers,
        cache:'force-cache'
    })
    if(!response.ok){
        throw new Error('failed to fetch Externel Ids Person')
    }
    return response.json()
}
export async function getCombinedCreditPerson(personId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/person/${personId}/combined_credits`, {
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
