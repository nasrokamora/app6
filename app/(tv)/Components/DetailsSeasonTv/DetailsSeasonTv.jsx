import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Link from "next/link"
import no_image from '../../../../public/image/no_image4.webp'
import ImagePosterPath from "@/app/libs/ImagePosterPath"




export default function DetailsSeasonTv({ season, id }) {
    const sortSeason = season.sort((a, b) => a.season_number - b.season_number)

    return (
        <div className="w-full">
            <div className="  mt-5 flex justify-center items-center w-full rounded-md ">
                <ScrollArea className="whitespace-nowrap rounded-md xl:max-w-5xl w-full  ">
                    <div className="w-max flex space-x-4 p-4 backdrop-blur-md  ">
                        {sortSeason.length > 0 ? (
                            sortSeason.map((item, index) => (
                                <div className=" w-full " key={item.id}>
                                    <Card className="  md:h-auto w-full border-blue-600 shadow-md shadow-blue-800 bg-black/30 backdrop-blur">
                                        <CardContent className=" pt-2  ">
                                            <div className=" relative lg:order-2 w-full ">
                                                {item.poster_path &&
                                                item.poster_path ? (
                                                    <ImagePosterPath
                                                        width={100}
                                                        height={100}
                                                        index={item.id}
                                                        tmdbPath={item.poster_path}
                                                        className="rounded-md"
                                                        quality={75}
                                                        alt={item.name ? item.name : "Unknown"}

                                                        draggable={false}
                                                        priority
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <Image
                                                        src={no_image}
                                                        alt={"no_image"}
                                                        width={300} height={200}
                                                        priority
                                                        style={{borderRadius: "4px" }}
                                                        draggable={false}
                                                        loading="eager"
                                                        unoptimized={false}
                                                    />
                                                )}

                                            </div>

                                            <div className=" flex justify-center items-center flex-col ">
                                                <h1 className=" text-xl font-bold underline decoration-blue-600">{item.name}</h1>
                                                <h3 className="font-bold text-[#52525b]">{item.air_date ? item.air_date : "Undefined"}</h3>
                                            </div>

                                            <div className=" flex justify-start gap-2 md:flex-col lg:flex-col  pt-2">
                                                <div>
                                                    <Link href={`/tv/list/${id}/season/${item.season_number}`}
                                                        className=" border p-1 rounded-md animate-rainbow bg-black hover:bg-transparent hover:shadow-sm active:scale-105 hover:shadow-blue-700 hover:border-l-blue-700 hover:duration-500  hover:border-blue-700 font-semibold"
                                                    >
                                                        See More
                                                    </Link>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                </div>

                            ))
                        ) : (
                            <Alert variant="destructive" className=" text-xl">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Oops!</AlertTitle>
                                <AlertDescription>
                                    No seasons available for this series.
                                </AlertDescription>
                            </Alert>
                        )
                        }
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>


            </div>
        </div>
    )
}