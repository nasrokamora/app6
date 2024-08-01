import { getDetailsSeasonCreditsTv } from "@/app/libs/DataFetchingTv";




export default async function SeasonTvDetails({id,season_number}){
    const data = await getDetailsSeasonCreditsTv(id,season_number)
    // console.log(data)
    return(
        <div className=''>

            <div className=" flex justify-around flex-col items-center w-full">

            {data.cast.map(cast => (
                <div key={cast.id} className=" flex justify-around  items-center w-full">
                    <h1> {cast.name}</h1>
                    <h1>{cast.character}</h1>


                </div>
            ))}
            </div>
        </div>
    )
}