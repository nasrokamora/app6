"use client"

import { useEffect, useState } from "react"



export function NextPageTrending({}) {
    const [page,setPage] = useState(0)
    const [movies,setMovies] = useState([])


    useEffect(() => {
        setPage(page + 1)
    },[page])

    return(
        <div>

        </div>
    )
}