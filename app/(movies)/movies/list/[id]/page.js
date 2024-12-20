import {
    getCriditsMovies,
    getExternalIdMovies,
    getImageMoviesId,
    getMoviesId,
    getMoviesNowPlaying,
    getMoviesSimilar,
    getRecommendationMovies,
    getReleasDateMovies,
    getReviewsMovies,
    getTrailer,
    headers,
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
import { FaFacebook, FaImdb } from "react-icons/fa"
import { BsTwitterX } from "react-icons/bs"
import { SlSocialInstagram } from "react-icons/sl"
import ErrorMessage from "@/app/(tv)/Components/Error/ErrorMessage"




export async function generateMetadata({ params }) {

    const data = await getMoviesId(params.id)
    return {
        title: data.title ? data.title : data.original_title,
    }
}



export default async function DynamicMoviesList({ params }) {
    const { id } = await params

    const dataLoad = getMoviesId(id)
    const similarData = getMoviesSimilar(id)
    const dataImage = getImageMoviesId(id)
    const reviewData = getReviewsMovies(id)
    const dataCreditsId = getCriditsMovies(id)
    const recommendMovies = getRecommendationMovies(id)
    const nowData = getMoviesNowPlaying()
    const trailer = getTrailer(id)
    const dataExt = getExternalIdMovies(id)
    const [data, similar, dataImageList, dataReview, credits, dataRecommend, dataPlaying, dataTrailer, extData] = await Promise.all([dataLoad, similarData, dataImage, reviewData, dataCreditsId, recommendMovies, nowData, trailer, dataExt])


    return (
        <div className="w-full h-auto p-5 pt-20">
            {/*  bg image cover  */}
            <BgImageCover dataImageList={dataImageList}
            />
            {/* Toggle Button go back */}
            <ToggleButton />

            {/* container details movies */}
            <div className="flex items-center justify-between pb-4 " >
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl md:text-3xl  text-base-100 drop-shadow-[0_5px_10px_rgba(255,145,0,10.25)]">{data.original_title ? data.original_title : data.title}</h1>
            </div>
            <div className="w-full flex items-center justify-start gap-3 p-4 mt-4 rounded-md shadow-xl md:flex-col shadow-black/30 bg-black/50 backdrop-blur 2xl:justify-evenly">

                <div className=" w-[65%] flex flex-col items-center justify-center ">

                    <Image src={data.poster_path ? `${urlImage}${data.poster_path || data.backdrop_path}` : no_image}
                        width={250}
                        height={250}
                        className="rounded-md  "
                        style={{ width: "auto", height: 'auto' }}
                        priority
                        alt={data.title ? data.title : "Title image not found"} />

                    <div className="flex justify-center gap-3 pt-5 ">
                        <TrailerMovies dataTrailer={dataTrailer.results.slice(0, 1)} />
                        <div>
                            <Link target="_blank" rel="noopener noreferrer" href={data.homepage ? data.homepage : "https://www.themoviedb.org/"}>
                                <TbExternalLink size={45} className="text-[#f8e325] hover:scale-110 duration-300" />

                            </Link>
                        </div>
                    </div>
                </div>

                {/* section overview */}
                <div className="">
                    <h1 className="mt-10 text-3xl font-bold text-amber-600 black-shadow-text scroll-m-20 md:text-xl first:mt-0">
                        Overview :

                    </h1>
                    <blockquote className="pl-6 mt-6 font-semibold border-l-2 border-l-red-700 md:border-l-white md:rounded-md md:bg-zinc-800">{data.overview ? data.overview : <ErrorMessage />}</blockquote>

                    <Separator className="mt-8" />

                    <div className="flex items-center justify-start gap-6 mt-5 text-2xl font-bold pb-2 flex-wrap">
                        <h2 className=" text-amber-600 scroll-m-20 md:text-lg black-shadow-text first:mt-0">Release Date :</h2>
                        <h1 className=" tracking-tight text-gray-400  scroll-m-20 md:text-lg first:mt-0">{data.release_date ? data.release_date.replace(/-/g, "/") : <ErrorMessage />}</h1>
                        <h2 className=" text-amber-600 scroll-m-20 md:text-lg black-shadow-text ">Runtime :</h2>
                        <h1 className=" text-red-300 scroll-m-20 md:text-xl first:mt-0 black-shadow-text">{data.runtime ? <span>{data.runtime} min</span> : <span className=" border-none font-bold text-red-700"> Not found</span>}</h1>
                    </div>

                    <Separator className="mt-4" />

                    {/* section genres  */}
                    <div className="flex flex-wrap items-center gap-3 mt-3 ">
                        <h2 className=" text-amber-600 md:text-[#a52727] mt-2 scroll-m-20 md:text-lg pb-2 text-2xl font-bold tracking-tight black-shadow-text first:mt-0"> Genres :</h2>
                        {data.genres && data.genres.length > 0 ? (
                            data.genres.map((genre) => (
                                <div className="pb-2 " key={genre.id}>
                                    <Link href={`/movies/genre/${genre.id}`}>
                                        <Badge variant={"destructive"} className={cn('font-bold text-[#ffebcd]  ')} >{genre.name ? genre.name : "Genre not found"}</Badge>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <ErrorMessage className=" font-bold" />
                        )}

                        {/* section production countries  */}
                        <div className="flex flex-wrap items-center gap-3">
                            <h2 className="pb-2 mt-2 text-2xl font-bold tracking-tight transition-colors black-shadow-text scroll-m-20 md:text-lg first:mt-2">Production countries :</h2>
                            {data.production_countries && data.production_countries.length > 0 ? (
                                data.production_countries.map((country) => (
                                    <div className="" key={country.iso_3166_1}>
                                        <Badge variant={"outline"} className={cn('font-bold bg-yellow-700 text-black ')} >{country.name ? country.name : <ErrorMessage />}</Badge>
                                    </div>
                                ))
                            ) : (
                                <ErrorMessage />
                            )
                            }
                        </div>
                    </div>
                    <div>

                        <Separator className="mt-4" />
                        {/* section popularity & vote average & vote count & status */}
                        <div className="flex flex-wrap items-center justify-start gap-5 md:justify-stretch">
                            <div className="flex items-center justify-start gap-3 mt-5 md:flex-wrap">
                                <h2 className="text-2xl font-bold black-shadow-text scroll-m-20 md:text-lg first:mt-0text-slate-600">Popularity :</h2>
                                <h1 className="flex items-center justify-start gap-2 text-2xl font-bold tracking-tight text-yellow-500 transition-colors scroll-m-20 md:text-xl first:mt-0">{data.popularity ? data.popularity.toFixed(2) : <ErrorMessage />} <FaRankingStar size={28} className="text-yellow-500 " /></h1>
                            </div>
                            <div className="flex items-center justify-start gap-3 mt-5 md:flex-wrap">
                                <h2 className="text-2xl font-bold black-shadow-text scroll-m-20 md:text-lg first:mt-0">Vote average :</h2>
                                <h1 className="flex items-center justify-start gap-2 text-2xl font-bold tracking-tight text-yellow-500 transition-colors scroll-m-20 md:text-xl first:mt-0">{data.vote_average ? data.vote_average : <ErrorMessage />}<GiStarsStack size={28} className="text-yellow-500 " /></h1>
                            </div>
                        </div>
                        <div className="flex items-center justify-start gap-3 mt-5 md:flex-wrap lg:flex-wrap flex-wrap">
                            <h2 className="text-2xl font-bold text-amber-600 scroll-m-20 md:text-lg black-shadow-text first:mt-0">Status :</h2>
                            <h1 className={` text-success flex justify-start items-center gap-2  scroll-m-20 md:text-xl  text-2xl font-bold tracking-tight transition-colors first:mt-0" ${data.status ? "text-blue-500" : "text-red-800"}`}> {data.status ? data.status : <ErrorMessage />}</h1>
                            <h2 className="text-2xl font-bold text-amber-600 scroll-m-20 md:text-lg black-shadow-text first:mt-0">Original Language :</h2>
                            <h1 className="text-2xl font-bold text-purple-500 scroll-m-20 md:text-xl first:mt-0 black-shadow-text">{data.original_language ? data.original_language : <ErrorMessage />}</h1>
                        </div>

                        {/* section social media information */}
                        <div className="flex flex-wrap items-center justify-start gap-2 mt-5 ">
                            <strong className="text-2xl font-bold text-amber-600  md:text-lg black-shadow-text">Social Media Information : </strong>
                            <ul className="flex items-center justify-center gap-6 ">
                                <li className="">
                                    <Link
                                        href={`https://www.facebook.com/${extData.facebook_id}`}
                                        rel="noopener noreferrer"
                                        target='_blank'
                                        className=''
                                    >
                                        <FaFacebook size={34} className=" hover:bg-blue-600 hover:duration-500 hover:rounded-full hover:bg-clip-content hover:scale-105" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`https://www.twitter.com/${extData.twitter_id ? extData.twitter_id : "null"}`} rel="noopener noreferrer" target='_blank'>
                                        <BsTwitterX size={34} className="hover:bg-black md:active:scale-110 hover:duration-500 hover:bg-clip-content hover:scale-105" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`https://www.instagram.com/${extData.instagram_id ? extData.instagram_id : "null"}`} rel="noopener noreferrer" target='_blank'>
                                        <SlSocialInstagram size={34} className="hover:bg-orange-600 md:active:scale-110  hover:duration-500 hover:rounded-xl hover:bg-clip-content hover:scale-105 " />
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`https://www.imdb.com/title/${extData.imdb_id ? extData.imdb_id : "null"}`} rel="noopener noreferrer" target='_blank'>
                                        <FaImdb size={34} className="hover:bg-black md:active:scale-110  hover:duration-500 hover:bg-clip-content hover:scale-105 " />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Separator className="mt-4" />
                </div>
            </div>
            {/* section images scroll */}
            <div className="flex items-center justify-center mt-5 ">

                <ImageList dataImageList={dataImageList} />
            </div>

            {/* section Cast of movies */}
            <div>
                <MoviesCredits credits={credits} />
            </div>

            {/* section reviews of movies */}
            <div className="mt-5">
                <ReviewsList dataReview={dataReview && dataReview.results && dataReview.results.length > 0 ? dataReview : []} />

            </div>
            <Separator className="my-4 " />

            {/* section Recommendation Movies */}
            <div>
                <RecommendationMovies dataRecommend={dataRecommend.results} />
            </div>
            <Separator className="my-4 " />

            {/* section of movies now playing */}
            <div>
                <NowPlayingMovies dataPlaying={dataPlaying.results} />
            </div>
            <Separator className={cn('my-4 bg-red-700')} />

            {/* section Similar movies */}
            <div>
                <MoviesSimilar similar={similar} />
            </div>

        </div>
    )
}