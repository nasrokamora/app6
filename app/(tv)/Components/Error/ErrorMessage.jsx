import { cn } from "@/lib/utils"
import * as React from "react"
// const { Alert } = require("@/components/ui/alert")
import { Alert } from "@/components/ui/alert"

//Nas@Dev

const ErrorMessage = React.forwardRef(({ className, ...props },ref) => {
    return(
        (<Alert type="warning" variant="destructive" 
        className={cn((
            " border-none font-bold text-red-700"),className)}
        {...props}
        ref={ref}
        >
            Not found
            </Alert>

             
    ))
})

export default ErrorMessage