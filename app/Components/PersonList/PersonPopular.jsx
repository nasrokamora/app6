
import Image from "next/image";
import MoviesCredits from "./MoviesCredits";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"


async function getDataPersonList(movie_Id) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_Id}/credits?api_key=${process.env.NEXT_API_KEY}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`
        }
    })
    if (!response.ok) {
        throw new Error('failed fetch data credit')
    }
    return response.json()
}





export default async function PersonPopular({ movie_Id, urlImage }) {
    const data = await getDataPersonList(movie_Id)
    const movie_credits = data.cast
    console.log(movie_credits);






    return (

                <div className=" grid grid-cols-4 font-bold md:grid-cols-2 lg:grid-cols-4 ">
                    {movie_credits.map((credit) => (

                            <div key={credit.id} className=" flex items-center gap-5 m-2 md:flex-col">
                                <Avatar className="">

                                    <AvatarImage src={`${urlImage}${credit.profile_path}`} alt={credit.name} />
                                </Avatar>
                                <h5>
                                    {credit.name}
                                </h5>

                                {/* <MoviesCredits person_id={person.id} urlImage={urlImage}/> */}
                            </div>


                    ))}
                </div>
 
    )
}


