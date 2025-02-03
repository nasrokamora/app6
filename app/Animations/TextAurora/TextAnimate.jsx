
import { cn } from "@/lib/utils"




export default function TextAnimate({className, ...props}) {

    return(
        <div className={cn("text-white",className)} >
            <h1 className={cn(' ')}>
                {props.children}
            </h1>
        </div>
    )
}