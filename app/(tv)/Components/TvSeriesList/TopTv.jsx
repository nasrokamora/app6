import { getTopTv } from "@/app/libs/DataFetchingTv"



export default async function TopTv() {
    const data = await getTopTv()
    const dataTopTv = data.results
    return (
        <div className=" w-full">
            {dataTopTv.map((item) => (
                <div key={item.id}>
                    <h1>{item.name}</h1>
                </div>
            ))}
        </div>
    )

}