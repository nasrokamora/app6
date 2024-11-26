"use client"


import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
} from "@/components/ui/carousel"


export default function CarouselAuto({ children }) {


    return (
        <Carousel className=" w-full " opts={{ loop: true }} 
>
            {children}
        </Carousel>
    )
}