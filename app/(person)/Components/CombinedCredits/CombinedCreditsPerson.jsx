import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { FaStarHalfAlt } from "react-icons/fa";
import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { BiBarChart } from "react-icons/bi";
import { FaGripfire } from "react-icons/fa";
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link";
import ImagePosterPath from "@/app/libs/ImagePosterPath";


export default function CombinedCreditsPerson({ dataCombined }) {

    return (
        <div className=" pt-3">
            <div className="lg:text-xl text-2xl mb-3">
                <h1 className="font-bold border-l pl-2 border-yellow-600">Known For:</h1>
            </div>
            <div className=" md:flex md:justify-center">

                <ScrollArea className="max-w-full whitespace-nowrap   md:max-w-lg ">
                    <div className="flex gap-1 max-w-4xl lg:max-w-3xl justify-start">

                        {dataCombined && dataCombined.length > 0 ? (
                            dataCombined.map((item, index) => (

                                <Card className="" key={index - item.id}>
                                    <CardHeader>
                                        <CardTitle className="  "> {dataCombined.media_type === "tv" ? item.name : item.title || item.original_name || item.original_title} </CardTitle>
                                        <CardDescription className="font-semibold italic"> {item.release_date ? item.release_date : item.first_air_date} </CardDescription>
                                    </CardHeader>
                                    <CardContent className=" flex justify-start gap-2 ">
                                        <div className=" w-max ">
                                            <ImagePosterPath
                                                width={120}
                                                height={100}
                                                index={item.id}
                                                tmdbPath={item.poster_path}
                                                className="rounded-md"
                                                quality={75}
                                                alt={item.title ? item.title : item.name || "No Title"}
                                                unoptimized
                                                draggable={false}
                                                priority
                                            />

                                        </div>

                                        {/* vote average vote count popularity media type */}
                                        <div className=" flex flex-col gap-2 justify-start">

                                            <div className="flex justify-start gap-1 items-start">
                                                <h1 className=" font-bold  pl-2 border-l border-yellow-600">Vote average: </h1>
                                                <h2 className=" flex justify-center items-center gap-1 font-semibold text-yellow-500">{item.vote_average ? item.vote_average.toFixed(2) : "0.00"}<FaStarHalfAlt className=" text-yellow-600" /></h2>
                                            </div>
                                            <div className=" flex justify-start items-start gap-1">
                                                <h1 className="font-bold  pl-2 border-l border-yellow-600">Vote Count:</h1>
                                                <h2 className="flex justify-center items-center gap-1 font-semibold text-blue-400"> {item.vote_count ? item.vote_count : "0"}<BiBarChart /></h2>
                                            </div>
                                            <div className=" flex justify-start items-start gap-1">
                                                <h1 className="font-bold  pl-2 border-l border-yellow-600">Popularity:</h1>
                                                <h2 className=" flex justify-center items-center gap-1 font-semibold text-orange-500"> {item.popularity ? item.popularity.toFixed(2) : "0.00"}<FaGripfire /></h2>
                                            </div>
                                            <div className=" flex justify-start items-start gap-1 ">
                                                <h1 className="font-bold  pl-2 border-l border-yellow-600">Media Type:</h1>
                                                <h2 className={`flex justify-center items-center gap-1 font-semibold ${item.media_type === "movie" ? "text-red-600" : "text-blue-600"}`}> {item.media_type ? item.media_type : "No Type"}</h2>
                                            </div>

                                            {/* character */}
                                            <div className=" flex justify-start items-start gap-1 ">
                                                <h1 className="font-bold  pl-2 border-l border-yellow-600">character:</h1>
                                                <h2 className="font-semibold underline decoration-orange-500 underline-offset-1"> {item.character} </h2>
                                            </div>
                                            <div>
                                                <Link className={buttonVariants({ variant: "outline" })} href={item.media_type === "movie" ? `/movies/list/${item.id}` : `/tv/list/${item.id}`}>More Info</Link>
                                            </div>

                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (

                            <div className="flex justify-center items-center ">

                                <Alert variant="destructive" className="mt-3 text-xl">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Oops !</AlertTitle>
                                    <AlertDescription>
                                        Sorry, no information is available for this person.
                                    </AlertDescription>
                                </Alert>
                            </div>
                        )
                        }
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    )
}