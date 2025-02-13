import Image from "next/image";
import ContactLink from "./ContactLink";


export default function FooterMenu() {
  return (
    <footer className="flex justify-center w-80 md:justify-start pt-10  bg-transparent text-slate-400 p-4  flex-wrap">
      <div className=" text-center order-2 ">
        <p className=" font-semibold text-lg">Copyright © 2024 - <span className=" md:text-center">All rights reserved by Nas@Dev,</span>  Nasreddine Abdellouche.</p>
      </div>
      <div className=" order-1 flex justify-center items-center flex-wrap">
        <ContactLink />

      </div>
    </footer>
  )
}