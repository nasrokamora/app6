"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { FaAngleDoubleUp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function ToggleButton() {

    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();
    const [toggle, setToggle] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 150) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);


    }, []);

    // function ScrollUp

    useEffect(() => {
        const handleScrollUp = () => {
            if (window.scrollY > 150) {
                setToggle(true);
            } else {
                setToggle(false);
            }
        }
        window.addEventListener('scroll', handleScrollUp)
        return () => window.removeEventListener('scroll', handleScrollUp)

    }, [])

    function ScrollUp() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    }
    return (
        <div className=" relative">
            {isVisible && toggle && (
                <div className="">
                    <Button variant="outline" className="fixed z-50 mb-11 bottom-10  right-10 bg-black/50 backdrop-blur text-white font-bold py-2 px-4 rounded-full md:active:scale-95" onClick={ScrollUp}>
                        <FaAngleDoubleUp className=" " />
                    </Button>
                    <button className=" md:active:scale-95 fixed z-50 bottom-10 right-10 bg-black/50 backdrop-blur text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-red-600" onClick={() => router.back()}><RiArrowGoBackFill size={20} />

                    </button>
                </div>
            )
            }
        </div>
    )
}