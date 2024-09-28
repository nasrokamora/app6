


export const urlImage = "https://image.tmdb.org/t/p/original"

// getDiscoverMovies
export async function getDiscoverMovies() {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      }, next: {
        revalidate: 3600
      }
    })
    return res.json()
  } catch (error) {
    return console.log(error, "failed to fetch data discover")
  }

}

//get Movies by id
export async function getMoviesId(id) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        accept: "application/json"
      }
    }, { cache: 'force-cache' })

    return response.json()

  } catch (error) {
    return console.log(error, "failed to fetch data id")
  }
}


// get Release data Movies
export async function getReleasDateMovies({ id }) {

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/release_dates`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        accept: "application/json"
      }
    })
    return response.json()
  } catch (error) {
    return console.log(error, "failed to fetch data releasDate")
  }

}




//Popular Movies
export async function getPopularMovies() {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?&page=2`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
          accept: "application/json"
        }

      })
    return response.json()

  } catch (error) {
    return console.log(error, "failed to fetch data popular")
  }
}

// By Genres Movies
export async function getGenres() {
  const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list`,
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
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/images`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        accept: "application/json"
      }
    },{cache:"force-store"})
    return res.json()
  } catch (error) {
    return console.log(error, "failed to fetch data Image movies")
  }
}

// Moveis Credits
export async function getCriditsMovies(id) {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        accept: "application/json"
      }
    })
    return res.json()
  } catch (error) {
    return console.log(error, "failed to fetch data Cridits Movies")
  }
}


export async function getPersonsId(person_id) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/person/${person_id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        accept: "application/json"
      }
    }
    )
    return response.json()

  } catch (error) {
    return console.log(error, "failed to fetch data Person Id")
  }
}
export async function getCreditsId(credit_id) {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/credit/${credit_id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        accept: "application/json"
      }
    })

    if (!res.ok) {
      throw new Error('failed to fetch data Credits Id')
    }
    return res.json()

  } catch (error) {
    return { error: true, message: error.message }
  }


}

export async function getReviewsMovies(id) {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.NEXT_API_KEY}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        accept: "application/json"
      }, next: {
        revalidate: 240
      }
    })

    return res.json()

  } catch (error) {
    return console.log(error, "failed to fetch data Reviews Movies")
  }
}

// Similar Movies
export async function getMoviesSimilar(id) {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.NEXT_API_KEY}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        accept: "application/json"
      }
    }, { 
      cache: "force-cache" 
    })

    return res.json()

  } catch (error) {
    return console.log(error, "failed to fetch data Similar")
  }
}


// Trending Movies
export async function getTrendingMovies() {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        accept: "application/json"
      },
      next: {
        revalidate: 3600
      }
    })

    return res.json()
  } catch (error) {
    return console.log(error, "failed to fetch data Trending")
  }
}

// Latest Movies
export async function getLatestMovies() {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/latest`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        accept: "application/json"
      }
    })
    return res.json()
  } catch (error) {
    return console.log(error, "failed to fetch data Latest")
  }

}
// Recommendation Movies
export async function getRecommendationMovies(id) {

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.NEXT_API_KEY}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        accept: "application/json"
      },next: {
        revalidate: 900
      }
    })
    return response.json()

  } catch (error) {
    return console.log(error, "failed to fetch data Recommendation")
  }

}

// Movie Now Playing
export async function getMoviesNowPlaying() {


  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?&page=4`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        accept: "application/json"
      }
    })
    return res.json()
  } catch (error) {
    return console.log(error, 'Failed to fetch data now movies')
  }
}

// Person Popular
export async function getPersonPopular() {

  try {
    const response = await fetch(`https://api.themoviedb.org/3/person/popular`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        accept: "application/json"
      },next:{
        revalidate:900
      }
    })
    return response.json()
  } catch (error) {
    return console.log(error, "failed to fetch data Person")
  }

}
//get Trelair
export async function getTrailer(id) {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        accept: "application/json"
      }
    })

    return res.json()
  } catch (error) {
    return console.log(error, "failed to fetch data Trailer Movies")
  }
}


// get New Movies add 

export async function getChangesMovies({ id }) {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/changes`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        accept: "application/json"
      },
      next: {
        revalidate: 3600
      }
    })
    return res.json()
  } catch (error) {
    return console.log(error, "failed to fetch data Changes Movies")
  }

}