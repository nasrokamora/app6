


export const urlImageTv = "https://image.tmdb.org/t/p/original"
export const urlImageTv500 = "https://image.tmdb.org/t/p/w500"

const HEADERS = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    accept: "application/json"
}




export async function getDiscoverTv() {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_API_KEY}`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                accept: "application/json"
            }, next: {
                revalidate: 3600
            }
        })
        return res.json()
    } catch (error) {
        return console.log(error, "Failed to fetch data DiscoverTv")
    }

}

/** for fechting tv details */
export async function getDetailsTv(id) {

    try {
        const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_API_KEY}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                    accept: "application/json"
                }
            }
        )
        return res.json()
    } catch (error) {
        return console.log(error, 'Failed to fetch data DetailsTv')
    }
}

// for fechting tv images
export async function getImageTv(id) {

    try {
        const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/images?api_key=${process.env.NEXT_API_KEY}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                    accept: "application/json"
                },

            }, {
            cache: "force-cache"
        }
        )
        return res.json()
    } catch (error) {
        return console.log(error, 'Failed to fetch data ImageTv')
    }
}

// for fechting tv credits
export async function getTvCredits(id) {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.NEXT_API_KEY}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                    accept: "application/json"
                }
            }
        )
        return res.json()
    } catch (error) {
        return console.log(error, 'Failed to fetch data TvCredits')
    }
}

// for fechting tv external
export async function getExternalIdTv(id) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=${process.env.NEXT_API_KEY}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                    accept: "application/json"
                }
            }
        )
        return response.json()

    } catch (error) {
        return console.log(error, 'Failed to fetch data ExternalIdTv')
    }
}



export async function getPersonsIdTv(person_id) {
    const res = await fetch(`https://api.themoviedb.org/3/person/${person_id}?api_key=${process.env.NEXT_API_KEY}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                accept: "application/json"
            },
            next: {
                revalidate: 3600
            }
        }
    )
    if (!res.ok) {
        throw new Error("failed to fetch data PersonsIdTv")
    }
    return res.json()
}


// for fechting tv external
export async function getExtPersonsIdTv(person_id) {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/person/${person_id}/external_ids?api_key=${process.env.NEXT_API_KEY}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                    accept: "application/json"
                }
            }, {
            cache: "force-cache"
        }
        )
        return res.json()
    } catch (error) {
        return console.log(error, 'Failed to fetch data ExtPersonsIdTv')
    }
}


// for fechting tv details
export async function getDetailAllCredits(credit_id) {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/credit/${credit_id}?api_key=${process.env.NEXT_API_KEY}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                    accept: "application/json"
                },
                next: {
                    revalidate: 3600
                }
            }
        )
        return res.json()
    } catch (error) {
        return console.log(error, 'Failed to fetch data DetailAllCredits')
    }
}

/* end for fechting tv details */

/** hada ta3 laken 3ardoh fal cinema ta3 bakri wala no hhhhh */

export async function getScreenedTv(id) {
    const res = await fetch(`https://api.themoviedb.org/3/tv/{series_id}/screened_theatrically?api_key=${process.env.NEXT_API_KEY}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                accept: "application/json"
            }
        }
    )
    if (!res.ok) {
        throw new Error("failed to fetch data ScreenedTv")
    }
    return res.json()
}

/**hada hna fad peffff */


/** fetching top Tv */

export async function getTopTv() {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.NEXT_API_KEY}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                    accept: "application/json"
                },
                next: {
                    revalidate: 7200
                }
            }
        )
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error, 'Failed to fetch data TopTv')
    }

}

/** end fetching  */

export async function getDetailsSeasonCreditsTv(id, season_number) {

    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${season_number}/credits?api_key=${process.env.NEXT_API_KEY}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                accept: "application/json"
            }
        }
    )
    if (!res.ok) {
        throw new Error("failed to fetch data DetailsSeasonTv")
    }
    return res.json()
}

export async function getDetailsEpisodesTv(id, season_number, episode_number) {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${season_number}/episode/${episode_number}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,

        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                accept: "application/json"
            }
        }
    )
    return res.json()
}



// recommendations
export async function getRecommendationsTv(id) {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${process.env.NEXT_API_KEY}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                accept: "application/json"
            }, next: {
                revalidate: 3600
            }
        }
    )
    if (!res.ok) {
        throw new Error("failed to fetch data RecommendationsTv")
    }
    return res.json()
}

// Trending tv

export async function getTrendingTv() {
    const res = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.NEXT_API_KEY}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
            accept: "application/json"
        },
        next: {
            revalidate: 3600
        }
    })
    if (!res.ok) {
        throw new Error('failed to fetch TrendingTv')
    }
    return res.json()
}
// Latest Tv
export async function getLatestTv() {
    const response = await fetch(`https://api.themoviedb.org/3/tv/latest?api_key=${process.env.NEXT_API_KEY}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
            accept: "application/json"
        }
    })
    if (!response.ok) {
        throw new Error('failed to fetch LatestTv')
    }
    return response.json()
}


// videos tv

export async function getVideosTv(id) {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.NEXT_API_KEY}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
            accept: "application/json"
        }
    })
    if (!response.ok) {
        throw new Error("failed to fetch data VideosTv")
    }
    return response.json()
}

// similar tv shows

export async function getSimilarTv(id) {
    try {     
        const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/similar`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                accept: "application/json"
            }
        })
        if(response.ok){
            throw new Error("failed fetch similar tv");        
        }
        return response.json()
    } catch (error) {
       return console.log(error.message)
    }
}