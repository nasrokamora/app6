"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Search() {
    const [value, setValue] = useState('')
    const [resultData, setResultData] = useState([])
    const [errorMessage, setErrorMessage] = useState('')


    const handleChange = (e) => {
        setValue(e.target.value)
        setErrorMessage('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${value}`, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
                }
            })
            const data = await response.json()
            setResultData(data.results)

        } catch (error) {
            console.log('Error fetching search results:', error)
        }
        if (value.length < 3) {
            setErrorMessage('Please enter at least 3 characters')
            return
        }
    }




    return (
        <form onSubmit={handleSubmit} className=" form-control  md:hidden lg:hidden ">

            {/* <button type="submit" onClick={handleSubmit}>Search</button> */}
            <input type="text"
                placeholder="Search"
                className="  bg-transparent md:w-auto placeholder:pl-1 placeholder:ml-2"
                value={value}
                onChange={handleChange}
                tabIndex={0}
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <ul className="list-none relative flex flex-col w-56">
                {resultData.map((item) => (
                    <li className=" absolute top-0 left-0 z-[1] flex flex-col"> {item.title || item.original_title} </li>
                ))}
            </ul>

        </form>
    )
}