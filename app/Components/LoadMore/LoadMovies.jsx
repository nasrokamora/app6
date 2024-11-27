"use client"

import { useEffect, useState } from "react"
import InfiniteScroll from 'react-infinite-scroll-component'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { urlImage } from "@/app/libs/DataFetching"
import BlurFade from "@/components/ui/blur-fade"
async function getMoviesWithPage(page) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`, {
        next:{
            revalidate:120
        }
    })
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
            endMessage={<p className="text-2xl text-center">No more movies to show</p>}
        >
                <div className="flex items-center justify-center mt-8 text-3xl font-semibold ">
                    <h1>Explore all movies on Magix</h1>
                </div>
            <div className="grid grid-cols-6 gap-8 p-8 md:grid-cols-3 lg:grid-cols-4">
                {dataMovies.map((movie, index) => (
                    <BlurFade key={movie.id - index} delay={0.10 + index * 0.05} inView>

                    <div key={index} className="relative flex flex-col items-center justify-center overflow-hidden hover:scale-110 hover:duration-300">

                        <Link href={`/movies/list/${movie.id}` } >

                            <Image src={`${urlImage}/${movie.poster_path}`}
                                alt={movie.title}
                                width={200}
                                height={150}
                                style={{width:"auto"}}
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