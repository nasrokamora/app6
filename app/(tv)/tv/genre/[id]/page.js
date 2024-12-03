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





export async function generateStaticParams() {
    const genresTv = await getGenreTvList()

    return genresTv.genres.map((genre) => ({
        id: genre.id.toString()
    }))
}


const ImageCover = ({ item }) => {
    return (
        <div className=" h-[35rem] relative z-0">
            <Image src={`${urlImageTv}${item.backdrop_path}`}
                fill
                priority
                style={{ objectFit: "cover", backgroundPosition: "center" }}
                className="blur-right "
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
        <div className="h-screen w-full p-4">

            <ScrollArea className=" w-full  whitespace-nowrap h-screen">
                <div className=" ">
                    {resultsGenre.map((item) => (
                        <div key={item.id} className=" ">
                            <Card className=" w-full h-[25rem] overflow-hidden relative mt-2">
                                {/* image cover */}
                                <ImageCover item={item} />
                                <div className=" absolute top-0 m-4 rounded-md bg-black/50  backdrop-blur  ">

                                    <CardHeader>
                                        <CardTitle className=""> {item.name ?? item.original_name} </CardTitle>
                                        <CardDescription className=" text-slate-300 font-semibold"> {item.first_air_date} & {item.original_language}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex justify-start items-start gap-4 font-semibold">
                                        <div>
                                            <Image src={`${urlImageTv}${item.poster_path}`}
                                                width={150}
                                                height={150}
                                                alt={item.name}
                                                className=" rounded-lg"
                                                priority
                                            />
                                        </div>
                                        <div>
                                            <div className=" flex justify-start gap-1 items-center">
                                                <h1> Original language : </h1>
                                                <h2> {item.original_language}</h2>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                            <p>Footer</p>
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