"use client"

import { useEffect, useState } from "react"
import InfiniteScroll from 'react-infinite-scroll-component'
import Image from "next/image"
import Link from "next/link"

async function getMoviesWithPage(page) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`, {
    })
    if (!response.ok)
        throw new Error("failed to fetch data")

    return response.json()
}



let page = 2
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
            console.error(error)
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
            loader={<h4 className="">Loading...</h4>}
            endMessage={<p className="text-center text-2xl">No more movies to show</p>}
        >
            <div className="grid grid-cols-6 gap-8 p-8">
                {dataMovies.map((movie, index) => (
                    <div key={index}>
                        <Link href={`/Movies/List/${movie.id}`}>
                            <Image src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                alt={movie.title}
                                width={100}
                                height={100}
                                priopity="true"
                                className="rounded-sm hover:scale-110 hover:duration-300"
                            />

                            <h1>
                                {movie.title}
                            </h1>

                        </Link>
                    </div>
                ))}
            </div>
        </InfiniteScroll>
    )

}