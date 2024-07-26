"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import TopRatedTv from "../TvSeriesList/TopRatedTv"
import PopularSeries from "../TvSeriesList/PopularSeries"
import TopTv from "../TvSeriesList/TopTv"



export default function NavigateBars() {

    const [activContent, setActivContent] = useState('topRated')

    const handleContent = async (content) => {
        if (content === 'topRated') {
            setActivContent('topRated')
        } else if (content === 'popular') {
            setActivContent('popular')
        } else if (content === 'top') {
            setActivContent('top')
        }
    }

    useEffect(() => {
        handleContent('topRated')
    }, [])


    return (
        <div className=" w-full pt-4">
            <div className=" flex justify-center items-center gap-4">
                <Button variant="outline" onClick={() => handleContent('topRated')}>TV</Button>
                <Button variant="outline" onClick={() => handleContent('popular')}>Popular Tv</Button>
                <Button variant="outline" onClick={() => handleContent('top')}>Top</Button>
            </div>
            <div>
                {activContent === 'topRated' && (<TopRatedTv />)}
            </div>
            <div>
                {activContent === 'popular' && (<PopularSeries />)}
            </div>
            <div>
                {activContent === 'top' && (<TopTv />)}
            </div>
        </div>
    )
}