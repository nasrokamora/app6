import ToggleButton from "@/app/(movies)/Components/ToggleButton/ToggleButton"
import { getPersonsId } from "@/app/libs/DataFetching"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import Link from "next/link"
  import Image from "next/image"
  import no_image from '../../../../../public/image/no_image4.webp'
import { urlImagesPerson } from "@/app/libs/DataFetchingPerson"




export default async function Person({ params }) {
    const { personId } = params

    const personDetails = await getPersonsId(personId)
    // console.log(personDetails)
    return (
        <div className="w-full h-screen mt-7 pl-6 pr-6">
            <ToggleButton />

            <div className=" border w-full h-96">
                <div className=" flex justify-center flex-col items-center">

                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    {personDetails.name}
                </h1>
                <div>
                    {personDetails.also_known_as ? (
                        <h1 className=" text-slate-500"> <span>Also Known As: </span>{personDetails.also_known_as}</h1>
                    ):(
                        <h1>No found</h1>
                    )}
                </div>
                {/* {personDetails.known_for_department ? (

                    <h1 className="text-3xl font-extrabold tracking-tight lg:text-5xl flex justify-center">
                        {personDetails.known_for_department}
                    </h1>
                ):(
                    <h1>No found</h1>
                )} */}
                </div>
                <div className=' pt-3 flex justify-around gap-3 items-start'>

                    {/* image */}
                    <div className="overflow-hidden relative w-full">
                        <Image
                            src={personDetails.profile_path ? `${urlImagesPerson}${personDetails.profile_path}` : no_image}
                            alt={personDetails.name}
                            priority
                            width={250} height={250}
                            className="rounded-md h-auto w-auto"
                        />
                    </div>
                        <div>
                        {/* date of birth */}
                        <div>
                            <h1>Date of Birth</h1>
                            <p> {personDetails.birthday} </p>
                        </div>
                    {/* biography */}
                        <div>
                            <h1>Biography</h1>
                            <p> {personDetails.biography} </p>
                        </div>
                        </div>
                </div>
            </div>
        </div>
    )
}