import { getSeasonTvDetails } from "@/app/libs/DataFetchingTv"
import Image from "next/image"





export default async function DetailsSeasonTv({season,id,}) {
//    const data = await getSeasonTvDetails(id,season.season_number)

    // console.log(data)
   
   
    return (
        <div className="">
            <div className=" flex justify-center items-center gap-2 scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">
            <strong className="text-[#123eac]" >Season :</strong>
            <h1 className="text-[#ecb329] underline decoration-yellow-500">{season.name}</h1>
            </div>
            <div className="pt-2 flex justify-center items-center text-[#52525b] itelic scroll-m-20 text-xl font-semibold tracking-tight">
                <h3>{season.air_date  ? season.air_date.replace( /-/g ,'/') : "Undefined"}</h3>
            </div>
            <div>
                <div className=" relative overflow-hidden md:flex md:justify-center md:items-center md:pt-2">
                    <Image src={`https://image.tmdb.org/t/p/original${season.poster_path ? season.poster_path : "Undefined"}`} 
                    alt={season.name} 
                    width={250} 
                    height={150} 
                    className=" rounded-md"
                    style={{height:"auto"}}
                    priority />
                </div>
            </div>
        </div>
    )
}