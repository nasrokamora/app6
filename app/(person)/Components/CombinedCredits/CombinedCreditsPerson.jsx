import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
 
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"


export default function CombinedCreditsPerson({dataCombined}) {
    // console.log(dataCombined)
    

    return(

    
    <div className=" pt-3">
        <div className="lg:text-xl text-2xl">
            <h1 className="font-bold border-l pl-2 border-yellow-600">Known For:</h1>
        </div>

        <ScrollArea className="max-w-2xl whitespace-nowrap   md:max-w-xs">
            <div className="flex gap-4 max-w-5xl justify-start">

    {dataCombined && dataCombined.length > 0 ? (
        dataCombined.map((item, index) => (
            
            <Card className="" key={index - item.id}>
        <CardHeader>
        <CardTitle>{item.title ? item.title : item.name}</CardTitle>
        <CardDescription> {item.release_date ? item.release_date : item.first_air_date} </CardDescription>
            <CardContent className=" flex justify-start gap-2 ">
                <div className=" overflow-hidden relative ">
                    <Image src={item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : `https://image.tmdb.org/t/p/original${item.backdrop_path}`} 
                    alt={item.poster_path} 
                    width={100} 
                    height={100}
                    priority 
                    className=" "
                    />
                </div>
            {/* <Button variant="outline">Details</Button> */}

            </CardContent>

      </CardHeader>
        </Card>
        ))
    ):(
        <div>
            no data
        </div>
    )
}
    </div>
<ScrollBar orientation="horizontal" />
</ScrollArea>
    </div>   
    )
}