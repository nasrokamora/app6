"use client"
import { useEffect, useState } from "react";

export default function NavMenu({ children }) {
    const [showNav, setShowNav] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    
    //function to handle scroll
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
            setShowNav(false);
        } else {
            setShowNav(true);
        }
        setLastScrollY(currentScrollY);
    }
    //useEffect to add event listener to window scroll
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [lastScrollY])

    return (
        <div className={`px-6 navbar w-full  md:flex md:items-center flex justify-between items-center transition-transform duration-300 ${showNav ? "translate-y-0" : "-translate-y-full"} fixed top-0 left-0 right-0 bg-[#09090b]/70 backdrop-blur z-50`}>
            {children}
        </div>
    )
}