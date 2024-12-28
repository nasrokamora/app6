import ToggleUp from "@/app/Components/ToggleUp/ToggleUp";
import { getDetailsTv, getGenreTv, getGenreTvList, getVideosTv, urlImageTv } from "@/app/libs/DataFetchingTv";
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
import { FaUserFriends } from "react-icons/fa";
import { RiStarSFill } from "react-icons/ri";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import CarouselAuto from "@/app/(tv)/Components/DiscoverTv/CarouselAuto";
import no_image from "../../../../../public/image/no_image4.webp"
import ReactPlayer from "react-player";
import { YouTubeEmbed } from "@next/third-parties/google";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";

export const metadata = {
    title: 'Magix Movies | TV Genres',
    description: 'Explore a variety of TV genres and find your favorite shows.',
}



export const dynamic = 'force-dynamic'
const ImageCover = ({ item }) => {
    return (
        <div className="  h-[70vh] bg-bottom relative z-0 md:blur-left">
            <Image src={item.backdrop_path ?
                `${urlImageTv}${item.backdrop_path}` : no_image}
                fill
                priority={true}
                style={{ objectFit: "cover" }}
                className="blur-right"
                loading="eager"
                draggable={false}
                alt={item.name} />
        </div>
    )
}

export default async function GenrePageTv({ params }) {
    const { id } = params
    const genreData = getGenreTv(id)
    // const resultsGenre = data.results
    const trailer = getGenreTvList(id)
    const [resultsGenre, trailerData] = await Promise.all([genreData, trailer])
    // console.log(trailerData.results);

    return (
        <div className="h-screen w-full p-4 md:h-auto pt-20">
            <div className="flex justify-center items-center ">
                <h1 className=" font-bold text-2xl">Explore the world of TV Shows</h1>
            </div>
            <CarouselAuto className=" w-full max-w-full h-auto mt-4" opts={{ align: "start", loop: true }}>
                <CarouselContent className=" -ml-1">
                    {resultsGenre.results.map((item) => (
                        <CarouselItem key={item.id} className=" basis-full ">
                            <Card className=" w-full h-[35rem] overflow-hidden relative mt-2 md:h-auto">
                                {/* image cover */}
                                <ImageCover item={item} />
                                <div className=" absolute top-0 m-2 rounded-md bg-black/50  backdrop-blur  w-full">

                                    <CardHeader className="">
                                        <CardTitle className=" flex flex-wrap justify-start text-wrap "> {item.name ?? item.original_name} </CardTitle>
                                        <CardDescription className=" text-slate-300 font-semibold"> {item.first_air_date}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex justify-start items-start gap-4 font-semibold  ">
                                        <div className=" flex justify-start items-start gap-2 flex-wrap  ">

                                            <div className=" overflow-hidden relative w-fit">
                                                <Image src={`${urlImageTv}${item.poster_path}`}
                                                    width={120}
                                                    height={100}
                                                    alt={item.name ?? "poster"}
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
                                            <div className=" flex justify-start items-start flex-col gap-2 ">
                                                <div className=" flex justify-start gap-1 items-center">
                                                    <h1 className=" font-bold "> Original language : </h1>
                                                    <h2 className=" font-semibold"> {item.original_language}</h2>
                                                </div>
                                                <div className=" flex justify-start gap-1 items-center">
                                                    <h1 className=" font-bold ">Popularity :</h1>
                                                    <h2 className=" font-bold flex gap-1 justify-center items-center "> {item.popularity ? item.popularity.toFixed(1) : "N/A"}
                                                        <span className=""><FaUserFriends className=" text-slate-300" size={20} /></span></h2>
                                                </div>
                                                <div className=" flex justify-start gap-1 items-center font-bold">
                                                    <h1> Rating : </h1>
                                                    <h2 className={`${Number(item.vote_average.toFixed(1)) < 5.5 ? "text-red-500" : "text-yellow-500"}`}> {item.vote_average.toFixed(1)}/10 </h2>
                                                    <span>
                                                        <RiStarSFill size={20} className=" text-yellow-500" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <DetailsTvGenre id={item.id} />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="">
                                        <div></div>
                                    </CardFooter>
                                </div>

                                {/* <div className=" absolute top-0 m-2 left-1/3  rounded-md bg-black/50  backdrop-blur h-auto overflow-hidden flex flex-col gap-1">
                            <CardContent className=" ">

                                <h1>Overview</h1>
                                    <p className=" text-wrap"> {item.overview} </p>
                            </CardContent>
                                </div> */}
                            </Card>
                        </CarouselItem>
                    ))}

                </CarouselContent>
                <div className=" absolute top-[95%] right-[50%]">
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </CarouselAuto>
            <ToggleUp />

        </div>
    );
}

async function DetailsTvGenre({ id }) {
    const data = await getVideosTv(id)
    const dataTrailer = data.results.slice(0, 1)
    console.log(dataTrailer);

    return (
        <div>
            {dataTrailer &&
                dataTrailer.length > 0 ? (
                dataTrailer.map((item) => (
                    <div className="relative" key={item.id}>
                        <HeroVideoDialog
                            animationStyle="from-center"
                            className="dark:hidden block"
                            videoSrc={`https://www.youtube.com/embed/${item.key}`}
                            thumbnailSrc={`https://img.youtube.com/vi/${item.key}/0.jpg`}
                            thumbnailAlt={item.name}
                        />

                    </div>
                ))
            ) : (
                <div> no found</div>
            )}
        </div>
    )
}


