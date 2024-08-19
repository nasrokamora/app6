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
import { Button } from "@/components/ui/button"
import VideosTrailerPalyer from "./VideoPlayer/VideosTrailerPlayer"




export default async function TrailerTv({ dataVideos }) {

    // console.log(dataVideos)
    return (
        <div>
            <AlertDialog >
                <AlertDialogTrigger asChild>
                    <Button variant="outline" className="cursor-pointer">Trailer</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-4xl">
                    {dataVideos.map((item) => (
                        <div key={item.id}>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    {item.name}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    {item.published_at}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <VideosTrailerPalyer item={item} />
                            {/* <ReactPlayer 
                            url={`https://www.youtube.com/watch?v=${item.key}`} 
                            width="100%" 
                            height="300px" 
                            controls={true} 
                            /> */}
                         
                            {/* <iframe 
                                src={`https://www.youtube.com/embed/${item.key}`}
                                width="100%"
                                height="300px"
                                cookie="false"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            
                            /> */}
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>

                            </AlertDialogFooter>
                        </div>
                    ))}

                </AlertDialogContent>
            </AlertDialog>


        </div>
    )
}