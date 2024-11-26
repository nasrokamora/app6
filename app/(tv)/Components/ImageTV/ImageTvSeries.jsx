import Image from "next/image"
import { Suspense } from 'react'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import no_image from "../../../../public/image/no_image4.webp"



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
                                src={ imgs.file_path ?
                                    `${urlImageTv}${imgs.file_path}` : no_image}
                                alt={`Photo by ${imgs.artist}`}
                                className=""
                                width={300}
                                height={400}
                                style={{width:"auto"}}
                                loading="eager"
                                blurDataURL='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
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
                <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Something went wrong.
                </AlertDescription>
              </Alert>
            )
        }
                </div>
        </Suspense>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
        </div>
    )
}

