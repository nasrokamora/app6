import { getPersonId} from "@/app/libs/DataFetching"

import Image from "next/image"
import no_image from '../../../../public/image/no_image4.webp'
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
import ImagePosterPath from "@/app/libs/ImagePosterPath"

const ErrorContent = () => {
  return (
    <span className=" font-bold text-xl text-warning">
      Unknown !
    </span>
  )
}

export default async function PersonDetails({ person_id }) {
  const data = await getPersonId(person_id)


  return (
    <section>

      <AlertDialog >
        <AlertDialogTrigger className=" border border-zinc-600 px-3 bg-black text-white font-semibold hover:duration-500 hover:bg-zinc-700 rounded-md" variant="outline">Biography</AlertDialogTrigger>
        <AlertDialogContent className=" max-w-max md:h-screen xl:h-screen md:overflow-y-scroll md:touch-pan-y lg:h-screen lg:touch-pan-y overflow-y-scroll">
          <AlertDialogHeader >
            <AlertDialogTitle>{data.name ? data.name : <ErrorContent />}</AlertDialogTitle>
            <AlertDialogDescription>
              {data.also_known_as ? data.also_known_as.join(", ") : <ErrorContent />}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className=" flex justify-start gap-3 items-start lg:items-center xl:max-w-5xl md:flex-col md:items-start ">
            <div className=" relative overflow-hidden">
              {data.profile_path ? (
                <ImagePosterPath
                  style={{height:"auto"}}
                  width={300}
                  height={300}
                  index={data.id}
                  tmdbPath={data.profile_path}
                  quality={75}
                  alt={data.name ? data.name : "Unknown"}
                  unoptimized
                  draggable={false}
                  priority
                />

              ) : (
                <Image
                  alt="no_image"
                  width={300}
                  height={300}
                  priority
                  placeholder="blur"
                  src={no_image}
                  unoptimized={false}
                  draggable={false}

                />

              )
              }
            </div>
            <div className=" w-3/4 md:w-full">
              <h1 className=" font-bold text-xl underline decoration-yellow-600 pt-3">Biography :</h1>
              <p className="   pt-2 font-semibold">{data.biography ? data.biography : <ErrorContent />}</p>
              <div className="">
                <h1 className=" font-bold text-xl underline decoration-yellow-600 pt-3">Birthday :</h1>
                <p className="pt-2 font-semibold"> {data.birthday ? data.birthday.replace(/-/g, '.') : <ErrorContent />}</p>
                <h1 className=" font-bold text-xl underline decoration-yellow-600 pt-3">Place of Birth : </h1>
                <p className="pt-2 font-semibold">
                  {data.place_of_birth ? data.place_of_birth : <ErrorContent />}
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