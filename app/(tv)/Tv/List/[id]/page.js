import { getDetailsSeasonTv, getDetailsTv, getExternalIdTv, getImageTv, getLatestTv, getRecommendationsTv, getTrendingTv, getTvCredits, urlImageTv } from "@/app/libs/DataFetchingTv"
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
import PaginationTv from "@/app/(tv)/Components/PaginationTv/PaginationTv";
import PaginationImageTv from "@/app/(tv)/Components/PaginationTv/PaginationImageTv";
import DetailsSeasonTv from "@/app/(tv)/Components/DetailsSeasonTv/DetailsSeasonTv";
import RecommendationTv from "@/app/(tv)/Components/RecommendationTv/RecommendationTv";
import ToggleButton from "@/app/(movies)/Components/ToggleButton/ToggleButton";
import LatestTv from "@/app/(tv)/Components/LatestTv/LatestTv";
import TrendingTv from "@/app/(tv)/Components/TrendingTv/TrendingTv";



export async function generateMetadata({params}) {
    const {id} = params
    const data = await getDetailsTv(id)
    return {
        title: data.name
    }
}




export default async function DynamicTvListPage({params}) {
    const {id} = params
    
    const data = await getDetailsTv(id)
    const dataImage = await getImageTv(id)
    const dataCredits = await getTvCredits(id)    
    const dataExt = await getExternalIdTv(id)
    const dataRecommendation = await getRecommendationsTv(id)
    const dataTrend = await getTrendingTv()
    const [detailTv,imageTv, creditsTv,externalData,dataRecommend,dataTrending] = await Promise.all([data,dataImage,dataCredits,dataExt,dataRecommendation,dataTrend])
    
    // console.log(dataTrending);
    return(
        <div className=" w-full h-auto px-6 pt-6 ">


            <div className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl flex justify-center  items-center flex-col">
            <h1 className=" tracking-wide md:decoration-blue-700 md:underline-offset-4 md:underline">
                {detailTv.name}
            </h1>
            <div className=" border-b-2 w-48 md:border-none border-b-blue-700 flex flex-col"/>
            </div>

            <div className="flex justify-start w-full gap-4 mt-8 md:flex-col">
                <div className=" h-fit w-[40%]   overflow-hidden md:flex md:justify-center md:items-center">
                    <Image src={`${urlImageTv}${detailTv.poster_path}`}
                    priority
                    width={400}
                    height={250}
                    stryle={{maxWidth:"100%"}}
                    className="rounded-md  md:w-[200px] lg:w-[350px] 2xl:w-[400px] ]"
                    draggable="false"
                    alt={data.name}
                    />
                </div>

                <div className=" flex justify-start items-start gap-1 flex-col">

                <div className=" flex justify-center items-center gap-1  flex-wrap">
                    <strong className=" font-bold text-2xl scroll-m-20 text-zinc-600">First air date : </strong>
                <h1 className="   scroll-m-20 text-xl xl:text-2xl  font-semibold bg-clip-text text-transparent bg-gradient-to-tr from-blue-400 to-blue-700">
                     {detailTv.first_air_date}
                </h1>

                </div>

                {/* genres */}
                <div className=" pt-3 flex gap-2 flex-wrap items-center justify-start w-full">
                    {detailTv.genres.map((genre) => (
                        <div key={genre.id} className=" badge badge-info">
                            <h1 className="  scroll-m-20   font-semibold md:font-bold">{genre.name}</h1>
                        </div>
                    ))}
                </div>
                    <div className=" flex gap-2 pt-3 items-center flex-wrap">

                    <div>
                        <h1 className=" p-2 badge bg-blue-800 border-blue-800 border scroll-m-20 font-semibold md:font-bold text-yellow-500">{detailTv.number_of_episodes}  Episodes</h1>
                    </div>
                    <div>
                        <h1 className=" p-2 badge bg-blue-800 border-blue-800 border scroll-m-20 font-semibold md:font-bold text-yellow-500">{detailTv.number_of_seasons}  Seasons</h1>
                    </div>
                    <div>
                        <h1 className="p-2 badge bg-blue-800 border-blue-800 border scroll-m-20 font-semibold md:font-bold text-yellow-500"> Original language :    {detailTv.original_language}</h1>
                    </div>
                    <div className="">
                        <h1 className=" p-2 badge bg-blue-800 border-blue-800 border scroll-m-20  font-semibold md:font-bold text-yellow-500 "> {detailTv.episode_run_time[0] ? detailTv.episode_run_time[0] : 0} min</h1>
                    </div>
                    </div>

                <Separator className="mt-4" />
                {/* production & status & type */}
                <div className=" flex gap-4 justify-start items-center pt-4  flex-wrap">
                    <div className=" flex gap-2 justify-center items-center">

                    <strong className="font-bold text-2xl md:text-xl text-zinc-600">In production : </strong>
                    <h1>
                        {detailTv.in_production ? <p className=" text-success  scroll-m-20 text-xl xl:text-2xl  font-semibold">Yes</p> : <p className=" text-error  scroll-m-20 text-xl xl:text-2xl  font-bold">No</p>}
                    </h1>
                    </div>

                    <div className=" flex items-center gap-2">
                        <strong className="font-bold text-2xl text-zinc-600 md:text-xl">Status : </strong>
                        <h1 className="  scroll-m-20 text-xl xl:text-2xl  font-semibold text-blue-400">{detailTv.status}</h1>
                    </div>
                    <div className=" flex items-center gap-2">
                        <strong className="font-bold text-2xl md:text-xl text-zinc-600">Type :</strong>
                        <h1 className="  scroll-m-20 text-xl xl:text-2xl  font-semibold text-red-800 ">{detailTv.type}</h1>
                    </div>
                </div>
                <Separator className="mt-4" />
                
                {/* overview */}
                <div>
                    <div className=" pt-4">
                        <strong className=" font-bold text-2xl text-zinc-600 md:text-xl">Overview :</strong>
                        <blockquote className=" md:italic md:font-sans  mt-4 border-l-2 pl-6 border-l-blue-600 font-semibold">{detailTv.overview}</blockquote>
                    </div>
                </div>
                <Separator className="mt-4" />
                
                {/* popularity & vote Average & vote Count */}
                <div className="pt-4 flex justify-start gap-3 items-center flex-wrap">
                    <div className=" flex justify-start items-center gap-2">
                        <strong className=" font-bold text-2xl text-zinc-600 md:text-xl">Popularity :</strong>
                        <h1 className=" text-amber-400  scroll-m-20 text-xl xl:text-2xl  font-semibold flex justify-center items-center gap-2">
                            {detailTv.popularity.toFixed(2)}
                            <span><PiShootingStarLight size={28} className=" size-10" /></span>
                        </h1>
                    </div>
                    <div className=" flex justify-start gap-2 items-center">
                        <strong className="font-bold text-2xl text-zinc-600 md:text-xl">Vote Average : </strong>
                        <h1 className=" text-amber-400  scroll-m-20 text-xl xl:text-2xl  font-semibold flex justify-center items-center gap-2">
                            {(detailTv.vote_average /10 *100).toFixed(2)}%
                            <span><MdOutlineStackedBarChart  size={28} className=" size-10" /></span>
                        </h1>
                    </div>
                    <AnimateNumber vote_count={detailTv.vote_count.toFixed(0)} />
                    {/* <div className=" flex justify-start gap-2 items-center">
                        <strong className="font-bold text-2xl text-zinc-600 md:text-xl">Vote Count: </strong>
                        <h1 className=" text-amber-400  scroll-m-20 text-xl xl:text-2xl  font-semibold flex justify-center items-center gap-2">
                            {(detailTv.vote_count /10 *100)}
                            <span><MdOutlineInsertChartOutlined   size={28} className=" size-10" /></span>
                        </h1>
                    </div> */}
                </div>

                <Separator className="mt-4" />

                {/* external data link social media */}
                <div className=" flex justify-center gap-2 items-center pt-4 flex-wrap">
                    <strong className=" font-bold text-2xl text-zinc-600 md:text-xl">Social Media Information : </strong>
                    <ul className=" flex justify-center items-center gap-6">
                        <li>
                            <Link href={`https://www.facebook.com/${externalData.facebook_id}`} rel="noopener noreferrer" target='_blank'><FaFacebook size={34}/></Link>
                        </li>
                        <li>
                        <Link href={`https://www.twitter.com/${externalData.twitter_id}`} rel="noopener noreferrer" target='_blank'><BsTwitterX size={34}/></Link>
                        </li>
                        <li>
                            <Link href={`https://www.instagram.com/${externalData.instagram_id}`} rel="noopener noreferrer" target='_blank'><SlSocialInstagram size={34}/></Link>
                        </li>
                    </ul>
                </div>
                {/* created by */}
                <div className=" mt-6 flex justify-start gap-2 items-center flex-wrap">
                    <strong className=" font-bold text-2xl text-zinc-600 md:text-xl">Created by : </strong>
                {detailTv.created_by.map((creator) => (
                    <div key={creator.id} className=" badge badge-outline border-red-700 shadow-sm shadow-red-700">
                        
                        <h1 className="  scroll-m-20   font-semibold text-error">{creator.name}</h1>
                        
                    </div>
                    ))}
                    
                    </div>
                    <ToggleButton />
                    <Separator className="mt-4" />
                </div>


                {/* Credits  and cast and crew  and people */}
            </div>
                <div>
                    <CreditsDetailsTv 
                    credits={creditsTv.cast} 
                    dataImageTv={imageTv} 
                    detailTv={detailTv}
                    />
                </div>
                <Separator className="mt-4" />

                <div>
                    <div className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-4">

                    {/* <h1>Season :</h1> */}
                    </div>
                {/* <PaginationTv dataSeason={detailTv.seasons} itemsPerPage={1} id={id} /> */}
                {/* <PaginationImageTv perPages={3} imageTv={imageTv.backdrops} /> */}
                {/* <DetailsSeasonTv  season={detailTv.seasons} id={detailTv.id} /> */}
                </div>

                {/* recommend section */}
                <div className="mt-4">
                    <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl mt-4 ">Recommended for You</h1>
                    <RecommendationTv dataRecommend={dataRecommend.results} />
                </div>
                    
                <Separator className="mt-4" />
                {/* trending */}
                <div className="mt-8">
                    <h1 className='scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl '>Trending Now</h1>
                    <TrendingTv dataTrending={dataTrending.results} />
                </div>
        </div>
    )
}