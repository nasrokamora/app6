import Image from "next/image";
import icon_magix from '../../../../public/Icon_magix.png'
import { urlImage } from "@/app/libs/DataFetching";




export default function BgImageCover({ dataImageList}) {
    return (
        <div className=" w-full h-screen fixed overflow-hidden p-0 ml-0 left-0 blur-sm">

            <div className=" ">
                {dataImageList.backdrops.slice(0, 1).map((data) => (
                    <div key={data.file_path} className=" rounded-md relative  blur-bottom h-screen" >
                        <Image src={data.file_path ?
                            `${urlImage}${data.file_path}`
                            :
                            icon_magix
                        }
                            fill
                            className="  rounded-md  "
                            priority
                            style={{ objectFit: "cover" }}
                            draggable={false}
                            alt={data.file_path}
                            loading="eager"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}