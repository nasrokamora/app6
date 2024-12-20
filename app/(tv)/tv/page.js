
import dynamic from 'next/dynamic';

export const metadata = {
    title: "Magix Movies | Tv Series",
    discription:"explore tv series on magix movies"

};
const LoadMoreTv = dynamic(() => import('@/app/(tv)/Components/LoadMoreTv/LoadMoreTv'), { ssr: true });

export default function Tv() {

    return (
        <div className="w-full h-auto">
            <LoadMoreTv />


        </div>
    )
}