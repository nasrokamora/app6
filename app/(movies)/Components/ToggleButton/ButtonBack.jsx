"use client"


import { useRouter } from "next/navigation";

export default function ButtonBack() {
    

    const router = useRouter();


    
    
    
    return(
        <div className=" relative">
            

                    <button className="fixed z-50 bottom-10 right-10 bg-red-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-red-600" onClick={() => router.back()}>back</button>


        </div>
    )
}