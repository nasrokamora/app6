import ToggleButton from "@/app/(movies)/Components/ToggleButton/ToggleButton"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Link from "next/link"
import Image from "next/image"
import no_image from '../../../../../public/image/no_image4.webp'
import { getCombinedCreditPerson, getExternelIdsPerson, getPersonsId, getPersonsImage, urlImagesPerson } from "@/app/libs/DataFetchingPerson"
import PopularPersonDetails from "@/app/Components/PersonPopular/PopularPersonDetails"
import { getPersonPopular } from "@/app/libs/DataFetching"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { LiaImdb } from "react-icons/lia";
import { SlSocialInstagram } from "react-icons/sl"
import { BsFacebook, BsTwitterX, BsYoutube } from "react-icons/bs"
import { SiImdb } from "react-icons/si";
import CombinedCreditsPerson from "@/app/(person)/Components/CombinedCredits/CombinedCreditsPerson"





export default async function Person({ params }) {

    const Unknown = () => {
        return (
            <h1 className="text-error text-xl">
                Unknown!
            </h1>
        )
    }

    const { personId } = params

    const personData = getPersonPopular()
    const detailsPerson = getPersonsId(personId)
    const dataImagePerson = getPersonsImage(personId)
    const ExtDataPerson = getExternelIdsPerson(personId)
    const combinedCredits = getCombinedCreditPerson(personId)
    const [dataPerson, personDetails, ImagePerson, dataExtPerson, dataCombined] = await Promise.all([personData, detailsPerson, dataImagePerson, ExtDataPerson, combinedCredits])
    // console.log(dataCombined)
    return (
        <div className="w-full h-auto mt-7 pl-6 pr-6">
            <ToggleButton />

            <div className=" border w-full ">
                <div className=" flex justify-center flex-col items-center">

                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        {personDetails.name ? personDetails.name : <Unknown />}
                    </h1>
                    <div className=" text-center pt-1">
                        {personDetails.also_known_as ? (
                            <h1 className=" text-slate-500"> <span>Also Known As: </span>{personDetails.also_known_as}</h1>
                        ) : (
                            <h1>No found</h1>
                        )}
                    </div>

                </div>
                <div className=' pt-3 flex justify-start gap-3 items-start md:flex-col'>

                    {/* image */}
                    <div className=" relative w-max h-max ">
                        <Image
                            src={personDetails.profile_path ? `${urlImagesPerson}${personDetails.profile_path}` : no_image}
                            alt={personDetails.name}
                            priority
                            width={250} height={250}
                            className="rounded-md h-auto w-auto z-10"
                        />
                    </div>
                    <div>
                        {/* date of birth */}
                        <div className="flex gap-2 justify-start items-center lg:text-xl xl:text-2xl 2xl:text-2xl flex-wrap">
                            <h1 className="font-bold border-l pl-2 border-yellow-600">Date of Birth:</h1>
                            <p className="font-semibold"> {personDetails.birthday ? personDetails.birthday.replace(/-/g, '.') : <span className="text-red-700">Unknown!</span>} </p>
                        </div>

                        {/* place of birth */}
                        <div className="flex gap-2 justify-start items-center lg:text-xl xl:text-2xl 2xl:text-2xl pt-3">
                            <h1 className="font-bold border-l pl-2 border-yellow-600"> Place of Birth: </h1>
                            <p className="font-semibold">{personDetails.place_of_birth? personDetails.place_of_birth : <span className="text-red-700">Unknown!</span>}</p>
                        </div>

                        {/* known for department */}
                        {personDetails.known_for_department ? (
                            <div className="flex gap-2 justify-start items-center lg:text-xl xl:text-2xl 2xl:text-2xl pt-3">

                                <h1 className="font-bold border-l pl-2 border-yellow-600">
                                    Known for department:
                                </h1>
                                <p className="font-semibold"> {personDetails.known_for_department}</p>
                            </div>
                        ) : (
                            <h1 className=" border rounded-md border-red-700 font-bold">No found</h1>
                        )}

                        {/* External Ids */}
                        <div className="lg:text-xl text-2xl pt-3 flex gap-2 items-center">
                            <h1 className="font-bold border-l pl-2 border-yellow-600">Social Media:</h1>
                            <div className=" flex justify-start gap-2">


                                <ul className=" flex justify-start gap-3 items-center list-none">

                                    <li>
                                        <Link href={dataExtPerson.imdb_id ? `https://www.imdb.com/title/${dataExtPerson.imdb_id}` : "https://www.imdb.com/title/"} target="_blank"><SiImdb /></Link>
                                    </li>
                                    <li>
                                        <Link href={dataExtPerson.instagram_id ? `https://www.instagram.com/${dataExtPerson.instagram_id}/` : "https://www.instagram.com/"} target="_blank"><SlSocialInstagram /></Link>
                                    </li>
                                    <li>
                                        <Link href={dataExtPerson.twitter_id ? `https://twitter.com/${dataExtPerson.twitter_id}` : "https://twitter.com/"} target="_blank"><BsTwitterX /></Link>
                                    </li>
                                    <li>
                                        <Link href={dataExtPerson.facebook_id ? `https://www.facebook.com/${dataExtPerson.facebook_id}` : "https://www.facebook.com/"} target="_blank"><BsFacebook /></Link>
                                    </li>
                                    <li>
                                        <Link href={dataExtPerson.youtube_id ? `https://www.youtube.com/channel/${dataExtPerson.youtube_id}` : "https://www.youtube.com"} target="_blank"><BsYoutube /></Link>
                                    </li>
                                </ul>
                            </div>
 



                            {/*  image  */}

                        </div>

                            {/* combibed Credits */}
                        <div>
                            <CombinedCreditsPerson dataCombined={dataCombined.cast}  />
                            </div>
                    </div>
                </div>
                {/* biography */}
                <div className="pt-3 ">
                    <h1 className="font-bold border-l pl-2 border-yellow-600 lg:text-xl xl:text-2xl 2xl:text-2xl ">Biography:</h1>
                    <blockquote className="mt-6 border-l-2 pl-6 italic font-semibold"> {personDetails.biography} </blockquote>
                </div>
            </div>

            <PopularPersonDetails dataPerson={dataPerson.results} />
        </div>
    )
}