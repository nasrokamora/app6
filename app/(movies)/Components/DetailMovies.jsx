import { getMoviesId, getReviewsMovies, urlImage } from "@/app/libs/DataFetching"
import Image from "next/image"
import { CiPlay1 } from "react-icons/ci";
import { MdOutlineStarRate } from "react-icons/md";
import { LuBarChart2 } from "react-icons/lu";
import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,

} from "@/components/ui/hover-card"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import Link from "next/link"
import { TbStars } from "react-icons/tb";

import DetailImageMovies from "./DetailImageMovies";
// import CriditsMoviesDetails from "./CriditsMovies/CriditsMoviesDetails";
// import TrailerMovie from "@/app/Components/MoviesVideos/TrailerMovie";
import { AiOutlineDollar } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoTimer } from "react-icons/io5";
import MoviesReview from "./MoviesReview/MoviesReview";
import ReviewsMovies from "./MoviesReview/MoviesReview";

import UpComingMovies from "./UpComing/UpComingMovies";



export default async function DetailAllMovies({ id }) {
    const data =  getMoviesId(id)
    const Review =  getReviewsMovies(id)
    
    const [dataDetail,review,similar] = await Promise.all([data,Review]) 
    
    const dataReview = review.results
    // console.log(dataDetail);
    // console.log(dataDetail)
    return (
        <div className=" md:h-auto  ">

            <div className=" flex justify-center items-center flex-col">
                <h1 className=" text-3xl font-bold ">{dataDetail.title}</h1>
                <div className=" w-[5rem] border-red-700 border" />
            </div>
            <div className="   flex  gap-3 justify-between items-start md:flex-col md:flex md:justify-center ">
                <div className="md:w-full  flex-col  relative overflow-hidden flex  justify-around gap-3 items-center ">

                    <Image src={`https://image.tmdb.org/t/p/original${dataDetail.poster_path}`}
                        width={500}
                        height={300} className="  transform-y-opacity-35 md:mt-5 md:w-[250px] md:h-[350px] rounded-md pt-6"
                        draggable={false} priority
                        alt={dataDetail.original_title} />

                    <div className=" min-w-full flex justify-center   pt-5">
                        <Button className="  bg-[rgb(187,26,28)]  " variant='outline'>Play</Button>

                    </div>
                </div>
                <div className=" xl:font-semibold mt-4 font-semibold md:flex md:flex-col md:justify-center md:font-semibold ">
                    <div className=" flex-1 justify-center">
                        <h5 className="  scroll-m-20  pb-2 text-2xl  tracking-tight first:mt-0 border-b-red-700">
                            <strong>Release Date : </strong>
                            {dataDetail.release_date.replace(/-/g, '.')}
                        </h5>
                        {/* <h6>{dataDetail.origin_country}</h6> */}
                    </div>
                    <p className=" overflow-hidden text-wrap ">{dataDetail.overview}</p>


                    {/* details genres of movies */}
                    <div className=" flex gap-5 items-center pt-3 flex-wrap">
                        {dataDetail.genres.map((genre) => (
                            <h3 key={genre.id} className=" badge-warning p-1 rounded-md  ">
                                {genre.name}
                            </h3>
                        ))}

                    </div>


                    {/* details of vote & popularity and tooltip average */}
                    <div className=" text-2xl md:justify-normal md:gap-4 flex gap-2 items-center pt-5 flex-wrap justify-between">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className=" flex gap-2 items-center badge p-3">
                                        <span className=" text-yellow-500"><MdOutlineStarRate size={28} /></span>
                                        <strong  >
                                            {dataDetail.vote_average.toFixed(1)}/10
                                        </strong>
                                        <TooltipContent>
                                            Vote average
                                        </TooltipContent>
                                    </div>
                                </TooltipTrigger>
                            </Tooltip>
                        </TooltipProvider>

                        {/* tooltip populqrity */}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className=" flex gap-2 items-center badge p-3">
                                        <span className=" text-yellow-500"><TbStars size={28} /></span>
                                        <strong>
                                            {dataDetail.popularity.toFixed(1)}
                                        </strong>
                                        <TooltipContent>
                                            Popularity
                                        </TooltipContent>
                                    </div>
                                </TooltipTrigger>
                            </Tooltip>
                        </TooltipProvider>

                        {/*  hover runtime */}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>

                                    <div className="flex gap-2  items-center badge p-3">
                                        <span className="text-yellow-500"><IoTimer size={28} /></span>
                                        <strong>{dataDetail.runtime} min</strong>
                                        <TooltipContent>Runtime</TooltipContent>
                                    </div>
                                </TooltipTrigger>
                            </Tooltip>
                        </TooltipProvider>


                        {/* tooltip budget */}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>

                                    <div className="flex gap-2 items-center badge p-3">
                                        <span className="text-yellow-500"><AiOutlineDollar size={28} /></span>
                                        <strong>
                                            {dataDetail.budget}
                                        </strong>
                                        <TooltipContent>
                                            Budget
                                        </TooltipContent>
                                    </div>
                                </TooltipTrigger>
                            </Tooltip>
                        </TooltipProvider>

                        {/* tooltip revenue */}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="flex  items-center badge p-3">
                                        {Array.from({ length: 2 }).map((_, index) => (
                                            <BsCurrencyDollar key={index} size={28} className="text-yellow-500" />
                                        ))}
                                        <strong className="px-1">
                                            {dataDetail.revenue}
                                        </strong>
                                        <TooltipContent>
                                            Revenue
                                        </TooltipContent>
                                    </div>
                                </TooltipTrigger>
                            </Tooltip>
                        </TooltipProvider>
                    </div>



                    {/* hover card form link */}
                    <div>
                        <HoverCard className=" ">
                            <HoverCardTrigger asChild>
                                <Button variant="link"><strong>@homepage</strong></Button>
                            </HoverCardTrigger>
                            <HoverCardContent className=" ml-5 w-fit">
                                <Link className="" href={dataDetail.homepage}>{dataDetail.homepage}</Link>
                            </HoverCardContent>
                        </HoverCard>
                    </div>

                    {/* detaile of movies */}

                    <div className=" ">
                        <p className="flex justify-start gap-2 items-center">
                            <strong>Origin Country :</strong>
                            <span className="  text-yellow-500 font-semibold">{dataDetail.origin_country}</span>
                        </p>
                        <div className="flex justify-start gap-2 items-center py-4">
                            <strong>original_language :</strong>
                            <span className=" text-yellow-500 font-semibold">{dataDetail.original_language}</span>
                        </div>
                        <div className="flex justify-start gap-2 items-center">
                            <strong>Status</strong>
                            <span className=" text-yellow-500 font-semibold"> {dataDetail.status} </span>
                        </div>
                    </div>
                    {/* component of cridits */}
                    <div>
                        {/* <CriditsMoviesDetails movie_id={movie_id} /> */}
                    </div>
                    <div>
                        {/* <ReviewsMovies dataReview={dataReview}/> */}
                    </div>
                </div>

                {/* Copmponent of image */}

            </div>
            <div className="mt-8">
                <DetailImageMovies id={id} />
            </div>
            <div className="mt-8 w-full border-t ">
            <div className=" pt-4">
                <h1 className="mt-10 scroll-m-20  pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Up Coming on Magix</h1>
            </div>
                  <UpComingMovies />                      
            </div>



        </div>
    )


}