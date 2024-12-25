import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import CreditsId from "./CreditsId"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"


export default async function MoviesCredits({ credits }) {
    const dataCredit = credits.cast
    // console.log(dataCredit);

    return (
        <div className=" h-auto w-full mt-6 ">
            <div className=" relative">
                <h1 className="md:text-slate-500 text-orange-600  mt-10 scroll-m-20 underline decoration-slate-600  text-3xl font-bold tracking-tight transition-colors first:mt-0">Cast :</h1>
            </div>
            <div className=" flex justify-center items-center text-white pt-5 ">

                <Carousel className="w-full md:max-w-sm max-w-5xl 2xl:max-w-full " opts={{ loop: true, align: "start" }}>
                    <CarouselContent className="-ml-1 ">

                        {dataCredit && dataCredit.length > 0 ? (
                            dataCredit.map((item) => (
                                <CarouselItem className="md:basis-1/1 lg:basis-1/3 xl:basis-1/3 2xl:basis-1/4 " key={item.credit_id}>
                                    <div>
                                        <Card className=" xl:aspect-[3/2]  shadow-md  overflow-hidden aspect-auto border-r bg-black/30 backdrop-blur">
                                            <CardHeader >
                                                <CardTitle className=" flex justify-between items-center md:flex-wrap md:py-3">
                                                    {item.name}
                                                    <div className="md:pt-4">
                                                        <Avatar className=" h-15 w-15 ">
                                                            <AvatarImage src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                                                                className=" size-12" />
                                                            <AvatarFallback>
                                                                {item.name.slice(0, 3)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    </div>

                                                </CardTitle>

                                                <CardDescription className=" flex justify-start items-center gap-2 flex-wrap">
                                                    <strong className=" text-amber-500">Character :</strong>
                                                    <span className=" text-slate-300">
                                                        {item.character}
                                                    </span>
                                                </CardDescription>

                                            </CardHeader>
                                            <CardContent className=" flex justify-between ">
                                                <CreditsId credit_id={item.credit_id} />
                                                <Link href={`/person/${item.id}`} className=" border border-zinc-600 px-3 bg-black text-white font-semibold hover:duration-500 hover:bg-zinc-700 rounded-md">
                                                    More...
                                                </Link>

                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))) : (
                            <Alert variant="destructive" className=" bg-black  ">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Oops !</AlertTitle>
                                <AlertDescription className=" xl:text-xl 2xl:text-2xl">
                                    There are no cast in this movie.
                                </AlertDescription>
                            </Alert>
                        )}
                    </CarouselContent>
                    <div className=" absolute top-[-2rem] left-[93%] md:left-[85%]">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}