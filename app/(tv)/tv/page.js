

import SkeletonLoadMoreTv from '@/app/Components/LoadingUi/SkeletonLoadMoreTv';
import dynamic from 'next/dynamic';

import LoadMoreTv from '../Components/LoadMoreTv/LoadMoreTv';



const ToggleButton = dynamic(() => import('@/app/(movies)/Components/ToggleButton/ToggleButton'), { ssr: false });

export default function Tv() {



    return (
        <div className="w-full h-auto">

                <LoadMoreTv />    

            <ToggleButton />

        </div>
    )
}