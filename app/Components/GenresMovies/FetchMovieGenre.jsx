"use server"
import { getDataMovieWithGenre } from "@/app/libs/DataFetching"
import BtnGenre from "./BtnGenre"


export default async function FetchMovieGenre(){
    
    const data = await getDataMovieWithGenre()
    const MovieGenre = data.results
    return(
        <div>
            <BtnGenre getDataMovieWithGenre={getDataMovieWithGenre} />


            <div>
                {MovieGenre.map((item)=>(
                    <div>
                        <h1>{item.title}</h1>
                    </div>
                ))}
            </div>
        </div>

    )
}