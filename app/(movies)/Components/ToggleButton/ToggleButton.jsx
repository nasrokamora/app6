"use client"

import { useEffect, useState } from "react";




export default function ToggleButton(){

    const [isVisible, setIsVisible] = useState(false);


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
        <div>
            {isVisible && (
                <button className="fixed bottom-10 right-10 bg-red-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-red-600">Toggle Button</button>
            )
            }
        </div>
    )
}