"use client"

import SkeletonLoadMoreTv from '@/app/Components/LoadingUi/SkeletonLoadMoreTv';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

export const metadata = {
    title: "Magix Movies | Tv Series",
    discription: "explore tv series on magix movies"

};
const LoadMoreTv = dynamic(() => import('@/app/(tv)/Components/LoadMoreTv/LoadMoreTv'), { ssr: false });
const ToggleButton = dynamic(() => import('@/app/(movies)/Components/ToggleButton/ToggleButton'), { ssr: false });

export default function Tv() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    },[]);



    return (
        <div className="w-full h-auto">
            {isLoading ? (
                <SkeletonLoadMoreTv />
            ):(
                <LoadMoreTv />    
            )}
            <ToggleButton />

        </div>
    )
}