"use client"

import { getDiscoverMovies } from "@/app/libs/DataFetching"
import { useState } from "react"



async function getGenre() {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US` )
        return await res.json()
    } catch (error) {
        console.log(error,"Error in getGenre")
    }
    }

async function getMovies(genreId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=${genreId}`)
        return await response.json()
    } catch (error) {
        console.log(error, "Error in getMovies");
    }
}
 
   



    export default function GenreMovies(){

        const [movies, setMovies] = useState([])
        const [selected, setSelected] = useState(null)
        const [genres, setGenres] = useState([])

            async function handleSelect(genreId) {
                const [movies,dataGenre] = await Promise.all([getMovies(genreId),getGenre()])            }
        return(
            <div>

            </div>
        )
    } 
        

    