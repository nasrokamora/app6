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
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card } from "@/components/ui/card"
import { FaRegStar } from "react-icons/fa"
import CarouselPerson from "./CarouselPerson"
import ImagePosterPath from "@/app/libs/ImagePosterPath"
export default function PopularPerson({ dataPersonPopular }) {

    return (
        <div className="  flex justify-center items-center w-full h-auto mt-7 md:mt-12">
            <CarouselPerson>
                <CarouselContent className='-ml-1'>
                    {dataPersonPopular && dataPersonPopular.length > 0 ? (
                        dataPersonPopular.slice(0, 9).map((person) => (
                            <CarouselItem key={person.id} className="md:basis-1/2 basis-1/6 lg:basis-1/6 2xl:basis-1/6">
                                <Card className=" flex flex-col justify-center w-full font-bold border-none md:mt-6">
                                    <Link href={`/person/${person.id}`} className="hover:scale-90 hover:duration-500 md:active:scale-90">
                                        <div className=" relative overflow-hidden">
                                            {person.profile_path.length > 0 ? (
                                                <ImagePosterPath
                                                    width={150}
                                                    height={150}
                                                    index={person.id}
                                                    tmdbPath={person.profile_path}
                                                    style={{ width: 'auto', borderRadius: '4px' }}
                                                    quality={75}
                                                    alt={person.name ? person.name : "Unknown"}
                                                    unoptimized

                                                />
                                            ) : (
                                                <Image
                                                    src={no_image}
                                                    width={150}
                                                    height={150}
                                                    quality={75}
                                                    unoptimized={false}
                                                    priority
                                                    draggable={false}
                                                    alt="no image"
                                                />
                                            )}
                                        </div>
                                        <h2 className="pt-2 mb-1 ">
                                            {person.name ? person.name.length > 12 ? person.name.slice(0, 12) + "..." : person.name : "No name"}
                                        </h2>
                                        <div className="flex items-center justify-between w-full">
                                            <p className=" font-semibold 2xl:text-xl text-[#ff007c]">{person.known_for_department}</p>
                                            <div className="flex items-center justify-between space-x-1 2xl:text-xl">
                                                <FaRegStar className="text-[#ffd000]" />
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
            </CarouselPerson>
        </div>
    )
}