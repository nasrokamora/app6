import ToggleButton from "@/app/(movies)/Components/ToggleButton/ToggleButton";
import { getDetailsEpisodesTv, getEpisodesCreditsTv, getEpisodesImagesTv, getTrailerEpisodesTv, urlImageTv } from "@/app/libs/DataFetchingTv"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import Image from "next/image"
import Particles from "@/components/ui/particles";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { AlertCircle } from "lucide-react"
import CreditsEpisodesTv from "@/app/(tv)/Components/CreditsEpisodesTv/CreditsEpisodesTv";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator"
import TrailerEpisodes from "@/app/(tv)/Components/TrailerTV/TrailerEpisodes/TrailerEpisodes";


export async function generateMetadata({ params }) {
    const { season_number, episode_number, id } = params
    const data = await getDetailsEpisodesTv(id, season_number, episode_number)
    return {
        title: data.name ? data.name : "Magix Movies",
    }
}





export default async function EpisodeDetailsTv({ params }) {
    const { season_number, episode_number, id } = params
    const dataEpisodes = getDetailsEpisodesTv(id, season_number, episode_number)
    const imageEpisodes = getEpisodesImagesTv(id, season_number, episode_number)
    const dataCreditsEpisodes = getEpisodesCreditsTv(id, season_number, episode_number)
    const dataTrailerepisodes = getTrailerEpisodesTv(id, season_number, episode_number)
    const [data, episodeImage, creditsEpisodes, trailerEpisodes] = await Promise.all([dataEpisodes, imageEpisodes, dataCreditsEpisodes, dataTrailerepisodes])
    // console.log(data);
    const color = "#fffc40"

    return (
        <div className="w-full h-auto p-5">
            <ToggleButton />
            <Particles
                className="absolute inset-0 top-10 h-screen "
                quantity={100}
                ease={80}
                color={color}
                refresh
            />
            <div className="flex justify-center items-center font-bold text-3xl flex-col mb-4 ">
                <h1 className="mt-10 scroll-m-20  text-3xl font-bold tracking-tight transition-colors first:mt-0 bg-gradient-to-r from-[#a0ff58] via-[#fffc40] to-[#a0ff58] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">{data.name}</h1>
                <h2 className=" bg-gradient-to-r from-[#494949] via-[#fffc40] to-[#494949] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient"> {data.air_date ?? <span className="font-semibold text-error">Unknown</span>} </h2>
                <h3 className=" text-lg text-slate-700"><span>Season</span> {data.season_number ?? <span className="font-semibold  text-error">Undefined</span>}</h3>
                <h4 className=" text-lg text-slate-700"><span>Runtime :</span> {data.runtime ?? <span className="font-semibold text-error"> Undefined </span>} min </h4>
                <div className="flex justify-center items-center">

            {/* Tailer */}
            <TrailerEpisodes trailerEpisodes={trailerEpisodes.results} />
                </div>
            </div>
            <div>
                <div>
                    <h1 className="mt-10 scroll-m-20 text-color-5 text-2xl font-bold tracking-tight transition-colors first:mt-0">Overview :</h1>
                    <blockquote className="font-semibold border-l-2 pl-6 italic border-l-color-5 ">
                        {data.overview ?? <h1 className=" text-red-700">No overview available.</h1>}
                    </blockquote>
                </div>
                <div className="mt-4">
                    <h1 className="mt-10 scroll-m-20  text-2xl font-bold tracking-tight transition-colors first:mt-0 text-color-5">Production Team</h1>
                </div>
                <div className="mt-2 flex justify-center items-center">
                    <ScrollArea className="w-full xl:max-w-5xl  whitespace-nowrap">
                        <div className=" flex w-max space-x-4 p-4 justify-center items-center">
                            {data.crew && data.crew.length > 0 ? (
                                data.crew.map((item) => (
                                    <Card className=" relative group  overflow-hidden " key={item.id}>
                                        <CardHeader className=" flex flex-col items-center justify-center">
                                            <Avatar className="h-[4rem] w-[4rem]">
                                                <AvatarImage src={`${urlImageTv}${item.profile_path}`} alt={item.name ?? <span className=" text-error">Undefined</span>} />
                                                <AvatarFallback> {item.name.slice(0, 3)} </AvatarFallback>
                                            </Avatar>
                                            <CardTitle> {item.name ?? <p className=" text-error">Undefined</p>} </CardTitle>
                                            <CardDescription>Department : {item.department ?? "Unknown"}</CardDescription>
                                        </CardHeader>
                                        <CardContent className=" flex justify-start gap-2 items-start ">
                                            {/* info Crew */}
                                            <div className=" flex flex-col gap-2 justify-start items-start">

                                                <div className=" text-wrap  flex gap-1 justify-center items-center font-semibold">
                                                    <h1 className=" font-bold ">Job : </h1>
                                                    <h2 className="text-orange-600 ">{item.job ?? "Unknown"}</h2>
                                                </div>
                                                <div className=" flex justify-center items-center flex-wrap gap-2 font-semibold">
                                                    <h1 className=" font-bold">Known for department :</h1>
                                                    <h2 className="text-orange-500"> {item.known_for_department ?? "Unknown"} </h2>
                                                </div>

                                                <div className="lg:hidden xl:hidden 2xl:hidden border p-1 rounded-md font-bold active:scale-110 active:bg-zinc-500 active:duration-500">
                                                    <Link href={`/person/${item.id}`}>See more</Link>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <div className="md:hidden  transition-transform duration-300 hover:scale-105 hover:shadow-lg ">
                                            <Link href={`/person/${item.id}`} className=' font-bold absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/30 backdrop-blur border p-1 text-[#a0ff58] rounded-md transition-all duration-300 group-hover:bottom-3 group-hover:opacity-100 opacity-0'>
                                                See more
                                            </Link>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <Alert variant="destructive" className=" ml-4  border-none">
                                <AlertCircle className="h-6 w-6" />
                                <AlertTitle className=" text-xl">Oops!</AlertTitle>
                                <AlertDescription className=" text-lg font-bold">
                                No crew details found, Please check back later.
                                </AlertDescription>
                              </Alert>
                            )
                            }


                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
                <Separator className="my-4 bg-[#a0ff58] " />

                {/* cast and crew Credits episode  */}
                <div>
                    <CreditsEpisodesTv creditsEpisodes={creditsEpisodes} />
                </div>
            </div>
        </div>
    )
}