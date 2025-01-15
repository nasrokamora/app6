
"use client"
import { createContext, useCallback, useContext, useReducer } from "react"
import { urlImageTv500 } from "../libs/DataFetchingTv"




const initialState = {
    setCurrentPage:null,
    currentMedia: {
        image: "",
        title: "",
        name: "",
        firstAirDate: null,
        releaseDate: null,
        voteAverage: null,
        overview: null,
        popularity: null,
        voteCount: null,
        detailsMedia: {},
        isLoading: false
    }
}


const mediaReducer = (state, action)=> {
    switch (action.type) {
        case "SET_CURRENT_PAGE": return { 
            ...state, 
            setCurrentPage: action.payload 
        }
        case "SET_CURRENT_MEDIA":
            return {
                ...state,
                currentMedia:{
                    ...action.payload,
                    isLoading: false
                }
            }
            case "SET_LOADING":
                return {
                    ...state,
                    currentMedia:{
                        ...state.currentMedia,
                        isLoading: action.payload
                    }
                }
                default:
                    return state
    }
}

const ContextMedia = createContext()

export const ContextProvider = ({children}) => {
    const {state,dispatch} = useReducer(mediaReducer, initialState)


    const updateCurrentMedia = useCallback(async (media,type) => {
        dispatch({ type: "SET_LOADING", payload: true })
        const newImage = media.backdrop_path ? `${urlImageTv500}/${media.backdrop_path}` : null
        const img = new window.Image()
        img.src = newImage
        img.onload = async ()=> {
            const detailsMedia = await fetchDetailsMediaById(media.id, type)
            dispatch({
                type: "SET_CURRENT_MEDIA",
                payload: {
                    image: newImage,
                    title:   media.title ? media.title : media.original_title,
                    name: media.name ? media.name : media.original_name,
                    releaseDate: media.release_date.replace(/-/g, "/") ? media.release_date.replace(/-/g, "/") : "N/A",
                    firstAirDate: media.first_air_date.replace(/-/g, "/") || "N/A",
                    voteAverage: media.vote_average.toFixed(1) || media.vote_average.toFixed(1),
                    overview: media.overview.slice(0, 500) || "Unknown",
                    popularity: media.popularity || "N/A",
                    voteCount: media.vote_count || "N/A",
                    detailsMedia: detailsMedia || {},
                    isLoading: false
                }
            })
        }
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
    }, [])

    const fetchDetailsMediaById = async (type,id) => {
        try {
            const endpoint = type === "tv" 
            ? `/api/getDetailsTv?tvId=${id}`
            : type === "movie"
            ? `/api/getMoviesById?movieId=${id}`
            : null
            const response = await fetch(endpoint,{
                ...(type === "tv" && {next: {revalidate: 7200}})
            })
            if (!response.ok) {
                throw new Error("Network response was not ok")
            }
            const data = await response.json()
            return data



        }catch (error) {
            if(process.env.NODE_ENV !== "production") {
                console.error(error, "Failed to fetch data DetailsMedia");
            }
            return {}
        }
    }
    return(
        <ContextMedia.Provider
        value={{
            state,
            updateCurrentMedia,
            
        }}
        >
            {children}
        </ContextMedia.Provider>
    )
}

export const  useContextMedia = () => {
    const context = useContext(ContextMedia)
    if(!context){
        throw new Error("useContextMedia must be used within a MediaProvider");
    }
    return context
}