



export async function getDataGenreTv({ setGenres, setSelected, setIsLoadingGenre, getTv }) {

    try {
        const response = await fetch(`/api/tvgenres`,)
        const data = await response.json()
        setGenres(data.genres)
        if (data.genres.length > 0) {
            getTv(data.genres[0].id)
            setSelected(data.genres[0].id)
            setIsLoadingGenre(false)

        }
    } catch (error) {
        console.error(error)
    }
}