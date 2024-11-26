
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { urlImageTv } from "@/app/libs/DataFetchingTv"
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

export default function CreditsDetailsTv({ credits, dataImageTv, seasons, seriesId }) {
    return (
        <div className=" flex justify-center items-center mt-6  md:mt-8">
            <Tabs defaultValue="cast" className="w-full flex justify-center flex-col">
                <TabsList>
                    <TabsTrigger value="cast">Cast</TabsTrigger>
                    <TabsTrigger value="image">Images</TabsTrigger>
                    <TabsTrigger value="season">Season</TabsTrigger>
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
                                            urlImageTv={urlImageTv}
                                            character={credit.character}
                                        />
                                    ))
                                ) : (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>
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
                <TabsContent value="image" className="  pt-4  items-center rounded-md h-auto w-full ">
                    <ImageTvSeries
                        urlImageTv={urlImageTv}
                        dataImage={dataImageTv.backdrops}
                    />
                </TabsContent>


                {/* Season */}
                <TabsContent value="season" className=" pt-4   rounded-md h-auto w-full">

                    <DetailsSeasonTv
                        season={seasons}
                        id={seriesId}
                    />

                </TabsContent>

            </Tabs>
        </div>
    )
}