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
import { HEADERS} from "@/app/libs/DataFetching"
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
import Link from 'next/link'



export default function PaginationMovies() {
        const [currentPage,setCurrentPage] = useState(1)
        const [dataMovies,setDataMovies] = useState([])
        const [isLoading,setIsLoading] = useState(true)
        const [error,setError] = useState(null)
        const cachRef = useRef({})

        useEffect(() => {
            fetchMovies(currentPage)
        }, [currentPage])
        


            async function fetchMovies(page){
                try{

                    if (cachRef.current[page]) {
                        setDataMovies(cachRef.current[page])
                        setIsLoading(false)
                        return;
                    }


                    setIsLoading(true)
                    setError(null)
                    
                const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?&page=${page}`,{
                    headers:HEADERS
                })

                if(!response.ok){
                    throw new Error(error,"failed fetch top rated movie")
                }

                const data = await response.json()
                setDataMovies(data.results)
                cachRef.current[page] = data.results
            }catch(error){
                console.log(error.message)    
            }
            setIsLoading(false)
            }
            function handlePageChange(newPage){
                if(newPage < 1)return
                setCurrentPage(newPage)
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

                    <ScrollArea className="max-w-6xl  p-4 whitespace-nowrap 2xl:max-w-7xl">
                        <div className="flex items-center justify-start gap-2 w-max ">

                            {dataMovies && dataMovies.length > 0 ? (
                                dataMovies.map((movie) => (
                                    <div key={movie.id} className=" max-w-5xl p-3 2xl:w-full">
                                        <Link className="" href={`/Movies/List/${movie.id}`}>
                                        <div className="relative overflow-hidden h-[200px] 2xl:h-auto hover:duration-500 hover:scale-105">
                                            <Image
                                                src={
                                                    movie.poster_path
                                                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                                                    : no_image
                                                }
                                                alt="poster movies"
                                                width={120}
                                                height={150}
                                                className="rounded-md 2xl:h-[300px] 2xl:w-[200px]"
                                                draggable={false}
                                                style={{width:'auto'}}
                                                />
                                        </div>
                                                </Link>
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
                <PaginationContent className="2xl:text-xl">
                    <PaginationItem className="">
                        <PaginationPrevious
                            className='cursor-pointer '
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        />
                    </PaginationItem>

                    {[...Array(5).keys()].map((index) => (
                        <PaginationItem key={index} className=" md:hidden">
                            <PaginationLink
                                className="cursor-pointer 2xl:text-xl font-semibold"
                                onClick={() => handlePageChange(index + 1)}
                                isActive={currentPage === index + 1}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem >
                        <PaginationEllipsis />
                    </PaginationItem>

                    <PaginationItem className="2xl:text-xl">
                        <PaginationNext
                            className="cursor-pointer "
                            onClick={() => handlePageChange(currentPage + 1)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>


        </div>
    )


}