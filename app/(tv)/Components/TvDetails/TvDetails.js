import { urlImageTv } from "@/app/libs/DataFetchingTv"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { RiProductHuntLine } from "react-icons/ri";
import { HiMiniNoSymbol } from "react-icons/hi2";
async function getTvId(series_id){
    const res = await fetch(`https://api.themoviedb.org/3/tv/${series_id}?api_key=${process.env.NEXT_API_KEY}`)
    if (!res.ok) {
        throw new Error("failed to fetch data")
    }
    return res.json()
}
async function getImageTvSeries(series_id){
    const res = await fetch(`https://api.themoviedb.org/3/tv/${series_id}/images?api_key=${process.env.NEXT_API_KEY}`)
    if (!res.ok) {
        throw new Error("failed to fetch data")
    }
    return res.json()
}



export default async function TvDetails({series_id}) {
    const data = await getTvId(series_id)
    // console.log(data);
    const dataImage = await getImageTvSeries(series_id)   
    const ImageTV = dataImage.backdrops.slice(0,6)
    // console.log(ImageTV)
    const [tvData, tvImage] = await Promise.all([data, ImageTV])
   
   
    return(
        <div className="  w-full">
            <div className="">


            <div className='  pt-2 flex justify-start gap-4 '>
            <Image  src={`${urlImageTv}/${tvData.poster_path}`}
            width={100} height={100} priority alt={tvData.name}
            style={{width:"auto"}}
            />
            
            <div className=" flex gap-3 items-start h-fit">
                {tvData.genres.map((tv)=>(
                    <Badge className={cn('font-semibold')} key={tv.id}>{tv.name}</Badge> 
                ))}
                <br/>
                <div className="flex ">
                <p className=" flex  gap-1"><strong>In Production :</strong> {tvData.in_production ? <RiProductHuntLine size={24} /> : <HiMiniNoSymbol size={24} />}</p>
                </div>
            </div>
                </div>

{/* 
            <div className=" grid grid-cols-6 w-full gap-4 p-7">
                {tvImage.map((item)=>(
                    <div className=" flex w-full">
                        <Image 
                        src={`${urlImageTv}/${item.file_path}`} 
                        width={100} 
                        height={100} 
                        priority alt={tvData.name} 
                        style={{width:"auto"}}
                        />
                    </div>
                ))} 
            </div> */}
            </div>
        </div>
    )
}