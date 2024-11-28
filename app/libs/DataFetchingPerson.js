
export const urlImagesPerson = "https://image.tmdb.org/t/p/original"
const API_Key = process.env.NEXT_PUBLIC_API_KEY
const Headers = {
    "Authorization": `Bearer ${process.env.NEXT_API_TOKEN}`,
    "accept": "application/json"
}




export async function getPersonsId(personId) {
    try {
      const response = await fetch(`${process.env.TMDB_BASE_URL}/person/${personId}?api_key=${API_Key}`, {
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
        const response = await fetch(`${process.env.TMDB_BASE_URL}/person/${personId}/images?api_key=${API_Key}`, {
            headers: Headers,
            cache:'force-cache'
        })
        if(!response.ok){
            throw new Error('failed to fetch Image Person')
        }
        return response.json()
    } catch (error) {
        if(process.env.NODE_ENV !== "production") {
            console.log(error, "failed to fetch Image Person")
        }
        return {error: true, message: error.message}
    }
}

export async function getExternelIdsPerson(personId){
    try {
        const response = await  fetch(`${process.env.TMDB_BASE_URL}/person/${personId}/external_ids?api_key=${API_Key}`,{
            headers:Headers,
            cache:'force-cache'
        })
        if(!response.ok){
            throw new Error('failed to fetch Externel Ids Person')
        }
        return response.json()
        
    } catch (error) {
        if(process.env.NODE_ENV !== "production") {
            console.log(error, "failed to fetch Externel Ids Person")
        }
        return { error: true, message: error.message }
    }
    
    
}
export async function getCombinedCreditPerson(personId) {
    try {
        const response = await fetch(`${process.env.TMDB_BASE_URL}/person/${personId}/combined_credits?api_key=${API_Key}`, {
            headers: Headers,
            next: {
                revalidate: 7200
            }
        })
        if(!response.ok){
            throw new Error('failed to fetch combined credit person')
        }
        return response.json()
    } catch (error) {
        if(process.env.NODE_ENV !== "production") {
            console.log(error, "failed to fetch combined credit person")
        }
        return { error: true, message: error.message }

    }
}
