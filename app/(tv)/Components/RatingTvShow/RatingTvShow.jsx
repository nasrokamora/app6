"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"


export default function RatingTvShow({ id }) {

    // استخدام hooks لإدارة الحالة: التقييم، التحميل، الخطأ، والنجاح
    const [rating, setRating] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [userRatig, setUserRating] = useState(null)


    // جلب التقييم الحالي للمستخدم عند تحميل الصفحة
    useEffect(() => {
        setLoading(true)
        const fetchUsersRating = async () => {
            try {
                const response = await fetch(`/api/GetUserRating?id=${id}`)

                const data = await response.json()

                setUserRating(data.rating)
                // تعيين قيمة التقييم المدخلة للمستخدم
                setRating(data.rating)

            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchUsersRating()
    }, [id])


    // دالة لمعالجة حذف التقييم
    async function handleDeletRating() {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(`/api/RateTvShow`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({ id })
            })
            if (!response.ok) {
                throw new Error("failed to delete rating");
            }

            const data = await response.json();
            console.log(data);

            // إعادة التقييم إلى 0 بعد الحذف
            setRating(0);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);

        } catch (error) {
            // إظهار رسالة خطأ
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }










    // دالة لمعالجة إرسال التقييم
    async function handleRate(e) {
        e.preventDefault();
        // التأكد من أن التقييم ضمن النطاق الصحيح
        if (rating < 0.5 || rating > 10) {
            alert("يجب أن تكون التقييم بين 0.5 و 10")
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
        <div className="w-[25rem] h-[25rem]">
            <h1>Rate Tv Show</h1>
            <div>
                {userRatig !== null ? (
                    <div>
                        <h1>Rating : {userRatig}</h1>
                        <Button variant="outline" onClick={handleDeletRating} disabled={loading}>
                        {loading ? "Processing..." : "Delete Rating"}
                        </Button>
                    </div>
                ) : (

                    <div>
                        <Input
                            type="number"
                            min="0.5"
                            max="10"
                            step="0.5"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            required
                        />
                        <Button variant="outline"
                            onClick={handleRate} disabled={loading} >
                            {loading ? "Processing..." : "Rate"}
                        </Button>

                        <div>
                            {success &&
                                <p style={{ color: 'green' }}>تم التقييم بنجاح</p>
                            }
                        </div>
                        {error && <p style={{ color: 'red' }}>خطأ: {error}</p>}
                    </div>
                )}
            </div>
        </div>
    )
}