import { getCreditsId, getPersonsId, urlImage } from "@/app/libs/DataFetching"
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
import Image from "next/image"
import no_image from '../../../../public/image/no_image4.webp'

export async function PersonDetails({ person_id }) {
  const data = await getPersonsId(person_id)

  return (
    <section>
      <AlertDialog >
        <AlertDialogTrigger className=" border border-zinc-600 px-3 bg-black text-white font-semibold hover:duration-500 hover:bg-zinc-700 rounded-md" variant="outline">Biography</AlertDialogTrigger>
        <AlertDialogContent className=" max-w-max md:h-screen xl:h-screen md:overflow-y-scroll md:touch-pan-y lg:h-screen lg:touch-pan-y overflow-y-scroll">
          <AlertDialogHeader >
            <AlertDialogTitle>{data.name}</AlertDialogTitle>
            <AlertDialogDescription>
              {data.also_known_as.join(", ")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className=" flex justify-start gap-3 items-start lg:items-center xl:max-w-5xl md:flex-col md:items-start ">
            <div className=" relative">
              <Image
                src={data.profile_path ?
                  `${urlImage}${data.profile_path}`
                  :
                  no_image
                }
                width={300}
                height={300}
                alt={data.name}
                className="rounded-md"
                priopity="true" />
            </div>
            <div className=" w-3/4 md:w-full">
              <h1 className=" font-bold text-xl underline decoration-yellow-600 pt-3">Biography :</h1>
              <p className="   pt-2 font-semibold">{data.biography ? data.biography : <span className="font-bold">Unknown</span>}</p>
              <div className="">
                <h1 className=" font-bold text-xl underline decoration-yellow-600 pt-3">Birthday :</h1>
                <p className="pt-2 font-semibold"> {data.birthday ? data.birthday.replace(/-/g, '.') : <span className="font-bold">Unknown</span>}</p>
                <h1 className=" font-bold text-xl underline decoration-yellow-600 pt-3">Place of Birth : </h1>
                <p className="pt-2 font-semibold">
                  {data.place_of_birth ? data.place_of_birth : <span className="font-bold">Unknown</span>}
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

export default async function CreditsId({ credit_id }) {
  const dataCreditId = await getCreditsId(credit_id)

  // console.log(dataCreditId)
  return (
    <section>
      <PersonDetails person_id={dataCreditId && dataCreditId.person ?
        dataCreditId.person.id : "null"} />
    </section>
  )
}