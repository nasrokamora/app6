import { getMoviesGenre, getMoviesGenreList, getMoviesId } from "@/app/libs/DataFetching";
import BackGroundImageGenres from "@/app/(movies)/Components/BackGoundGenres/BackGroundImageGenres";


export default async function MoviesGenre({ params }) {
    const {id} = params
    const data = await getMoviesGenre(id)
    const dataResult = data.results
    const ids = dataResult.map(item => item.id)
    const detailsMovies = await getMoviesId(ids)
    console.log(detailsMovies)
    return(
        <div className=" w-full h-screen ">
            <BackGroundImageGenres dataResult={dataResult} detailsMovies={detailsMovies} />
                

            {/* {uniqueBackdropImage.map((image,index) => (
                <div className="" key={index}>
                    <Image src={`https://image.tmdb.org/t/p/original${image}`} alt="movie backdrop" 
                    fill
                    style={{objectFit: 'cover'}}
                    priority
                    />

                </div>
            ))} */}
            {/* {dataResult.map((movie) => (
                <Card key={movie.id} className="">
                    <h1>{movie.title}</h1>
                </Card>
            ))} */}

            {/* <div className="">
                <Carousel className="w-full 2xl:max-w-full">
                    <CarouselContent>
                        {dataResult.map((movie) => (
                        <CarouselItem className=" basis-1/7" key={movie.id}>
                            <Card className="">
                                <Image src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="movie poster" 
                                width={150} 
                                height={150} 
                                 />
                            </Card>
                        </CarouselItem>

                        ))}

                    </CarouselContent>
                </Carousel>
            </div> */}
        </div>
    )
}