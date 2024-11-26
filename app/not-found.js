"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation' 
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import magix_movies from "../public/TMDB_conver.jpg"
import { TbError404 } from "react-icons/tb";
import icon_magix from '../public/Icon_magix.png'

export default function NotFound() {
  const router = useRouter()  

  
  return (
    <div className='not-found w-full h-screen'>
      <div className=" relative overflow-hidden h-screen z-0  filter blur-sm">
        <Image src={magix_movies} alt="404" fill
        priority={true}
        style={{objectFit:"cover"}}
        placeholder='blur'
        />
      </div>
      <div className=" absolute top-40 left-0 right-0  z-10  ">
      <div className=' flex justify-center items-center gap-3   overflow-hidden'>
        <Image
        src={icon_magix} width={200} height={200} alt='icon'
        priority={true}
        placeholder='blur'

        />
      </div>
      <div className=' flex justify-center items-center gap-3 flex-col'>
      <div>
      <TbError404 size={100} />
      </div>
      <h2 className=' font-bold text-2xl'>  Not Found</h2>
      <p className='text-2xl font-bold glass text-center text-black italic'>The resource you requested could not be found. Please check the URL or go back to the homepage.

</p>
      <Button variant='outline' onClick={()=> router.back()}>Return Home page</Button>

      </div>
      </div>
    </div>
  )
}