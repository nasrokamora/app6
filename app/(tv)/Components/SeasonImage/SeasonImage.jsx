import { AlertCircle } from "lucide-react"
 import Image from "next/image"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { urlImage } from "@/app/libs/UrlImage"



export default function SeasonImage({ seasonImage }) {
    const seasonImageSlice = seasonImage.slice(0, 5)
    return (
        <div className=" w-full h-auto flex justify-center items-center">
                <ScrollArea className="max-w-3xl whitespace-nowrap rounded-md  bg-cyan-500/30 backdrop-blur-md">
            <div className="flex w-max space-x-4 p-4">
                {seasonImageSlice.length > 0 ? (
                    seasonImageSlice.map((image,index) => (
                        <div key={image.file_path + index}>
                            <div className=" overflow-hidden relative">
                                <Image src={`${urlImage}${image.file_path}`} 
                                width={100} 
                                height={100} 
                                className=" rounded-md"
                                loading="lazy"
                                style={{ width: "auto" }}
                                draggable={false}
                                alt={image.file_path} />
                            </div>
                        </div>
                    ))
                ):(
                    <Alert variant="destructive">

                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className=" font-bold">Images not found</AlertTitle>
                    <AlertDescription className=" font-semibold text-xl">
                        No images found for this season.
                    </AlertDescription>
                    </Alert>



                )}
            </div>
            <ScrollBar orientation="horizontal" />
                </ScrollArea>
        </div>
    )
}