"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { cn } from "@/lib/utils"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

export default function RatingUsersMovies({ id }) {

    const [rating, setRating] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)


    async function handleRateMovies(e) {

        e.preventDefault()

        setError(null)
        setLoading(true)
        setSuccess(false)


        try {
            const response = await fetch('/api/RateMovies', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, rating }),
            })
            const data = await response.json()
            console.log(data);

            if (!response.ok) {
                throw new Error("failed to fetch data raing movies");
            }
            setSuccess(true,)
            setRating(0)

            // setTimeout(() => {
            //     setSuccess(false)
            // }, 3000);

        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className=' mt-7'>
            <div>
                <form onSubmit={handleRateMovies} className="w-2/3 space-y-6">
                <div className=' flex justify-center items-center gap-4'>

                    <Input value={rating} className={cn( "border-purple-700", error && "border-red-500")}
                        type="number"
                        min="0.5"
                        max="10"
                        step="0.5"
                        onChange={(e) => setRating(Number(e.target.value))}
                        required
                    />

                    <Button type="submit" variant="outline" className="" disabled={loading} >
                        {loading ? "Processing..." : "Rate"}
                    </Button>
                        </div>

                    <div className=" relative ">
                        {success &&
                            <div className="z-50 md:max-w-md p-5 max-w-2xl flex justify-center items-center -top-[10rem] left-0 right-0  absolute border border-green-900 bg-black rounded-lg">
                                
                            <p className=' text-green-500 text-xl md:text-base font-bold ' >Successfully Rated.</p>
                            </div>

                        }
                    </div>
                    {error && <Alert variant="destructive" className=" bg-black/30 backdrop-blur">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {error}.
                        </AlertDescription>
                    </Alert>}
                </form>
            </div>
        </div>
    )
}