import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import ImagePosterPath from "@/app/libs/ImagePosterPath"



export default function ImageList({ dataImageList }) {


    return (
        <ScrollArea className=" bg-black/30 backdrop-blur border-none w-full whitespace-nowrap rounded-md border md:w-2/3 lg:w-3/4 xl:w-4/5 ">
            <div className="flex w-max space-x-4 p-4">
                {/* scroll image content */}
                {dataImageList.backdrops && dataImageList.backdrops.length > 0 ? (
                    dataImageList.backdrops.slice(0, 5).map((data) => (
                        <div key={data.file_path} className=" rounded-md relative overflow-hidden " >

                            <ImagePosterPath
                                width={250}
                                height={150}
                                index={data.id}
                                tmdbPath={data.file_path}
                                className="rounded-md"
                                quality={75}
                                alt={data.title ? data.title : data.original_title || "Unknown"}
                                unoptimized
                                draggable={false}
                                priority


                            />

                        </div>
                    ))
                ) : (

                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle className=" font-bold">Oops !</AlertTitle>
                        <AlertDescription className=" font-semibold text-xl">
                            There are no images in this movie.
                        </AlertDescription>
                    </Alert>
                )
                }
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>

    )

}