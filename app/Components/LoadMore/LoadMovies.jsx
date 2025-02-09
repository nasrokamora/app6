"use client"

import { useCallback, useEffect, useState } from "react"
import InfiniteScroll from 'react-infinite-scroll-component'
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import ErrorImage from "../../../public/image/errorImage.webp"
import { urlImage } from "@/app/libs/DataFetching"

const BlurFade = dynamic(() => import("@/components/ui/blur-fade"), { ssr: false })


async function getMoviesWithPage(page) {
    const response = await fetch(`/api/getMoviesWithPage?page=${page}`)
    if (!response.ok)
        throw new Error("failed to fetch all movie data")
    return response.json()
}



export default function LoadMovies() {
    const [page, setPage] = useState(1)
    const [dataMovies, setDataMovies] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (hasMore) fetchMovies(page)
    }, [page])

    const fetchMovies = async () => {
        try {
            const data = await getMoviesWithPage(page)

            setDataMovies((prevMovies) => {
                const existingMovies = new Set(prevMovies.map(m => m.id))
                const newMovies = data.results.filter(movie => !existingMovies.has(movie.id))
                return [...prevMovies, ...newMovies]
            })


            if (data.page >= data.total_pages) {
                setHasMore(false)
            }
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.log(error, 'Failed to fetch data MoviesWithPage');
            }
            return { error: true, message: error.message };
        }
    }
    const fetchMoreMovies = useCallback(() => {
        setPage((prevPage) => prevPage + 1)
    }, [])

    return (
        <InfiniteScroll

            dataLength={dataMovies.length}
            next={fetchMoreMovies}
            hasMore={hasMore}
            loader={<p className=" text-center font-bold text-white text-2xl flex justify-center items-center gap-2 ">Loading... <span className="w-10 h-10 border-4 border-t-red-600 border-gray-300 rounded-full animate-spin"></span></p>}
            endMessage={<p className="text-2xl animate-ping text-center font-bold text-red-700">No more movies to show</p>}
        >
            <div className="flex items-center justify-center pt-20 text-3xl font-bold bg-gradient-to-r from-[#b62323] via-[#9c40ff] to-[#b62323] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                <h1>Explore all movies on Magix</h1>
            </div>
            <div className="grid grid-cols-6 gap-8 p-8 md:grid-cols-3 lg:grid-cols-4">
                {dataMovies.map((movie, index) => (
                    <BlurFade key={movie.id - index} delay={0.10 + index * 0.05} inView>
                        <div key={index} className="relative flex flex-col items-center justify-center overflow-hidden hover:scale-110 hover:duration-300">
                            <Link href={`/movies/list/${movie.id}`} >

                                <Image src={movie.poster_path ?
                                    `${urlImage}/${movie.poster_path}` :
                                    ErrorImage}
                                    alt={movie.title}
                                    width={200}
                                    height={150}
                                    style={{ width: "auto" }}
                                    className="rounded-md "
                                    loading="eager"
                                    priority={index < 6}
                                    onError={(e) => { e.target.src = ErrorImage.src }}
                                />
                                <h1 className="font-bold ">
                                    {movie.title.length > 14 ? movie.title.slice(0, 14) + "..." : movie.title}
                                </h1>
                            </Link>
                        </div>
                    </BlurFade>
                ))}
            </div>
        </InfiniteScroll>
    )
}