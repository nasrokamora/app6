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



export default async function TrailerTv({ dataVideos }) {

    // console.log(dataVideos)
    return (
        <div>
            <AlertDialog >
                <AlertDialogTrigger asChild>
                    <Button variant="outline">Trailer</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
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