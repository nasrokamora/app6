import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import ImagePosterPath from "@/app/libs/ImagePosterPath"
import no_image from '../../../../public/image/no_image4.webp'
import Image from "next/image"

export default function PersonImage({ ImagePerson }) {

    return (
        <div className=" flex justify-center">

            <ScrollArea className="border border-yellow-500 rounded-md max-w-xl whitespace-nowrap md:max-w-sm lg:max-w-xl xl:max-w-xl">

                <div className="flex w-max space-x-4 p-4 ">

                    {ImagePerson && ImagePerson.length > 0 ? (
                        ImagePerson.slice(0, 3).map((image) => (
                            <div className=" overflow-hidden" key={image.file_path} >
                                {image.file_path ? (
                                    <ImagePosterPath
                                        width={100}
                                        height={100}
                                        index={image.id}
                                        tmdbPath={image.file_path}
                                        className="rounded-md"
                                        quality={75}
                                        alt={"image person" || "Unknown"}
                                        unoptimized
                                        draggable={false}
                                        priority
                                    />
                                ) : (
                                    <Image src={no_image}
                                        width={100}
                                        height={100}
                                        alt="no image"
                                        priority
                                        unoptimized={false}
                                        draggable={false}
                                    />
                                )}

                            </div>
                        ))) : (
                        <p className="text-error text-center font-bold">
                            No images found.
                        </p>

                    )}

                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}