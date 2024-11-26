
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
import { FaRegStar } from "react-icons/fa"
export default function PopularPerson({ dataPersonPopular }) {

    return (
        <div className="  flex justify-center items-center w-full h-auto mt-7 md:mt-12">
            <Carousel className='w-full max-w-5xl md:max-w-sm 2xl:max-w-full' opts={{ loop: true, align: 'start' }} >
                <CarouselContent className='-ml-1'>
                    {dataPersonPopular && dataPersonPopular.length > 0 ? (
                        dataPersonPopular.map((person) => (
                            <CarouselItem key={person.id} className="md:basis-1/2 basis-1/6 lg:basis-1/6 2xl:basis-1/6">
                                <Card className=" flex flex-col justify-center w-full font-bold border-none md:mt-6">
                                    <Link href={`/Person/${person.id}`} className="hover:scale-90 hover:duration-500 md:active:scale-90">
                                        <div className=" relative overflow-hidden">
                                            <Image src={person.profile_path ? `${urlImage}${person.profile_path}` : no_image}
                                                alt={person.name? person.name : "No name"}
                                                width={150}
                                                height={150}
                                                priority={true}
                                                className="rounded-md"
                                                style={{ width: 'auto' }}
                                            />
                                        </div>
                                        <h2 className="pt-2 mb-1 ">
                                            {person.name ? person.name.length > 12 ? person.name.slice(0, 12) + "..." : person.name : "No name"}
                                        </h2>
                                        <div className="flex items-center justify-between w-full">
                                            <p className=" font-semibold 2xl:text-xl">{person.known_for_department}</p>
                                            <div className="flex items-center justify-between space-x-1 2xl:text-xl">
                                                <FaRegStar className="text-[#003cff]" />
                                                <span className="">
                                                    {person.popularity.toFixed(1)}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </Card>
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
                </CarouselContent>
                <div className=" absolute top-[-2rem] left-[93%] md:left-[82%] md:top-[-1rem]">
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </Carousel>
        </div>
    )
}