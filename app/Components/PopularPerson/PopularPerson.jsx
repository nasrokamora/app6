
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import no_image from "../../../public/image/no_image4.webp"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { urlImage } from "@/app/libs/DataFetching"

export default function PopularPerson({ dataPersonPopular }) {
    // console.log(dataPersonPopular);
    // dataPersonPopular.filter()

    return (
        <div className="  flex justify-center items-center w-full h-auto mt-5">


            <ScrollArea className='max-w-3xl whitespace-nowrap rounded-md border' >
                <div className='max-w-5xl p-4'>
                    {dataPersonPopular && dataPersonPopular.length > 0 ? (
                        dataPersonPopular.map((person) => (
                            <div key={person.id}>
                                
                            </div>










                        ))
                    ) : (
                        <Alert variant="destructive" className=" bg-black/30 backdrop-blur">
                            <AlertCircle className="w-4 h-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                Something went wrong.
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </ScrollArea>
        </div>
    )
}