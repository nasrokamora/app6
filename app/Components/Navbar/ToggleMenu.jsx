"use client"
import Link from "next/link";
import { DataLink } from "@/app/libs/DataLink";
import { useState } from "react";
import { FiAlignRight } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ToggleMenu() {
    const [isShow, setIsShow] = useState(false);

    const handleActive = () => {
        setIsShow(!isShow);
    }
    return (
        <div className="  toggle-menu  lg:hidden xl:hidden 2xl:hidden 3xl:hidden h-auto  ">
                <button type="button" className="" onClick={handleActive}>
                    {isShow ? <FiX  size={28} className=""/> : <FiAlignRight size={28} className=""  />}
                </button>
                <div className="">
                <div className=" ">

                
                <motion.div transition={{duration:0.8}} initial={{height:"0%",opacity:0}} animate={{height:[["0%"],["100dvh"]],opacity:1,}}  className={isShow ? 
                "  flex flex-col absolute  items-center gap-4 right-0 h-auto top-16     w-full": "hidden"} >
                    {DataLink.map((item, index) => (
                        <motion.div key={index}  
                        transition={{duration:0.8}} initial={{opacity:0}} whileInView={{opacity:1}}    className="  btnf pt-14 ">

                            <button href={item.link}  className="btnN from-left mt-8" onClick={handleActive}>{item.name}</button>
                        </motion.div>
                    ))}
                </motion.div>
                </div>
                            </div>


        </div>
    )
}