
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
import no_image from '../../../../public/image/no_image4.webp'
import { getCombinedCreditPerson, getExternelIdsPerson, getPersonsId, getPersonsImage, urlImagesPerson } from "@/app/libs/DataFetchingPerson"
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
import CombinedCreditsPerson from "../../Components/CombinedCredits/CombinedCreditsPerson"
import PopularPersonDetails from "@/app/Components/PersonPopular/PopularPersonDetails"
import ToggleButton from "@/app/(movies)/Components/ToggleButton/ToggleButton"
import PersonImage from "../../Components/PersonImage/PersonImage"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import ButtonBack from "@/app/(movies)/Components/ToggleButton/ButtonBack"

export async function generateMetadata({ params }) {
    const { personId } = params
    const data = await getPersonsId(personId)
    return {
        title: data.title ? data.title : data.name || "Person Details",
    }
}



export default async function Person({ params }) {

    const Unknown = () => {
        return (
            <h1 className="text-error text-xl font-semibold">
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
    return (
        <div className="w-full h-auto mt-7 pl-6 pr-6">
            <ButtonBack />

            <div className=" w-full ">
                <div className=" flex justify-center flex-col items-center">

                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl">
                        {personDetails.name ? personDetails.name : <Unknown />}
                    </h1>
                    <div className=" text-center pt-1">
                        {personDetails.also_known_as && personDetails.also_known_as.length > 0 ? (
                            <h1 className=" text-slate-500"> <span>Also Known As: </span>{personDetails.also_known_as}</h1>
                        ) : (
                            <h1 className=" font-semibold"> <span className="text-slate-500">Also Known As: </span><span className="text-red-700">No found</span></h1>
                        )}
                    </div>

                </div>
                <div className=' pt-3 flex justify-evenly gap-2  w-full  md:flex-col lg:flex-col'>
                    <div className="w-max flex-col h-auto flex justify-start items-start order-2">
                        {/* date of birth */}
                        <div className="flex gap-2 justify-start items-center lg:text-xl xl:text-xl 2xl:text-2xl flex-wrap">
                            <h1 className="font-bold border-l pl-2 border-yellow-600">Date of Birth:</h1>
                            <p className="font-semibold"> {personDetails.birthday ? personDetails.birthday.replace(/-/g, '.') : <span className="text-red-700">Unknown!</span>} </p>
                        </div>

                        {/* place of birth */}
                        <div className="flex gap-1 justify-start items-center flex-wrap md:items-start md:flex-col lg:text-xl xl:text-xl 2xl:text-2xl pt-3 ">
                            <h1 className="font-bold border-l pl-2 border-yellow-600"> Place of Birth: </h1>
                            <p className="font-semibold ">{personDetails.place_of_birth ? personDetails.place_of_birth : <span className="text-red-700">Unknown!</span>}</p>
                        </div>

                        {/* known for department */}
                        {personDetails.known_for_department ? (
                            <div className="flex gap-2 justify-start items-center lg:text-xl xl:text-xl 2xl:text-2xl pt-3 md:flex-wrap">

                                <h1 className="font-bold border-l pl-2 border-yellow-600">
                                    Known for department:
                                </h1>
                                <p className="font-semibold"> {personDetails.known_for_department}</p>
                            </div>
                        ) : (
                            <h1 className=" border rounded-md border-red-700 font-bold">No found</h1>
                        )}

                        {/* External Ids */}
                        <div className=" pt-3 flex gap-2 items-center">
                            <h1 className="font-bold border-l pl-2 border-yellow-600 lg:text-xl xl:text-xl 2xl:text-2xl ">Social Media:</h1>
                            <div className=" flex justify-start gap-2">


                                <ul className=" flex justify-start gap-3 items-center list-none flex-wrap">

                                    <li>
                                        <Link href={dataExtPerson.imdb_id ? `https://www.imdb.com/title/${dataExtPerson.imdb_id}` : "https://www.imdb.com/title/"} target="_blank"><SiImdb size={20} /></Link>
                                    </li>
                                    <li>
                                        <Link href={dataExtPerson.instagram_id ? `https://www.instagram.com/${dataExtPerson.instagram_id}/` : "https://www.instagram.com/"} target="_blank"><SlSocialInstagram size={20} /></Link>
                                    </li>
                                    <li>
                                        <Link href={dataExtPerson.twitter_id ? `https://twitter.com/${dataExtPerson.twitter_id}` : "https://twitter.com/"} target="_blank"><BsTwitterX size={20} /></Link>
                                    </li>
                                    <li>
                                        <Link href={dataExtPerson.facebook_id ? `https://www.facebook.com/${dataExtPerson.facebook_id}` : "https://www.facebook.com/"} target="_blank"><BsFacebook size={20} /></Link>
                                    </li>
                                    <li>
                                        <Link href={dataExtPerson.youtube_id ? `https://www.youtube.com/channel/${dataExtPerson.youtube_id}` : "https://www.youtube.com"} target="_blank"><BsYoutube size={20} /></Link>
                                    </li>
                                </ul>
                            </div>




                            {/*  image  */}

                        </div>
                        {/* biography */}
                        <div className="pt-3 md:hidden">
                                <AlertDialog className=" " >
                                    <AlertDialogTrigger className="hover:bg-info hover:duration-300 alert-info text-white hover:text-slate-950 border p-2 font-bold rounded-lg">Biography</AlertDialogTrigger>
                                    <AlertDialogContent className="md:h-screen  max-w-2xl xl:max-w-5xl">
                                        <AlertDialogHeader>
                                            <AlertDialogTitle> {dataPerson.name ? dataPerson.name : "Name is not found"}</AlertDialogTitle>
                                            <AlertDialogDescription className=" italic">
                                                {personDetails && personDetails.biography && personDetails.biography.length > 0
                                                    ? personDetails.biography
                                                    : <span className="text-red-700 font-semibold">Biography is not available.</span>}
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
           
                        </div>
                    </div>

                    {/* Image person */}
                    <div className=" lg:order-1">

                    <PersonImage ImagePerson={ImagePerson.profiles} />
                    </div>

                </div>
            </div>
            {/* combibed Credits */}
            <div>
                <CombinedCreditsPerson dataCombined={dataCombined && dataCombined.cast ? dataCombined.cast : []} />
            </div>

            <PopularPersonDetails dataPerson={dataPerson.results} />
        </div>
    )
}