
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import PersonDetailsTv from "./PersonDetailsTv/PersonDetailsTv"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import ImageTvSeries from "../ImageTV/ImageTvSeries"
import DetailsSeasonTv from "../DetailsSeasonTv/DetailsSeasonTv"
import { AlertCircle } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { urlImage } from "@/app/libs/UrlImage"

export default function CreditsDetailsTv({ credits, seasons, seriesId }) {
    return (
        <div className=" flex justify-center items-center mt-6  md:mt-8">
            <Tabs defaultValue="cast" className="w-full flex justify-center flex-col">
                <TabsList>
                    <TabsTrigger value="cast">Cast</TabsTrigger>
                    <TabsTrigger value="seasons">Seasons</TabsTrigger>
                </TabsList>

                {/* Cast */}
                <TabsContent value="cast" className="  pt-4 rounded-md">
                    <div className="  w-full ">
                        <ScrollArea className="w-full whitespace-nowrap rounded-md  xl:w-full ">
                            <div className="flex w-max space-x-2 p-4">
                                {credits ? (
                                    credits.map((credit) => (
                                        <PersonDetailsTv
                                            person_id={credit.id}
                                            key={credit.id}
                                            character={credit.character}
                                        />
                                    ))
                                ) : (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle className=" font-bold">Oops!</AlertTitle>
                                        <AlertDescription className=" font-semibold text-xl">
                                            An error has occurred, please try again later.
                                        </AlertDescription>
                                    </Alert>
                                )
                                }
                                <ScrollBar orientation="horizontal" />
                            </div>
                        </ScrollArea>
                    </div>
                </TabsContent>

                {/* Image tv */}



                {/* Season */}
                <TabsContent value="seasons" className=" pt-4   rounded-md h-auto w-full">

                    <DetailsSeasonTv
                        season={seasons}
                        id={seriesId}
                    />

                </TabsContent>

            </Tabs>
        </div>
    )
}