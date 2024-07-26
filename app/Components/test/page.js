import Image from "next/image";

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';
import MoviesId from "./Components/MoviesId/MoviesId";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import { GrLineChart } from "react-icons/gr";
import { LuFlame } from "react-icons/lu";
import { Separator } from "@/components/ui/separator"

import GenresList from "./Components/BtnList/GenresList";
import { Suspense } from "react";
import LoadingGenreButton from "./Components/LoadingUi/LoadingGenreList";
import MoviePopular from "./Components/MoviePoopular/MoviePopular";
// import SelectPage from "./Components/SelectedPage/SelectPage";
import { LiaTvSolid } from "react-icons/lia";
// import TrailerMovie from "./Components/MoviesVideos/TrailerMovie";
import SelectTvPage from "./Components/SelectedPage/SelectTvPage";
import { ScreenShare } from 'lucide-react';
import TvPopular from "./Components/Tv/TvPopular";
import CoverImage from "./Components/BackGroundImage/CoverImage";
// import CompanyMovies from "./Components/Companies/CompanyMovies";
import PersonPopular from "./Components/PersonList/PersonPopular";
import MoviesCredits from "./Components/PersonList/MoviesCredits";


async function getData() {
  const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_API_KEY}`,{}, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`
    }
  })
  if (!res.ok) {
    throw new Error("failed to fetch data")
  }
  return res.json()
}

export default async function Home() {
  const urlImage = 'https://image.tmdb.org/t/p/original'
  const data = await getData()
  const dataResults = data.results.slice(1, 2)
  // const dataId = data.results.id
  // console.log(data)


  return (
    <main className="    w-full h-auto md:h-auto  ">

      <div className=" " >

          {/* map data */}
          {dataResults.map((item, index) => (
            <div className=" flex  justify-center items-start hero md:flex-col" key={index} >
              <div className=" md:pb-[8rem]  w-full z-[1] relative glass p-4 md:p-[1.6rem]   ">
                <div className="  text-zinc-800  hero-content items-start md:items-center md:flex-col md:pt-20">
                  <Image className="rounded-md order-2 md:hidden static shadow-lg shadow-[#291c4c]" 
                  src={`${urlImage}${item.poster_path}`} 
                  alt={item.original_title} width={250} height={250}  
                  style={{width:"auto", height:"auto"}} 
                  priority={false}  
                  />
                  <div className=" order-1 ">
                    <h1 className=" text-4xl font-extrabold  leading-loose md:text-2xl"> {item.original_title} </h1>
                    <p className="pt-2 pb-2 font-extrabold text-[1.5rem] text-red-800"> {item.release_date} </p>
                    <div className=" flex gap-1 mb-4 ">
                      <Star size={25}  className=" text-yellow-600 outline-yellow-300 font-extrabold tex-[1.5rem]"/>
                      <span className=" font-extrabold">
                        Vote&nbsp;
                        {item.vote_average.toFixed(1)}
                      </span>
                    </div>
                    <div className=" font-bold text-[1.2rem]">
                      <p> {item.overview} </p>
                    </div>
                    <MovieDetails movie_Id={item.id} />
                    <div>
                    {/* <PersonPopular movie_Id={item.id} urlImage={urlImage} /> */}
                    </div>
                  </div>
                </div>
                <div>
                  {/* <TrailerMovie movie_Id={item.id} /> */}
                </div>
                <div className=" flex justify-center">
                <MoviesId movie_Id={item.id} />
              </div>
              <div>
                {/* <CompanyMovies company_id={item.id} urlImage={urlImage} /> */}
              </div>
              </div>
               {/* <div className=" " style={{position:"absolute", width:"100%", height:"100%", }} >
               <Image className=" blur " 
               src={`${urlImage}${item.backdrop_path}`} 
               alt={item.original_title} 
               fill={true}
               sizes="(max-width: 768px) 100vw, 33vw"
               style={{ objectFit: "cover", zIndex: "0",   }}  />
               </div> */}
               <CoverImage data={data} urlImage={urlImage} />
            </div>
          ))}
          <div className="">
          <div className=" md:text-2xl md:items-center md:gap-3 md:justify-center relative p-4  text-2xl font-bold flex w-56 items-center justify-between">
            <h1>Trends Now 
              </h1>
              <div className=" ">
              <GrLineChart className="text-[2rem] text-orange-600" />
              </div>
          </div>  
          <div className="flex justify-center">
          <Separator className="my-4 w-3/4 " />
          </div>
          </div>

          
          <div>
            {/* <GenresList /> */}
          </div>
          
          <div className=" p-4 md:text-4xl  text-2xl font-bold flex  items-center justify-start md:justify-center ">
            <h1>Popular
              </h1>
              <div className=" ">
              <LuFlame  className="text-[2.5rem] text-red-700 " />
              </div>
          </div> 
          <div className="flex justify-center">
          <Separator className="my-4 w-3/4 " />
          </div>
          <div>
            <MoviePopular />
          </div>
          <div className="flex justify-center">
          <Separator className="my-4 w-3/4 " />
          </div>
          <div className=" md:text-4xl bg-gradient-to-r from-green-400 via-blue-600  to-blue-500  bg-clip-text text-transparent p-4  text-2xl font-bold flex  items-center justify-start gap-3 md:justify-center">
            <h1>Top Tv</h1>
            <div>
            <LiaTvSolid className="text-[2.5rem] text-blue-600" />
            </div>
          </div>
          <div className="flex justify-center">
          <Separator className="my-4 w-3/4 " />
          </div>
          <div className="">
          {/* <SelectTvPage /> */}
          </div>
          <div className="flex justify-center">
          <Separator className="my-4 w-3/4 " />
          </div>

          <div className=" text-transparent bg-clip-text bg-gradient-to-tr from-gray-900 to-red-900 to-10%   p-4  gap-3 text-2xl md:text-4xl font-bold flex  items-center justify-start md:justify-center ">
            <h1>On the air
              </h1>
              <div className="">
              <ScreenShare size={30}  className=" text-red-700 " />
              </div>
          </div> 
          <div className="flex justify-center">
          <Separator className="my-4 w-3/4 " />
          </div>
          <div>
            <TvPopular />

          </div>
        </div>












    </main>
  );
}
