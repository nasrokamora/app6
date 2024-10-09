
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import no_image from "../../../public/image/no_image4.webp"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { getPersonPopular, urlImage } from "@/app/libs/DataFetching"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default async function PersonsPopular() {
    // console.log(dataPersonPopular);
    // dataPersonPopular.filter()
    const dataPerson = await getPersonPopular()
    const dataPersonPopular = dataPerson.results

    return (
        <div className="  flex justify-center items-center w-full h-auto mt-5">


            <ScrollArea className='max-w-6xl whitespace-nowrap rounded-md border' >
                <Carousel className=" w-full  max-w-5xl md:max-w-lg 2xl:max-w-full"
                    opts={{ loop: true, align: "start", }}
                >
                    <CarouselContent className="-ml-1">

                        <div className='w-full p-4 flex gap-2 items-center justify-center'>
                            {dataPersonPopular && dataPersonPopular.length > 0 ? (
                                dataPersonPopular.map((person) => (
                                    <CarouselItem key={person.id} className=" basis-1/6 md:basis-1/2 lg:basis-1/5">
                                        <Link href={`/Movies/Person/${person.id}`}>
                                            <Card className=" flex flex-col justify-center w-full">
                                                <CardContent className="">

                                                    <div className="">
                                                        <Image src={`${urlImage}${person.profile_path}`}
                                                            alt={person.name}
                                                            width={300}
                                                            height={200}
                                                            // priority={true}
                                                            className="rounded-md"
                                                            style={{ height: 'auto' }}
                                                        />
                                                    </div>

                                                    <h2>
                                                        {person.name ? person.name.length > 8 ? person.name.slice(0, 8) + "..." : person.name : "No name"}
                                                    </h2>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </CarouselItem>










                                ))
                            ) : (
                                <Alert variant="destructive" className=" bg-black/30 backdrop-blur">
                                    <AlertCircle className="w-4 h-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>
                                        Something went wrong.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                    </CarouselContent>
                </Carousel>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}