"use client"
import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useEffect, useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import LoadingGenreCarousel from "@/app/Components/LoadingUi/LoadingGenreCarousel";
import no_image from '../../../../public/image/no_image4.webp'


export default function PaginationTvShow() {

    const [currentPage, setCurrentPage] = useState(1)
    const [dataTv, setDataTv] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchTvShow()
    }, [currentPage])

    const fetchTvShow = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/tv?page=${currentPage}`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                        accept: "application/json"
                    }
            })
            const data = await response.json()
            setDataTv(data.results)

        } catch (error) {
            console.log('failed fetch data =>pagination tv show', error)
        }
        setIsLoading(false)
    }


    const handleChangePageTv = (newPage) => {
        setCurrentPage(newPage)
    }
    return (
        <div className="w-full h-auto">
            <div className="flex justify-center  mb-2">
                <h1>Tv Show</h1>
            </div>
            <div className=" flex justify-center items-center w-full">

                {isLoading ? (
                    <LoadingGenreCarousel />
                ) : (
                    <ScrollArea className="max-w-3xl whitespace-nowrap rounded-md border p-4">
                        {dataTv &&  dataTv.length > 0 ? (
                            dataTv.map((tv) => (
                                <div key={tv.id} className=" w-full flex justify-start items-center gap-3">

                                    <div className=" w-full flex justify-start">
                                        <div className="relative overflow-hidden ">
                                            <Image
                                                src={tv.poster_path ?
                                                    `https://image.tmdb.org/t/p/original${tv.poster_path}`
                                                    :
                                                    no_image
                                                }
                                                alt="image_tv"
                                                width={140} height={140}
                                                className="rounded-md "
                                                priority
                                                loading="eager"
                                                style={{ width: "auto" }}
                                                draggable={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>
                                <h1>Error</h1>
                            </div>
                        )}
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                )
                }
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            className="cursor-pointer"
                            onClick={() => handleChangePageTv(currentPage - 1)}
                            disabled={currentPage === 1}
                        />
                    </PaginationItem>

                    {[...Array(5).map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                className='cursor-pointer'
                                onClick={() => handleChangePageTv(index + 1)}
                                isActive={currentPage === index + 1}
                            >

                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>

                    ))]}
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            className='cursor-pointer'
                            onClick={() => handleChangePageTv(currentPage + 1)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}