"use client"

import { useEffect, useState } from "react"
import InfiniteScroll from 'react-infinite-scroll-component'
import Image from "next/image"
import Link from "next/link"
import { urlImage } from "@/app/libs/DataFetching"
import BlurFade from "@/components/ui/blur-fade"
// import styles from '../../styles/LoadingAnimate.module.css'
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

    useEffect(() => {
        fetchMovies(page)
    }, [page])

    const fetchMovies = async () => {
        try {
            const data = await getMoviesWithPage(page)
            setDataMovies((prevMovies) => [...prevMovies, ...newMovies])
            const newMovies = data.results.filter(movie => !dataMovies.some(m => m.id === movie.id))
            if (page >= data.total_pages) {
                setHasMore(false)
            }
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.log(error, 'Failed to fetch data MoviesWithPage');
            }
            return { error: true, message: error.message };
        }
    }
    const fetchMoreMovies = () => {
        setPage((prevPage) => prevPage + 1)
    }

    return (
        <InfiniteScroll

            dataLength={dataMovies.length}
            next={fetchMoreMovies}
            hasMore={hasMore}
            loader={<p className=" text-center font-bold text-white text-2xl ">Loading...</p>}
            endMessage={<p className="text-2xl text-center font-bold">No more movies to show</p>}
        >
            <div className="flex items-center justify-center pt-20 text-3xl font-semibold ">
                <h1>Explore all movies on Magix</h1>
            </div>
            <div className="grid grid-cols-6 gap-8 p-8 md:grid-cols-3 lg:grid-cols-4">
                {dataMovies.map((movie, index) => (
                    <BlurFade key={movie.id - index} delay={0.10 + index * 0.05} inView>
                        <div key={index} className="relative flex flex-col items-center justify-center overflow-hidden hover:scale-110 hover:duration-300">
                            <Link href={`/movies/list/${movie.id}`} >

                                <Image src={`${urlImage}/${movie.poster_path}`}
                                    alt={movie.title}
                                    width={200}
                                    height={150}
                                    style={{ width: "auto" }}
                                    className="rounded-md "
                                    loading="eager"
                                    priority={true}
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