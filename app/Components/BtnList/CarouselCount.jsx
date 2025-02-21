"use client"

import { useEffect, useState } from "react";


export const CarouselCount = () => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);


  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', ()=>{
      setCurrent(api.selectedScrollSnap() + 1)
    })


  }, [api])


}