"use client"


import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
} from "@/components/ui/carousel"
import { useRef } from "react"


export default function CarouselAuto({ children }) {
    const plugin = useRef(
        Autoplay({ delay: 2500, stopOnInteraction: true, playDirection: "right" }))

    return (
        <Carousel  opts={{ loop: true, align: "start" }} 
        // plugins={[plugin.current]}
        // onMouseEnter={plugin.current.stop}
        // onMouseLeave={plugin.current.play}
        >
            {children}
        </Carousel>
    )
}