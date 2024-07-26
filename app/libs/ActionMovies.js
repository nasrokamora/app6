


export async function getMoviesPopular(){
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_API_KEY}`,{
    headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        accept: "application/json"
    }
    })
    return response.json()
}


export async function getMoviesTopRated(){
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_API_KEY}`,{
    headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        accept: "application/json"
    }
    })
    return response.json()
}

export async function getMoviesUpcoming(){
    const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_API_KEY}`,{
    headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        accept: "application/json"
    }
    })
    return response.json()
}

export async function getMoviesNowPlaying(){
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_API_KEY}`,{
    headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        accept: "application/json"
    }
    })
    return response.json()
}
export const urlImage = "https://image.tmdb.org/t/p/original"