

export const urlImage = "https://image.tmdb.org/t/p/original"

const Options = {
  headers: {
    "Authorization": `Bearer ${process.env.NEXT_API_TOKEN}`,
    "accept": "application/json"
  }
}

export const HEADERS = {
  "accept": "application/json",
  "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
}



// getDiscoverMovies
export async function getDiscoverMovies() {
  try {
    const res = await fetch(`${process.env.TMDB_BASE_URL}/discover/movie`, Options)
    if (!res.ok) {
      throw new Error('failed to fetch data discover')
    }
    return res.json()
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error, "failed to fetch data discover")
    }
    return { error: true, message: error.message };

  }

}

//get Movies by id
export async function getMoviesId(id) {
  try {
    const response = await fetch(`${process.env.TMDB_BASE_URL}/movie/${id}`, {
      ...Options,
      next: {
        revalidate: 3600
      }
    })

    if (!response.ok) {
      throw new Error('failed to fetch data id')
    }
    return response.json()

  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error, "failed to fetch data id")
    }
    return { error: true, message: error.message };
  }
}


// get Release data Movies
export async function getReleasDateMovies({ id }) {

  try {
    const response = await fetch(`${process.env.TMDB_BASE_URL}/movie/${id}/release_dates`, {
      ...Options,
      next: {
        revalidate: 3600
      }
    })
    return response.json()
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error, "failed to fetch data release")
    }
    return { error: true, message: error.message };
  }

}

//get Movies by genre
export async function getMoviesGenre(id) {
  try {
    const response = await fetch(`${process.env.TMDB_BASE_URL}/discover/movie?with_genres=${id}`, {
    ...Options, 

  }
)
    return response.json()
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error, "failed to fetch data genre")
    }
    return { error: true, message: error.message };
  }
}

//get Movies by genre List
export async function getMoviesGenreList() {
  try {
    const response = await fetch(`${process.env.TMDB_BASE_URL}/genre/movie/list`,Options)
    return response.json()
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error, "failed to fetch data genre")
    }
    return { error: true, message: error.message };
  }
}


//Popular Movies
export async function getPopularMovies() {
  try {
    const response = await fetch(`${process.env.TMDB_BASE_URL}/movie/popular?page=2`, {
      ...Options,
      next: {
        revalidate: 3600
      }
    }
)
    return response.json()

  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error, "failed to fetch data popular")
    }
    return { error: true, message: error.message };
  }
}


export async function getImageMoviesId(id) {
  try {
    const res = await fetch(`${process.env.TMDB_BASE_URL}/movie/${id}/images`, {
      ...Options,
      cache: "force-cache"
      })
    return res.json()
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error, "failed to fetch data image")
    }
  }
}

// Moveis Credits
export async function getCriditsMovies(id) {
  try {
    const res = await fetch(`${process.env.TMDB_BASE_URL}/movie/${id}/credits`, Options)
    return res.json()
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error, "failed to fetch data Credits Movies")
    }
    return { error: true, message: error.message };
  }
}



export async function getCreditsId(credit_id) {
  try {
    const res = await fetch(`${process.env.TMDB_BASE_URL}/credit/${credit_id}`, {
      ...Options,
      next: {
        revalidate: 3600
      }
    })

    if (!res.ok) {
      throw new Error('failed to fetch data Credits Id')
    }
    return res.json()

  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error, "failed to fetch data Credits Id")
    }
    return { error: true, message: error.message };
  }


}

export async function getReviewsMovies(id) {
  try {
    const res = await fetch(`${process.env.TMDB_BASE_URL}/movie/${id}/reviews`, {
      ...Options,
      next: {
        revalidate: 240
      }
    })

    return res.json()

  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error, "failed to fetch data Reviews Movies")
    }
    return { error: true, message: error.message };
  }
}

// Similar Movies
export async function getMoviesSimilar(id) {
  try {
    const res = await fetch(`${process.env.TMDB_BASE_URL}/movie/${id}/similar?api_key=${process.env.NEXT_API_KEY}`, {
      ...Options,
      cache: "force-cache"
    })
    return res.json()
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error, "failed to fetch data Similar Movies")
    }
    return { error: true, message: error.message };
  }
}


// Trending Movies
export async function getTrendingMovies() {
  try {
    const res = await fetch(`${process.env.TMDB_BASE_URL}/trending/movie/day`, {
      ...Options,
      next: {
        revalidate: 3600
      }
    })

    return res.json()
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error, "failed to fetch data Trending Movies")
    }
    return { error: true, message: error.message }
  }
}

// Recommendation Movies
export async function getRecommendationMovies(id) {

  try {
    const response = await fetch(`${process.env.TMDB_BASE_URL}/movie/${id}/recommendations`, {
      ...Options,
      next: {
        revalidate: 1800
      }
    })
    return response.json()

  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error, "failed to fetch data Recommendation")
    }
    return { error: true, message: error.message }
  }

}

// Movie Now Playing
export async function getMoviesNowPlaying() {


  try {
    const res = await fetch(`${process.env.TMDB_BASE_URL}/movie/now_playing?&page=4`, {
      ...Options,
      next: {
        revalidate: 3600
      }
    })
    return res.json()
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error, "failed to fetch data Now Playing")
    }
    return { error: true, message: error.message }
  }
}

// Person Popular
export async function getPersonPopular() {

  try {
    const response = await fetch(`${process.env.TMDB_BASE_URL}/person/popular`, {
      ...Options,
      next: {
        revalidate: 3600
      }
    })

    return response.json()
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error, "failed to fetch data Person")
    }
    return { error: true, message: error.message }
  }
}

//get popular person page 2
export async function getPersonPopularPage2() {
  try {
    const response = await fetch(`${process.env.TMDB_BASE_URL}/person/popular?&page=2`, {
      ...Options,
      next: {
        revalidate: 3600
      }
    })

    return response.json()
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error, "failed to fetch data Person")
    }
    return { error: true, message: error.message }
  }
}



//get Trelair
export async function getTrailer(id) {
  try {
    const res = await fetch(`${process.env.TMDB_BASE_URL}/movie/${id}/videos`, Options)

    return res.json()
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error, "failed to fetch data Trailer")
    }
    return { error: true, message: error.message }
  }
}

export async function getPersonId(person_id) {
  try {
    const response = await fetch(`${process.env.TMDB_BASE_URL}/person/${person_id}`, Options)
    return response.json()

  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error, "failed to fetch data Person")
    }
    return { error: true, message: error.message }
  }
}

export async function getExternalIdMovies(id) {
  try {
    const response = await fetch(`${process.env.TMDB_BASE_URL}/movie/${id}/external_ids`, {
      ...Options,
      cache: "force-cache"
    })
    if (!response.ok) {
      throw new Error("failed to fetch data external id")
    }
    return response.json()
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.log(error, 'failed to fetch data external id')
    }
    return { error: true, message: error.message }
  }
}
