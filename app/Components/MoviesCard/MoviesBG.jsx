import Image from "next/image"

export default function MoviesBG({urlImage,movie}) {

    return(
        <div className=" w-full relative overflow-hidden h-[30rem] ">
            <Image src={`${urlImage}${movie[0].backdrop_path}`} 
            alt={movie.original_title} 
            fill
            priority
            sizes="(min-width: 380px) 300px, calc(53.33vw + 108px)"
            style={{objectFit:"cover"}}
            />
        </div>
    )
}