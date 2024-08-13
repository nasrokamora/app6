import { getCreditsId, getPersonsId, urlImage } from "@/app/libs/DataFetching"
import { Button } from "@/components/ui/button"
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
import Image from "next/image"


export async function PersonDetails({person_id}) {
    const data = await getPersonsId(person_id)
  //  console.log(data)
    return (
        <section>
            {/* <h1 className="text-black">
                <strong>Birthday </strong> 
                {data.birthday? data.birthday : "Unknown"}
                </h1> */}
                <AlertDialog >

  <AlertDialogTrigger className=" border border-zinc-600 px-3 bg-black text-white font-semibold hover:duration-500 hover:bg-zinc-700 rounded-md" variant="outline">Biography</AlertDialogTrigger>
  <AlertDialogContent className=" max-w-2xl md:h-screen xl:max-w-6xl md:overflow-y-scroll md:touch-pan-y lg:overflow-y-scroll lg:touch-pan-y overflow-y-scroll">
    <AlertDialogHeader >
      <AlertDialogTitle>{data.name}</AlertDialogTitle>
      <AlertDialogDescription>
        {data.also_known_as.join(", ")}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <div className=" flex justify-start gap-3 items-start lg:items-center xl:max-w-5xl md:flex-col md:items-start ">
        <div className=" relative">
        <Image src={`${urlImage}${data.profile_path}`} 
        width={300} 
        height={300} 
        alt={data.name} 
        className="rounded-md"
        priopity="true" />
        </div>
        <div className=" w-3/4 md:w-full">
        <h1 className=" font-bold text-xl underline decoration-yellow-600 pt-3">Biography :</h1>
    <p className="  text-center pt-2">{data.biography ? data.biography : <span className="font-bold">Unknown</span>}</p>
    <div className="">
    <h1 className=" font-bold text-xl underline decoration-yellow-600 pt-3">Birthday :</h1>
    <p className="pt-2 font-semibold"> {data.birthday ? data.birthday.replace(/-/g, '.') : "Unknown"}</p>
              <h1 className=" font-bold text-xl underline decoration-yellow-600 pt-3">Place of Birth : </h1>
                <p className="pt-2 font-semibold">
              {data.place_of_birth ? data.place_of_birth : "Unknown"}
                </p>

    </div>
        </div>

    </div>
    <AlertDialogFooter>
      <AlertDialogCancel>Close</AlertDialogCancel>
    </AlertDialogFooter>
  </AlertDialogContent>

</AlertDialog>
        </section>
    )


}







export default async function CreditsId({credit_id}) {
    const dataCreditId = await getCreditsId(credit_id)
    
    // console.log(dataCreditId)
    return(
        <section>
            <PersonDetails person_id={dataCreditId.person.id}  />
        </section>
    )
}