
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
import { urlImage } from "@/app/libs/DataFetching"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function PopularPerson({ dataPersonPopular }) {
    // console.log(dataPersonPopular);
    // dataPersonPopular.filter()

    return (
        <div className="  flex justify-center items-center w-full h-auto mt-5">


            <ScrollArea className='max-w-6xl whitespace-nowrap rounded-md border' >
                <div className='w-full p-4 flex gap-2 items-center justify-center'>
                    {dataPersonPopular && dataPersonPopular.length > 0 ? (
                        dataPersonPopular.map((person) => (
                            <div key={person.id} className=" flex justify-center items-center w-full">
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
                                            style={{height:'auto'}}
                                            />
                                        </div>

                                <h2>
                                    {person.name? person.name.length > 8 ? person.name.slice(0, 8) + "..." : person.name : "No name"}
                                </h2>
                                            </CardContent>
                                    </Card>
                                </Link>
                            </div>










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
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}