"use client"

import { useEffect, useState } from "react"


export default function BtnGenre({getDataMovieWithGenre}){
   const [genre, setGenre] = useState([])   
   const [selected, setSelected] = useState(null)

    const fetchGenreMovie = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    accept:"application/json"
                }  
            })
            const data = await response.json()
            setGenre(data.genres)
            if(data.genres.length > 0){
                setSelected(data.genres[0].id)
                getDataMovieWithGenre(data.genres[0].id)
            }


        } catch (error) {
            
        }
    }

   useEffect(() => {
       fetchGenreMovie()
   },[selected])

   const handleClick = (genreId) => {
       setSelected(genreId)
    getDataMovieWithGenre(genreId)
   }
   
   
    return(
        <div>
            {genre.map((item, index) => (
                <div>
                    <button key={index} className="btn btn-outline btn-primary btn-sm" onClick={() => handleClick(item.id)}>{item.name}</button>
                </div>
            ))}
        </div>
    )
}