import { NextResponse } from "next/server"


export async function POST(request) {
    const { id, rating } = await request.json()

    const URL_API = `https://api.themoviedb.org/3/movie/${id}/rating`
    const API_TOKEN= process.env.NEXT_API_TOKEN
    const hedears = {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${API_TOKEN}`
    }

    if (!id || typeof rating !== 'number' || rating < 0.5 || rating > 10) {
        return new Response(JSON.stringify({ error: "Invalid rating " }), {
            status: 400
        })
    }

    try {

        const response = await fetch(URL_API, {
            headers: hedears,
            method: 'POST',
            body: JSON.stringify({ value: rating })
        })

        if (!response.ok) {
            const ErrorDataMovies = await response.json()
            return NextResponse.json(ErrorDataMovies, { status: response.status })
        }

        const data = await response.json()
        return NextResponse.json(data, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: 'failed POST => section Movies' }, { status: 500 })
    }

}