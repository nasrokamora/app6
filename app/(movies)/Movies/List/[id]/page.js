import {
    getCriditsMovies,
    getImageMoviesId,
    getMoviesNowPlaying,
    getMoviesSimilar,
    getRecommendationMovies,
    getReviewsMovies,
    getTrailer,
    urlImage
} from "@/app/libs/DataFetching"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { FaRankingStar } from "react-icons/fa6";
import { GiStarsStack } from "react-icons/gi";
import Link from "next/link"
import { TbExternalLink } from "react-icons/tb";

import MoviesSimilar from "@/app/(movies)/Components/MoviesSimilar/MoviesSimilar"
import MoviesCredits from "@/app/(movies)/Components/MoviesCredits/MoviesCredits"
import ToggleButton from "@/app/(movies)/Components/ToggleButton/ToggleButton"
import no_image from '../../../../../public/image/no_image4.webp'
import NowPlayingMovies from "@/app/(movies)/Components/NowPlaying/NowPlayingMovies"
import TrailerMovies from "@/app/(movies)/Components/TrailerMovies/TrailerMovies"
import BgImageCover from "@/app/(movies)/Components/BgImageCover/BgImageCover"
import ImageList from "@/app/(movies)/Components/ImageList/ImageList"
import ReviewsList from "@/app/(movies)/Components/ReviewsMovies/ReviewsList"
import RecommendationMovies from "@/app/(movies)/Components/RecommendationMovies/RecommendationMovies"
import RatingUsersMovies from "@/app/(movies)/Components/RatingUsersMovies/RatingUsersMovies"
// import RecommendationMovies from "@/app/(movies)/Components/RecommendationMovies/RecommendationMovies"

export async function generateMetadata({ params }) {
    const data = await getMoviesLoad(params.id)
    return {
        title: data.title,
    }
}


async function getMoviesLoad(id) {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`,
            {
                headers: {
                  Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
                  accept: "application/json"
                } 
        })
        return res.json()
    }catch(error){
        console.log(error,"failed to fetch data Load page =>[id]")
    }
}


export default async function DynamicMoviesList({ params }) {
    const { id } = params
    const dataLoad =  getMoviesLoad(id)
    const similarData =  getMoviesSimilar(id)
    const dataImage =  getImageMoviesId(id)
    const reviewData =  getReviewsMovies(id)
    const dataCreditsId =  getCriditsMovies(id)
    const recommendMovies = getRecommendationMovies(id)
    const nowData =  getMoviesNowPlaying()
    const trailer = getTrailer(id)
    const [data, similar, dataImageList, dataReview, credits,dataRecommend,dataPlaying,dataTrailer] = await Promise.all([dataLoad, similarData, dataImage, reviewData, dataCreditsId,recommendMovies,nowData,trailer])


    return (
        <div className="w-full h-auto p-5">
            {/*  bg image cover  */}
            <BgImageCover dataImageList={dataImageList}
            />
                {/* Toggle Button go back */}
                <ToggleButton />

                {/* container details movies */}
            <div className=" flex justify-between items-center pb-4" >
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl md:text-3xl  text-base-100 drop-shadow-[0_5px_10px_rgba(255,145,0,10.25)]">{data.original_title? data.original_title : data.title || data.name || "Title"}</h1>
            </div>
            <div className=" mt-4 flex justify-start items-center gap-3 md:flex-col shadow-xl shadow-black/30  bg-black/30 backdrop-blur p-4 rounded-md">
                <div className=" relative overflow-hidden w-full  flex flex-col justify-center items-center">

                    <Image src={data.poster_path ?
                        `${urlImage}${data.poster_path || data.backdrop_path}`
                        :
                        no_image
                    }
                        width={300}
                        height={300}
                        className="rounded-md md:h-[250px] lg:h-[290px] xl:h-[350px] "
                        style={{ width: "auto" }}
                        priority 
                        alt={data.title ? data.title : "Title image not found"} />

                    <div className=" pt-5 flex justify-center gap-3">
                        <TrailerMovies dataTrailer={dataTrailer.results.slice(0, 1)}/>
                        <div>
                            <Link target="_blank" rel="noopener noreferrer" href={data.homepage ? data.homepage : "https://www.themoviedb.org/"}>
                                <TbExternalLink size={45} className="text-[#f8e325] hover:scale-110 duration-300" />

                            </Link>
                        </div>
                    </div>
                </div>

                {/* section overview */}
                <div className="">
                    <h1 className="  text-amber-600   black-shadow-text  mt-10 scroll-m-20 md:text-xl  text-3xl font-bold  first:mt-0">
                        Overview :

                    </h1>
                    <blockquote className="mt-6 border-l-2 border-l-red-700 md:border-l-white pl-6 font-semibold md:rounded-md md:bg-zinc-800">{data.overview? data.overview : "Overview not found"}</blockquote>

                    <Separator className="mt-8" />

                    <div className="flex justify-start items-center gap-3 mt-5">
                        <h2 className=" text-amber-600 scroll-m-20 md:text-lg black-shadow-text pb-2 text-2xl font-bold  first:mt-0">Release Date :</h2>
                        <h1 className=" text-gray-400 scroll-m-20 md:text-lg pb-2  text-2xl font-bold tracking-tight transition-colors first:mt-0">{data.release_date.replace(/-/g, "/") ? data.release_date.replace(/-/g, "/") : "Release date not found"}</h1>
                    </div>

                    <Separator className="mt-4" />

                    {/* section genres  */}
                    <div className=" flex items-center gap-3 mt-3 flex-wrap">
                        <h2 className=" text-amber-600 md:text-[#a52727] mt-2 scroll-m-20 md:text-lg pb-2 text-2xl font-bold tracking-tight black-shadow-text first:mt-0"> Genres :</h2>
                        {data.genres.map((genre) => (
                            <div className=" pb-2" key={genre.id}>

                                <Badge variant={"destructive"} className={cn('font-bold text-[#ffebcd]  ')} >{genre.name? genre.name : "Genre not found"}</Badge>
                            </div>
                        ))}


                        {/* section production countries  */}
                        <div className="flex items-center gap-3  flex-wrap">
                            <h2 className=" black-shadow-text mt-2 scroll-m-20 md:text-lg  pb-2 text-2xl font-bold tracking-tight transition-colors first:mt-2">Production countries :</h2>
                            {data.production_countries.map((country) => (
                                <div className="" key={country.iso_3166_1}>

                                    <Badge variant={"outline"} className={cn('font-bold bg-yellow-700 text-black ')} >{country.name? country.name : "Country not found"}</Badge>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>

                        <Separator className="mt-4" />
                        {/* section popularity & vote average & vote count & status */}
                        <div className=" flex justify-start gap-5 md:justify-stretch items-center flex-wrap ">

                            <div className="mt-5 flex justify-start items-center gap-3  md:flex-wrap">
                                <h2 className=" black-shadow-text scroll-m-20 md:text-lg   text-2xl font-bold  first:mt-0text-slate-600">Popularity :</h2>
                                <h1 className=" text-yellow-500 flex  items-center gap-2 justify-start scroll-m-20 md:text-xl  text-2xl font-bold tracking-tight transition-colors first:mt-0">{data.popularity.toFixed(2) ? data.popularity.toFixed(2) : "Popularity not found"} <FaRankingStar size={28} className=" text-yellow-500" /></h1>
                            </div>
                            <div className="mt-5 flex justify-start items-center gap-3  md:flex-wrap">
                                <h2 className=" black-shadow-text scroll-m-20 md:text-lg  text-2xl font-bold first:mt-0 ">Vote average :</h2>
                                <h1 className=" text-yellow-500 flex justify-start items-center gap-2  scroll-m-20 md:text-xl  text-2xl font-bold tracking-tight transition-colors first:mt-0">{data.vote_average? data.vote_average : "Vote average not found"}<GiStarsStack size={28} className=" text-yellow-500" /></h1>
                            </div>
                        </div>
                        <div className="mt-5 flex justify-start items-center gap-3  md:flex-wrap lg:flex-wrap">
                            <h2 className="text-amber-600 scroll-m-20 md:text-lg black-shadow-text  text-2xl font-bold  first:mt-0">Status :</h2>
                            <h1 className={` text-success flex justify-start items-center gap-2  scroll-m-20 md:text-xl  text-2xl font-bold tracking-tight transition-colors first:mt-0" ${data.status ? "text-blue-500" : "text-red-800"}`}> {data.status? data.status : "Status not found"}</h1>
                            <h2 className="text-amber-600 scroll-m-20 md:text-lg   text-2xl font-bold black-shadow-text first:mt-0">Original Language :</h2>
                            <h1 className="scroll-m-20 md:text-xl  text-2xl font-bold  first:mt-0 text-purple-500 black-shadow-text">{data.original_language? data.original_language : "Original language not found"}</h1>
                        </div>
                    </div>

                    <Separator className="mt-4" />

                    <div>
                        <RatingUsersMovies id={data.id} />
                    </div>
                </div>
            </div>
            {/* section images scroll */}
            <div className=" mt-5 flex justify-center items-center">

                <ImageList dataImageList={dataImageList} />
            </div>

            {/* section Cast of movies */}
            <div>
                <MoviesCredits credits={credits && credits.cast.length > 0 ? credits : []} />
            </div>

            {/* section reviews of movies */}
            <div className="mt-5">
                <ReviewsList dataReview={dataReview && dataReview.results && dataReview.results.length > 0 ? dataReview : []} />
            </div>


            <Separator className="my-4  " />

            {/* section Recommendation Movies */}

            <div>
                <RecommendationMovies dataRecommend={dataRecommend.results} />
            </div>

            <Separator className="my-4  " />


            {/* section of movies now playing */}
            <div>
                <NowPlayingMovies dataPlaying={dataPlaying.results}  />
            </div>


            <Separator className={cn('my-4 bg-red-700')} />


            {/* section Similar movies */}
            <div>
                <MoviesSimilar similar={similar} />
            </div>

        </div>
    )
}