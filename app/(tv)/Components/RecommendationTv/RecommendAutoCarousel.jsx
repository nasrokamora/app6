"use client"


import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
} from "@/components/ui/carousel"
import { useRef } from "react"


export default function AutoReccomendCarousel({ children }) {
    const plugin = useRef(
        Autoplay({ delay: 2800, stopOnInteraction: true, playDirection: "right" })
      )
      
      
    return (
        <Carousel plugins={[plugin.current]}
        opts={{
            align: "start",
            loop: true,	
          }}
          className="w-full max-w-5xl md:max-w-lg 2xl:max-w-6xl"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.play}>
            {children}
        </Carousel>
    )
}