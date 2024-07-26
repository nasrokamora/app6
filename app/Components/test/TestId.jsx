"use client"



export default function TestId({movie, data}) {
    return (
        <div>
            <h1>TestId</h1>
            {movie.map((item) => (
                <div>
                    <h1>
                        {item.title}
                    </h1>
                </div>
            ))}
        </div>
    )
}

toLowerCase().replace(/ /g, "_").replace(/[^\w-]+/g, "").replace(/--+/g, "_").replace(/\./g, "")