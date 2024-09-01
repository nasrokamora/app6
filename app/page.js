import MoviesCard from "./Components/MoviesCard/MoviesCard"
import MoviePopular from "./Components/MoviePopular/MoviePopular"
import GenresList from "./Components/BtnList/GenresList"
import TvSeries from "./(tv)/Components/DiscoverTv/TvSeries"
import TvGenres from "./(tv)/Components/TvGenres/TvGenres"
import { getDiscoverMovies, getPopularMovies } from "./libs/DataFetching"
import { getDiscoverTv } from "./libs/DataFetchingTv"
import AnimateScroll from "./Animations/AnimationNumber/AnimateScroll/AnimationScroll"
import styles from './styles/Animat.module.css'
import SelectTvPage from "./Components/SelectedPage/SelectTvPage"





export default async function Home() {

  const data =  getDiscoverMovies()
  const popularData =  getPopularMovies()
  const tvData =  getDiscoverTv()

  const  results = await Promise.allSettled([data, popularData, tvData])
  const dataDiscoverMovies = results[0].status === 'fulfilled' ? results[0].value : { results: [] };
  const dataPopular = results[1].status === 'fulfilled' ? results[1].value : { results: [] };
  const dataTv = results[2].status === 'fulfilled' ? results[2].value : { results: [] };

  const isDiscoverMoviesError = results[0].status === 'rejected';
  const isPopularMoviesError = results[1].status === 'rejected';
  const isTvError = results[2].status === 'rejected';

  return (
    <main className={`w-full h-auto text-white `}>
      <AnimateScroll />
      <div className={`scroll-m-20 text-4xl  tracking-tight lg:text-3xl ml-6  title font-extrabold md:flex md:justify-center md:items-center   mt-7 md:mt-3 text-red-700 `}>
          <h1 className={styles.effect}>Discover on Magix</h1>
        </div>
      <section className="mt-7 flex justify-center w-full">

        {isDiscoverMoviesError ? (
          <div className="error-message bg-red-600 text-white p-4 rounded mb-4">
            <p>An error occurred while loading Discovery movies. Please try again</p>
          </div>
        ) : (

          <MoviesCard dataDiscoverMovies={dataDiscoverMovies.results} />

        )}
      </section>
      {/* <div className={`scroll-m-20 text-4xl  tracking-tight lg:text-3xl ml-6  title font-extrabold md:flex md:justify-center md:items-center   mt-7 md:mt-3 text-red-700 `}>
        <h1 className={styles.effect}>Discover on Magix</h1>
      </div>

      <section className="   mt-7 flex justify-center w-full ">
        <MoviesCard dataDiscoverMovies={dataDiscoverMovies.results} />
      </section> */}

      <div className=" scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl ml-6  title  bg-gradient-to-br from-[#f40000] underline decoration-red-600 to-[black] bg-clip-text text-transparent  md:flex md:justify-center md:items-center items-center mt-14 lg:mt-11 md:mt-3">
        <h1>Popular on Magix</h1>
      </div>
      <section>
        {isPopularMoviesError ? (
          <div className="error-message bg-red-600 text-white p-4 rounded mb-4">
            <p>An error occurred while loading popular movies. Please try again</p>
          </div>
        ):(

        <MoviePopular dataPopular={dataPopular.results} />
        )}
      </section>

      <div className=" ml-6 mt-7">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl">Movies by Genre</h1>
      </div>

      <section className=" mt-7">
        <GenresList />
      </section>

      {/*   section Tv & series & season */}
      <div className=" ml-6 mt-7">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl">
          Tv Show
        </h1>
      </div>
      <section className="mt-7">
        {isTvError ? (
          <div className="error-message bg-red-600 text-white p-4 rounded mb-4">
            <p>An error occurred while loading Tv. Please try again</p>
          </div>
        ) : (
          <TvSeries dataTv={dataTv.results} />
        )}
      </section>

      <div className=" ml-6 mt-7">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Tv by Genre
        </h1>
      </div>
      <section className="mt-7">
        <TvGenres />
      </section>

      <section className="mt-7">
        <div className=" ml-6 mt-7 mb-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl">Airing on TV Today</h1>
        </div>
        <SelectTvPage />
      </section>
    </main>
  )
}