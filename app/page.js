import MoviesCard from "./Components/MoviesCard/MoviesCard"
import MoviePopular from "./Components/MoviePopular/MoviePopular"
import GenresList from "./Components/BtnList/GenresList"
import TvSeries from "./(tv)/Components/DiscoverTv/TvSeries"
import TvGenres from "./(tv)/Components/TvGenres/TvGenres"
import { getDiscoverMovies, getPopularMovies } from "./libs/DataFetching"
import { getDiscoverTv } from "./libs/DataFetchingTv"
import AnimateScroll from "./Animations/AnimationNumber/AnimateScroll/AnimationScroll"
import styles from './styles/Animat.module.css'





export default async function Home() {

  const FontSizeHieght = {
    fontSize: "1.5rem",
  }

  // const ChangeFontIfHieght = () => {
  //   if(window.innerHeight >= 1024){
  //   return FontSizeHieght.fontSize = "1.5rem";
  //   }  
  // }
  


  const data = await getDiscoverMovies()
  const popularData = await getPopularMovies()
  const tvData = await getDiscoverTv()
  
  const [dataDiscoverMovies,dataPopular,dataTv] = await Promise.all([data,popularData,tvData])
  
  return (
    <main className={`w-full h-auto text-white `}>
        <AnimateScroll />
  
          <div className={`scroll-m-20 text-4xl  tracking-tight lg:text-3xl ml-6  title font-extrabold md:flex md:justify-center md:items-center   mt-7 md:mt-3 text-red-700 `  }>
      <h1 className={styles.effect}>Discover on Magix</h1>
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

                                      {/*   section Tv & series & season */}
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
    </main>
  )
}