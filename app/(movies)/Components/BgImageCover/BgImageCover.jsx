import ImagePosterPath from "@/app/libs/ImagePosterPath";




export default function BgImageCover({ dataImageList }) {
    return (
        <div className=" w-full h-screen fixed overflow-hidden p-0 ml-0 left-0 blur-sm">
            {dataImageList.backdrops.map((data) => (
                <div key={data.file_path} className=" relative  blur-bottom h-screen" >

                    <ImagePosterPath
                        fill
                        index={data.id}
                        tmdbPath={data.file_path}
                        quality={75}
                        style={{ objectFit: "cover" }}
                        alt={data.file_path ? data.file_path : "Unknown"}
                        unoptimized
                        draggable={false}
                        priority
                    />

                </div>
            ))}
        </div>
    )
}