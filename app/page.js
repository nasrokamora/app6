// import { getData, getMoviesId,urlImage } from "./libs/DataFetching"
// import { Card, CardContent } from "@/components/ui/card"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"
// import Image from "next/image"
// import Link from "next/link"
import MoviesCard from "./Components/MoviesCard/MoviesCard"

import MoviePopular from "./Components/MoviePopular/MoviePopular"
import { SlScreenDesktop } from "react-icons/sl"

import DiscoverTv from "./(tv)/Components/DiscoverTv/DiscoverTv"
// import NavigateBars from "./(tv)/Components/NavigateBars/NavigateBars"
// import { Suspense } from "react"
import GenresList from "./Components/BtnList/GenresList"
import TvSeries from "./(tv)/Components/DiscoverTv/TvSeries"
import TvGenres from "./(tv)/Components/TvGenres/TvGenres"
import { getDiscoverMovies, getPopularMovies } from "./libs/DataFetching"
import { getDiscoverTv } from "./libs/DataFetchingTv"







export default async function Home() {
  const data = await getDiscoverMovies()
  const popularData = await getPopularMovies()
  const tvData = await getDiscoverTv()
  
  const [dataDiscoverMovies,dataPopular,dataTv] = await Promise.all([data,popularData,tvData])
  
  return (
    <main className="w-full h-auto text-white ">
            <div className="scroll-m-20 text-4xl  tracking-tight lg:text-5xl ml-6  title underline decoration-yellow-600 title   bg-gradient-to-br from-[white] via-[#18ffe0] to-[black] bg-clip-text text-transparent font-extrabold md:flex md:justify-center md:items-center   mt-7 md:mt-3">
        <h1>Discover on Magix</h1>
      </div>
      <section className="   mt-7 flex justify-center w-full ">
        <MoviesCard dataDiscoverMovies={dataDiscoverMovies.results}/>
      </section>

     <div className=" scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ml-6  title  bg-gradient-to-br from-[#f40000] underline decoration-red-600 to-[black] bg-clip-text text-transparent  md:flex md:justify-center md:items-center items-center mt-14 lg:mt-11 md:mt-3">
        <h1>Popular on Magix</h1>
      </div>
      <section>
        <MoviePopular dataPopular={dataPopular.results}/>
      </section>

      <div className=" ml-6 mt-7">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Movies by Genre</h1>
      </div>

      <section className=" mt-7">
        <GenresList/>
      </section>
      {/* <div className=" mb-3  gap-4 flex justify-start ml-6  title text-3xl bg-gradient-to-br from-red-700 via-white to-[red] bg-clip-text text-transparent font-bold md:flex md:justify-center md:items-center items-center mt-7 md:mt-3">
        <h1>
          Tv Show
        </h1>
        <SlScreenDesktop className="text-white" size={28} />
      </div>
      <section>
        <DiscoverTv/>
      </section> */}

          <div className=" ml-6 mt-7">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Tv Show
            </h1>
          </div>
        <section className="mt-7">
          <TvSeries dataTv={dataTv.results}/>
        </section>

          <div className=" ml-6 mt-7">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Tv by Genre
            </h1>
          </div>
        <section className="mt-7">
          <TvGenres/>
        </section>


{/* 
      <div className="title text-4xl bg-gradient-to-br from-[#4f48ec] to-[white] bg-clip-text text-transparent font-bold md:flex md:justify-center md:items-center flex justify-center items-center mt-7 md:mt-3">
        <h1>Discover</h1>
      </div>
      <section className="   mt-7 flex justify-center w-full xl:bg-linear-gradient(126deg, rgba(255,191,24,1) 0%, rgba(16,14,52,1) 32%, rgba(79,72,236,1) 74%,">
        <MoviesCard/>
      </section>
      <div className=" flex justify-start ml-6  title text-3xl bg-gradient-to-br from-[#4f48ec] to-[red] bg-clip-text text-transparent font-bold md:flex md:justify-center md:items-center items-center mt-7 md:mt-3">
        <h1>Popular Movies</h1>
      </div>
      <section>
        <MoviePopular/>
      </section>
      <div className=" mb-3  gap-4 flex justify-start ml-6  title text-3xl bg-gradient-to-br from-red-700 via-white to-[red] bg-clip-text text-transparent font-bold md:flex md:justify-center md:items-center items-center mt-7 md:mt-3">
        <h1>
          Tv Show
        </h1>
        <SlScreenDesktop className="text-white" size={28} />
      </div>
      <section>
        <DiscoverTv/>
      </section>
      <section className=" mt-7">
        <GenresList/>
      </section> */}
      {/* <section className="mt-7">
        <Suspense fallback={<p>Loading...</p>}>

        <NavigateBars />
        </Suspense>
      </section> */}
      {/* <section className="mt-7 flex justify-center w-full">
      <LinkMovies/>
      </section> */}








    </main>
  )
}