import { getPopularTv } from "@/app/libs/DataFetchingTv"


export default async function PopularSeries() {

    const data = await getPopularTv()
    const dataPopularTv = data.results

    return(
        <div className=" w-full">
            {dataPopularTv.map((item)=>(
                <div key={item.id}>
                    <h1>
                        {item.name}
                    </h1>
                </div>
            ))}
        </div>
    )

}
