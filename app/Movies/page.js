import TestId from "../Components/test/TestId"



async function getData({movie_Id}) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movie_Id}?api_key=${process.env.NEXT_API_KEY}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`
        }
    })
    if(!res.ok) {
        throw new Error("failed to fetch data")
    }
    return res.json()
}




export default async function Movies() {
const data = await getData(movie_Id)



    return (
        <div className=" w-full h-screen">
            <h1>Movies</h1>
            {data.results.map((movie) => (
                <div>
                    <h1>
                        {movie.title}
                    </h1>
                    <TestId movie={movie} />
                </div>
            ))}
        </div>
    );
}