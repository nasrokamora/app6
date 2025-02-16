"use client"

import { useEffect, useState } from "react"
import TrendingMovies from "./TrendingMovies"


export default function TrendingMoviesLoad() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {

        const drawerInput = document.getElementById('my-drawer-4')
        if (!drawerInput) return

        const hadleChange = () => {
            setIsMenuOpen(drawerInput.checked)
        }
        //
        drawerInput.addEventListener('change', hadleChange)
        setIsMenuOpen(drawerInput.checked)

        return () => {
            drawerInput.removeEventListener('change', hadleChange)
        }
            

    }, [])


    return (
        <div className="pt-10">
            {isMenuOpen &&(
            <TrendingMovies />
            )}
        </div>
    )
}