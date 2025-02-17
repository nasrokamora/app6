import MoviesCard from "./Components/MoviesCard/MoviesCard"
import MoviePopular from "./Components/MoviePopular/MoviePopular"
import GenresList from "./Components/BtnList/GenresList"
import TvSeries from "./(tv)/Components/DiscoverTv/TvSeries"
import TvGenres from "./(tv)/Components/TvGenres/TvGenres"
import {getDiscoverMovies, getPersonPopular, getPopularMovies } from "./libs/DataFetching"
import { getDiscoverTv } from "./libs/DataFetchingTv"
import AnimateScroll from "./Animations/AnimationNumber/AnimateScroll/AnimationScroll"
import PopularPerson from "./Components/PopularPerson/PopularPerson"
import PaginationMovies from "./(movies)/Components/PaginationMovies/PaginationMovies"
import { MdStars } from "react-icons/md";
import {ClapperboardIcon } from 'lucide-react';
import { GiPopcorn } from "react-icons/gi";
import { GiFilmProjector } from "react-icons/gi";
import { TbHeartUp } from "react-icons/tb";
import AnimationAllComponents from "./Animations/FadeIn/AnimationAllComponents"
import dynamic from "next/dynamic";

// export const dynamic = 'force-dynamic';
// const AnimationAllComponents = dynamic(() => import("./Animations/FadeIn/AnimationAllComponents"), {
//   ssr: false
// })

//metadata for SEO
export const metadata = {
  title: 'Magix Movies - Your Ultimate Movie & Series Hub',
  discription: "explore movies and tv series on magix movies",

}



export default async function Home() {
  const data = await getDiscoverMovies()
  const popularData = await getPopularMovies()
  const tvData = getDiscoverTv()
  const personPopular = await getPersonPopular()
const dataDiscoverMovies = data
const dataPopular = popularData
  const [ dataTv, dataPersonPopular] = await Promise.all([  tvData, personPopular]);

  return (
    <main className={`w-full h-auto text-white pt-24 `}>
      {/* section Discover */}
      <AnimateScroll />
      <div className={`md:text-3xl scroll-m-20 text-4xl  tracking-tight lg:text-3xl ml-6 md:ml-0 font-extrabold md:flex md:justify-center md:items-center   mt-7 md:mt-3  `}>
        <h1 className={'  bg-gradient-to-r from-[#ffae00] via-[#911818] to-[#ffae00] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient'}>Discover<GiFilmProjector className="inline-block text-red-700 mb-4 " size={42} />
          <span className="bg-gradient-to-r from-[#911818] via-[#ffae00] to-[#911818]  bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">Magix</span> </h1>
      </div>
      <section className="">

        <MoviesCard dataDiscoverMovies={dataDiscoverMovies.results} />

      </section>

      {/* section highest rated movies */}
      <section className="mt-8  ">
        <div className="ml-6 md:ml-0 md:flex md:justify-center md:items-center ">

          <h1 className="text-3xl  font-extrabold md:mb-11">Highest <span className="text-[#00f4e1] relative">Rated <span className="absolute inset-0 left-11 -top-4"><TbHeartUp size={30} className="inline-block text-[#00f4e1]" /></span></span> <span className=" md:text-center md:flex md: justify-center  md:items-center ">Movies
          </span> </h1>
        </div>
        <div className="bg-gradient-to-bl from-[#00f4e0] from-[20%] to-[#09090b] to-[60%] mt-7 ">
          <PaginationMovies />
        </div>
      </section>

      {/* section Popular */}
      <div className=" ml-6 md:ml-0  scroll-m-20 text-3xl font-extrabold  lg:text-3xl md:text-4xl mt-14  bg-gradient-to-r from-[#850000] via-[#ff0000] to-[#850000] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient md:p-2 md:text-center  md:flex md:justify-center md:items-center items-center  lg:mt-11 md:mt-11">
        <h1 className="md:pb-4"> <span className="bg-gradient-to-r from-[#850000] via-black to-[#850000] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Top</span> <span className="text-white">Picks</span>  <span className="bg-gradient-to-r from-[#850000] via-black to-[#850000] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">on</span> Magix</h1>
      </div>
      <section>

        <MoviePopular dataPopular={dataPopular} />

      </section>

      {/* section Genres Movies */}
      <div className="ml-6 md:ml-0 mt-7 md:flex md:justify-center md:items-center">
        <h1 className="text-4xl font-extrabold  scroll-m-20 lg:text-3xl md:text-3xl">Explore by <span className="text-[#cd1919]">Genres</span> </h1>
      </div>
      <section className=" mt-7">
        <GenresList />
      </section>

      {/*   section Tv & series & season */}
      <div className="ml-6 md:ml-0  mt-7 md:flex md:justify-center md:items-center ">
        <h1 className="text-4xl font-extrabold  scroll-m-20 lg:text-3xl md:text-2xl ">
          <span className=" text-[#1977cd]">Must <span><ClapperboardIcon className=" inline text-[#1977cd] md:size-6" /> </span>Watch</span>   TV Shows
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
    </main>
  )




}