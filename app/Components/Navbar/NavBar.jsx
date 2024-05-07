"use client"
import { DataLink, IconMD } from "@/app/libs/DataLink";
import Link from "next/link";
import ToggleMenu from "./ToggleMenu";
import style from './navbar.modules.css'
import { ModeToggle } from "../theme/ToggleTheme";
import { Input } from "@/components/ui/input"
import Search from "../Search/Search";
import Icon from '../../../public/icon/Icon.png'

// import Nav from "./Nav";
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
import Image from "next/image";
import SignUp from "@/app/api/(auth)/@signUp/page";


export default function Navbar() {
    const [isShow, setIsShow] = useState(false);

    const handleActive = () => {
        setIsShow(!isShow);
    }


    return (
        <header className=" z-[10] relative  md:w-full md:fixed  ">
            <nav className="  navbar  flex justify-between items-center   glass font-semibold ">
                <div className=" lg:hidden xl:hiden 2xl:hidden 3xl:hidden">
                    <Link href={'/'} className=" text-[1.5rem] font-bold ml-6">
                        Magix&nbsp;Movies
                    </Link>

                </div>
                <div className=" flex gap-8 md:hidden">
                    {DataLink.map((item, index) => (
                        <div className='' key={index}>
                            <Link href={item.link} className={`flex justify-around items-center gap-4 ${style.from_left}`}>{item.name}</Link>
                        </div>
                    ))}
                    <div className=" h-fit w-fit">
                    <SignUp />

                    </div>
                </div>

                <Search />
                <div className=" mr-6 flex gap-4 lg:hidden xl:hidden 2xl:hidden 3xl:hidden">
                    {IconMD.map((icon)=> (
                        <div key={icon.id} className=" flex items-center gap3">
                            {icon.icon}
                        </div>
                    ))}
                </div>

            </nav>
        </header>
    );
}
