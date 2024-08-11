"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation' 
import { Button } from "@/components/ui/button"

export default function NotFound() {
  const router = useRouter()  
  
  
  return (
    <div className='not-found'>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Button variant='outline' onClick={()=> router.back()}>Return Home</Button>
    </div>
  )
}