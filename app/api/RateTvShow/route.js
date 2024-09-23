import { NextResponse } from "next/server"


// دالة المعالجة لطلبات POST
export async function POST(request) {
    const { id, rating } = await request.json()

    // تكوين رابط API الخاص بتقييم المسلسل مع إضافة seriesId

    const API_URL = `https://api.themoviedb.org/3/tv/${id}/rating`
    const API_KEY = process.env.NEXT_API_TOKEN
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
    let response ;

    try {
        if (method === 'POST') {
            response = await fetch(API_URL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ value: rating })
            })
        }else if(method === "DELETE"){
            response = await fetch(API_URL,{
                method:"DELETE",
                headers:headers
            })
        }
        
        if (!response.ok) {
            // إذا كانت الاستجابة غير ناجحة، قراءة الرسالة وإرجاعها مع حالة الخطأ
            const ErrorData = await response.json()
            return NextResponse.json(ErrorData, { status: response.status })
        }
    
        const data = await response.json()
        return NextResponse.json(data,{ status: 200 })
    } catch (error) {
        // في حالة حدوث خطأ غير متوقع، إرجاع رسالة خطأ مع حالة 500 (خطأ داخلي)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
    }




        // التحقق من حالة الاستجابة من TMDB API
