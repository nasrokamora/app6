import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
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
  
import { urlImage } from "@/app/libs/DataFetching"
export default function PopularPerson({ dataPersonPopular }) {
    console.log(dataPersonPopular);


    return (
        <div className=" ml-6 flex justify-center items-center ">

        </div>
    )
}