"use client"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { useState } from "react";
import { FiAlignRight } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { DataLink } from "@/app/libs/DataLink";
import Link from "next/link";
  

export default function Nav(){
    const [isShow, setIsShow] = useState(false);

    const handleActive = () => {
        setIsShow(!isShow);
    }


    return(
      <div>
        <Sheet className=" ">
  <SheetTrigger className=" toggle-menu  lg:hidden xl:hidden 2xl:hidden 3xl:hidden h-auto">
  <FiAlignRight size={28} className="" />
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetClose  onClick={handleActive}>
      {/* <SheetTitle>Are you absolutely sure?</SheetTitle> */}
        <SheetDescription className=" mt-10 " >
      {DataLink.map((item, index) => (
                        <div key={index}  
                            className="  btnf pt-14 ">
                            <Link href={item.link}  className="btnN from-left mt-8" onClick={handleActive}>{item.name}</Link>

                        </div>
                    ))}
      </SheetDescription>
      </SheetClose>
    </SheetHeader>
  </SheetContent>
</Sheet>
</div>
    )
}