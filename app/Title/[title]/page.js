
import { getCriditsMovies, getDiscoverMovies, getImageMoviesId, getMoviesId, urlImage } from "../../libs/DataFetching"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { RxDividerVertical } from "react-icons/rx";
import { FaRegStarHalf } from "react-icons/fa6";
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { FaSackDollar } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";
import { AiOutlineDollar } from "react-icons/ai";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
  

import RatingMovies from "../../Components/Rated/RatingMovies";
import MoviesCredits from "../../(movies)/Components/MoviesCredits/MoviesCredits";

export async function generateMetadata({ params }) {
    const data = await getDiscoverMovies(params.title)
    const discover = data.results
    return {
        title: discover.title
    }
}



export async function DetailsMovie({ id }) {
    const dataDetails = await getMoviesId(id)
    const dataImageId = await getImageMoviesId(id)
    const dataCreditsId = await getCriditsMovies(id)
    const [data, dataIdImage,credits] = await Promise.all([dataDetails, dataImageId, dataCreditsId])
    // console.log(data);




    return (
        <div className=" w-full  text-black h-[160vh] ">
            <div className="  overflow-hidden relative h-[100vh] md:h-[150vh]">
                <Image src={`${urlImage}${data.backdrop_path}`}
                    alt={data.title}
                    priority
                    fill={true}
                    className="blur-sm"
                    style={{ objectFit: "cover" }} 
                    draggable="false" />
            </div>
            <div className="  flex flex-col absolute m top-20 px-8  w-full h-auto mr-8  md:top-20 ">

                <h1 className=" mb-4 text-[2rem] md:text-[1.5rem] font-bold text-[#ffebcd] drop-shadow-[0px_0px_5px_black] underline decoration-yellow-600">{data.title}</h1>
                <div className="  glass relative overflow-hidden flex justify-start gap-4 items-start w-full  p-3 rounded-md ">
                    <Image src={`${urlImage}${data.poster_path}`}
                        width={200}
                        height={200}
                        alt={data.title}
                        priority
                        className=" md:hidden"
                        style={{ width: "auto" }}
                        draggable="false"
                    />
                    {/* <div className=" font-bold flex gap-2  ">
                        <strong>Budget</strong>
                        <span className="flex  justify-center items-center gap-1"> <FaDollarSign size={28} className=" text-yellow-500" /> {data.budget} </span>
                    </div> */}
                    <div>
                    </div>
                    <div className="">
                        <h1 className=" text-center underline decoration-orange-700 font-bold scroll-m-20 text-3xl  tracking-tight md:text-2xl">Release date  {new Date(data.release_date).getFullYear()} </h1>
                        <h3 className=" font-bold text-xl underline decoration-orange-700 "> Overview</h3>
                        <p className="  leading-7 [&:not(:first-child)]:mt-3 font-semibold ">{data.overview}</p>

                        <div className=" flex gap-3 items-self-end justify-start [&:not(:first-child)]:mt-3 flex-wrap  md:w-fit">
                            {data.genres.map((genre) => (
                                <Badge variant={"destructive"} key={genre.id}>{genre.name}</Badge>
                            ))}
                        </div>
                        <div className="mt-5 flex items-center md:gap-2 gap-8 justify-start flex-wrap md:order-1 ">
                            <div className=" flex items-center gap-2 ">

                                <AiOutlineDollar size={26} className=" text-yellow-500" />
                                <strong> {data.budget} </strong>
                            </div>
                            <div className=" flex items-center gap-2">

                                <FaSackDollar size={26} className=" text-yellow-500" />
                                <strong> {data.revenue} </strong>
                            </div>

                            <div className=" flex items-center gap-2">
                                <RatingMovies rating={Math.round(data.vote_average / 2)} className="" />
                            </div>
                            <div className=" flex items-center gap-2">
                                <IoIosTimer size={26} className=" text-yellow-500" />
                                <strong> {data.runtime} min </strong>
                            </div>
                            <div className="">
                                <strong className=" badge badge-error">{data.status}</strong>

                            </div>
                        </div>

                    </div>

                    {/* <AlertDialog>
  <AlertDialogTrigger>Watch now</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Trailer</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>X</AlertDialogCancel>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog> */}

                </div>
                <div className="mt-5">
                    <h1 className="text-white underline decoration-yellow-500 border-t border-t-zinc-500 font-extrabold mt-10 scroll-m-20 pb-2 text-3xl  tracking-tight transition-colors first:mt-0">Cast:</h1>
                                <MoviesCredits credits={credits} />
                            </div>

                <div className=' flex justify-center relative mt-6'>
                    <Carousel opts={{
                        align: "start",
                        loop: true,
                    }} className=" md:w-[85%] xl:max-w-4xl 2xl:max-w-6xl lg:max-w-xl" >
                        <CarouselContent className=" -ml-1">
                            {dataIdImage.backdrops.map((item, index) => (

                                <CarouselItem key={index} className="  basis-1/7 lg:basis-1/3 md:basis-1/2 2xl:basis-1/4">

                                    <div key={index} className=" overflow-hidden relative md:order-1">
                                        <Image src={`https://image.tmdb.org/t/p/original${item.file_path}`}
                                            alt={item.file_path}
                                            width={200} height={200} style={{ width: "auto" }} priority draggable="false"
                                            className=" rounded-md  2xl:h-[210px] " />
                                    </div>

                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="md:hidden text-white" />
                        <CarouselNext className="md:hidden text-white" />
                    </Carousel>
                </div>

            </div>

        </div>

    )
}




export default async function DynamicDiscoverMovies({ params }) {
    const data = await getDiscoverMovies(params.title)
    const dataDiscover = data.results.filter(movie => params.title.toLowerCase().replace(/ /g, "_").replace(/[^\w-]+/g, "").replace(/--+/g, "_").replace(/\./g, "") === movie.title.toLowerCase().replace(/ /g, "_").replace(/[^\w-]+/g, "").replace(/--+/g, "_").replace(/\./g, ""))
    // console.log(dataDiscover);
    
    return (
        <main className=" w-full h-auto ">
            <div className=" h-auto">
                {dataDiscover.map(movie => (
                    <DetailsMovie key={movie.id} id={movie.id} />
                ))}

            </div>
        </main>
    )
}


