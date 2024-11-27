"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import { Terminal } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"


export default function RatingTvShow({ id }) {

    // استخدام hooks لإدارة الحالة: التقييم، التحميل، الخطأ، والنجاح
    const [rating, setRating] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const { toast } = useToast()


    // دالة لمعالجة إرسال التقييم
    async function handleRate(e) {
        e.preventDefault();
        // التأكد من أن التقييم ضمن النطاق الصحيح

        if (rating < 0.5 || typeof rating !== "number" || rating > 10) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Please enter a rating between 0.5 and 10.",
                action: <ToastAction altText=" Try again">Try again</ToastAction>,
              })
              return
        }



        setLoading(true); // تعيين حالة التحميل إلى true أثناء الإرسال
        setError(null);   // إعادة تعيين حالة الخطأ
        setSuccess(false); // إعادة تعيين حالة النجاح


        try {
            // إرسال الطلب إلى API Route الخاص بالتقييم
            const response = await fetch('/api/RateTvShow', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id, rating })// تحويل seriesId والتقييم إلى JSON وإرساله
            })
            const data = await response.json()
            console.log(data)
            if (!response.ok) {
                throw new Error("failed to fetch data")
            }
            setSuccess(true) // تعيين حالة النجاح إلى true إذا نجح الطلب

            setRating(0);

            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            setError(error.message) // تعيين رسالة الخطأ في حالة الفشل
        } finally {
            setLoading(false) // إعادة تعيين حالة التحميل إلى false بعد انتهاء العملية

        }
    }

    return (
        <div className="w-full h-auto ">
            
            <form onSubmit={handleRate} className=" w-full m-0 ">
                    <div className="flex gap-2  justify-start items-center w-full">
                        <Input className=" w-full p-2 "
                            type="number"
                            min="0.5"
                            max="10"
                            step="0.5"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            required
                        />
                        <Button variant="outline"
                            type="submit" disabled={loading} >
                            {loading ? "Processing..." : "Rate"}
                        </Button>

                            </div>
                        <div>
                            {success &&
                                <p className=" text-success text-xl mt-4" >Successfully Assessed, Thank you.</p>
                            }
                        </div>
                        {error && <p className=" text-error text-xl mt-4" style={{ color: 'red' }}>Error</p>}

            </form>
        </div>
    )
}