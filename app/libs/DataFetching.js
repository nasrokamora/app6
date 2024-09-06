

export const urlImage = "https://image.tmdb.org/t/p/original"

// getDiscoverMovies
export async function getDiscoverMovies() {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_API_KEY}`,{}, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      }
    })
    if (!res.ok) {
      throw new Error("failed to fetch data DiscoverMovies")
    }
    return res.json()
  }

  //get Movies by id
  export async function getMoviesId(id){
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_API_KEY}`,{
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        accept: "application/json"
      }  
    })
      if (!response.ok) {
        throw new Error("failed to fetch data id")
      }
    return response.json()
  }
 
  //Popular Movies
export async function getPopularMovies(){
  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_API_KEY}&page=2`,{
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      accept: "application/json"
    }  

  })
  if(!response.ok){
    throw new Error("failed to fetch data popular")
  }
  return response.json()
}

// By Genres Movies
  export async function getGenres() {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_API_KEY}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("failed to fetch dataGenres");
    }
    return response.json();
  }

  export async function getImageMoviesId(id) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.NEXT_API_KEY}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        accept: "application/json"
      }  
    })
    if (!res.ok) {
        throw new Error('failed to fetch data Image movies')
    }
    return res.json()
}

// Moveis Credits
export async function getCriditsMovies(id){
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_API_KEY}`,{
    headers: {
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      accept: "application/json"
    }  
  })
  if (!res.ok) {
    throw new Error('failed to fetch data Credits Movies')
  }
  return res.json()
}


export async function getPersonsId(person_id) {
  const response = await fetch(`https://api.themoviedb.org/3/person/${person_id}?api_key=${process.env.NEXT_API_KEY}`,{
    headers: {
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      accept: "application/json"
    }  
  }
  )
  if (!response.ok) {
    return {error: true, message: 'failed to fetch data Person Id'}
  }
  return response.json()
}
export async function getCreditsId(credit_id) {
  try{
    const res = await fetch(`https://api.themoviedb.org/3/credit/${credit_id}?api_key=${process.env.NEXT_API_KEY}`,{
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        accept: "application/json"
      }  
    })
  
    if (!res.ok) {
      throw new Error('failed to fetch data Credits Id')
      // return {error: true, message: 'failed to fetch data Credits Id'}
        // throw new Error(' ') 
    }
    return res.json()
    // const data = await res.json()
    // return {error: false, data}
  }catch(error){
    return {error: true, message: error.message}
  }

  
}

export async function getReviewsMovies(id) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.NEXT_API_KEY}`,{
    headers: {
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      accept: "application/json"
    }  
  })
  if (!res.ok) {
    throw new Error('failed to fetch data Reviews Movies')
  }
  return res.json()
}


export async function getMoviesSimilar(id) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.NEXT_API_KEY}`,{
  })
  if (!res.ok) {
    throw new Error('failed to fetch data Similar')
  }
  return res.json()
}


export async function getTrendingMovies() {
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_API_KEY}`,{
    headers: {
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      accept: "application/json"
    }  
  })
  if (!res.ok) {
    throw new Error('failed to fetch data')
  }
  return res.json()
}
export async function getLatestMovies(){
  const res = await fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${process.env.NEXT_API_KEY}`,{
    headers: {
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      accept: "application/json"
    }  
  })
  if (!res.ok) {
    throw new Error('failed to fetch data Latest')
  }
  return res.json()
}

export async function getRecommendationMovies(id){
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.NEXT_API_KEY}`,{
    headres: {
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      accept: "application/json"
    }
  })
  if(!response.ok){
    throw new Error('Failed to fetch data Recommendation movies')
  }
  return response.json()
}


export async function getMoviesNowPlaying(){
  const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_API_KEY}&page=4`,{
    headers: {
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      accept: "application/json"
    }  
  })
  if(!res.ok){
    throw new Error('Failed to fetch data now movies')
}
  return res.json()
}

export async function getPersonPopular() {
  const response = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.NEXT_API_KEY}`,{
    headers: {
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      accept: "application/json"
    }
  })
  if(!response.ok){
    throw new Error('Failed to fetch data Person')
  }
  return response.json()
}