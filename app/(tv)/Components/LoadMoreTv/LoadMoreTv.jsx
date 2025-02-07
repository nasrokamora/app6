"use client"


import { useEffect, useState } from "react"
import InfiniteScroll from 'react-infinite-scroll-component'
import Image from "next/image"
import Link from "next/link"
import {motion} from "framer-motion"
import no_image from '../../../../public/image/no_image4.webp'
import { urlImageTv } from "@/app/libs/DataFetchingTv"


async function getTvWithPage(page) {
    try {
        const response = await fetch(`/api/getTvWithPage?page=${page}`)
        if (!response.ok) {
            throw new Error('failed')
        }
        return response.json()
    } catch (error) {
        console.log(error, 'failed to fetch data Tv => LoadMoreTv')
    }
}


export default function LoadMoreTv() {
    const [page, setPage] = useState(1)
    const [dataTv, setDataTv] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [error, setError] = useState(null)



    useEffect(() => {
        fetchTvLoadMore(page)
    }, [page])

    async function fetchTvLoadMore() {
        try {
            const data = await getTvWithPage(page)
            setDataTv((prevTv) => [...prevTv, ...newTv])

            const newTv = data.results.filter(tv => !dataTv.some(t => t.id === tv.id))

            if (page >= data.total_pages) {
                setHasMore(false)
            }

        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.log(error, 'Failed to fetch data TvWithPage');
            }
            return { error: true, message: error.message };
        }
    }

    const fetchMoreTv = () => {
        setPage(prevPage => prevPage + 1)

    }
    return (
        <InfiniteScroll

            dataLength={dataTv.length}
            next={fetchMoreTv}
            hasMore={hasMore}
            loader={<h4 className="">Loading...</h4>}
            endMessage={<p className="text-2xl text-center">No more Tv series to show</p>}
        >
            <div className="flex items-center justify-center mt-20 text-3xl font-bold bg-gradient-to-r from-blue-500 via-[#9c40ff] to-blue-500 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                <h1>Explore all Tv series on Magix</h1>
            </div>
            <div className="grid grid-cols-6 gap-8 p-8 md:grid-cols-3 lg:grid-cols-5">
                {dataTv.map((tv, index) => (
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
                    key={tv.id + index}
                    >

                        <div key={`${tv.id} + ${index}`} className="relative flex flex-col items-center justify-center overflow-hidden hover:scale-110 hover:duration-300">

                            <Link href={`/tv/list/${tv.id}`} >

                                <Image src={tv.poster_path ? `${urlImageTv}${tv.poster_path}` : no_image}
                                    alt={tv.name}
                                    width={200}
                                    height={150}
                                    priority={true}
                                    style={{ width: "auto" }}
                                    className="rounded-md "
                                    loading="eager"

                                />
                                <h1 className="font-bold  md:hidden">
                                    {tv.name.length > 10 ? tv.name.slice(0, 10) + "..." : tv.name}
                                </h1>

                            </Link>


                        </div>
                    </motion.div>

                ))}
            </div>
        </InfiniteScroll>
    )
}