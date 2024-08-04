import Image from "next/image"
import { Suspense } from 'react'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function ImageTvSeries({ urlImageTv, dataImage }) {
    // console.log(dataImage)
    return (
        <div className=" flex justify-center items-center">

        <ScrollArea className="max-w-4xl whitespace-nowrap rounded-md border">
        <Suspense fallback={<p>Loading feed...</p>}>
            <div className="flex w-max space-x-4 p-4">
                {dataImage.length > 0 ? (
                    
                    dataImage.map((imgs, index) => (
                        <figure key={index} className="shrink-0">
                        <div className="overflow-hidden rounded-md">
                            <Image
                                src={`${urlImageTv}${imgs.file_path}`}
                                alt={`Photo by ${imgs.artist}`}
                                className=""
                                width={300}
                                height={400}
                                style={{width:"auto"}}
                                />
                        </div>
                        <figcaption className="pt-2 text-xs text-muted-foreground">
                            Vote average{" "}
                            <span className="font-semibold text-foreground">
                                {imgs.vote_average}
                            </span>
                        </figcaption>
                    </figure>
                ))
            ):(
                <p className=" flex justify-center items center text-error"> No images</p>
            )
        }
                </div>
        </Suspense>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
        </div>
    )
}

