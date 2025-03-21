"use client"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CardResults from "./CardResult"
import { useCallback, useEffect, useState } from "react"
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
import { searchQuerySchema } from "@/app/libs/searchQuerySchema"
import { z } from "zod"


async function SearchMulti(query) {
    try {

        searchQuerySchema.parse(query)

        const response = await fetch(`/api/getSearchMulti?query=${query}`)
        const data = await response.json()
        if (!response.ok) {
            throw new Error('Failed to fetch data')
        }
        return data

    } catch (error) {
        if (error instanceof z.ZodError) {
            const isProduction = process.env.NODE_ENV === 'production'
            return {
                error: true,
                message: isProduction ? 'An unexpected error occurred.' : error.errors[0].message || "An unexpected error occurred."
            }
        }

        if (process.env.NODE_ENV !== "production") {
            console.log(error, 'Failed to fetch data SearchMulti');
        }
        return {
            error: true,
            message: process.env.NODE_ENV === 'production' ? "An unexpected error occurred." : error.message
        };
    }
}


export default function SearchMultiPage() {
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    if (!movies) return null


    // Check if the query contains forbidden words
    const isQueryForbidden = useCallback((query, language) => {
        const forbidden = forbiddenWordsData[language] || []
        return forbidden.some((word) => query.toLowerCase().includes(word.toLowerCase()))
    }, [])

    // useEffect(() => {
    //     if (query.length < 3) {
    //         setMovies([]); // مسح النتائج عند الحذف
    //         setErrorMessage("");
    //         return;
    //     }

    //     const delayDebounceFn = setTimeout(async () => {
    //         setIsLoading(true);

    //         if (isQueryForbidden(query, "en")) {
    //             setErrorMessage("The search term contains forbidden content.");
    //             setIsLoading(false);
    //             return;
    //         }

    //         const data = await SearchMulti(query);
    //         if (data.error) {
    //             setErrorMessage("The search term contains invalid characters.");
    //             setIsLoading(false);
    //             return;
    //         }

    //         setMovies(data.results);
    //         setErrorMessage(data.results.length === 0 ? "No results found." : "");
    //         setIsLoading(false);
    //     }, 500); // تأخير 500 مللي ثانية لتقليل عدد الاستدعاءات

    //     return () => clearTimeout(delayDebounceFn);
    // }, [query, isQueryForbidden]);

    // Handle the search form submission
    const handleSearch = useCallback(async (e, language) => {
        e.preventDefault()
        setIsLoading(true)

        if (isQueryForbidden(query, language)) {
            setErrorMessage('The search term contains forbidden content.')
            setIsLoading(false)
            return
        }

        const data = await SearchMulti(query)
        if(data.error){
            setErrorMessage("The search term contains invalid characters.")
            setIsLoading(false)
            return

        }
        setMovies(data.results)
        if (data.results.length === 0) {
            setErrorMessage('No results found. Please try a different search term.')
            setIsLoading(false)
            return
        }
        setQuery('')
        setErrorMessage('')
        setIsLoading(false)

    }, [query, isQueryForbidden])

    const handleClick = useCallback((movie) => {
        setSelectedMovie(movie)
    }, [])


    const handleClose = useCallback(() => {
        setSelectedMovie(null)
        setMovies([])
    }, [])

    const ColorChangeInError = (errorMessage) => {
        switch (errorMessage) {
            case "The search term contains forbidden content.": return "text-red-700"
            case "The search term contains invalid characters.": return "text-orange-700"
            case "No results found. Please try a different search term.": return "text-yellow-500"
            default: return "text-red-700"
        }
    }


    function SearchLoading() {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
                <div className="w-16 h-16 border-4 border-blue-700 border-t-transparent border-dashed rounded-full animate-spin"></div>
                <p className="text-blue-700 font-semibold pt-6 xl:text-xl 2xl:text-2xl">
                    Loading your results, one moment please...
                </p>
            </div>
        );
    };

    return (
        <>
            <Sheet className=" ">
                <SheetTrigger><IoSearch size={25} className="hover:scale-125 transition-transform duration-500  active:scale-90 2xl:size-8 hover:text-amber-500" /></SheetTrigger>
                <SheetContent className="" side={"top"}>
                    <SheetHeader>
                        <SheetTitle>Explorer Movies on Magix</SheetTitle>
                        <SheetDescription>
                            Search for your favorite movies and series.
                        </SheetDescription>
                    </SheetHeader>
                    <main className="  py-2 w-full" onClick={() => handleClose()} >
                        <form onSubmit={(e) => handleSearch(e, "en")} className="flex w-full max-w-sm items-center space-x-2">
                            <Input
                                type="text"
                                placeholder="Search..."
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value)
                                    setErrorMessage('')
                                }}
                            />
                            <Button type="submit" disabled={query.length < 3 || isLoading}>{isLoading ? <><Loader2 className="animate-spin" /> <h1>please wait</h1></> : "Search"}</Button>

                        </form>
                        {isLoading && <SearchLoading />}
                        {errorMessage && <p className={`font-semibold pt-6 xl:text-xl 2xl:text-2xl ${ColorChangeInError(errorMessage)}`}>{errorMessage}</p>}
                    </main>

                    <CardResults movie={movies} handleClick={handleClick} handleClose={handleClose} isLoading={isLoading} />
                </SheetContent>
            </Sheet>

        </>
    )
}