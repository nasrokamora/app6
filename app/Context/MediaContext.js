"use client"
import { createContext, useCallback, useReducer, useContext } from "react"
import { urlImageTv } from "../libs/DataFetchingTv"
import blurImage from "../../public/image/blurImage.webp"


const initialState = {
    currentTv: {
        image: "",
        name: "",
        firstAirDate: "",
        overview: "",
        voteAverage: "",
        popularity: "",
        voteCount: "",
        detailsTv: {},
        isLoading: false
    },
    currentMovie: {
        image: "",
        title: "",
        releaseDate: "",
        voteAverage: "",
        overview: "",
        popularity: "",
        voteCount: "",
        detailsMovie: {},
        isLoading: false
    }
}


const mediaReducer = (state, action) => {
    switch (action.type) {
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

export const MediaProvider = ({ children }) => {
    const [state, dispatch] = useReducer(mediaReducer, initialState)

    //function to update current tv
    const updateCurretTv = useCallback(async (tv) => {
        dispatch({ type: "SET_LOADING", payload: true })

        const newImage = tv.backdrop_path ? `${urlImageTv}/${tv.backdrop_path}` : blurImage
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
        }
        //on error
        onerror = (error) => {
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
    }, [])

    //function to update current movie
    const updateCurretMovie = useCallback(async (movie) => {
        dispatch({ type: "SET_LOADING", payload: true })


        const newImage = movie.backdrop_path ? `${urlImageTv}/${movie.backdrop_path}` : blurImage
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
        }
        onerror = (error) => {
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
    }, [])


    const fetchDetailsTvById = async (tvId) => {
        try {
            const response = await fetch(`/api/getDetailsTv?tvId=${tvId}`,{
                next:{
                    revalidate:7200
                }
            })
            if (!response.ok) {
                throw new Error("Network response was not ok")
            }
            const data = await response.json()
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
            state, updateCurretTv, updateCurretMovie
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