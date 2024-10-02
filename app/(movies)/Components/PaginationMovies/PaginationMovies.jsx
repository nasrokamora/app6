"use client"

import { useEffect, useRef, useState } from "react"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { HEADERS, headers } from "@/app/libs/DataFetching"
import LoadingGenreCarousel from "@/app/Components/LoadingUi/LoadingGenreCarousel";
import no_image from '../../../../public/image/no_image4.webp';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import { AlertCircle } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"


export default function PaginationMovies() {

    const [currentPage, setCurrentPage] = useState(1)
    const [dataMovies, setDataMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const cacheRef = useRef({})

    useEffect(() => {
        fetchMovies(currentPage)
    }, [currentPage])

    const fetchMovies = async (page) => {

        if (cacheRef.current[page]) {
            setDataMovies(cacheRef.current[page])
            setIsLoading(false)
            return;
        }
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?page=${page = 4}`, {
                headers: HEADERS
            })
            if (!response.ok) {
                throw new Error("failed to fetch data")
            }
            const data = await response.json()
            setDataMovies(data.results)

            cacheRef.current[page] = data.results


        } catch (error) {
            console.log('failed to fetch data', error)
            setError(error.message)
        }
        setIsLoading(false)
    }
    function handlePageChange(newPage) {
        if (newPage < 1) return;
        setCurrentPage(newPage);
    }
    return (
        <div>
            {isLoading ? (
                <LoadingGenreCarousel />
            ) : error ? (
                <div className="text-center">
                    <h1>Error: {error}</h1>
                    <button
                        onClick={() => fetchMovies(currentPage)}
                        className="px-4 py-2 mt-2 text-white bg-red-500 rounded"
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <div className="w-full gap-2 flex justify-center ">

                    <ScrollArea className="max-w-6xl  p-4 whitespace-nowrap ">
                        <div className="flex items-center justify-start gap-2 w-max ">

                            {dataMovies && dataMovies.length > 0 ? (
                                dataMovies.map((movie) => (
                                    <div key={movie.id} className=" max-w-5xl p-3">

                                        <div className="relative overflow-hidden">
                                            <Image
                                                src={
                                                    movie.poster_path
                                                        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                                                        : no_image
                                                }
                                                alt="poster movies"
                                                width={150}
                                                height={120}
                                                className="rounded-md "
                                                priority={true}
                                                loading="eager"
                                                draggable={false}
                                                style={{width:'auto',height:'auto'}}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>
                                        Something went wrong. Please try again later.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            )}

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            className='cursor-pointer'
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        />
                    </PaginationItem>

                    {[...Array(5).keys()].map((index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                className="cursor-pointer"
                                onClick={() => handlePageChange(index + 1)}
                                isActive={currentPage === index + 1}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationNext
                            className="cursor-pointer"
                            onClick={() => handlePageChange(currentPage + 1)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>


        </div>
    )


}