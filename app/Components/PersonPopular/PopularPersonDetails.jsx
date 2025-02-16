"use client"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

import Image from "next/image"
import Link from "next/link"
import no_image from '../../../public/image/no_image4.webp'

import { urlImage } from "@/app/libs/DataFetching"
import {
    Card,
} from "@/components/ui/card"
import { FaRegStar } from "react-icons/fa"
import AllAutoCarousel from "../AutoCarousel/AllAutoCarousel"
import { useEffect, useRef, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area"
import BlurFade from "@/components/ui/blur-fade"



const LoadingPagination = () => {
    return (
        <div className="flex justify-center items-center w-full h-[200px] relative">
            <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#0427a5]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                <span className="sr-only">Loading...</span>
                
            </div>
        </div>
    )
}

export default function PopularPersonDetails() {
    const [currentPage, setCurrentPage] = useState(2)
    const [totalPages, setTotalPages] = useState(20)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [dataPersonPopular, setDataPersonPopular] = useState([])
    const RefPage = useRef({})


    useEffect(() => {
        fetchPopularPerson(currentPage)
    }, [currentPage])

    const fetchPopularPerson = async (page) => {

        if (RefPage.current[page]) {
            setDataPersonPopular(RefPage.current[page]);
            setIsLoading(false);
            return;
        }
        setError(null)
        setIsLoading(true)


        try {
            const response = await fetch(`/api/getPersonPopular?page=${page}`)
            const data = await response.json()
            setDataPersonPopular(data.results)
            setTotalPages(data.total_pages)
            RefPage.current[page] = data.results;
        } catch (error) {
            setError(error.message || "An unexpected error occurred");
        }
        setIsLoading(false)
    }


    const handleChangePage = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage)
    }


    return (
        <div className="w-full ">
            <div className="flex items-center justify-center w-full h-auto">
                {isLoading ? (
                    <LoadingPagination />
                ) : error ? (
                    <div>
                        <h1 className=" text-error text-xl font-semibold">error</h1>
                        <button
                            onClick={() => fetchPopularPerson(currentPage)}
                            className="px-4 py-2 mt-2 text-white bg-red-500 rounded"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <div className=" w-full flex justify-center items-center gap-2">
                        <ScrollArea className="w-full   p-4 whitespace-nowrap ">
                            <div className="flex  w-max pt-4 space-x-2">

                                {dataPersonPopular && dataPersonPopular.length > 0 ? (
                                    dataPersonPopular.map((item, idx) => (
                                        <BlurFade key={item.id} delay={0.25 + idx * 0.05} inView>
                                            <Card className="border-t-[#a03bf7] border-b-[#f23e5e] border-r-[#a83ce4] border-l-[#c42e4a] p-3 hover:scale-105 hover:duration-500 md:active:shadow-lg md:active:border-indigo-800 md:active:scale-90 md:active:shadow-indigo-800">
                                                <Link href={`/person/${item.id}`} >
                                                    <div className=" overflow-hidden  relative ">
                                                        <Image
                                                            src={
                                                                item.profile_path
                                                                    ? `${urlImage}${item.profile_path}`
                                                                    : no_image
                                                            }
                                                            alt={item.name ? item.name : item.original_name || "No Name"}
                                                            width={120}
                                                            height={300}
                                                            className="rounded-md  "
                                                            style={{  width: 'auto' }}
                                                            draggable={false}
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                    <h2 className="pt-2  font-semibold">
                                                        {item.name ? item.name.length > 12 ? item.name.slice(0, 12) + ".." : item.name : "No name"}
                                                    </h2>
                                                    <div className="flex items-center justify-between w-full">
                                                        <p className=" font-semibold 2xl:text-xl">{item.known_for_department}</p>
                                                        <div className="flex items-center justify-between space-x-1 2xl:text-xl">
                                                            <FaRegStar className="text-[#003cff]" />
                                                            <span className="font-semibold">
                                                                {item.popularity.toFixed(1)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Card>
                                        </BlurFade>
                                    ))
                                ) : (
                                    <div className="text-center text-error text-xl font-bold">
                                        <h1>No TV shows found</h1>
                                    </div>
                                )}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>

                    </div>
                )
                }
            </div>

            <Pagination className="mt-3" >
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            className="cursor-pointer font-semibold 2xl:text-xl"
                            disabled={currentPage === 1}
                            onClick={() => handleChangePage(currentPage - 1)} />
                    </PaginationItem>

                    {[...Array(5).keys()].map((_, index) => (
                        <PaginationItem key={index} className="md:hidden 2xl:text-xl ">
                            <PaginationLink

                                onClick={() => handleChangePage(index + 1)}
                                className={'cursor-pointer font-semibold 2xl:text-xl'}
                                isActive={currentPage === index + 1}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <div className=" lg:hidden xl:hidden 2xl:hidden p-2">
                        <h1 className=" font-semibold">
                            {currentPage}
                        </h1>
                    </div>

                    <PaginationItem className="md:hidden 2xl:text-xl">
                        <PaginationEllipsis  />
                    </PaginationItem>
                    <PaginationItem>

                        <PaginationNext onClick={() => handleChangePage(currentPage + 1)}
                            isActive={currentPage === totalPages}
                            className="cursor-pointer font-semibold 2xl:text-xl"
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
