import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { urlImagesPerson } from "@/app/libs/DataFetchingPerson"


export default function PersonImage({ ImagePerson }) {


    return (
        <div className=" flex justify-center">

        <ScrollArea className="border rounded-md max-w-xl whitespace-nowrap md:max-w-sm lg:max-w-xl xl:max-w-xl">

        <div className="flex w-max space-x-4 p-4 ">
            
            {ImagePerson && ImagePerson.length > 0 ? (
                ImagePerson.map((image) => (
                    <div className=" overflow-hidden" key={image.file_path} >
                        <Image src={`${urlImagesPerson}${image.file_path}`}
                            alt={image.file_path}
                            width={100}
                            height={100}
                            priority
                            className="rounded-md"
                            style={{ width: "auto" }}
                            />
                    </div>
            ))) : (
            <p>No image</p>
            
        )}

        </div>
        <ScrollBar orientation="horizontal" />
        </ScrollArea>
                        </div>
    )
}