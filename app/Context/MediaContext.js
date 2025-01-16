"use client"
import { createContext, useCallback, useReducer, useContext } from "react"
import { urlImageTv, urlImageTv500 } from "../libs/DataFetchingTv"
import blurImage from "../../public/image/blurImage.webp"


const initialState = {
    currentPageType: 'tv',
    currentTv: {
        image: "",
        name: "",
        firstAirDate: null,
        overview: null,
        voteAverage: null,
        popularity: null,
        voteCount: null,
        detailsTv: {},
        isLoading: false
    },
    currentMovie: {
        image: "",
        title: null,
        releaseDate: null,
        voteAverage: null,
        overview: null,
        popularity: null,
        voteCount: null,
        detailsMovie: {},
        isLoading: false
    }
}


const mediaReducer = (state, action) => {
    switch (action.type) {
        case "SET_CURENT_PAGE_TYPE": 
        return { 
            ...state, 
            setCurentPageType: action.payload }
        case "SET_CURRENT_TV":
            return {
                ...state,
                currentTv: {
                    ...action.payload,
                    isLoading: false
                }
            }
        case "SET_CURRENT_MOVIE":
            return {
                ...state,
                currentMovie: {
                    ...action.payload,
                    isLoading: false
                }
            }
        case "SET_LOADING":
            return {
                ...state,
                currentTv: {
                    ...state.currentTv,
                    isLoading: action.payload
                },
                currentMovie: {
                    ...state.currentMovie,
                    isLoading: action.payload
                }
            }
        default:
            return state
    }
}

const MediaContext = createContext()

const ErrorPathImage = () => {
    if (!tv.backdrop_path) {
        return (
            <h1>Image not found</h1>
        )
    }
}


export const MediaProvider = ({ children }) => {
    const [state, dispatch] = useReducer(mediaReducer, initialState)

    //function to update current tv
    const updateCurrentTv = useCallback(async (tv) => {
        dispatch({ type: "SET_LOADING", payload: true })
        dispatch({ type: "SET_CURENT_PAGE_TYPE", payload: 'tv' })

        const newImage = tv.backdrop_path ? `${urlImageTv500}/${tv.backdrop_path}` : <ErrorPathImage />
        const img = new window.Image()
        img.src = newImage
        img.onload = async () => {
            const detailsTv = await fetchDetailsTvById(tv.id)
            dispatch({
                type: "SET_CURRENT_TV",
                payload: {
                    image: newImage,
                    name: tv.original_name ? tv.original_name : tv.name,
                    firstAirDate: tv.first_air_date.replace(/-/g, "/") || "N/A",
                    overview: tv.overview.slice(0, 500) || "Unknown",
                    voteAverage: tv.vote_average.toFixed(1) || "N/A",
                    popularity: tv.popularity || "N/A",
                    voteCount: tv.vote_count || "N/A",
                    detailsTv: detailsTv || {},
                    isLoading: false
                }
            })
            // onerror = (error) => {
            //     if (process.env.NODE_ENV !== "production") {
            //         console.error(error, "Failed to load image for tv genre")
            //     }
            //     dispatch({
            //         type: "SET_LOADING",
            //         payload: {
            //             isLoading: false
            //         },
            //     })
            // }
        }
        //on error
    }, [])

    //function to update current movie
    const updateCurretMovie = useCallback(async (movie) => {
        dispatch({ type: "SET_LOADING", payload: true })
        dispatch({ type: "SET_CURENT_PAGE_TYPE", payload: 'movie' })
        


        const newImage = movie.backdrop_path ? `${urlImageTv500}/${movie.backdrop_path}` : blurImage
        const img = new window.Image()
        img.src = newImage
        img.onload = async () => {
            const detailsMovie = await fetchMoviesByid(movie.id)
            dispatch({
                type: "SET_CURRENT_MOVIE",
                payload: {
                    image: newImage,
                    title: movie.original_title ? movie.original_title : movie.title,
                    releaseDate: movie.release_date || "N/A",
                    voteAverage: movie.vote_average || "N/A",
                    overview: movie.overview || "Unknown",
                    popularity: movie.popularity || "N/A",
                    voteCount: movie.vote_count || "N/A",
                    detailsMovie: detailsMovie || {},
                    isLoading: false
                }
            })
            img.onerror = (error) => {
                if (process.env.NODE_ENV !== "production") {
                    console.error(error, "Failed to load image for tv genre")
                }
                dispatch({
                    type: "SET_LOADING",
                    payload: {
                        isLoading: false
                    },
                })
            }
        }
    }, [])


    const fetchDetailsTvById = async (tvId) => {
        console.log("Fetching TV details for ID:", tvId)
        try {
            const response = await fetch(`/api/getDetailsTv?tvId=${tvId}`, {
                next: {
                    revalidate: 7200
                }
            })
            if (!response.ok) {
                throw new Error("Network response was not ok")
            }
            const data = await response.json()
            // console.log(data)
            return data
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error(error, "Failed to fetch data DetailsTv");
            }
            return {}
        }
    }
    const fetchMoviesByid = async (movieId) => {
        try {
            const response = await fetch(`/api/getMoviesById?movieId=${movieId}`)
            if (!response.ok) {
                throw new Error("Network response was not ok")
            }
            const data = await response.json()
            return data
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.error(error, "Failed to fetch data MoviesById");
            }
            return {}
        }
    }

    return (
        <MediaContext.Provider value={{
            state, updateCurrentTv, updateCurretMovie
        }}
        >
            {children}
        </MediaContext.Provider>
    )
}

export const useMediaContext = () => {
    const context = useContext(MediaContext);
    if (!context) {
        throw new Error("useMediaContext must be used within a MediaProvider");
    }
    return context
}