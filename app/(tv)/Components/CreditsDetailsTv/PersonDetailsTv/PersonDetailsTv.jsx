import { getExtPersonsIdTv, getPersonsIdTv } from "@/app/libs/DataFetchingTv"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { LiaImdb } from "react-icons/lia";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link"
import no_image from '../../../../../public/image/no_image4.webp'
import { buttonVariants } from "@/components/ui/button"

export default async function PersonDetailsTv({ person_id, urlImageTv, character }) {

    const data =  getPersonsIdTv(person_id)
    const extPersonId =  getExtPersonsIdTv(person_id)
    const [dataPerson, dataExtPerson] = await Promise.all([data, extPersonId])

    return (
        <div className=" w-full ">
            <div className="p-1 ">
                <Card className=" h-96 md:h-auto ">
                    <CardContent className="-ml-1">
                        <div className="flex justify-start gap-2 pt-4 ">
                            <div className=''>
                                <Image src={dataPerson.profile_path ?
                                    `${urlImageTv}${dataPerson.profile_path}`
                                :
                                no_image
                                }
                                    width={100} height={100}
                                    priority
                                    alt={dataPerson.name}
                                    style={{ width: 'auto',borderRadius:"12px" }}
                                    loading="eager"

                                    
                                />
                            </div>
                            <div className="">

                                <div className=" flex  gap-2 ">
                                    <strong className="text-[#52525b]">Name :</strong>
                                    <h1 className=" font-bold italic text-red-700"> {dataPerson.name}</h1>
                                </div>
                                <div className=" flex gap-1 flex-wrap pt-2">
                                    <strong className="text-[#52525b]">birthday :</strong>
                                    <h1 className=" font-semibold italic">{dataPerson.birthday ? dataPerson.birthday : <span></span>}</h1>
                                </div>
                                <div className=" flex gap-1 flex-wrap pt-2 w-fit md:flex-col">
                                    <strong className="text-[#52525b]"> Place of birth :</strong>
                                    <h1 className="font-semibold italic">{dataPerson.place_of_birth}</h1>
                                </div>
                                <div className=" flex gap-2 flex-wrap">
                                    <strong className="text-[#52525b]">Popularity :</strong>
                                    <h1 className=" font-bold text-yellow-500">{(dataPerson.popularity).toFixed(2)}%</h1>
                                </div>

                                <div className=" flex gap-2 flex-wrap">
                                    <strong className="text-[#52525b]">Character :</strong>
                                    <h1 className=" font-bold">{character}</h1>
                                </div>
                                <div className=" pt-1  flex gap-2 flex-wrap">
                                    <strong className='text-[#52525b]'>Social Links :</strong>
                                    <div className=" flex justify-start items-center flex-wrap">
                                        {dataExtPerson ? (
                                            <div key={dataExtPerson.id}>
                                                <ul className=" flex gap-2 items-center justify-start">
                                                    <li>
                                                        <Link href={`https://www.facebook.com/${dataExtPerson.facebook_id}`} target="_blank" rel="noreferrer noopener"><FaFacebook size={24} /></Link>
                                                    </li>
                                                    <li>
                                                        <Link href={`https://www.twitter.com/${dataExtPerson.twitter_id}`} target="_blank" rel="noreferrer noopener"><FaXTwitter size={24} /></Link>
                                                    </li>
                                                    <li>
                                                        <Link href={`https://www.instagram.com/${dataExtPerson.instagram_id}`} target="_blank" rel="noreferrer noopener"><FaInstagram size={24} /></Link>
                                                    </li>
                                                    <li>
                                                        <Link href={`https://www.imdb.com/name/${dataPerson.imdb_id}`} target="_blank" rel="noreferrer noopener"><LiaImdb size={24} /></Link>
                                                    </li>
                                                </ul>

                                            </div>
                                        ):(
                                            <div>
                                                <p className=" text-red-700 border-red-700 font-bold text-xl">Social links not found.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>


                                <div className=" pt-2 flex justify-start gap-4 items-center">
                                    <AlertDialog className=" " >
                                        <AlertDialogTrigger className="hover:bg-info hover:duration-300 alert-info text-white hover:text-slate-950 border p-2 font-bold rounded-lg">Biography</AlertDialogTrigger>
                                        <AlertDialogContent className="md:h-screen  max-w-2xl xl:max-w-5xl">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle> {dataPerson.name? dataPerson.name : "Name is not found"}</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    {dataPerson && dataPerson.biography && dataPerson.biography.length > 0
                                                        ? dataPerson.biography
                                                        : 'Biography is not available.'}
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    <Link href={`/person/${dataPerson.id}`} className={buttonVariants({ variant: "outline",color:"red" })}>More Details</Link>

                                </div>

                            </div>

                        </div>
                        <div className=" flex gap-1 flex-wrap pt-2 ">
                            <strong className="text-[#52525b]">Also Known As : </strong>
                            {dataPerson.also_known_as && dataPerson.also_known_as.length > 0 ? (
                                dataPerson.also_known_as.map((data, index) => {
                                    return (
                                        <div key={index} className=" flex flex-col justify-center">
                                            <h1 className=" text-blue-500/60 font-bold">{data}</h1>
                                        </div>
                                    )
                                })) : (
                                <div className="font-bold text-red-400">No data available.</div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>

    )
}