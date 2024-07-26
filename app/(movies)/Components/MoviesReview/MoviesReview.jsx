import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog"
import { AiOutlineLike } from "react-icons/ai";


  

export default async function ReviewsMovies({ dataReview }) {
    const test = dataReview
    // console.log(dataReview)


    return (
        <div className="  mt-20 flex justify-center items-center xl:justify-start">

            <ScrollArea className="w-[40rem] md:w-[10rem] lg:w-[500px] whitespace-nowrap rounded-md ">
                <div className=" flex  justify-around items-center">
                    {test.map((item, index) => (
                        <Card key={index} className="w-[300px]">
                                <CardHeader >
                                <CardTitle className=" flex justify-around items-center ">
                                    {item.author}
                                </CardTitle>
                                <CardDescription className="flex justify-between items-center">
                                    <div>
                                    <Avatar className=" w-fit">
                                        <AvatarImage src={`https://image.tmdb.org/t/p/original${item.author_details.avatar_path}`} />
                                        <AvatarFallback> {item.author_details.username.slice(0,3)} </AvatarFallback>
                                    </Avatar>
                                        <h1>{item.author_details.username}</h1>
                                    </div>
                                    {item.created_at}
                                </CardDescription>
                                </CardHeader>
                                <CardContent className=" flex justify-evenly items-center text-wrap ">
                                    <div>
                                    <p>{item.content.length > 100 ? item.content.slice(0, 100) + "..." : item.content}</p>
                                    </div>
                                    <div className=" flex gap-3 items-center">
                                            <span>
                                            <AiOutlineLike size={28} />
                                            </span>
                                        <strong>
                                            {item.author_details.rating}
                                            </strong>
                                    </div>
                                </CardContent>
                        </Card>
                    ))}

                    <ScrollBar orientation="horizontal" />
                </div>
            </ScrollArea>



        </div>
    )
}