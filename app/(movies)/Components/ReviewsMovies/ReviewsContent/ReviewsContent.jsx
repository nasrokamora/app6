import {
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialog,
    AlertDialogFooter,
    AlertDialogCancel
} from "@/components/ui/alert-dialog"



export default function ReviewContent({ review }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger >
                <p variant="outline" className="text-base text-white mt-3 rounded-lg p-1 border border-zinc-300  hover:bg-black hover:border-l-orange-700 hover:duration-500 hover:border-r-red-800 after:border-l-amber-600 hover:border-b-red-800 hover:border-orange-700"> {review.content.slice(0, 10)} <span className=" bg-gradient-to-tr from-orange-600 to-red-800 text-transparent bg-clip-text ">read more... </span> </p>
            </AlertDialogTrigger>
            <AlertDialogContent className=" md:h-screen overflow-y-scroll h-3/6 lg:h-screen max-w-5xl ">
                <AlertDialogHeader>
                    <AlertDialogTitle > {review.created_at} </AlertDialogTitle>
                    <AlertDialogDescription>
                        {review.content}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}