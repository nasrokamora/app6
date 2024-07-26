
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { urlImageTv } from "@/app/libs/DataFetchingTv"
import PersonDetailsTv from "./PersonDetailsTv/PersonDetailsTv"
import { ScrollArea,ScrollBar  } from "@/components/ui/scroll-area"
import PaginationTv from "../PaginationTv/PaginationTv"

// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
export default function CreditsDetailsTv({credits,dataImageTv,dataSeasonTv}) {
    const SortedDataSeason = dataSeasonTv.sort((a, b) => a.season_number - b.season_number )
    // console.log(SortedDataSeason)
    return (
        <div className=" flex justify-center items-center mt-6 ">
            <Tabs defaultValue="cast" className="w-full flex justify-center flex-col">
                <TabsList>
                    <TabsTrigger value="cast">Cast</TabsTrigger>
                    <TabsTrigger value="seasons">Seasons</TabsTrigger>
                    <TabsTrigger value="credits">Credits</TabsTrigger>
                </TabsList>

                {/* Cast */}
                <TabsContent value="cast" className="  pt-4  items-center rounded-md">
               <div className="  w-full ">
                <ScrollArea className="w-full whitespace-nowrap rounded-md  xl:w-full ">
                <div className="flex w-max space-x-2 p-4">
                        {credits.map((credit) => (   
                            <PersonDetailsTv 
                            person_id={credit.id} 
                            key={credit.id} 
                            urlImageTv={urlImageTv}
                            character={credit.character}
                            />
                        ))}
                            <ScrollBar orientation="horizontal" />
                        </div>
                        </ScrollArea>
                        </div>
                </TabsContent>

                {/* Season */}
                <TabsContent value="seasons" className="  pt-4  items-center rounded-md h-screen w-full ">
                        <PaginationTv dataSeason={dataSeasonTv} itemsPerPage={1} />
                </TabsContent>
               
               
               
               
               
               
               
               
                <TabsContent value="credits">Change your password here.</TabsContent>

            </Tabs>
        </div>
    )
}