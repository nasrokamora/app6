import { getCriditsMovies, getImageMoviesId, getMoviesSimilar, getReviewsMovies, urlImage } from "@/app/libs/DataFetching"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { FaRankingStar } from "react-icons/fa6";
import { GiStarsStack } from "react-icons/gi";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { IoPlayCircleOutline } from "react-icons/io5";
import Link from "next/link"
import { TbExternalLink } from "react-icons/tb";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialog,
    AlertDialogFooter,
    AlertDialogCancel
} from "@/components/ui/alert-dialog"
import MoviesSimilar from "@/app/(movies)/Components/MoviesSimilar/MoviesSimilar"
import MoviesCredits from "@/app/(movies)/Components/MoviesCredits/MoviesCredits"
import ToggleButton from "@/app/(movies)/Components/ToggleButton/ToggleButton"
import no_image from '../../../../../public/image/no_image4.webp'

export async function generateMetadata({ params }) {
    const data = await getMoviesLoad(params.id)
    return {
        title: data.title,
    }
}

function ReviewContent({ review }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger >
                <p variant="outline" className="text-base text-white mt-3 rounded-lg p-4 border hover:border-l-orange-700 hover:duration-500 hover:border-r-red-800 after:border-l-amber-600 hover:border-b-red-800 hover:border-orange-700"> {review.content.slice(0, 10)} <span className=" bg-gradient-to-tr from-orange-600 to-red-800 text-transparent bg-clip-text ">read more... </span> </p>
            </AlertDialogTrigger>
            <AlertDialogContent className=" md:h-screen md:overflow-y-scroll max-w-4xl">
                <AlertDialogHeader>
                    <AlertDialogTitle > {review.created_at} </AlertDialogTitle>
                    <AlertDialogDescription>
                        {review.content}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export function ReviewsList({ dataReview }) {

    return (
        <div className=" w-full h-auto ">
            <div>
                <h1 className="md:text-slate-500 text-slate-600  mt-10 scroll-m-20 md:text-xl  text-3xl font-bold tracking-tight transition-colors first:mt-0 ">Reviews :</h1>
            </div>
            <div className=" flex justify-center pt-5  ">

                <ScrollArea className="  w-full  whitespace-nowrap  lg:w-3/4 xl:w-4/5">
                    <div className="flex w-max space-x-4 p-4">

                        {dataReview.results && dataReview.results.length > 0 ? (
                            dataReview.results.map((review) => (
                                <div key={review.author}>
                                    <div className="  border p-4 rounded-md border-[#ff1818]">
                                        <div className="flex items-center justify-start gap-2">
                                            <Avatar>
                                                <AvatarImage src={review.author_details.avatar_path} />
                                                <AvatarFallback>
                                                    {review.author.slice(0, 3)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <h1> {review.author} </h1>
                                        </div>
                                        <div className=" text-sm text-zinc-500 pt-2">
                                            <h3> Created at : {review.created_at}</h3>
                                            <h3> Updated at :{review.updated_at}</h3>
                                            <ReviewContent review={review} key={review.author} />
                                        </div>
                                    </div>
                                </div>
                            )))
                            : (
                                <div className="flex justify-center items-center font-bold text-xl text-error w-full">
                                    <h1>Unknown!</h1>
                                </div>
                            )}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    )

}




export function ImageList({ dataImageList }) {


    return (

        <ScrollArea className="w-full whitespace-nowrap rounded-md border md:w-2/3 lg:w-3/4 xl:w-4/5 transition-none">
            <div className="flex w-max space-x-4 p-4">
                {/* scroll image content */}
                {dataImageList.backdrops.map((data) => (
                    <div key={data.file_path} className=" rounded-md relative overflow-hidden " >
                        <Image src={data.file_path ?
                            `${urlImage}${data.file_path}`
                            :
                            no_image
                        }
                            width={250}
                            height={150}
                            className="  rounded-md  "
                            priority
                            style={{ width: "auto" }}
                            draggable={false}
                            alt={data.file_path}
                            loading="eager"
                        />
                    </div>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>

    )

}





async function getMoviesLoad(id) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_API_KEY}`)


    return res.json()
}


export default async function DynamicMoviesList({ params }) {
    const { id } = params
    const dataLoad = await getMoviesLoad(id)
    const similarData = await getMoviesSimilar(id)
    const dataImage = await getImageMoviesId(id)
    const reviewData = await getReviewsMovies(id)
    const dataCreditsId = await getCriditsMovies(id)
    const [data, similar, dataImageList, dataReview, credits] = await Promise.all([dataLoad, similarData, dataImage, reviewData, dataCreditsId])


    return (
        <div className="w-full h-auto p-5">
            <ToggleButton />
            <div className=" flex justify-between items-center pb-4" >
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl md:text-3xl  text-base-100 drop-shadow-[0_5px_10px_rgba(255,145,0,10.25)]">{data.original_title}</h1>
            </div>
            <div className=" mt-4 flex justify-start items-start gap-3 md:flex-col  ">
                <div className=" relative overflow-hidden w-full  flex flex-col justify-center items-center">

                    <Image src={`${urlImage}${data.poster_path}`}
                        width={300}
                        height={300}
                        className="rounded-md md:h-[250px] lg:h-[290px] xl:h-[350px] "
                        style={{ width: "auto" }}
                        priority alt={data.original_title} />

                    <div className=" pt-5 flex justify-center gap-3">
                        <Dialog>
                            <DialogTrigger><IoPlayCircleOutline size={48} className="text-[#f82525] hover:scale-110 duration-300" /></DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle></DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                        <div>
                            <Link target="_blank" rel="noopener noreferrer" href={data.homepage}>
                                <TbExternalLink size={45} className="text-[#f8e325] hover:scale-110 duration-300" />

                            </Link>
                        </div>
                    </div>
                </div>

                {/* section overview */}
                <div className="">
                    <h1 className=" text-slate-500  md:text-slate-500   mt-10 scroll-m-20 md:text-xl  text-3xl font-bold tracking-tight transition-colors first:mt-0">
                        Overview :

                    </h1>
                    <blockquote className="mt-6 border-l-2 border-l-red-700 md:border-l-white pl-6 font-semibold md:rounded-md md:bg-zinc-800">{data.overview}</blockquote>

                    <Separator className="mt-8" />

                    <div className="flex justify-start items-center gap-3 mt-5">
                        <h2 className=" text-slate-600 md:text-slate-500  scroll-m-20 md:text-lg  pb-2 text-2xl font-bold tracking-tight transition-colors first:mt-0">Release Date :</h2>
                        <h1 className=" text-gray-400 scroll-m-20 md:text-lg pb-2  text-2xl font-bold tracking-tight transition-colors first:mt-0">{data.release_date.replace(/-/g, "/")}</h1>
                    </div>

                    <Separator className="mt-4" />

                    {/* section genres  */}
                    <div className=" flex items-center gap-3 mt-3 flex-wrap">
                        <h2 className=" text-slate-600 md:text-[#a52727] mt-2 scroll-m-20 md:text-lg pb-2 text-2xl font-bold tracking-tight transition-colors first:mt-0"> Genres :</h2>
                        {data.genres.map((genre) => (
                            <div className=" pb-2" key={genre.id}>

                                <Badge variant={"destructive"} className={cn('font-bold text-[#ffebcd]  ')} >{genre.name}</Badge>
                            </div>
                        ))}


                        {/* section production countries  */}
                        <div className="flex items-center gap-3  flex-wrap">
                            <h2 className="text-slate-600 md:text-slate-500  mt-2 scroll-m-20 md:text-lg  pb-2 text-2xl font-bold tracking-tight transition-colors first:mt-2">Production countries :</h2>
                            {data.production_countries.map((country) => (
                                <div className="" key={country.iso_3166_1}>

                                    <Badge variant={"outline"} className={cn('font-bold bg-yellow-700 text-black ')} >{country.name}</Badge>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>

                        <Separator className="mt-4" />
                        {/* section popularity & vote average & vote count & status */}
                        <div className=" flex justify-start gap-5 md:justify-stretch items-center flex-wrap ">

                            <div className="mt-5 flex justify-start items-center gap-3  md:flex-wrap">
                                <h2 className="text-slate-600  md:text-slate-500 scroll-m-20 md:text-lg   text-2xl font-bold tracking-tight transition-colors first:mt-0text-slate-600">Popularity :</h2>
                                <h1 className=" text-yellow-500 flex  items-center gap-2 justify-start scroll-m-20 md:text-xl  text-2xl font-bold tracking-tight transition-colors first:mt-0">{data.popularity.toFixed(2)} <FaRankingStar size={28} className=" text-yellow-500" /></h1>
                            </div>
                            <div className="mt-5 flex justify-start items-center gap-3  md:flex-wrap">
                                <h2 className="text-slate-600 md:text-slate-500 scroll-m-20 md:text-lg   text-2xl font-bold tracking-tight transition-colors first:mt-0text-slate-600">Vote average :</h2>
                                <h1 className=" text-yellow-500 flex justify-start items-center gap-2  scroll-m-20 md:text-xl  text-2xl font-bold tracking-tight transition-colors first:mt-0">{data.vote_average}<GiStarsStack size={28} className=" text-yellow-500" /></h1>
                            </div>
                        </div>
                        <div className="mt-5 flex justify-start items-center gap-3  md:flex-wrap lg:flex-wrap">
                            <h2 className="text-slate-600 md:text-slate-500 scroll-m-20 md:text-lg   text-2xl font-bold tracking-tight transition-colors first:mt-0text-slate-600">Status :</h2>
                            <h1 className={` text-success flex justify-start items-center gap-2  scroll-m-20 md:text-xl  text-2xl font-bold tracking-tight transition-colors first:mt-0" ${data.status ? "text-blue-500" : "text-red-800"}`}> {data.status}</h1>
                            <h2 className="text-slate-600 md:text-slate-500 scroll-m-20 md:text-lg   text-2xl font-bold tracking-tight transition-colors first:mt-0">Original Language :</h2>
                            <h1 className="scroll-m-20 md:text-xl  text-2xl font-bold tracking-tight transition-colors first:mt-0 text-yellow-700">{data.original_language}</h1>
                        </div>
                    </div>

                    <Separator className="mt-4" />
                </div>
            </div>
            {/* section images scroll */}
            <div className=" mt-5 flex justify-center items-center">

                <ImageList dataImageList={dataImageList} />
            </div>

            {/* section reviews of movies */}
            <div className="mt-5">
                <ReviewsList dataReview={dataReview} />
            </div>

            {/* section Cast of movies */}
            <div>
                <MoviesCredits credits={credits} />
            </div>

            <Separator className="my-4" />

            <div>
                <MoviesSimilar similar={similar} />
            </div>

        </div>
    )
}