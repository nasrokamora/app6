import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type');

    const validTypes = ['discover', 'popular', 'moviesId'];

    if (!type || !validTypes.includes(type)) {
        return NextResponse.json({ error: 'Type is required' }, { status: 400 });
    }

    if (type === 'moviesId') {
        if(!id || !/^\d+$/.test(id)) {
            return NextResponse.json({error: 'ID is required for moviesId'}, {status: 400});
        }
    }

    let url = '';
    const API_TOKEN = process.env.NEXT_API_TOKEN;
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
    };

    switch (type) {
        case 'discover':
            url = `https://api.themoviedb.org/3/discover/movie`;
            break;
        case 'popular':
            url = `https://api.themoviedb.org/3/movie/popular?page=2`;
            break;
        case 'moviesId':
            if (!id) {
                return NextResponse.json({ error: 'ID is required for moviesId' }, { status: 400 });
            }
            url = `https://api.themoviedb.org/3/movie/${id}`;
            break;
        default:
            return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    try {
        const response = await fetch(url, { headers });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch data' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


// export  async function handler(req, res) {

//     let url = ''
//     const { id, type } = req.query

//     const API_TOKEN = process.env.NEXT_API_TOKEN
//     const headers = {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${API_TOKEN}`
//     }

//     switch (type) {
//         case 'discover':
//             url = `https://api.themoviedb.org/3/discover/movie`
//             break;
//         case 'popular':
//             url = `https://api.themoviedb.org/3/movie/popular?page=2`
//             break;
//         case 'moviesId':
//             url = `https://api.themoviedb.org/3/movie/${id}`
//             break;
//         default:
//             res.status(400).json({ error: 'Invalid type' })
//             return;
//     }



//     try {
//         const response = await fetch(url, {
//             headers: headers
//         })
//         if (!response.ok) {
//             return res.status(response.status).json({ error: 'Failed to fetch data' })
//         }
//         const data = await response.json()
//         return Response.json({data})
//         res.status(200).json(data)
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }


// }