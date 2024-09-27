import Image from "next/image"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"



export default async function AddNewMovies({ dataChanges }) {
    
    return (
        <div>
            <ScrollArea className="border rounded-md w-96 whitespace-nowrap">
                <div className="flex p-4 space-x-4 w-max">
                    {dataChanges.items.map((item) => (
                        <figure key={item.id} className="shrink-0">
                            <div className="overflow-hidden rounded-md">
                                <Image
                                    src={artwork.art}
                                    alt={`Photo by ${artwork.artist}`}
                                    className="aspect-[3/4] h-fit w-fit object-cover"
                                    width={300}
                                    height={400}
                                />
                            </div>
                            <figcaption className="pt-2 text-xs text-muted-foreground">
                                Photo by{" "}
                                <span className="font-semibold text-foreground">
                                    {artwork.artist}
                                </span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}