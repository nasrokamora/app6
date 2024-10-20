import MoviesCard from "./Components/MoviesCard/MoviesCard"
import MoviePopular from "./Components/MoviePopular/MoviePopular"
import GenresList from "./Components/BtnList/GenresList"
import TvSeries from "./(tv)/Components/DiscoverTv/TvSeries"
import TvGenres from "./(tv)/Components/TvGenres/TvGenres"
import { ErrorMessage, getDiscoverMovies, getPersonPopular, getPopularMovies } from "./libs/DataFetching"
import { getDiscoverTv } from "./libs/DataFetchingTv"
import AnimateScroll from "./Animations/AnimationNumber/AnimateScroll/AnimationScroll"
import styles from './styles/Animat.module.css'
import SelectTvPage from "./Components/SelectedPage/SelectTvPage"
import PopularPerson from "./Components/PopularPerson/PopularPerson"
import SelectMoviesPages from "./(movies)/Components/SelectPagesMovies/SelectPagesMovies"
import PaginationTvShow from "./(tv)/Components/PaginationTv/PaginationTvShow"
import PaginationMovies from "./(movies)/Components/PaginationMovies/PaginationMovies"
import { Suspense } from "react"





export default async function Home() {



  const data =  getDiscoverMovies()
  const popularData =  getPopularMovies()
  const tvData =  getDiscoverTv()
  const personPopular = getPersonPopular()

  const [dataDiscoverMovies, dataPopular, dataTv, dataPersonPopular] = await Promise.all([data, popularData, tvData, personPopular]);

  return (
    <main className={`w-full h-auto text-white `}>
      <AnimateScroll />
      <div className={`scroll-m-20 text-4xl  tracking-tight lg:text-3xl ml-6 md:ml-0  title font-extrabold md:flex md:justify-center md:items-center   mt-7 md:mt-3 text-red-700 `}>
        <h1 className={'md:text-3xl md:flex md:justify-center md:items-center md:ml-0'}>Discover on Magix</h1>
      </div>

      <section className="flex justify-center w-full mt-7">
          <MoviesCard dataDiscoverMovies={dataDiscoverMovies.results} />
      </section>


      <section className="mt-7  ">
        <div className="ml-6 md:ml-0 md:flex md:justify-center md:items-center ">
          <h1 className="text-4xl  font-extrabold  scroll-m-20 lg:text-3xl md:mb-11">Highest <span className="text-[#00f4e1] ">Rated</span> <span className=" md:text-center md:flex md: justify-center  md:items-center ">Movies </span> </h1>
        </div>
        <div className="bg-gradient-to-bl from-[#00f4e0] from-[20%] to-[#09090b] to-[60%] mt-7 ">
        <PaginationMovies />
          </div>
      </section>



      <div className=" xl:ml-6 2xl:ml-6 lg:ml-6 scroll-m-20 text-4xl font-extrabold  lg:text-3xl md:text-3xl mt-14  title  bg-gradient-to-br from-[#f40000] underline decoration-red-600 to-[black] bg-clip-text text-transparent  md:flex md:justify-center md:items-center items-center  lg:mt-11 md:mt-5">
        <h1 className="">Popular on Magix</h1>
      </div>
      <section>

        <MoviePopular dataPopular={dataPopular} />
      </section>

      <div className="ml-6 md:ml-0 mt-7 md:flex md:justify-center md:items-center">
        <h1 className="text-4xl font-extrabold  scroll-m-20 lg:text-3xl md:text-3xl">Explore by Genres</h1>
      </div>

      <section className=" mt-7">
        <Suspense fallback={<p className=" flex justify-center items-center">Loading feed...</p>}>

        <GenresList />
        </Suspense>
      </section>

      {/*   section Tv & series & season */}
      <div className="ml-6 md:ml-0  mt-7 md:flex md:justify-center md:items-center ">
        <h1 className="text-4xl font-extrabold  scroll-m-20 lg:text-3xl md:text-2xl ">
        <span className=" text-[#1977cd]">Must-Watch</span>   TV Shows
        </h1>
      </div>
      <section className="mt-7">

        <TvSeries dataTv={dataTv.results} />

      </section>

      <div className=" ml-6   scroll-m-20 text-4xl font-extrabold  lg:text-3xl   md:flex md:justify-center md:items-center items-center mt-14 lg:mt-11 md:text-3xl md:ml-0 md:mt-5">
        <h1 className="">
        TV Shows by Genre
        </h1>
      </div>
      <section className="mt-7">
        <TvGenres />
      </section>

      {/* <section className="mt-7">
        <div className="mb-4 ml-6  mt-7">
          <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-3xl">Airing on TV Today</h1>
        </div>
        <SelectTvPage />
      </section> */}



      {/* <section className="mt-7">
      <div className=" ml-6   scroll-m-20 text-4xl font-extrabold  lg:text-3xl   md:flex md:justify-center md:items-center items-center mt-14 lg:mt-11 md:mt-3">
        <h1 className="">
      <span className=" text-blue-700">Popular</span>   People
        </h1>
      </div>
        <PopularPerson dataPersonPopular={dataPersonPopular.results}
        />

      </section> */}
      <section className=" mt-7">
        <div className="ml-6 mt-7">
          <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-3xl">
            <span className=" text-blue-700">Popular</span> People
          </h1>
        </div>
        <PopularPerson dataPersonPopular={dataPersonPopular.results} />
      </section>





      {/* <section className='mt-7  '>
        <div className=" md:flex md:justify-center md:items-center ml-6 mb-6">
          <h1 className="text-4xl font-extrabold  scroll-m-20 lg:text-3xl">What’s <span className=" text-blue-700">Hot</span>  on TV</h1>
        </div>
        <div className="bg-gradient-br from[#1976cc] to-[#15477a]">
        <PaginationTvShow />
        </div>
      </section> */}
    </main>
  )




}