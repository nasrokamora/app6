"use client";
import { motion } from "framer-motion";



export default function TransitionCom({children}) {
    return(
        <motion.div
        initial={{ opacity: 0 }}
        animate={{
            opacity: 1,
        }}
        transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
        className="w-full"
        >

            {children}
        </motion.div>
    )
}