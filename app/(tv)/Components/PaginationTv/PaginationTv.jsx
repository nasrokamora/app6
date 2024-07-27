"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import DetailsSeasonTv from "../DetailsSeasonTv/DetailsSeasonTv"

export  function SeasonDetailsTv({id,season_number}){
const [dataSeason,setDataSeason] = useState([])

    useEffect(() => {
        const fetchSeasonDetails = async (id,season_number) =>{
            const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${season_number}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,{
                headers:{
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    accept:"application/json"
                    }
            })
            const data = await response.json()
            
            setDataSeason(data.episodes.filter(episode => episode.season_number === season_number))
        }
        fetchSeasonDetails(id,season_number)
    },[])
    console.log(dataSeason)

    return(
        <div>

        </div>
    )
}










export default function PaginationTv({ dataSeason, itemsPerPage, id }) {
    const [currentPage, setCurrentPage] = useState(1)

    const sortedItems = dataSeason.sort((a, b) => a.season_number - b.season_number)

    const totalPages = Math.ceil(sortedItems.length  / itemsPerPage)

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const startIndex = (currentPage - 1) * itemsPerPage
    // const endIndex = startIndex + itemsPerPage
    const currentItems = sortedItems.slice(startIndex, startIndex + itemsPerPage)
    // console.log(currentItems);
    return (
        <div>
            {/* <div className=" h-2/5 w-full">
                {currentItems.map((season,index) => (
                    <SeasonDetailsTv key={index}  season_number={season.season_number} id={id} />
                ))}
            </div> */}
            {/* pagination */}
            <div className=" h-2/4 p-10 flex justify-center items-center gap-6">
                <Button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </Button>
                {[...Array(totalPages)].map((_, index) => (
                    <Button key={index} onClick={() => handleClick(index + 1)} className={currentPage === index + 1  ? "active" : " hidden"}>
                        {index + 1}
                    </Button>
                ))}
                <Button onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </Button>
            </div>
        </div>
    )


}