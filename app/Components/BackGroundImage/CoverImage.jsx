import Image from "next/image";


export default function({data, urlImage}){
   const dataA =data.results.slice(1,2) 
    return(
        <div className="" style={{ overflow:"hidden"}}>
            <div style={{width:"100%", height:"100%"}}>

            {dataA.map((item) => (
                <div key={item.id} className=""   >
            <Image className="" 
            src={`${urlImage}${item.backdrop_path}`} 
            alt={item.original_title} 
            // width={300} height={300}
            fill={true}
            priority={true}
            // sizes="(max-width: 768px) "
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover", zIndex: "0"   }}  />
        </div>
            ))}
            </div>


            {/* <div className=" " style={{position:"absolute", width:"100%", height:"100%", }} >
               <Image className=" blur " 
               src={`${urlImage}${item.backdrop_path}`} 
               alt={item.original_title} 
               fill={true}
               sizes="(max-width: 768px) 100vw, 33vw"
               style={{ objectFit: "cover", zIndex: "0",   }}  />
               </div> */}
        </div>
    )
}