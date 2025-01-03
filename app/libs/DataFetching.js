import { HandleErrors } from "./ErrorsHandler"


export const urlImage = "https://image.tmdb.org/t/p/original"

const Options = {
  headers: {
    "Authorization": `Bearer ${process.env.NEXT_API_TOKEN}`,
    "accept": "application/json"
  }
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
      return HandleErrors(error, "failed to fetch data discover")
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
    return HandleErrors(error, "failed to fetch data id")
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
    if (!response.ok) {
      throw new Error('failed to fetch data release')
    }
    return response.json()
  } catch (error) {
      return HandleErrors(error, "failed to fetch data release")
  }
}

//get Movies by genre
export async function getMoviesGenre(id) {
  try {
    const response = await fetch(`${process.env.TMDB_BASE_URL}/discover/movie?with_genres=${id}`, {
      ...Options,
      next: {
        revalidate: 7200
      }
    }
    )
    if (!response.ok) {
      throw new Error('failed to fetch data genre')
    }
    return response.json()
  } catch (error) {
    return HandleErrors(error, "failed to fetch data genre")
  }
}

//get Movies by genre List
export async function getMoviesGenreList() {
  try {
    const response = await fetch(`${process.env.TMDB_BASE_URL}/genre/movie/list`, Options)

    if (!response.ok) {
      throw new Error('failed to fetch data genre')
    }

    return response.json()
  } catch (error) {
    return HandleErrors(error, "failed to fetch data genre")
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
    if (!response.ok) {
      throw new Error('failed to fetch data popular')
    }
    return response.json()

  } catch (error) {
    return HandleErrors(error, "failed to fetch data popular")
  }
}


export async function getImageMoviesId(id) {
  try {
    const res = await fetch(`${process.env.TMDB_BASE_URL}/movie/${id}/images`, {
      ...Options,
      cache: "force-cache"
    })

    if (!res.ok) {
      throw new Error('failed to fetch data image')
    }

    return res.json()
  } catch (error) {
    return HandleErrors(error, "failed to fetch data image")
  }
}

// Moveis Credits
export async function getCriditsMovies(id) {
  try {
    const res = await fetch(`${process.env.TMDB_BASE_URL}/movie/${id}/credits`, Options)

    if (!res.ok) {
      throw new Error('failed to fetch data Credits Movies')
    }

    return res.json()

  } catch (error) {
    return HandleErrors(error, "failed to fetch data Credits Movies")
  }
}


// get Credits Id
export async function getCreditsId(credit_id) {
  try {
    const res = await fetch(`${process.env.TMDB_BASE_URL}/credit/${credit_id}`, {
      ...Options,
      next: {
        revalidate: 1700
      }
    })

    if (!res.ok) {
      throw new Error('failed to fetch data Credits Id')
    }
    return res.json()

  } catch (error) {
    return HandleErrors(error, "failed to fetch data Credits Id")
  }
}

export async function getReviewsMovies(id) {
  try {
    const res = await fetch(`${process.env.TMDB_BASE_URL}/movie/${id}/reviews`, {
      ...Options,
        cache:'no-store'
    })
    if (!res.ok) {
      throw new Error('failed to fetch data Reviews Movies')
    }
    return res.json()

  } catch (error) {
    return HandleErrors(error, "failed to fetch data Reviews Movies")
  }
}

// Similar Movies
export async function getMoviesSimilar(id) {
  try {
    const res = await fetch(`${process.env.TMDB_BASE_URL}/movie/${id}/similar?api_key=${process.env.NEXT_API_KEY}`, {
      ...Options,
      next: {
        revalidate: 3600
      }
    })

    if (!res.ok) {
      throw new Error('failed to fetch data Similar Movies')
    }

    return res.json()
  } catch (error) {
    return HandleErrors(error, "failed to fetch data Similar Movies")
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
    if (!res.ok) {
      throw new Error('failed to fetch data Trending Movies')
    }

    return res.json()
  } catch (error) {
    return HandleErrors(error, "failed to fetch data Trending Movies")
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
    if (!response.ok) {
      throw new Error('failed to fetch data Recommendation')
    }

    return response.json()

  } catch (error) {
    return HandleErrors(error, "failed to fetch data Recommendation")
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
    if (!res.ok) {
      throw new Error('failed to fetch data Now Playing')
    }
    return res.json()
  } catch (error) {
    return HandleErrors(error, "failed to fetch data Now Playing")
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
    return HandleErrors(error, "failed to fetch data Person")
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
    if (!response.ok) {
      throw new Error('failed to fetch data Person')
    }
    return response.json()
  } catch (error) {
    return HandleErrors(error, "failed to fetch data Person")
  }
}



//get Trelair
export async function getTrailer(id) {
  try {
    const res = await fetch(`${process.env.TMDB_BASE_URL}/movie/${id}/videos`, Options)
    if (!res.ok) {
      throw new Error("failed to fetch data Trailer")
    }
    return res.json()
  } catch (error) {
    return HandleErrors(error, "failed to fetch data Trailer")
  }
}

export async function getPersonId(person_id) {
  try {
    const response = await fetch(`${process.env.TMDB_BASE_URL}/person/${person_id}`, Options)
    if (!response.ok) {
      throw new Error("failed to fetch data Person")
    }
    return response.json()

  } catch (error) {
    return HandleErrors(error, "failed to fetch data Person")
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
    return HandleErrors(error, "failed to fetch data external id")
  }
}
