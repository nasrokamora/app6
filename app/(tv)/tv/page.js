
import SkeletonLoadMoreTv from '@/app/Components/LoadingUi/SkeletonLoadMoreTv';
import dynamic from 'next/dynamic';

export const metadata = {
    title: "Magix Movies | Tv Series",
    discription: "explore tv series on magix movies"

};
const LoadMoreTv = dynamic(() => import('@/app/(tv)/Components/LoadMoreTv/LoadMoreTv'), { ssr: false });
const ToggleButton = dynamic(() => import('@/app/(movies)/Components/ToggleButton/ToggleButton'), { ssr: false });

export default function Tv() {

    return (
        <div className="w-full h-auto">
            {<SkeletonLoadMoreTv /> &&(
                <LoadMoreTv />    
            )
        }
        <ToggleButton />
        </div>
    )
}