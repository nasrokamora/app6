import { getDetailsSeasonTv, urlImageTv500 } from "@/app/libs/DataFetchingTv"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Image from "next/image"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { EclipseIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"






export default async function DetailsSeasonNumber({ season_number, id }) {
    const dataSeason = await getDetailsSeasonTv(id, season_number)
    // console.log(dataSeason)
    return (
        <div className="w-full">
            <div className='pb-5'>
                <h1>Episodes</h1>
            </div>
            <ScrollArea className="max-w-5xl xl:max-w-4xl whitespace-nowrap">

                <div className=" flex justify-start items-start  gap-2">
                    {dataSeason.episodes.map((episode, index) => (
                        <div key={episode.id} className="flex justify-normal items-center">
                            <Card className="">
                                <CardHeader>
                                    <CardTitle>{episode.name}</CardTitle>
                                    <CardDescription>{episode.air_date}</CardDescription>
                                </CardHeader>

                                <CardContent className=" h-[45rem] overflow-hidden">
                                    <div className=" relative overflow-hidden">
                                        <Image
                                            src={`${urlImageTv500}/${episode.still_path}`}
                                            width={250}
                                            height={150}
                                            priority
                                            className=" rounded-md"
                                            alt={episode.name ? episode.name : "Undefined"} />
                                    </div>
                                    <div className="  ">
                                        <div>
                                            <h1 className="font-bold text-2xl  text-[#f58c2a]">
                                                Crew :
                                            </h1>
                                        </div>
                                        

                                        <div className="grid grid-cols-2  gap-2 border rounded-md p-2 w-fit">
                                            {episode.crew.length > 0 ? (
                                                episode.crew.map((crew,index) => (
                                                    <div key={crew.id = index} className="">
                                                        <Avatar className="w-14 h-14">
                                                            <AvatarImage src={`${urlImageTv500}/${crew.profile_path}`} />
                                                            <AvatarFallback> {crew.name.slice(0,3)} </AvatarFallback>
                                                        </Avatar>

                                                        <div className="">
                                                            <h3 className="scroll-m-20 font-semibold text-zinc-500 ">
                                                                {crew.job} : <span className=" text-[#2b84e9]">
                                                                    {crew.name}
                                                                </span>
                                                            </h3>
                                                        </div>
                                                        <div>

                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div>
                                                    <p>No crew members found for this episode.</p>
                                                </div>
                                            )}

                                        </div>
                                        

                                        <div className="pb-4">
                                            <h1 className="font-bold text-2xl  text-[#782af5]">
                                            Guest stars :
                                            </h1>
                                        </div>
                                            <ScrollArea className="h-96 w-[35rem]">

                                        <div className=" grid grid-cols-2   gap-2">
                                            {episode.guest_stars.length > 0 ? (
                                                episode.guest_stars.map((start) => (
                                                    <div key={start.id} className=" text-wrap border rounded-md p-2">
                                                        <Avatar className="w-14 h-14">
                                                            <AvatarImage src={`${urlImageTv500}/${start.profile_path}`} />
                                                            <AvatarFallback></AvatarFallback>
                                                        </Avatar>

                                                        <div className="">
                                                            <h3 className="scroll-m-20 font-semibold text-zinc-500 "> 
                                                              character : {start.character}  
                                                                <span className=" text-[#2b84e9]">/
                                                                    {start.name}
                                                                </span>
                                                            </h3>
                                                        </div>
                                                        <div>

                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div>
                                                    <p>No crew members found for this episode.</p>
                                                </div>
                                            )}

                                        </div>
                                            </ScrollArea>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
                <div>

                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}