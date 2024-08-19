"use client"



import { motion, useScroll, useSpring } from "framer-motion"

export default function AnimateScroll() {
  const {scrollYProgress  } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  return (
    <motion.div style={{scaleX}} className='fixed top-0 left-0  right-0 origin-left h-1 bg-yellow-500 ' />  
  )
}