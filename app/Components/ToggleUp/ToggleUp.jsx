"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function ToggleUp(){
    
    const [toggle, setToggle] = useState(false)
    

    useEffect(() => {

        const handleScroll = () => {
            if(window.scrollY > 150){
                setToggle(true);
            }else{
                setToggle(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    },[])
    
    function ScrollUp(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    
    return(
        <div>
            {toggle && (
                <Button variant="outline" className="fixed z-50 bottom-40 right-10   font-bold  rounded-md" onClick={ScrollUp}>Go to Top</Button>
            )}
        </div>
    )
}