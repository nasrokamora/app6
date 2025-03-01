"use client";

import { Button } from "@/components/ui/button";





export default function DialogMoviesOverwiew({details}){
  return(
   <div className=" lg:hidden xl:hidden 2xl:hidden ">

    


{/* <Button variant="outline" className=" p-1" onClick={()=>document.getElementById('my_modal_1').showModal()}>Overview</Button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box bg-black/30 backdrop-blur">
    <h3 className="font-bold text-lg text-red-700">{details?.original_title || "No title available"}</h3>
    <p className="py-4 text-muted-foreground">{details?.overview || "No description available"}</p>
    <div className="modal-action">
      <form method="dialog">
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog> */}
   </div>
  )
}