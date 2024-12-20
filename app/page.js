import MoviesCard from "./Components/MoviesCard/MoviesCard"
import MoviePopular from "./Components/MoviePopular/MoviePopular"
import GenresList from "./Components/BtnList/GenresList"
import TvSeries from "./(tv)/Components/DiscoverTv/TvSeries"
import TvGenres from "./(tv)/Components/TvGenres/TvGenres"
import { ErrorMessage, getDiscoverMovies, getPersonPopular, getPopularMovies } from "./libs/DataFetching"
import { getDiscoverTv } from "./libs/DataFetchingTv"
import AnimateScroll from "./Animations/AnimationNumber/AnimateScroll/AnimationScroll"
import styles from './styles/Animat.module.css'
import PopularPerson from "./Components/PopularPerson/PopularPerson"
import PaginationMovies from "./(movies)/Components/PaginationMovies/PaginationMovies"
import { MdStars } from "react-icons/md";
import { Clapperboard, ClapperboardIcon } from 'lucide-react';
import { GiPopcorn } from "react-icons/gi";


export const metadata = {
  title: 'Magix Movies | Home',
}



export default async function Home() {
  const data =  getDiscoverMovies()
  const popularData =  getPopularMovies()
  const tvData =  getDiscoverTv()
  const personPopular = getPersonPopular()

  const [dataDiscoverMovies, dataPopular, dataTv, dataPersonPopular] = await Promise.all([data, popularData, tvData, personPopular]);

  return (
    <main className={`w-full h-auto text-white pt-24 `}>
      {/* section Discover */}
      <AnimateScroll />
      <div className={`scroll-m-20 text-4xl  tracking-tight lg:text-3xl ml-6 md:ml-0  title font-extrabold md:flex md:justify-center md:items-center   mt-7 md:mt-3 text-red-700 `}>
        <h1 className={'md:text-3xl md:flex md:justify-center md:items-center md:ml-0'}>Discover on Magix</h1>
      </div>
      <section className="flex justify-center w-full mt-7">
          <MoviesCard dataDiscoverMovies={dataDiscoverMovies.results} />
      </section>

      {/* section highest rated movies */}
      <section className="mt-7  ">
        <div className="ml-6 md:ml-0 md:flex md:justify-center md:items-center ">

          <h1 className="text-4xl  font-extrabold  scroll-m-20 lg:text-3xl md:mb-11">Highest <span className="text-[#00f4e1] ">Rated</span> <span className=" md:text-center md:flex md: justify-center  md:items-center ">Movies </span> </h1>
        </div>
        <div className="bg-gradient-to-bl from-[#00f4e0] from-[20%] to-[#09090b] to-[60%] mt-7 ">
        <PaginationMovies />
          </div>
      </section>

      {/* section Popular */}
      <div className=" xl:ml-6 2xl:ml-6 lg:ml-6 scroll-m-20 text-4xl font-extrabold  lg:text-3xl md:text-3xl mt-14  title  bg-gradient-to-br from-[#f40000] underline decoration-red-600 to-[black] bg-clip-text text-transparent  md:flex md:justify-center md:items-center items-center  lg:mt-11 md:mt-5">
        <h1 className="">Popular on Magix</h1>
      </div>
      <section>
        <MoviePopular dataPopular={dataPopular} />
      </section>

      {/* section Genres Movies */}
      <div className="ml-6 md:ml-0 mt-7 md:flex md:justify-center md:items-center">
        <h1 className="text-4xl font-extrabold  scroll-m-20 lg:text-3xl md:text-3xl">Explore by Genres</h1>
      </div>
      <section className=" mt-7">
        <GenresList />
      </section>

      {/*   section Tv & series & season */}
      <div className="ml-6 md:ml-0  mt-7 md:flex md:justify-center md:items-center ">
        <h1 className="text-4xl font-extrabold  scroll-m-20 lg:text-3xl md:text-2xl ">
        <span className=" text-[#1977cd]">Must <span><ClapperboardIcon className=" inline text-[#1977cd] md:size-6"  /> </span>Watch</span>   TV Shows 
        </h1>
      </div>
      <section className="mt-7">
        <TvSeries dataTv={dataTv.results} />
      </section>


      {/* section tv genres */}
      <div className=" ml-6   scroll-m-20 text-3xl font-extrabold  md:flex md:justify-center md:items-center md:flex-wrap md:text-center  mt-10 lg:mt-11 md:text-3xl md:ml-0 md:mt-8">
        <h1 className=" relative bg-gradient-to-r from-[#000000] via-[#2044e2] to-[#000000] text-transparent bg-clip-text animate-gradient bg-[length:200%_auto] ">
        TV Genres <span className="bg-gradient-to-r from-[#0062f4] via-[#000000] to-[#0062f4] text-transparent bg-clip-text animate-gradient bg-[length:200%_auto_]">Made for</span> <span className=" bg-gradient-to-r from-[#ffffff] via-[#2054e2] to-[#ffffff] text-transparent bg-clip-text animate-gradient bg-[length:200%_auto]">You</span><span className=""><GiPopcorn className="inline-block text-[#0065ff] absolute inset-0 -top-2 left-32 rotate-45" size={22} /></span>
        </h1>
      </div>
      <section className="mt-7">
        <TvGenres />
      </section>

      {/* section popular person */}
      <section className=" mt-7">
        <div className="ml-6 mt-7 md:ml-0">
          <h1 className="text-4xl font-extrabold  scroll-m-20 lg:text-3xl md:text-3xl md:text-center md:ml-0 ">
            <span className=" text-[#ff007f]">Spotlight</span> on <span className=" bg-gradient-to-r from-[#ff007f] via-[#fffc40] to-[#ff007f] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">Stars <span><MdStars className="inline text-[#fffc40]" size={28} /></span></span> 
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