"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { FaAngleDoubleUp } from "react-icons/fa";


import { useRouter } from 'next/navigation'
import { FaAngleDoubleUp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { RiArrowGoBackFill } from "react-icons/ri";
export default function ToggleUp() {



    const [toggle, setToggle] = useState(false)
    

    useEffect(() => {

        const handleScroll = () => {
            if (window.scrollY > 150) {
                setToggle(true);
            } else {
                setToggle(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    function ScrollUp() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div className=" rounded-full">
            {toggle && (
                <Button variant="outline" className="fixed z-50 bottom-40 right-10   font-bold  rounded-full hover:animate-pulse" onClick={ScrollUp}>
                    <FaAngleDoubleUp className=" " />
                </Button>
            )}
        </div>
    )
}