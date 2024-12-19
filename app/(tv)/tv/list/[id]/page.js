import {
    getDetailsSeasonTv,
    getDetailsTv,
    getExternalIdTv,
    getImageTv,
    getLatestTv,
    getRecommendationsTv,
    getTrendingTv,
    getTvCredits,
    getVideosTv,
    urlImageTv
} from "@/app/libs/DataFetchingTv"
import Image from "next/image"
import { IoTimerOutline } from "react-icons/io5";
import { PiShootingStarLight } from "react-icons/pi";
import { MdOutlineStackedBarChart } from "react-icons/md";
import { Separator } from "@/components/ui/separator"
import { MdOutlineInsertChartOutlined } from "react-icons/md";
import AnimateNumber from "@/app/Animations/AnimationNumber/AnimateNumber";
import CreditsDetailsTv from "@/app/(tv)/Components/CreditsDetailsTv/CreditsDetailsTv";
import { SlSocialInstagram } from "react-icons/sl";
import { BsTwitterX } from "react-icons/bs";
import { SiWikidata } from "react-icons/si";
import { FaFacebook } from "react-icons/fa6";
import Link from "next/link"
import RecommendationTv from "@/app/(tv)/Components/RecommendationTv/RecommendationTv";
import ToggleButton from "@/app/(movies)/Components/ToggleButton/ToggleButton";
import LatestTv from "@/app/(tv)/Components/LatestTv/LatestTv";
import TrendingTv from "@/app/(tv)/Components/TrendingTv/TrendingTv";
import TrailerTv from "@/app/(tv)/Components/TrailerTV/TrailerTv";
import no_image from '../../../../../public/image/no_image4.webp'
import { RiBarChartGroupedLine } from "react-icons/ri";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { MdOutlineTransitEnterexit } from "react-icons/md";
import RatingTvShow from "@/app/(tv)/Components/RatingTvShow/RatingTvShow";
import WordPullUp from "@/components/ui/word-pull-up";
import BlurFade from "@/components/ui/blur-fade";







export async function generateMetadata({ params }) {
    const { id } = params
    const data = await getDetailsTv(id)
    return {
        title: data.name
    }
}




export default async function DynamicTvListPage({ params }) {
    const { id } = params

    const data = getDetailsTv(id)
    const dataImage = getImageTv(id)
    const dataCredits = getTvCredits(id)
    const dataExt = getExternalIdTv(id)
    const dataRecommendation = getRecommendationsTv(id)
    const videosTv = getVideosTv(id)
    const dataTrend = getTrendingTv()

    const [detailTv, imageTv, creditsTv, externalData, dataRecommend, dataVideosTv, dataTrending] = await Promise.all([data, dataImage, dataCredits, dataExt, dataRecommendation, videosTv, dataTrend])

    return (
            <div className="w-full h-auto px-6 pt-2 ">

            <div className="flex flex-col items-center justify-center text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-4xl">
                <WordPullUp
                    className="text-4xl font-bold tracking-[-0.02em] text-white  md:text-4xl "
                    words={detailTv.name ? detailTv.name : detailTv.original_name || <h1 className="text-2xl font-bold text-error rounded-xl md:text-xl">unknown !</h1>}
                />
                <div className="flex flex-col w-48 border-b-2 md:border-none border-b-blue-700" />
            </div>
            <div className="flex items-start justify-start gap-4 mt-8 md:flex-col">
                <div className=" w-[70%] xl:w-full  flex justify-center items-center flex-col   relative md:w-full  overflow-hidden md:flex md:justify-center md:items-center">


                    <Image src={detailTv.poster_path ? `${urlImageTv}${detailTv.poster_path}` : no_image}
                        priority
                        width={400}
                        height={400}
                        stryle={{ height: "auto" }}
                        className="rounded-md  md:w-[200px] lg:w-[350px]  "
                        draggable="false"
                        alt={data.name ? data.name : data.original_name || <h1 className="">Image Tv</h1>}
                        loading="eager"
                    />

                    <div className="flex items-center justify-center w-full gap-6 mt-6 ">

                        <TrailerTv dataVideos={dataVideosTv && dataVideosTv.results.length > 0 ? dataVideosTv.results.slice(0, 1) : []} />
                        <Link href={detailTv.homepage} target="_blank" rel="noopener noreferrer">

                            <MdOutlineTransitEnterexit size={52} className="text-[#f8ea25] hover:scale-110 duration-300 cursor-pointer" />

                        </Link>
                    </div>
                </div>



                <div className="flex flex-col items-start justify-start gap-1 ">

                    <div className="flex flex-wrap items-center justify-center gap-1 ">
                        <strong className="text-2xl font-bold scroll-m-20 text-zinc-600">First air date : </strong>
                        <h1 className="text-xl font-semibold text-transparent scroll-m-20 xl:text-2xl bg-clip-text bg-gradient-to-tr from-blue-400 to-blue-700">
                            {detailTv.first_air_date ? detailTv.first_air_date : <h1 className="text-2xl font-bold text-error rounded-xl md:text-xl">unknown !</h1>}
                        </h1>

                    </div>

                    {/* genres */}
                    <div className="flex flex-wrap items-center justify-start w-full gap-2 pt-3 ">
                        {detailTv.genres.map((genre) => (
                            <div key={genre.id} className=" badge badge-info">
                                <h1 className="font-semibold scroll-m-20 md:font-bold">{genre.name}</h1>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pt-3 ">

                        <div>
                            <h1 className="p-2 font-semibold text-yellow-500 bg-blue-800 border border-blue-800 badge scroll-m-20 md:font-bold">{detailTv.number_of_episodes}  Episodes</h1>
                        </div>
                        <div>
                            <h1 className="p-2 font-semibold text-yellow-500 bg-blue-800 border border-blue-800 badge scroll-m-20 md:font-bold">{detailTv.number_of_seasons}  Seasons</h1>
                        </div>
                        <div>
                            <h1 className="p-2 font-semibold text-yellow-500 bg-blue-800 border border-blue-800 badge scroll-m-20 md:font-bold"> Original language :    {detailTv.original_language}</h1>
                        </div>
                        <div className="">
                            <h1 className="p-2 font-semibold text-yellow-500 bg-blue-800 border border-blue-800 badge scroll-m-20 md:font-bold"> {detailTv.episode_run_time[0] ? detailTv.episode_run_time[0] : "Undefined"} min</h1>
                        </div>
                    </div>

                    <Separator className="mt-4" />
                    {/* production & status & type */}
                    <div className="flex flex-wrap items-center justify-start gap-4 pt-4 ">
                        <div className="flex items-center justify-center gap-2 ">

                            <strong className="text-2xl font-bold md:text-xl text-zinc-600">In production : </strong>
                            <h1>
                                {detailTv.in_production ? <p className="text-xl font-semibold text-success scroll-m-20 xl:text-2xl">Yes</p> : <p className="text-xl font-bold text-error scroll-m-20 xl:text-2xl">No</p>}
                            </h1>
                        </div>

                        <div className="flex items-center gap-2 ">
                            <strong className="text-2xl font-bold text-zinc-600 md:text-xl">Status : </strong>
                            <h1 className="text-xl font-semibold text-blue-400 scroll-m-20 xl:text-2xl">{detailTv.status}</h1>
                        </div>
                        <div className="flex items-center gap-2 ">
                            <strong className="text-2xl font-bold md:text-xl text-zinc-600">Type :</strong>
                            <h1 className="text-xl font-semibold text-red-800 scroll-m-20 xl:text-2xl">{detailTv.type}</h1>
                        </div>
                    </div>
                    <Separator className="mt-4" />

                    {/* overview */}
                    <div>
                        <div className="pt-4 ">
                            <strong className="text-2xl font-bold text-zinc-600 md:text-xl">Overview :</strong>
                            <blockquote className="pl-6 mt-4 font-semibold border-l-2 md:italic md:font-sans border-l-blue-600">{detailTv.overview ? detailTv.overview : <h1 className="text-2xl font-bold text-error rounded-xl md:text-xl">unknown !</h1>}</blockquote>
                        </div>
                    </div>
                    <Separator className="mt-4" />

                    {/* popularity & vote Average & vote Count */}
                    <div className="flex flex-wrap items-center justify-start gap-3 pt-4">
                        <div className="flex items-center justify-start gap-2 ">
                            <strong className="text-2xl font-bold text-zinc-600 md:text-xl">Popularity :</strong>
                            <h1 className="flex items-center justify-center gap-2 text-xl font-semibold text-amber-400 scroll-m-20 xl:text-2xl">
                                {detailTv.popularity.toFixed(2)}
                                <span><PiShootingStarLight size={28} className=" size-10" /></span>
                            </h1>
                        </div>
                        <div className="flex items-center justify-start gap-2 ">
                            <strong className="text-2xl font-bold text-zinc-600 md:text-xl">Vote Average : </strong>
                            <h1 className="flex items-center justify-center gap-2 text-xl font-semibold text-amber-400 scroll-m-20 xl:text-2xl">
                                {(detailTv.vote_average / 10 * 100).toFixed(2)}%
                                <span><MdOutlineStackedBarChart size={28} className=" size-10" /></span>
                            </h1>
                        </div>
                        <AnimateNumber vote_count={detailTv.vote_count.toFixed(0)} />
                        {/* <div className="flex items-center justify-start gap-2 ">
                        <strong className="text-2xl font-bold text-zinc-600 md:text-xl">Vote Count: </strong>
                        <h1 className="flex items-center justify-center gap-2 text-xl font-semibold text-amber-400 scroll-m-20 xl:text-2xl">
                            {(detailTv.vote_count /10 *100)}
                            <span><MdOutlineInsertChartOutlined   size={28} className=" size-10" /></span>
                        </h1>
                    </div> */}
                    </div>

                    <Separator className="mt-4" />

                    {/* external data link social media */}
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-4 ">
                        <strong className="text-2xl font-bold text-zinc-600 md:text-xl">Social Media Information : </strong>
                        <ul className="flex items-center justify-center gap-6 ">
                            <li className="">
                                <Link
                                    href={`https://www.facebook.com/${externalData.facebook_id}`}
                                    rel="noopener noreferrer"
                                    target='_blank'
                                    className=''
                                >
                                    <FaFacebook size={34} className=" hover:bg-blue-600 hover:duration-500 hover:rounded-full hover:bg-clip-content hover:scale-105" />
                                </Link>
                            </li>
                            <li>
                                <Link href={`https://www.twitter.com/${externalData.twitter_id}`} rel="noopener noreferrer" target='_blank'>
                                    <BsTwitterX size={34} className="hover:bg-black hover:duration-500 hover:bg-clip-content hover:scale-105" />
                                </Link>
                            </li>
                            <li>
                                <Link href={`https://www.instagram.com/${externalData.instagram_id}`} rel="noopener noreferrer" target='_blank'>
                                    <SlSocialInstagram size={34} className="hover:bg-orange-600 hover:duration-500 hover:rounded-xl hover:bg-clip-content hover:scale-105" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* companies */}
                    <div>
                        <strong></strong>
                    </div>


                    {/* created by */}
                    <div className="flex flex-wrap items-center justify-start gap-2 mt-6 ">
                        <strong className="text-2xl font-bold text-zinc-600 md:text-xl">Created by : </strong>
                        {detailTv.created_by && detailTv.created_by.length > 0 ? (
                            detailTv.created_by.map((creator) => (
                                <div key={creator.id} className="border-red-700 shadow-sm badge badge-outline shadow-red-700">

                                    <h1 className="font-semibold scroll-m-20 text-error">{creator.name}</h1>

                                </div>
                            ))
                        ) : (
                            <h1 className="text-2xl font-bold text-error rounded-xl md:text-xl">unknown !</h1>
                        )
                        }
                    </div>

                    <Separator className="mt-4" />

                    {/* rating */}
                    {/* <div>
                        <h1 className="pb-2 text-2xl font-bold text-slate-600">Rate this series</h1>
                        <RatingTvShow id={detailTv.id} />
                    </div> */}

                    <ToggleButton />

                </div>


            </div>

            <Separator className="mt-4" />
            {/* Last Episode to air */}
            <BlurFade delay={0.25} inView>

                <div className="mt-6 ">
                    <strong className="text-2xl font-bold text-[#3f7eab] md:text-xl">Last episode to air :</strong>
                </div>
                {detailTv.last_episode_to_air ? (
                    <div className=" h-[20rem] md:h-auto w-full xl:h-[22rem] relative">

                        <div className="relative flex items-start justify-between w-full gap-2 mt-6 ">
                            <div className=" overflow-hidden relative  h-[20rem] w-full ">
                                <Image
                                    src={detailTv.last_episode_to_air.still_path ? `${urlImageTv}${detailTv.last_episode_to_air.still_path}` : no_image}
                                    fill
                                    alt="image_last_air_date"
                                    priority
                                    style={{ objectFit: "cover", objectPosition: "center" }}
                                    // loading="eager"
                                    className="rounded-md blur-right"
                                />
                            </div>

                            {/* last air date name */}
                            <div className=" flex justify-center w-full md:h-auto md:top-0  flex-col gap-2 z-50 absolute  rounded-md  p-2 bg-black bg-opacity-30 backdrop-blur-sm h-[20rem]">
                                <div className="flex flex-wrap items-center justify-start order-2 gap-3 ">
                                    <strong className="text-2xl font-bold text-zinc-400 md:text-xl">Last Air Date :</strong>
                                    <h1 className="text-xl font-semibold text-transparent scroll-m-20 xl:text-2xl bg-clip-text bg-gradient-to-tr from-red-800 to-red-700"> {detailTv.last_episode_to_air.air_date ? detailTv.last_air_date.replace(/-/g, "/") : <span className="text-2xl font-bold text-error rounded-xl md:text-xl">unknown !</span>} </h1>
                                </div>

                                <div className="flex flex-wrap items-center justify-start order-1 gap-3 ">
                                    <strong className="text-2xl font-bold text-zinc-400 md:hidden">Name :</strong>
                                    <h1 className="text-xl font-bold scroll-m-20 xl:text-2xl"> {detailTv.last_episode_to_air.name ? detailTv.last_episode_to_air.name : <span className="text-2xl font-bold text-error rounded-xl md:text-xl">unknown !</span>} </h1>
                                </div>
 
                                <div className="flex flex-wrap items-center justify-start order-3 gap-2 ">
                                    <div className="flex flex-col gap-2 ">

                                        <div className="flex flex-wrap items-center justify-start order-4 gap-2 ">
                                            <strong className="text-2xl font-bold text-zinc-400 md:text-xl">vote average :</strong>
                                            <h1 className="flex items-center justify-center gap-2 text-xl font-semibold text-amber-400 scroll-m-20 xl:text-2xl">{(detailTv.last_episode_to_air.vote_average / 10 * 100).toFixed(2)}%</h1>
                                            <span className=""><RiBarChartGroupedLine size={30} className="text-amber-400" /></span>
                                        </div>
                                        <div className="flex items-center justify-start gap-2 ">
                                            <strong className="text-2xl font-bold text-zinc-400 md:text-xl">Vote Count: </strong>
                                            <h1 className="flex items-center justify-center gap-2 text-xl font-semibold text-amber-400 scroll-m-20 xl:text-2xl">
                                                {detailTv.last_episode_to_air ? detailTv.last_episode_to_air.vote_count : "Unknown"}
                                                <span><MdOutlineInsertChartOutlined size={30} className="" /></span>
                                            </h1>
                                        </div>
                                    </div>



                                </div>
                                <div className="flex flex-wrap items-center justify-start order-4 gap-2 ">
                                    <strong className="text-2xl font-bold text-zinc-400 md:text-xl">Runtime:</strong>
                                    <h1 className="text-xl font-semibold text-orange-700 scroll-m-20 xl:text-2xl">{detailTv.last_episode_to_air.runtime ? detailTv.last_episode_to_air.runtime : <span className="text-2xl font-bold text-error rounded-xl md:text-xl">unknown !</span>} min
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className=" flex justify-center items-center font-bold p-4">
                        <h1 className="border-red-800 border p-2 text-xl rounded-md text-red-600">No Last Air Data Available !</h1>
                    </div>
                )}

            </BlurFade>
            {/* Credits  and cast and crew  and people && Reviews , season and episode */}
            <div>
                <CreditsDetailsTv
                    credits={creditsTv.cast}
                    dataImageTv={imageTv}
                    seasons={detailTv.seasons}
                    seriesId={detailTv.id}
                />
            </div>
            <Separator className="mt-4 bg-gradient-to-r from-[#0742a1] via-[#b60c00] to-[#0742a1]" />


            {/* recommend section */}
            <div className="mt-4">

                <h1 className="mt-4 text-3xl font-extrabold  scroll-m-20 lg:text-3xl bg-gradient-to-tr from-[#ff3300] mb-1 via-[#fbff00] to-[#0047ca] bg-clip-text text-transparent md:flex md:flex-wrap md:justify-center md:items-center md:gap-1">Your <span className="text-[##FE8FF5]">Turn</span> <span className="">to </span>Choose </h1>
                <RecommendationTv dataRecommend={dataRecommend.results} />
            </div>

            <Separator className="mt-4 bg-gradient-to-r from-[#0742a1] via-[#b60c00] to-[#0742a1]" />
            {/* trending  */}
            <div className="mt-8">
                <h1 className=' bg-gradient-to-tr from-[#f2f2f2] mb-1 via-[#f96d00] to-[#f96d00]  bg-clip-text text-transparent 2xl:text-4xl  text-3xl font-extrabold tracking-tight scroll-m-20 lg:text-3xl '>Hot <span>on</span> <span className=" ">TV Now</span></h1>
                <TrendingTv dataTrending={dataTrending.results} />
            </div>





        </div>
    )
}