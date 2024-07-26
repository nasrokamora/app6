"use client"
import { useEffect, useState, useRef } from "react"
import { useInView } from "react-intersection-observer"
import styles from "./LoadMore.module.css"
import { fetchMovie } from "@/app/libs/Action"


let page = 2

export default function LoadMore(){
    const [data, setData] = useState([])
    const {inView } = useInView()

    
    useEffect(() => {
       if(inView){
        fetchMovie(2).then((res)=>{
            setData([...data, ...res])
            page++
        })
       } 
    },[inView,data])
}

return(
    <section>
        <p >Loading...</p>
        {data}
    </section>
)



