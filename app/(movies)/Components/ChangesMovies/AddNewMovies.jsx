import Image from "next/image"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { urlImage } from "@/app/libs/DataFetching"
import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"


export default function AddNewMovies({ dataChanges }) {
    // const dataChanges = data.filter(change => change.key === "images")
    // console.log(data)
    
    return (
        <div>
            <div>
                <h1>Discover Recent Movie Changes</h1>
            </div>
            <ScrollArea className="border rounded-md w-96 whitespace-nowrap">


                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}