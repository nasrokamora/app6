"use client"


import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
} from "@/components/ui/carousel"
import { useRef } from "react"


export default function AllAutoCarousel({ children }) {
    const plugin = useRef(
        Autoplay({ delay: 2500, stopOnInteraction: true, playDirection: "right" })
      )
      
      
    return (
        <Carousel plugins={[plugin.current]}
        opts={{
            align: "start",
            loop: true,
          }}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.play}
          className="w-full md:max-w-sm max-w-5xl 2xl:max-w-full "
>
            {children}
        </Carousel>
    )
}