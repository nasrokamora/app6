"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CardResults from "./CardResult"
import { useState } from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { IoSearch } from "react-icons/io5";

async function SearchMulti(query) {
    try {
        const response = await fetch(`/api/getSearchMulti?query=${query}`)
        const data = await response.json()
        if (!response.ok) {
            throw new Error('Failed to fetch data')
        }
        return data
        
    } catch (error) {
        if(process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data SearchMulti');
        }
        return { error: true, message: error.message };
    }
}


export default function SearchMultiPage() {
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)
    if (!movies) return null

    function handleClick(movie) {
        setSelectedMovie(movie)
    }
    function handleClose() {
        setSelectedMovie(null)
        setMovies([])
    }
    async function handleSearch(e) {
        e.preventDefault()
        if (!query) return;
        const data = await SearchMulti(query)
        setMovies(data.results)
        setQuery('')

    }
    // console.log(movies)

    
    return (
        <>
            <Sheet className=" ">
                <SheetTrigger><IoSearch size={25} className="hover:scale-125 transition-transform duration-500  active:scale-90 " /></SheetTrigger>
                <SheetContent className="" side={"top"}>
                    <SheetHeader>
                        <SheetTitle>Explorer Movies on Magix</SheetTitle>
                        <SheetDescription>
                            Search for your favorite movies and series.
                        </SheetDescription>
                    </SheetHeader>
                    <main className="  py-2 w-full" onClick={() => handleClose()} >
                        <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
                            <Input
                                type="text"
                                placeholder="Search..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <Button type="submit" disabled={query.length < 3}>Search</Button>
                        </form>
                    </main>

                    <CardResults movie={movies} handleClick={handleClick} handleClose={handleClose} />
                </SheetContent>
            </Sheet>

        </>
    )
}