import { getDetailsSeasonTv } from "@/app/libs/DataFetchingTv";




export default async function SeasonTvDetails({id,season_number}){
    const data = await getDetailsSeasonTv(id,season_number)
    console.log(data)
    return(
        <div>
            {data.cast.map(episode => (
                <div key={episode.id}>
                    <h1>{episode.name}</h1>
                </div>
            ))}
        </div>
    )
}