"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CardResults from "./CardResult"
import { useState } from "react"
import forbiddenWordsData from "../../../libs/forbiddenWords.json"
import {
    Sheet,
    SheetContent,
    SheetDescription,
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
        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data SearchMulti');
        }
        return { error: true, message: process.env.NODE_ENV === 'production' ? "An unexpected error occurred." : error.message };
    }
}


export default function SearchMultiPage() {
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    if (!movies) return null


    function handleClick(movie) {
        setSelectedMovie(movie)
    }
    function handleClose() {
        setSelectedMovie(null)
        setMovies([])
    }
    async function handleSearch(e, language) {
        e.preventDefault()
        setIsLoading(true)
        const forbidden = forbiddenWordsData[language] || []
        const isForbidden = forbidden.some((word) => query.toLowerCase().includes(word.toLowerCase()))
        if (isForbidden) {
            setErrorMessage('The search term contains forbidden content.')
            setIsLoading(false)
            return
        }

        const data = await SearchMulti(query)
        setMovies(data.results)
        if (data.results.length === 0) {
            setErrorMessage('Kindly provide a valid search term')
            setIsLoading(false)
            return
        }
        setQuery('')
        setErrorMessage('')
        setIsLoading(false)

    }

    return (
        <>
            <Sheet className=" ">
                <SheetTrigger><IoSearch size={25} className="hover:scale-125 transition-transform duration-500  active:scale-90 2xl:size-8" /></SheetTrigger>
                <SheetContent className="" side={"top"}>
                    <SheetHeader>
                        <SheetTitle>Explorer Movies on Magix</SheetTitle>
                        <SheetDescription>
                            Search for your favorite movies and series.
                        </SheetDescription>
                    </SheetHeader>
                    <main className="  py-2 w-full" onClick={() => handleClose()} >
                        <form onSubmit={(e) => handleSearch(e, 'en')} className="flex w-full max-w-sm items-center space-x-2">
                            <Input
                                type="text"
                                placeholder="Search..."
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value)
                                    setErrorMessage('')
                                }}
                            />
                            <Button type="submit" disabled={query.length < 3 || isLoading }>Search</Button>
                        </form>
                        {isLoading && (
                            <p className="text-blue-700 font-semibold pt-6 xl:text-xl 2xl:text-2xl">Loading your results, one moment please...</p>
                        )}
                        {errorMessage && <p className="text-red-700 font-semibold pt-6 xl:text-xl 2xl:text-2xl ">{errorMessage}</p>}
                    </main>

                    <CardResults movie={movies} handleClick={handleClick} handleClose={handleClose} isLoading={isLoading} />
                </SheetContent>
            </Sheet>

        </>
    )
}