import { getMoviesGenre, getMoviesGenreList } from "@/app/libs/DataFetching";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import BackGroundImageGenres from "@/app/(movies)/Components/BackGoundGenres/BackGroundImageGenres";


export default async function MoviesGenre({ params }) {
    const {id} = params
    const data = await getMoviesGenre(id)
    const dataResult = data.results
    // console.log(dataResult)
    const backdropImage = dataResult.flatMap((movie) => movie.backdrop_path)
    const uniqueBackdropImage = [...new Set(backdropImage)]
    return(
        <div className=" w-full h-screen ">
            <BackGroundImageGenres dataResult={dataResult} />
                

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