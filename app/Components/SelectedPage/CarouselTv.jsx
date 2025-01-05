// "use client";
// import Image from "next/image";
// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     CarouselNext,
//     CarouselPrevious
// } from "@/components/ui/carousel";
// import { FaRegStar } from "react-icons/fa";
// import LoadingGenreButton from "../LoadingUi/LoadingGenreList";

// export default function CarouselTv  ({ dataTv, totalPages, currentPage, handlePageChange })  {
   
   
//    <div>
//         <div className="flex gap-2 items-center ml-28">
//             <h4>Select page</h4>
//             <select onChange={handlePageChange} value={currentPage}>

//                 {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
//                     <option value={page} key={page}>
//                         {page}
//                     </option>
//                 )
//                 )}

//             </select>
//             <div>
//                 {/* {isLoading ? <LoadingGenreButton /> : null} */}

//                 <div className=" mt-8 flex justify-center w-full">
//                     <Carousel opts={{
//                         align: "start",
//                         loop: true,
//                     }} className=" md:w-[60%] xl:w-[80%]   w-[80%]">
//                         <CarouselContent className="   ">
//                             {dataTv.map((tv) => (

//                                 <CarouselItem key={tv.id} className="  basis-1/7 lg:basis-1/5 md:basis-1/2  ">
//                                     <div className="">
                                        
//                                         <Image
//                                             src={`https://image.tmdb.org/t/p/original${tv.poster_path}`}
//                                             alt={tv.title}
//                                             width={100} height={100}
//                                             className=" md:w-[150px] h-[200px] lg:w-[200px] lg:h-[200px] xl:w-[120px] xl:h-[150px] 2xl:w-[150px] 2xl:h-[150px]  "
//                                             priority={true} />
//                                         <p className=" font-bold flex justify-start  pt-2 mb-1">{tv.name.length > 14 ? tv.name.slice(0, 14) + "..." : tv.name}</p>
//                                         <div className=" flex justify-between items-center w-full">
//                                             <p className=" fonb flex justify-between items-center w-full">
//                                                 {new Date(tv.first_air_date).getFullYear()}
//                                             </p>
//                                             <div className=" ">
//                                                 <div className=" space-x-1 flex justify-between items-center">
//                                                     <FaRegStar className="text-[#FFC300]" />
//                                                     <span className="">
//                                                         {tv.vote_average.toFixed(1)}
//                                                     </span>
//                                                 </div>
//                                             </div>

//                                         </div>

//                                     </div>
//                                 </CarouselItem>
//                             ))}
//                         </CarouselContent>
//                         <CarouselPrevious />
//                         <CarouselNext />
//                     </Carousel>
//                 </div>
//             </div>
//         </div>
//     </div>;
// };
