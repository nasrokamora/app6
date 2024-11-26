import { urlImageTv } from "@/app/libs/DataFetchingTv"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { Suspense } from "react"
import Link from "next/link"
import no_image from '../../../../public/image/no_image4.webp'


export default function RecommendationMovies({dataRecommend}) {
const keyStr =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1, e2, e3) =>
keyStr.charAt(e1 >> 2) +
keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
keyStr.charAt(e3 & 63);

const rgbDataURL = (r, g, b) =>
`data:image/gif;base64,R0lGODlhAQABAPAA${
  triplet(0, r, g) + triplet(b, 255, 255)
}/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

    return(
      <>
      <div>
        <h1 className="scroll-m-20 text-2xl md:text-xl font-extrabold text-amber-600 backdrop-none  lg:text-2xl   black-shadow-text underline decoration-amber-600">Suggested Movies :</h1>
      </div>
        <div className="w-full pt-10 flex justify-center items-center relative h-fit md:mt-4">
        <Carousel className="w-full md:max-w-sm max-w-5xl 2xl:max-w-full " opts={{loop:true, align:"start"}}
    >
      <CarouselContent className="-mt-1 ">
        {dataRecommend && dataRecommend.length > 0 ? (
        dataRecommend.map((data,index) => (
          <CarouselItem key={index} className="md:basis-1/2 basis-1/6 lg:basis-1/5">
            <div className="p-1 hover:scale-90 hover:duration-500">
            <Link href={`/Movies/List/${data.id}`}>
                <div className=" ">
                    <div className=" overflow-hidden relative">
                        <Image 
                        src={data.poster_path ?
                          `${urlImageTv}${data.poster_path}`
                        :
                        no_image
                        }
                        alt="image_recommend"
                        width={300}
                        height={250}
                        style={{width:"auto"}}
                        className="rounded-md "
                        loading="eager"
                        priority
                        placeholder="blur"
                        blurDataURL={rgbDataURL(86,91,96)}
                        />
                    </div>
                </div>
        </Link>
            </div>
          </CarouselItem>
        ))
      ):(
        <div className=" w-full flex justify-center items-center  ">
        <h1 className=" text-xl text-red-700 font-bold border rounded-md p-5 border-red-700 bg-black">
          Currently, there are no movies to display.
          </h1>
        </div>
        )
}
        </CarouselContent>
      <div className=" absolute top-[-2rem] left-[93%] md:left-[85%] ">
      <CarouselPrevious />
      <CarouselNext />
      </div>
    </Carousel>
        </div>
        </>
    )
}