import ToggleUp from "@/app/Components/ToggleUp/ToggleUp";
import { getDetailsTv, getGenreTv, getGenreTvList, getVideosTv, urlImageTv } from "@/app/libs/DataFetchingTv";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { BiSolidUpvote, BiUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { RiStarSFill } from "react-icons/ri";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import CarouselAuto from "@/app/(tv)/Components/DiscoverTv/CarouselAuto";
import no_image from "../../../../../public/image/no_image4.webp"
import ReactPlayer from "react-player";
import { YouTubeEmbed } from "@next/third-parties/google";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import BackGroundTvGenres from "@/app/(tv)/Components/BackGroundTvGenres/BackGroundTvGenres";


export const metadata = {
    title: 'Magix Movies | TV Genres',
    description: 'Explore a variety of TV genres and find your favorite shows.',
}



export const dynamic = 'force-dynamic'
// const ImageCover = ({ item }) => {
//     return (
//         <div className="  h-[70vh] bg-bottom relative z-0 md:blur-left">
//             <Image src={item.backdrop_path ?
//                 `${urlImageTv}${item.backdrop_path}` : no_image}
//                 fill
//                 priority={true}
//                 style={{ objectFit: "cover" }}
//                 className="blur-right"
//                 loading="eager"
//                 draggable={false}
//                 alt={item.name} />

//         </div>
//     )
// }

export default async function GenrePageTv({ params }) {
    const { id } = params
    const genreData = getGenreTv(id)

    const trailer = getGenreTvList(id)
    const [resultsGenre, trailerData] = await Promise.all([genreData, trailer])
    const resultsGenreTv = resultsGenre.results 
    return (
        <div className="h-screen w-full">
            <BackGroundTvGenres resultTvGenres={resultsGenreTv} />
            <ToggleUp />

        </div>
    );
}

async function DetailsTvGenre({ id }) {
    const data = await getVideosTv(id)
    const dataTrailer = data.results.slice(0, 1)
    // console.log(dataTrailer);

    return (
        <div className="">
            <div>
                <h1>TV Show Trailer</h1>
            </div>
            {dataTrailer &&
                dataTrailer.length > 0 ? (
                dataTrailer.map((item) => (
                    <div className="relative md:w-1/2 w-full lg:w-1/2" key={item.id}>
                        <div>
                            <h1>{item.name}</h1>
                        </div>
                        <HeroVideoDialog
                            animationStyle="from-center"
                            className="dark:hidden block "
                            videoSrc={`https://www.youtube.com/embed/${item.key}`}
                            thumbnailSrc={`https://img.youtube.com/vi/${item.key}/0.jpg`}
                            thumbnailAlt={item.name}
                        />

                    </div>
                ))
            ) : (
                <div> no found</div>
            )}
        </div>
    )
}


