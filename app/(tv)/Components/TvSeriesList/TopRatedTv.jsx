import { getTopRatedTv } from "@/app/libs/DataFetchingTv"







export default async function TopRatedTv(){
    const data = await getTopRatedTv()
    const dataTopRated = data.results
    return(
        <div className=" w-full">
            <div>
                {dataTopRated.map((item)=>(
                    <div key={item.id}>
                        <h1>{item.name}</h1>
                    </div>
                ))}
            </div>
        </div>
    )

}