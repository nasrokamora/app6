import { notFound } from "next/navigation"

export const urlImageTv = "https://image.tmdb.org/t/p/original"
export const urlImageTv500 = "https://image.tmdb.org/t/p/w500"

export async function getDiscoverTv() {
    try {
        const res = await fetch(`${process.env.TMDB_BASE_URL}/discover/tv?api_key=${process.env.NEXT_API_KEY}`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                accept: "application/json"
            }, next: {
                revalidate: 3600
            }
        })
        if (!res.ok) {
            throw new Error("failed to fetch data DiscoverTv")
        }
        return res.json()
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data DiscoverTv');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }

}

/** for fechting tv details */
export async function getDetailsTv(id) {
    try {
        const res = await fetch(`${process.env.TMDB_BASE_URL}/tv/${id}?api_key=${process.env.NEXT_API_KEY}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                    accept: "application/json"
                }
            }
        )
        if (!res.ok) {
            throw new Error("failed to fetch data DetailsTv")
        }
        return res.json()
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data DetailsTv');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}

// for fechting tv images
export async function getImageTv(id) {

    try {
        const res = await fetch(`${process.env.TMDB_BASE_URL}/tv/${id}/images?api_key=${process.env.NEXT_API_KEY}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                    accept: "application/json"
                },
            }, {
            cache: "force-cache"
        }
        )
        if (!res.ok) {
            throw new Error("failed to fetch data ImageTv")
        }
        return res.json()
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data ImageTv');
        }
        return {
            error: true, message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}

// for fechting tv credits
export async function getTvCredits(id) {
    try {
        const res = await fetch(`${process.env.TMDB_BASE_URL}/tv/${id}/credits?api_key=${process.env.NEXT_API_KEY}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                    accept: "application/json"
                }
            }
        )
        if (!res.ok) {
            throw new Error("failed to fetch data TvCredits")
        }
        return res.json()
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data TvCredits');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}

// for fechting tv external
export async function getExternalIdTv(id) {
    try {
        const response = await fetch(`${process.env.TMDB_BASE_URL}/tv/${id}/external_ids?api_key=${process.env.NEXT_API_KEY}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                    accept: "application/json"
                }
            }
        )
        if (!response.ok) {
            throw new Error("failed to fetch data ExternalIdTv")
        }
        return response.json()

    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data ExternalIdTv');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}



export async function getPersonsIdTv(person_id) {
    try {
        const res = await fetch(`${process.env.TMDB_BASE_URL}/person/${person_id}?api_key=${process.env.NEXT_API_KEY}`,
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
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data PersonsIdTv');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}


// for fechting tv external
export async function getExtPersonsIdTv(person_id) {
    try {
        const res = await fetch(`${process.env.TMDB_BASE_URL}/person/${person_id}/external_ids?api_key=${process.env.NEXT_API_KEY}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                    accept: "application/json"
                }
            }, {
            cache: "force-cache"
        }
        )
        if (!res.ok) {
            throw new Error("failed to fetch data ExtPersonsIdTv")
        }
        return res.json()
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data ExtPersonsIdTv');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}


// for fechting tv details
export async function getDetailAllCredits(credit_id) {
    try {
        const res = await fetch(`${process.env.TMDB_BASE_URL}/credit/${credit_id}?api_key=${process.env.NEXT_API_KEY}`,
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
            throw new Error("failed to fetch data DetailAllCredits")
        }
        return res.json()
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data DetailAllCredits');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}

/* end for fechting tv details */


/** fetching top Tv */

export async function getTopTv() {
    try {
        const res = await fetch(`${process.env.TMDB_BASE_URL}/tv/airing_today?api_key=${process.env.NEXT_API_KEY}`,
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
        if (!res.ok) {
            throw new Error("failed to fetch data TopTv")
        }
        const data = await res.json()
        return data
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data TopTv');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }

}


//fetch Genres Tv

export async function getGenreTvList() {

    try {
        const res = await fetch(`${process.env.TMDB_BASE_URL}/genre/tv/list`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                    accept: "application/json"
                },
                cache: "no-store"
            }
        )
        if (!res.ok) {
            throw new Error("failed to fetch data GenreTvList")
        }
        return res.json()
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data GenreTvList');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}


//genres tv by id

export async function getGenreTv(id) {
    try {
        const res = await fetch(`${process.env.TMDB_BASE_URL}/discover/tv?with_genres=${id}`,
            {
                method: "GET",
                headers:
                {
                    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                    accept: "application/json"
                },
                cache: "no-store"
            }
        )
        if (!res.ok) {
            throw new Error("failed to fetch data GenreTv")
        }
        return res.json()
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data GenreTv');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}

/** end fetching  */

/** for fechting season */
export async function getDetailsSeasonTv(id, season_number) {
    try {
        const response = await fetch(`${process.env.TMDB_BASE_URL}/tv/${id}/season/${season_number}?api_key=${process.env.NEXT_API_KEY}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                    accept: "application/json"
                }
            })
        if (!response.ok) {
            return notFound()
        }
        return response.json()
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data DetailsSeasonTv');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}


/** fetching season Images */

export async function getSeasonImagesTv(id, season_number) {
    try {
        const res = await fetch(`${process.env.TMDB_BASE_URL}/tv/${id}/season/${season_number}/images?api_key=${process.env.NEXT_API_KEY}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                    accept: "application/json"
                },
                cache: "force-cache"
            }
        )
        if (!res.ok) {
            throw new Error("failed to fetch data SeasonImagesTv")
        }
        return res.json()
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data SeasonImagesTv');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}

/** fetching season External ids */

export async function getSeasonExternalIdsTv(id, season_number) {
    try {
        const response = await fetch(`${process.env.TMDB_BASE_URL}/tv/${id}/season/${season_number}/external_ids`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                accept: "application/json"
            },
            cache: "force-cache"
        })
        if (!response.ok) {
            throw new Error("failed to fetch data SeasonExternalIdsTv")
        }
        return response.json()
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data SeasonExternalIdsTv');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}

/** fetching season credits */
export async function getDetailsSeasonCreditsTv(id, season_number) {
    try {
        const res = await fetch(`${process.env.TMDB_BASE_URL}/tv/${id}/season/${season_number}/credits?api_key=${process.env.NEXT_API_KEY}`,
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
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data DetailsSeasonCreditsTv');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}


/** fetching episodes details */
export async function getDetailsEpisodesTv(id, season_number, episode_number) {
    try {
        const res = await fetch(`${process.env.TMDB_BASE_URL}/tv/${id}/season/${season_number}/episode/${episode_number}?api_key=${process.env.NEXT_API_KEY}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                    accept: "application/json"
                }
            }
        )
        if (!res.ok) {
            throw new Error("failed to fetch data DetailsEpisodesTv")
        }
        return res.json()
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data DetailsEpisodesTv');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}

//fetching episodes images

export async function getEpisodesImagesTv(id, season_number, episode_number) {
    try {
        const res = await fetch(`${process.env.TMDB_BASE_URL}/tv/${id}/season/${season_number}/episode/${episode_number}/images?api_key=${process.env.NEXT_API_KEY}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                    accept: "application/json"
                }
            }
        )
        if (!res.ok) {
            throw new Error("failed to fetch data EpisodesImagesTv")
        }
        return res.json()
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data EpisodesImagesTv');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}

//fetching episodes credits
export async function getEpisodesCreditsTv(id, season_number, episode_number) {
    try {
        const response = await fetch(`${process.env.TMDB_BASE_URL}/tv/${id}/season/${season_number}/episode/${episode_number}/credits?api_key=${process.env.NEXT_API_KEY}`, {
            next: {
                revalidate: 3600,
            },
            headers: {
                Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                accept: "application/json"
            }
        })
        if (!response.ok) {
            throw new Error("failed to fetch data EpisodesCreditsTv")
        }
        return response.json()
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data EpisodesCreditsTv');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}

//fetching episodes trailers
export async function getTrailerEpisodesTv(id, season_number, episode_number) {
    try {
        const res = await fetch(`${process.env.TMDB_BASE_URL}/tv/${id}/season/${season_number}/episode/${episode_number}/videos?api_key=${process.env.NEXT_API_KEY}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                    accept: "application/json"
                }
            }
        )
        if (!res.ok) {
            throw new Error("failed to fetch data TrailerEpisodesTv")
        }
        return res.json()
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data TrailerEpisodesTv');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}



// recommendations
export async function getRecommendationsTv(id) {
    try {
        const res = await fetch(`${process.env.TMDB_BASE_URL}/tv/${id}/recommendations?api_key=${process.env.NEXT_API_KEY}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                    accept: "application/json"
                }, next: {
                    revalidate: 3600
                }
            }
        )
        if (!res.ok && res.status !== 200) {
            throw new Error("failed to fetch data RecommendationsTv")
        }
        return res.json()
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data RecommendationsTv');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}

// Trending tv

export async function getTrendingTv() {
    try {
        const res = await fetch(`${process.env.TMDB_BASE_URL}/trending/tv/day?api_key=${process.env.NEXT_API_KEY}`, {
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
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data TrendingTv');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}
// Latest Tv
export async function getLatestTv() {
    const response = await fetch(`${process.env.TMDB_BASE_URL}/tv/latest?api_key=${process.env.NEXT_API_KEY}`, {
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
    try {
        const response = await fetch(`${process.env.TMDB_BASE_URL}/tv/${id}/videos?api_key=${process.env.NEXT_API_KEY}&with_genres=true`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                accept: "application/json"
            }
        })
        if (!response.ok && response.status !== 200) {
            throw new Error("failed to fetch data VideosTv")
        }
        return response.json()
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data VideosTv');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}

// similar tv shows

export async function getSimilarTv(id) {
    try {
        const response = await fetch(`${process.env.TMDB_BASE_URL}/tv/${id}/similar`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                accept: "application/json"
            }
        })
        if (response.ok) {
            throw new Error("failed fetch similar tv");
        }
        return response.json()
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data SimilarTv');
        }
        return {
            error: true, message:
                process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}

export async function grtTrailerSeason(id, season_number) {
    try {
        const response = await fetch(`${process.env.TMDB_BASE_URL}/tv/${id}/season/${season_number}/videos?api_key=${process.env.NEXT_API_KEY}`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                accept: "application/json",
            },
            next: {
                revalidate: 3600
            }
        })
        if (!response.ok) {
            throw new Error("failed to fetch data trailerSeason");
        }
        return response.json()
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data trailerSeason');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}

export async function getAllTrending() {
    try {
        const response = await fetch(`${process.env.TMDB_BASE_URL}/trending/tv/week?api_key=${process.env.NEXT_API_KEY}`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                accept: "application/json"
            },
            next: {
                revalidate: 3600
            }
        })
        if (!response.ok) {
            throw new Error("failed to fetch data trailerSeason");
        }
        return response.json()
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data TrendingAll');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === "production" ? "An unexpected error occurred, please try again." : error.message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined
        };
    }
}