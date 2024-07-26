import { NextResponse } from "next/server"


export async function GET(){
    const response = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.NEXT_API_KEY}`)


    const data = await response.json()
    const dataTv = data.results
    return Response.json({data:dataTv})
}