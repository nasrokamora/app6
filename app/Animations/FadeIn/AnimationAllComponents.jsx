"use client"

import { motion } from "framer-motion"


export default function AnimationAllComponents({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileInView={{ once: 1, amount: 0.2 }}
        >
            {children}
        </motion.div>
    )
}

