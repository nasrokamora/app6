"use client"


import { motion } from "framer-motion"



export default  function MotionDiv({children, index}){
    const varients = {
        hidden:{
            opacity:0,
        },
        visible:{
            opacity:1,
        }
    }

    return( 
        <motion.div
        varients={{
            varients
        }}
        initial="hidden"
        animate="visible"
        transition={{duration:0.5,
            delay:{delay:index*0.25},
            ease:"easeInOut",
        }}
        
        >
            {children}
        </motion.div>

    )
} 

