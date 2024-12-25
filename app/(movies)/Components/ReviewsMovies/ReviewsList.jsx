import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { urlImage } from "@/app/libs/DataFetching"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import ReviewContent from "./ReviewsContent/ReviewsContent"
export default function ReviewsList({ dataReview }) {

    return (
        <div className=" w-full h-auto ">
            <div>
                <h1 className="md:text-slate-100 text-slate-100  mt-10 scroll-m-20 md:text-xl  text-3xl font-bold  black-shadow-text first:mt-0 ">Reviews :</h1>
            </div>
            <div className=" flex justify-center pt-5  ">

                <ScrollArea className="  w-full  whitespace-nowrap  lg:w-3/4 xl:w-4/5">
                    <div className="flex w-max space-x-4 p-4">

                        {dataReview && dataReview.results && dataReview.results.length > 0 ? (
                            dataReview.results.map((review) => (
                                <div key={review.id}>
                                    <div className="  border p-4 rounded-md border-zinc-800 bg-black/30 backdrop-blur">
                                        <div className="flex items-center justify-start gap-2">
                                            <Avatar>
                                                <AvatarImage src={`${urlImage}${review.author_details.avatar_path}`} alt="users_logo"  />
                                                <AvatarFallback>
                                                    {review.author.slice(0, 3)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <h1> {review.author} </h1>
                                        </div>
                                        <div className=" text-sm text-zinc-500 pt-2">
                                            <h3 className=" text-amber-500"> Created at : <span className=' text-slate-200'>{review.created_at}</span></h3>
                                            <h3 className=" text-info"> Updated at : <span className=" text-slate-200">{review.updated_at}</span></h3>
                                            <ReviewContent review={review} key={review.author} />
                                        </div>
                                    </div>
                                </div>
                            )))
                            : (
                                <Alert variant="destructive" className=" bg-black font-bold">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Oops !</AlertTitle>
                                    <AlertDescription className=" xl:text-xl 2xl:text-2xl">
                                        There are no reviews in this movie.
                                    </AlertDescription>
                                </Alert>
                            )}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    )

}