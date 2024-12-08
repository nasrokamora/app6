import ToggleUp from "@/app/Components/ToggleUp/ToggleUp";
import { getGenreTv, getGenreTvList, urlImageTv } from "@/app/libs/DataFetchingTv";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { BiSolidUpvote, BiUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";



export async function generateStaticParams() {
    const genresTv = await getGenreTvList()

    return genresTv.genres.map((genre) => ({
        id: genre.id.toString()
    }))
}


const ImageCover = ({ item }) => {
    return (
        <div className=" h-[35rem] relative z-0 md:blur-left">
            <Image src={`${urlImageTv}${item.backdrop_path}`}
                fill
                priority={true}
                style={{ objectFit: "cover", backgroundPosition: "center" }}
                className="blur-right "
                loading="eager"
                draggable={false}
                alt={item.name} />
        </div>
    )
}

export default async function GenrePageTv({ params }) {
    const { id } = params
    const data = await getGenreTv(id)
    const resultsGenre = data.results.slice(0, 5)
    // console.log(resultsGenre);

    return (
        <div className="h-screen w-full p-4 md:h-auto">

            <ScrollArea className=" w-full  whitespace-nowrap h-[26rem] md:h-min">
                <div className=" ">
                    {resultsGenre.map((item) => (
                        <div key={item.id} className=" ">
                            <Card className=" w-full h-[25rem] overflow-hidden relative mt-2 ">
                                {/* image cover */}
                                <ImageCover item={item} />
                                <div className=" absolute top-0 m-2 rounded-md bg-black/50  backdrop-blur  ">

                                    <CardHeader>
                                        <CardTitle className=" flex flex-wrap justify-start"> {item.name ?? item.original_name} </CardTitle>
                                        <CardDescription className=" text-slate-300 font-semibold"> {item.first_air_date} & {item.original_language}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex justify-around items-start gap-4 font-semibold md:flex-col">
                                        <div className=" overflow-hidden relative">
                                            <Image src={`${urlImageTv}${item.poster_path}`}
                                                width={120}
                                                height={100}
                                                alt={item.name}
                                                className=" rounded-lg"
                                                priority
                                                draggable={false}
                                                style={{ width: "auto" }}
                                                loading="eager"
                                            />
                                            <div className=" fixed inset-0 h-[3rem] top-[16rem] w-[3rem] left-[7rem]   rounded-full bg-black/80 flex border border-yellow-800 justify-center items-center">
                                                <h1 className=" font-bold border-purple-700">
                                                    {Number(item.vote_average.toFixed(1)) < 5.5 ? <span className="text-red-500"> {item.vote_average.toFixed(1)} </span> : <span className="text-green-500"> {item.vote_average.toFixed(1)} </span>}
                                                </h1>
                                                <h2>
                                                    {Number(item.vote_average.toFixed(1)) < 5.5 ? <BiSolidDownvote className="text-red-500" /> : <BiSolidUpvote className="text-green-500" />}
                                                </h2>
                                            </div>
                                        </div>
                                        <div>
                                            <div className=" flex justify-start gap-1 items-center">
                                                <h1> Original language : </h1>
                                                <h2> {item.original_language}</h2>
                                            </div>

                                        </div>
                                    </CardContent>
                                    <CardFooter className="">
                                        <div></div>
                                    </CardFooter>
                                </div>
                            </Card>
                        </div>
                    ))}

                </div>
            </ScrollArea>
            <ToggleUp />
        </div>
    );
}