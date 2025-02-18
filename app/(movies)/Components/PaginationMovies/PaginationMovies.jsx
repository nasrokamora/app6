"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useCallback, useEffect, useRef, useState } from "react"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import no_image from '../../../../public/image/no_image4.webp';
import Image from "next/image";
import { AlertCircle } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import Link from 'next/link'
import LoadingPaginationMovies from "./LoadingPaginationMovies";
import { FaRegStar } from "react-icons/fa"
import { urlImage } from "@/app/libs/UrlImage";



const MAX_PAGE = 3

async function fetchPagination({cachRef,setDataMovies, setIsLoading, setError, page}) {
    try {

        if(page > MAX_PAGE) {
            setError("You have reached the maximum number of pages")
            setIsLoading(false)
            return
        }


        if (cachRef.current[page]) {
            setDataMovies(cachRef.current[page])
            setIsLoading(false)
            return;
        }
        setIsLoading(true)
        setError(null)

        const response = await fetch(`/api/fetchTopRated?page=${page}`, )

        if (!response.ok) {
            throw new Error("failed fetch top rated movie")
        }

        const data = await response.json()
        setDataMovies(data.results)
        cachRef.current[page] = data.results
    } catch (error) {
        if(process.env.NODE_ENV !== "production") {
            console.log(error.message)
            return {error:true, message: process.env.NODE_ENV === "production" ? "Something went wrong" : error.message,
                details: process.env.NODE_ENV !== "production" ? error.stack : undefined 
            }
        }
        
    }
    setIsLoading(false)
}



export default function PaginationMovies() {
    const [currentPage, setCurrentPage] = useState(1)
    const [dataMovies, setDataMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const cachRef = useRef({})

    useEffect(() => {
        setIsLoading(true)
        fetchPagination({cachRef,setDataMovies, setIsLoading, setError, page: currentPage})
    }, [currentPage])
    
    const handlePageChange = useCallback((newPage) => {
        if (newPage < 1) return;
        if (newPage > MAX_PAGE) {
            setCurrentPage(1)
        } else {
            setCurrentPage(newPage);
        }
    }, []);

    return (
        <div className=" w-full ">
            {isLoading ? (
                <div className=" ">

                    <LoadingPaginationMovies />
                </div>
            ) : error ? (
                <ErrorMessageAndRetry error={error} fetchPagination={fetchPagination} currentPage={currentPage} cachRef={cachRef} 
                setDataMovies={setDataMovies} 
                setIsLoading={setIsLoading} 
                setError={setError} />
            ) : (
                <div className="w-full gap-2 flex justify-center md:mt-6  h-max">
                    <Carousel className="w-full max-w-5xl md:max-w-sm 2xl:max-w-full lg:max-w-4xl"
                        opts={{
                            loop: true,
                            align: "center"
                        }}>
                        <CarouselContent className="-ml-1">
                            {dataMovies && dataMovies.length > 0 ? (
                                dataMovies.slice(0,10).map((movie,index) => (
                                    <CarouselItem key={movie.id} className="p-2 md:basis-1/2 basis-1/6 lg:basis-1/5">
                                        
                                        <div className="relative overflow-hidden md:active:scale-90 hover:scale-90 duration-500  ">
                                            <Link className=" font-bold" href={`/movies/list/${movie.id}`}>
                                                <Image
                                                    src={
                                                        movie.poster_path
                                                        ? `${urlImage}${movie.poster_path}`
                                                        : no_image
                                                    }
                                                    alt="poster movies"
                                                    width={300}
                                                    height={250}
                                                    className="rounded-md "
                                                    draggable={false}
                                                    style={{ width: 'auto' }}
                                                    priority
                                                    loading="eager"
                                                />
                                                <p className=" pt-2 font-bold  mb-1">{movie.title.length > 11 ? movie.title.slice(0, 11) + "..." : movie.title}</p>
                                                <div className="flex items-center justify-between w-full ">
                                                    <p className="flex items-center justify-between w-full font-bold 2xl:text-2xl text-[#FFC300]">
                                                        {new Date(movie.release_date).getFullYear()}
                                                    </p>
                                                    <div className=" 2xl:font-bold 2xl:text-2xl">
                                                        <div className="flex items-center justify-between space-x-1 ">
                                                            <FaRegStar className="text-[#FFC300]" />
                                                            <span className="">
                                                                {movie.vote_average.toFixed(1)}
                                                            </span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </Link>
                                        </div>

                                    </CarouselItem>
                                ))
                            ) : (
                                <ErrorAlert />
                            )}
                        </CarouselContent>
                        <div className=" absolute left-[93%] md:left-[82%] md:top-[-2rem] top-[-2rem] ">
                            <CarouselPrevious />
                            <CarouselNext />
                        </div>
                    </Carousel>
                </div>
            )}
                {/* pagination movies */}
                <PaginationPageMovies 
                handlePageChange={handlePageChange} 
                currentPage={currentPage} />
        </div>
    )
}


const PaginationPageMovies = ({handlePageChange, currentPage}) => {
    return(
        <Pagination className="mt-4">
        <PaginationContent >
            <PaginationItem >
                <PaginationPrevious
                    className='cursor-pointer font-semibold'
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />
            </PaginationItem>

            {[...Array(3).keys()].map((index) => (
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

            <PaginationItem className="2xl:text-xl">
                <PaginationNext
                    className="cursor-pointer font-semibold"
                    onClick={() => handlePageChange(currentPage + 1)}

                />
            </PaginationItem>
        </PaginationContent>
    </Pagination>
    )
}

const ErrorAlert = () => {
    return(
        <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Oops !</AlertTitle>
        <AlertDescription>
            There are no movies in this page.
        </AlertDescription>
    </Alert>
    )
}
const ErrorMessageAndRetry = ({fetchPagination, error, currentPage, cachRef, setDataMovies, setIsLoading, setError}) => {
    return(
        <div className="text-center flex justify-center items-center flex-col gap-3">
        <h1 className="font-bold">{error} </h1>
        <button
            onClick={() => fetchPagination({cachRef,setDataMovies, setIsLoading, setError, page: currentPage})}
            className="px-4 py-2 mt-2 text-white bg-red-500 rounded text-xl"
        >
            Retry
        </button>
    </div>
    )
}