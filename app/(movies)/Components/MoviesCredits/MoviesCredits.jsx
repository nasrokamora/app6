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
    CardFooter,
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
import { getCreditsId } from "@/app/libs/DataFetching"

export default async function MoviesCredits({ credits }) {
    const dataCredit = credits.cast
    // console.log(dataCredit);
    
    return (
        <div className=" h-auto w-full">
            <div>
                <h1 className="md:text-slate-500 text-orange-600  mt-10 scroll-m-20 md:text-xl  text-3xl font-bold tracking-tight transition-colors first:mt-0">Cast :</h1>
            </div>
            <div className=" flex justify-center items-center text-white pt-5">

                <Carousel className="w-full md:max-w-sm max-w-5xl 2xl:max-w-full" opts={{ loop: true, align: "start" }}>
                    <CarouselContent className="-ml-1">

                        {dataCredit && dataCredit.length > 0 ? (
                            dataCredit.map((item) => (
                            // const result = await getCreditsId(item.credit_id)
                            //     if(result.error){
                            //         return (
                            //             <CarouselItem className="md:basis-1/1 lg:basis-1/3 xl:basis-1/3 2xl:basis-1/4" key={item.id}>
                            //             <div className="text-red-500">
                            //                 Unable to load credit data for {item.credit_id}: {result.message}
                            //             </div>
                            //         </CarouselItem>
                            //         )
                            //     }
                                <CarouselItem className="md:basis-1/1 lg:basis-1/3 xl:basis-1/3 2xl:basis-1/4" key={item.id}>
                                    <div>
                                        <Card className=" xl:aspect-[3/2]  bg-transparent overflow-hidden aspect-auto">
                                            <CardHeader >
                                                <CardTitle className=" flex justify-between items-center md:flex-wrap md:py-3">
                                                    {item.name}
                                                    <div className="md:pt-4">
                                                        <Avatar className=" h-15 w-15 ">
                                                            <AvatarImage src={`https://image.tmdb.org/t/p/original${item.profile_path}`} className=" size-12" />
                                                            <AvatarFallback>
                                                                {item.name.slice(0, 3)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    </div>

                                                </CardTitle>

                                                <CardDescription className="">
                                                    <strong>Character</strong>  {item.character}
                                                </CardDescription>

                                            </CardHeader>
                                            <CardContent>
                                                <CreditsId credit_id={item.credit_id } />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            )))  : (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
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