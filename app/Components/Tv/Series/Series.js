import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


async function getDataSeriesId(series_id){
    const response = await fetch(`https://api.themoviedb.org/3/tv/${series_id}?api_key=${process.env.NEXT_API_KEY}`,{
        headers:{
            Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`
        }
    })
    return  response.json()
}    
export default async function Series({series_id,urlImage}) {
    const data = await getDataSeriesId(series_id)
    const dataSeries= data
    console.log(dataSeries);

    
    return (
        <main className=" ">
            {dataSeries.created_by.map((item)=>(
                <div>

                </div>
            ))}
        </main>
    )
}