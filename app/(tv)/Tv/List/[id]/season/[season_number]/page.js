import {
    getDetailsSeasonCreditsTv,
    getDetailsSeasonTv,
    getSeasonExternalIdsTv,
    getSeasonImagesTv,
    grtTrailerSeason,
    urlImageTv
} from "@/app/libs/DataFetchingTv"
import Image from "next/image"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import ToggleButton from "@/app/(movies)/Components/ToggleButton/ToggleButton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import SeasonImage from "@/app/(tv)/Components/SeasonImage/SeasonImage"
import BlurIn from "@/components/ui/blur-in"
import Particles from "@/components/ui/particles"
import ExternalIdsSeason from "@/app/(tv)/Components/ExternalIdsSeason/ExternalIdsSeason"
import CreditSeasonTv from "@/app/(tv)/Components/CreditSeasonTv/CreditSeasonTv"
import Link from "next/link"
import { ChevronRight } from "lucide-react";
import no_image from "../../../../../../../public/image/no_image4.webp"
import TrailerSeason from "@/app/(tv)/Components/TrailerTV/TrailerSeason/TrailerSeason"
import broken_image from '../../../../../../../public/image/broken-image.png'

export async function generateMetadata({ params }) {
    const { season_number, id } = params
    const data = await getDetailsSeasonTv(id, season_number)
    return {
        title: data.name ? data.name : "Magix Movies",
    }
}





export default async function SeasonDetailTvSeries({ params }) {
    const { season_number, id } = params

    const seasonData = getDetailsSeasonTv(id, season_number)
    const imageSeason = getSeasonImagesTv(id, season_number)
    const dataExtIds = getSeasonExternalIdsTv(id, season_number)
    const seasonCredit = getDetailsSeasonCreditsTv(id, season_number)
    const dataTrailer = grtTrailerSeason(id, season_number)
    const [dataSeason, seasonImage, ExtSeason, dataCreditSeason, dataTrailerSeason] = await Promise.all([seasonData, imageSeason, dataExtIds, seasonCredit, dataTrailer])
    // console.log(dataSeason.guest_stars);
    
    const color = "#ffffff"

    return (
        <div className="w-full h-auto p-5 font-semibold">
            <Particles
                className="absolute inset-0"
                quantity={100}
                ease={80}
                color={color}
                refresh
            />
            <ToggleButton />
            <div className="flex justify-center items-center flex-col pt-2">
                <BlurIn
                    word={dataSeason.name ? dataSeason.name : <p className=" text-error">Unknown</p>}
                    className="mt-10 scroll-m-20  text-3xl font-bold tracking-tight transition-colors first:mt-0 bg-gradient-to-r from-[#2339b6] via-[#40ffc6] to-[#2339b6] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient"
                />
                <h1 className="scroll-m-20 text-xl italic text-slate-500 font-semibold tracking-tight">{dataSeason.air_date ? dataSeason.air_date : "Unknown"}</h1>
            </div>
                                    
                
            <div className=" flex justify-evenly  gap-2 mt-4   p-2 md:flex-col md:items-center">
                <div className=" lg:hidden  overflow-hidden relative">
                    <Image src={dataSeason.poster_path ? `${urlImageTv}${dataSeason.poster_path}` : no_image}
                        width={200}
                        height={200}
                        priority
                        alt={dataSeason.name}
                        style={{ width: "auto",height:"auto" }}
                        className=" rounded-md  "
                        />
                </div>

                <div className=" flex justify-center flex-col w-full gap-2">

                    <div className=" md:w-full  ">

                        <h1 className=" text-2xl font-bold text-[#1cccc3]  ">
                            Overview :
                        </h1>
                        <blockquote className=" mt-2 border-l-2 pl-6 italic text-wrap border-l-[#40ffc6] text-slate-300">
                            {dataSeason.overview ? dataSeason.overview : <p className=" text-error font-semibold">Unknown</p>}
                        </blockquote>
                    </div>



                    {/* Credit season */}
                    <div>
                        <CreditSeasonTv dataCreditSeason={dataCreditSeason} />
                    </div>
                    {/* Season images */}
                    <div className="">
                        <div className="text-2xl font-bold pb-2 text-[#1cccc3]">
                            <h1>
                                Season backdrops gallery :
                            </h1>
                        </div>
                        <SeasonImage seasonImage={seasonImage.posters} />
                    </div>
                    {/* External Ids season */}

                </div>

            </div>

            {/* Episodes details */}
            <div className="mt-4 scroll-m-20 text-3xl font-extrabold tracking-tight mb-3">
                <h1 className="bg-gradient-to-r from-[#2339b6] via-[#40ffc6] to-[#2339b6] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">Watch & Explore  <span className="bg-gradient-to-r from-[#40ffc6] via-[#2339b6] to-[#40ffc6] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">Episodes</span> </h1>
            </div>
            <div className=" flex justify-center ">

                <ScrollArea className="max-w-5xl whitespace-nowrap ">
                    <div className="flex gap-2 w-full">

                        {dataSeason.episodes.length === 0 ?
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    There is no episodes in this season.
                                </AlertDescription>
                            </Alert> :
                            dataSeason.episodes.map(episode => (

                                <Card key={episode.id} className=" hover:shadow-2xl hover:shadow-[#29cdc3] hover:duration-200 hover:border-[#1a7771]">
                                    <CardHeader>
                                        <div className="flex justify-center items-center font-bold text-xl underline decoration-cyan-500 text-zinc-500">

                                            {episode.name}
                                        </div>
                                        <CardTitle> Episode  {episode.episode_number}</CardTitle>
                                        <CardDescription>
                                            {episode.air_date}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className=" ">

                                        <div className=" relative overflow-hidden w-max">
                                            {episode.still_path ? (
                                                <Image src={`${urlImageTv}${episode.still_path}`}
                                                    width={250} height={200}
                                                    priority
                                                    draggable="false"
                                                    style={{ borderRadius: "2px", width: "auto" }}
                                                    className=" md:h-[100px] md:w-[180px] "
                                                    alt={episode.name} />

                                            ):(
                                                <Image src={broken_image}
                                                    width={100} height={100}
                                                    priority
                                                    draggable="false"
                                                    style={{ borderRadius: "2px",  }}
                                                    className=" xl:w-[150px] xl:h-[145px]"
                                                    placeholder="blur"
                                                    alt={episode.name} />
                                            )}
                                        </div>

                                    </CardContent>
                                    <CardFooter>


                                        <div className=" flex  justify-start items-center  hover:scale-105 hover:duration-300 md:active:shadow-md md:active:shadow-[#40ffc6] ">

                                            <Link className="bg-gradient-to-r from-[#40ffc6] via-[#9c40ff] to-[#40ffc6] bg-[length:200%_auto] bg-clip-text text-transparent " href={`/tv/list/${id}/season/${season_number}/episode/${episode.episode_number}`} >
                                                Explore Full Episode Details
                                            </Link>
                                            <ChevronRight className=" text-xl text-white ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                                        </div>


                                    </CardFooter>
                                </Card>

                            ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            <Separator className=" my-4" />
        </div>
    )
}