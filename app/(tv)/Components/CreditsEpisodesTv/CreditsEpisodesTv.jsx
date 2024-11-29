import Image from "next/image"
import broken_Image from '../../../../public/image/broken-image.png'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { urlImageTv } from "@/app/libs/DataFetchingTv"
import { Separator } from "@/components/ui/separator"
import { BsStars } from "react-icons/bs";
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const CreditsEpisodesTvGuestStars = ({ creditsEpisodes }) => {
    return (
        <div className="w-full md:mb-4  mt-4">
            <div className=" flex gap-1 items-center justify-start">
                <h1 className="mt-10 scroll-m-20  text-2xl font-bold tracking-tight transition-colors first:mt-0 text-color-5">Guest Stars </h1>
                <BsStars className="text-color-5" />
            </div>
            <div>
                <ScrollArea className=" w-full whitespace-nowrap  mt-2">
                    <div className="flex w-max space-x-4 p-4">
                        {creditsEpisodes && creditsEpisodes.guest_stars && creditsEpisodes.guest_stars.length > 0 ? (
                            creditsEpisodes.guest_stars.map((item, index) => (
                                <Card key={item.id}>
                                    <CardHeader>
                                        <CardTitle>{item.name}</CardTitle>
                                        <CardDescription className=" font-semibold">Known for department: {item.known_for_department}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="relative overflow-hidden flex justify-center items-center md:justify-start md:items-start">
                                            {item.profile_path ? (
                                                <Image src={
                                                    `${urlImageTv}${item.profile_path}`}
                                                    alt={item.name}
                                                    width={100}
                                                    height={100}
                                                    className="rounded-md"
                                                    draggable="false"
                                                    loading="eager"
                                                    priority
                                                    style={{ width: "auto" }}
                                                />
                                            ) : (
                                                <div className="relative overflow-hidden">
                                                    <Image src={broken_Image}
                                                        alt={'borken image'}
                                                        width={150}
                                                        height={150}
                                                        className="rounded-md"
                                                        draggable="false" loading="eager" priority />
                                                </div>
                                            )
                                            }

                                        </div>
                                        <p className="mt-2 font-bold mb-4">Character: {item.character}</p>
                                        <Link className={buttonVariants({ variant: "outline" })} href={`/person/${item.id}`}>More Details</Link>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (

                            <Alert variant="destructive" className=" ml-4 ">
                            <AlertCircle className="h-6 w-6" />
                            <AlertTitle className=" text-xl">Oops!</AlertTitle>
                            <AlertDescription className=" text-lg font-bold">
                            We couldn’t find any guest star details.
                            </AlertDescription>
                          </Alert>
                        )
                        }
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    )
}



export default function CreditsEpisodesTv({ creditsEpisodes }) {
    return (
        <div className=" w-full mt-4 flex  justify-start flex-col items-start ">
            {/* cast */}
            <div className=" md:mb-4 w-full">
                <h1 className="mt-10 scroll-m-20  text-2xl font-bold tracking-tight transition-colors first:mt-0 text-color-5">Cast  </h1>
                <ScrollArea className=" mw-full whitespace-nowrap mt-2 ">
                    <div className="flex w-max space-x-4 p-4">
                        {creditsEpisodes && creditsEpisodes.cast && creditsEpisodes.cast.length > 0 ? (
                            creditsEpisodes.cast.map((cast, index) => (
                                <Card key={cast.id}>
                                    <CardHeader>
                                        <CardTitle>{cast.name}</CardTitle>
                                        <CardDescription className=" font-semibold">Known for department: {cast.known_for_department}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="relative overflow-hidden flex justify-center items-center md:justify-start md:items-start">
                                            {cast.profile_path ? (
                                                <Image src={
                                                    `${urlImageTv}${cast.profile_path}`}
                                                    alt={cast.name}
                                                    width={100}
                                                    height={100}
                                                    className="rounded-md"
                                                    draggable="false"
                                                    loading="eager"
                                                    priority
                                                    style={{ width: "auto" }}
                                                />
                                            ) : (
                                                <div className="relative overflow-hidden">
                                                    <Image src={broken_Image}
                                                        alt={'borken image'}
                                                        width={150}
                                                        height={150}
                                                        className="rounded-md"
                                                        draggable="false" loading="eager" priority />
                                                </div>
                                            )
                                            }

                                        </div>
                                        <p className="mt-2 font-bold text-yellow-500 mb-4"> <span className="text-slate-600">Character: </span> {cast.character}</p>
                                        <Link className={buttonVariants({ variant: "outline" })} href={`/person/${cast.id}`}>More Details</Link>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (

                            <Alert variant="destructive" className=" ml-4  border-none">
                            <AlertCircle className="h-6 w-6" />
                            <AlertTitle className=" text-xl">Oops!</AlertTitle>
                            <AlertDescription className=" text-lg font-bold">
                            No cast details available right now. Please check back later.
                            </AlertDescription>
                          </Alert>
  
                        )
                        }
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            <Separator className=" my-4 bg-[#a0ff58]" />

            {/* guest stars */}
            <CreditsEpisodesTvGuestStars creditsEpisodes={creditsEpisodes} />
        </div>
    )
}