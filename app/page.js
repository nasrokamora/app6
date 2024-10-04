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





export default async function Home() {

  const data =  getDiscoverMovies()
  const popularData =  getPopularMovies()
  const tvData =  getDiscoverTv()
  const PersonDataPopular = getPersonPopular()

  const [dataDiscoverMovies, dataPopular, dataTv, dataPersonPopular] = await Promise.all([data, popularData, tvData, PersonDataPopular]);

  return (
    <main className={`w-full h-auto text-white `}>
      <AnimateScroll />
      <div className={`scroll-m-20 text-4xl  tracking-tight lg:text-3xl ml-6  title font-extrabold md:flex md:justify-center md:items-center   mt-7 md:mt-3 text-red-700 `}>
        <h1 className={styles.effect}>Discover on Magix</h1>
      </div>
      <section className="flex justify-center w-full mt-7">
          
          <MoviesCard dataDiscoverMovies={dataDiscoverMovies.results} />


      </section>


      <section className="mt-7 ">
        <div className="ml-6 md:flex md:justify-center md:items-center">
          <h1 className="text-4xl font-extrabold  scroll-m-20 lg:text-3xl">Highest Rated Movies </h1>
        </div>
        <PaginationMovies />
      </section>



      <div className=" xl:ml-6 2xl:ml-6 lg:ml-6 scroll-m-20 text-4xl font-extrabold  lg:text-3xl md:text-3xl mt-14  title  bg-gradient-to-br from-[#f40000] underline decoration-red-600 to-[black] bg-clip-text text-transparent  md:flex md:justify-center md:items-center items-center  lg:mt-11 md:mt-5">
        <h1 className="">Popular on Magix</h1>
      </div>
      <section>
        <MoviePopular dataPopular={dataPopular} />
      </section>

      <div className="ml-6  mt-7">
        <h1 className="text-4xl font-extrabold  scroll-m-20 lg:text-3xl">Explore by Genres</h1>
      </div>

      <section className=" mt-7">
        <GenresList />
      </section>

      {/*   section Tv & series & season */}
      <div className="ml-6  mt-7">
        <h1 className="text-4xl font-extrabold  scroll-m-20 lg:text-3xl">
          Must-Watch TV Shows
        </h1>
      </div>
      <section className="mt-7">

        <TvSeries dataTv={dataTv.results} />

      </section>

      <div className=" ml-6   scroll-m-20 text-4xl font-extrabold  lg:text-3xl   md:flex md:justify-center md:items-center items-center mt-14 lg:mt-11 md:mt-3">
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



      <section className="mt-7">

        <PopularPerson dataPersonPopular={dataPersonPopular.results} />

      </section>
      {/* <section className=" mt-7">
        <div className="ml-6 mt-7">
          <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-3xl">

          </h1>
        </div>
        <PopularPerson dataPersonPopular={dataPersonPopular.results} />
      </section> */}





      <section className='mt-7 '>
        <div className=" md:flex md:justify-center md:items-center ml-6">
          <h1 className="text-4xl font-extrabold  scroll-m-20 lg:text-3xl">What’s <span className=" text-red-700">Hot</span>  on TV</h1>
        </div>
        <PaginationTvShow />
      </section>
    </main>
  )




}