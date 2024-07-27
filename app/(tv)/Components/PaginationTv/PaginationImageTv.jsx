"use client"

import { urlImageTv } from "@/app/libs/DataFetchingTv"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function PaginationImageTv({imageTv, perPages}){
    
    
    
    
    const [currentPage,setCurrentPage] = useState(1)
    
    const totalPages = Math.ceil(imageTv.length / perPages)

    const startIndex = (currentPage - 1) * perPages
    const currentImages = imageTv.slice(startIndex, startIndex + perPages)

    const handleClick =(pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    console.log(currentImages)
    return(
        <div>
            <div className=" flex gap-3">

            {currentImages.map((item,index)=>(
                <div key={item.fill_path} className=" flex justify-start items-center">
                    <div className=" relative overflow-hidden flex gap-3">
                        <Image src={`${urlImageTv}${item.file_path}`} 
                        alt={item.file_path} 
                        width={300} 
                        height={300}
                        priority 
                        className=" "
                        />
                    </div>
                </div>
            ))}
            </div>


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