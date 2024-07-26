import CardMovies from "../Components/CardMovies/CardMovies"




export  async function fetchMovie(){
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_API_KEY}&page=1&limit=8`,{}, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`
        }
    })
        const dataMovie = await res.json()
        return  dataMovie.results.map((movie,index)=>(
            <CardMovies movie={movie} index={index} id={movie.id} />
        ))


}
