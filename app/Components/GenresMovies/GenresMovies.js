
import { getData, getDataGenre, getGenres} from "@/app/libs/DataFetching"
import { Button } from "@/components/ui/button"
import BtnGenre from "./BtnGenre"





export default async function GenresMovies({}){
    const data = await getGenres()
    const resultData = data.results
    const dataGenres = data.genres
    const dataGenreMovie = await Promise.all(dataGenres.map(genre => getGenres(genre.id))) 
    console.log(dataGenreMovie)
    



    return(
        <div>
            {dataGenres.map((item)=>(
                <div key={item.id}>
                    <BtnGenre  name={item.name}/>
                </div>
            ))}
            {dataGenreMovie.map((item)=>(
                <div key={item.id}>
                    {item.title}
                </div>
            ))}
        </div>
    )
}