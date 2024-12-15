"use client"


import { useEffect, useState } from "react"
import InfiniteScroll from 'react-infinite-scroll-component'
import Image from "next/image"
import Link from "next/link"
import { urlImageTv } from "@/app/libs/DataFetchingTv"
import BlurFade from "@/components/ui/blur-fade"


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
            <div className="flex items-center justify-center mt-8 text-3xl font-semibold ">
                <h1>Explore all Tv series on Magix</h1>
            </div>
            <div className="grid grid-cols-6 gap-8 p-8 md:grid-cols-3 lg:grid-cols-5">
                {dataTv.map((tv, index) => (
                    <BlurFade key={tv.id - index} delay={0.10 + index * 0.05} inView>

                        <div key={`${tv.id}-${index}`} className="relative flex flex-col items-center justify-center overflow-hidden hover:scale-110 hover:duration-300">

                            <Link href={`/tv/list/${tv.id}`} >

                                <Image src={`${urlImageTv}${tv.poster_path}`}
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
                    </BlurFade>

                ))}
            </div>
        </InfiniteScroll>
    )
}