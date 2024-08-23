
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

export default async function MoviesCredits({ credits }) {
    const dataCredit = credits.cast
    // console.log(dataCredit)
    return (
        <div className=" h-auto w-full">
            <div>
                <h1 className="md:text-slate-500 text-orange-600  mt-10 scroll-m-20 md:text-xl  text-3xl font-bold tracking-tight transition-colors first:mt-0">Cast :</h1>
            </div>
            <div className=" flex justify-center items-center text-white pt-5">

            <Carousel className="w-full max-w-xs xl:max-w-4xl lg:max-w-[40rem]" opts={{ loop: true, align: "start" }}>
                <CarouselContent>
                    
                    {dataCredit && dataCredit.length > 0 ? (dataCredit.map((item) => (
                        <CarouselItem className="md:basis-1/1 lg:basis-1/3 xl:basis-1/3 2xl:basis-1/4" key={item.id}>
                            <div>
                                <Card className=" xl:aspect-[3/2]  bg-transparent overflow-hidden ">
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
                                        <CreditsId credit_id={item?.credit_id} />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))):(
                        <h1>No Data</h1>
                    )}
                </CarouselContent>
                <CarouselPrevious className="md:hidden" />
                <CarouselNext className="md:hidden" />
            </Carousel>
            </div>
        </div>
    )
}