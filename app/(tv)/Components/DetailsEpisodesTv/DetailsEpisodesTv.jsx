import { getDetailsEpisodesTv } from "@/app/libs/DataFetchingTv"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default async function DetailsEpisodesTv({ id, season_number, episode_number, name }) {
    const dataEpisodes = await getDetailsEpisodesTv(id, season_number, episode_number)
    console.log(dataEpisodes)
    return (
        <div>
            {name}
        </div>
    )
}