import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Image from "next/image"
import no_image from '../../../../public/image/no_image4.webp'
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { urlImage } from "@/app/libs/DataFetching"


export default function ImageList({ dataImageList }) {
    return (
        <ScrollArea className=" bg-black/30 backdrop-blur border-none w-full whitespace-nowrap rounded-md border md:w-2/3 lg:w-3/4 xl:w-4/5 ">
            <div className="flex w-max space-x-4 p-4">
                {/* scroll image content */}
                {dataImageList.backdrops && dataImageList.backdrops.length > 0 ? (
                    dataImageList.backdrops.map((data) => (
                        <div key={data.file_path} className=" rounded-md relative overflow-hidden " >
                            <Image src={data.file_path ?
                                `${urlImage}${data.file_path}`
                                :
                                no_image
                            }
                                width={250}
                                height={150}
                                className="  rounded-md  "
                                priority
                                style={{ width: "auto" }}
                                draggable={false}
                                alt={"backGround image"}
                                loading="eager"
                            />
                        </div>
                    ))
                ) : (

                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
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