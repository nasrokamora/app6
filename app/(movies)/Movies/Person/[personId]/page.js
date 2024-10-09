import ToggleButton from "@/app/(movies)/Components/ToggleButton/ToggleButton"
import { getPersonsId } from "@/app/libs/DataFetching"





export default async function Person({ params }) {
    const { personId } = params

    const personDetails = await getPersonsId(personId)
    console.log(personDetails)
    return (
        <div className="w-full h-screen">
            <ToggleButton />
        </div>
    )
}