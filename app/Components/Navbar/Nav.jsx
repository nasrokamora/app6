import { Button } from "@/components/ui/button"
import { TfiMenu } from "react-icons/tfi";
import Link from "next/link"
import { DataLink } from "@/app/libs/DataLink";
import LogoIcon from '../../../public/icon/Icon.png'
import Image from "next/image"
import { cn } from "@/lib/utils";
import GenresListMovies from "@/app/(movies)/Components/GenresListMovies/GenresListMovies";
import NavMenu from "./NavBar";
import Profile from "@/app/libs/Profile";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react"
import { Suspense } from "react";
import TrendingMovies from "@/app/(movies)/Components/TrendingMovies/TrendingMovies";
import SearchMultiPage from "@/app/(movies)/Components/SearchMulti/SearchMultiPage";
import { IoCloseCircleSharp } from "react-icons/io5";
export default function NavBar() {

  return (
    <NavMenu>
      <div className="w-full flex justify-between items-center pt-2">
        <Link href={'/'} className=" flex justify-center items-center ">
          <Image
            src={LogoIcon}
            width={54}
            hieght={32}
            alt="Magix_Movies_Logo"
            className=""
          />
          <h1
            className={cn('text-center text-2xl font-bold   md:hidden  bg-gradient-to-r from-[#b62323] via-[#9c40ff] to-[#b62323] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient')}
            text="Magix Movies"
          >Magix Movies</h1>
        </Link>

        <div className=" flex justify-between items-center gap-6">
          <Profile />
          {/* Genres */}
          <div>
            <GenresListMovies />
          </div>

          {/* Search */}
          <Suspense fallback={<Loader2 className="animate-spin" />}>
            <SearchMultiPage />
          </Suspense>
          <div className=" ">
            <div className="drawer drawer-end">
              <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">

                <label htmlFor="my-drawer-4" className="drawer-button">
                  <TfiMenu size={25} className="2xl:size-8 hover:text-red-700 hover:scale-110 duration-300" />
                </label>
              </div>
              <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-[#09090b] text-slate-400 min-h-full md:w-10/12 w-1/2  p-4 mt-3">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="">
                <IoCloseCircleSharp />
                </label>

                  <div className="flex justify-center items-center gap-2 pb-2">
                    <Image src={LogoIcon} alt="Magix_Movies_Logo" width={25} hieght={25} />
                    <h1 className="text-xl text-center font-bold bg-gradient-to-r from-[#b62323] via-[#9c40ff] to-[#b62323] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">Magix Movies</h1>
                  </div>
                  <p className="text-center fonnt-bold italic  mb-4">The Best of Movies and TV</p>
                  {/* Sidebar content here */}
                  <div className="flex flex-col gap-2 justify-center items-center">
                    {DataLink.map((item, index) => (
                      <div key={item.id - index} className=" py-4 ">
                        <div className=" text-white">
                          <Link href={`${item.link}`}>
                            <Button variant='outline' type='button' className="px-8">
                              {item.name}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-10">
                  <TrendingMovies />
                  </div>
                  {/* <li><a>Sidebar Item 1</a></li>
                  <li><a>Sidebar Item 2</a></li> */}
                </ul>
              </div>
            </div>

            {/* 
            <Sheet className="">
              <SheetTrigger><TfiMenu size={25} className="2xl:size-8 hover:text-red-700 hover:scale-110 duration-300" /></SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="bg-gradient-to-r from-[#b62323] via-[#9c40ff] to-[#b62323] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">Magix Movies</SheetTitle>
                  <SheetDescription>The Best of Movies and TV</SheetDescription>
                </SheetHeader>
                <div className="w-full pt-5">
                  <SheetFooter>
                    {DataLink.map((item, index) => (
                      <ul key={item.id - index} className=" py-4 ">
                        <li className=" flex justify-center w-full">
                          <SheetClose asChild >
                            <Link href={`${item.link}`} rel="noreferrer" className="  w-1/2  flex flex-col" >
                              <Button variant='outline' type='button'>
                                {item.name}
                              </Button>
                            </Link>
                          </SheetClose>
                        </li>
                      </ul>
                    ))}
                  </SheetFooter>
                  <div className="mt-8">
                    <TrendingMovies />
                  </div>
                </div>
              </SheetContent>
            </Sheet> */}
          </div>
        </div>
      </div>
    </NavMenu>
  );
}