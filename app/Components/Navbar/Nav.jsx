import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { TfiMenu } from "react-icons/tfi";
import Link from "next/link"
import { DataLink } from "@/app/libs/DataLink";
// import TrendingMovies from "@/app/(movies)/Components/TrendingMovies/TrendingMovies";
// import SearchMultiPage from "@/app/(movies)/Components/SearchMulti/SearchMultiPage";
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
            </Sheet>
          </div>
        </div>
      </div>
    </NavMenu>
  );
}