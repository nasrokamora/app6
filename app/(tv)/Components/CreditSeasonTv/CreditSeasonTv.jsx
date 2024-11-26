import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { urlImageTv } from "@/app/libs/DataFetchingTv";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function CreditSeasonTv({ dataCreditSeason }) {
    return (
        <div className=" w-full border-l-2 border-[#1cccc3] pl-2">
            <div className="text-2xl font-bold pb-2 text-[#1cccc3]">
                <h1>Season Credit Details :</h1>
            </div>
            <div className="text-[#1977cd] font-bold text-xl pb-2">
                <h1>Cast :</h1>
            </div>
            <ScrollArea className="max-w-4xl whitespace-nowrap ">

                <div className="flex w-max gap-2 ">
                    {dataCreditSeason.cast && dataCreditSeason.cast.length > 0 ? (
                        dataCreditSeason.cast.map((cast) => (
                            <Card key={cast.id} className="">
                                <CardHeader>
                                    <div className="flex gap-2 items-center justify-start">

                                        <Avatar>
                                            <AvatarImage src={`${urlImageTv}${cast.profile_path}`} alt={cast.name} />
                                            <AvatarFallback> {cast.name.slice(0, 3)} </AvatarFallback>
                                        </Avatar>
                                        <CardTitle> {cast.name? cast.name : "Unknown"} </CardTitle>
                                    </div>
                                    <CardDescription> Character : {cast.character} </CardDescription>
                                    <CardContent>
                                        <Link href={`/Person/${cast.id}`}  className={buttonVariants({ variant: "outline",className:cn("text-[#2ce2c6]" )})}>
                                        See More
                                        </Link>
                                    </CardContent>
                                </CardHeader>
                            </Card>
                        ))
                    ) : (
                        <Alert variant="destructive" className=" ml-4 ">
                        <AlertCircle className="h-6 w-6" />
                        <AlertTitle className=" text-xl">Oops!</AlertTitle>
                        <AlertDescription className=" text-lg font-bold">
                        No cast details available right now. Please check back later.
                        </AlertDescription>
                      </Alert>
                    )}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>

                    {/* Crew */}
                <div className="text-[#1977cd] font-bold text-xl pb-2 mt-4">
                <h1>Crew :</h1>
            </div>
                <ScrollArea className="max-w-4xl whitespace-nowrap ">
                    <div className="flex w-max gap-2 ">

                    {dataCreditSeason.crew && dataCreditSeason.crew.length > 0 ? (
                        dataCreditSeason.crew.map((crew) => (
                            <Card key={crew.id}>
                                <CardHeader>
                                <div className="flex gap-2 items-center justify-start">

                                <Avatar>
                                    <AvatarImage src={`${urlImageTv}${crew.profile_path}`} alt={crew.name? crew.name : "Unknown"} />
                                    <AvatarFallback> {crew.name.slice(0, 3)} </AvatarFallback>
                                </Avatar>
                                <CardTitle> {crew.name} </CardTitle>
                                </div>
                                <CardDescription> Known For Department : {crew.known_for_department} </CardDescription>
                                </CardHeader>
                                <CardContent>
                                <CardDescription> Job : {crew.job} </CardDescription>
                                <Link href={`/Person/${crew.id}`}  className={buttonVariants({ variant: "outline",className:cn("border-none mt-1 text-[#2ce2c6]" )})}>
                                See More
                                </Link>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                          No Crew Found.
                        </AlertDescription>
                      </Alert>
                    )}
                    </div>
                    <ScrollBar orientation="horizontal" />
                    </ScrollArea>
        </div>
    )
}