"use client"
import dynamic from 'next/dynamic';


 const LoadMoreTv = dynamic(() => import("@/app/(tv)/Components/LoadMoreTv/LoadMoreTv"),{
    ssr: false
 }) 




export default function Tv() {

    return (
        <div className="w-full h-auto">
            <LoadMoreTv />


        </div>
    )
}