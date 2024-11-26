


export default async function ReleaseMovies({dataRelease}) {{
    console.log(dataRelease.release_dates);
    

    return(
        <div>
            <div>
                <h1></h1>
            </div>
            <div>
                {dataRelease.release_dates.map((movie) =>(
                    <div key={movie.id}>

                    </div>
                ))}
            </div>
        </div>
    )
}}