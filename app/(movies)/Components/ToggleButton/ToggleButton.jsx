"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'



export default function ToggleButton(){

    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 150){
                setIsVisible(true);
            }else{
                setIsVisible(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);


    }, []);




    return(
        <div className=" relative">
            {isVisible && (
                <button className="fixed z-50 bottom-10 right-10 bg-red-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-red-600" onClick={() => router.back()}>back</button>
            )
            }
        </div>
    )
}