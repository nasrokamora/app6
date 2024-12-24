"use client"


import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
} from "@/components/ui/carousel"
import { useRef } from "react"


export default function CarouselAutoshow({ children }) {
    const plugin = useRef(
        Autoplay({ delay: 2500, stopOnInteraction: true, playDirection: "right" }))

    return (
        <Carousel opts={{
            align: "start",
            loop: true,
        }}
            className="w-full md:max-w-md  max-w-5xl 2xl:max-w-full lg:max-w-4xl"
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.play}
        >
            {children}
        </Carousel>
    )
}