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
        <div className="h-auto w-full p-4">
            {resultsGenre.map((item) => (
                <div key={item.id} className="">
                    <Card className=" w-full h-[25rem] overflow-hidden relative mt-2">
                        {/* image cover */}
                        <ImageCover item={item} />
                        <div className=" absolute top-0 m-4 rounded-md bg-black/50  backdrop-blur">

                        <CardHeader>
                            <CardTitle className=""> {item.name?? item.original_name} </CardTitle>
                            <CardDescription className=" text-slate-300"> {item.overview} </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    );
}