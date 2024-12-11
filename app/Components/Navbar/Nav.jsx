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
import TrendingMovies from "@/app/(movies)/Components/TrendingMovies/TrendingMovies";
import SearchMultiPage from "@/app/(movies)/Components/SearchMulti/SearchMultiPage";
import LogIn from "@/app/api/(auth)/@signUp/page";
import {LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  LogOut,
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { VscAccount } from "react-icons/vsc";
import LogoIcon from '../../../public/icon/Icon.png'
import Image from "next/image"
// import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { cn } from "@/lib/utils";
// import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
// import { ChevronRight } from "lucide-react";
// import SparklesText from "@/components/ui/sparkles-text";
// import GradualSpacing from "@/components/ui/gradual-spacing";
// import GenresListMovies from "@/app/(movies)/Components/GenresListMovies/GenresListMovies";
import FetchUserSession from "@/app/api/auth/UserSession/FetchUserSession";





export default async function NavBar() {
  const { isAuthenticated, user } = await FetchUserSession();


  return (
    <div className=" px-6  navbar border-b   md:flex  md:items-center flex justify-between items-center">


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
        {!isAuthenticated ? (
          <LogIn />
        ) : (
          <DropdownMenu className=" ">
            <DropdownMenuTrigger className=" rounded-full  border"><VscAccount size={23} className=" mb-1" /></DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto">
              {user?.picture && (
                <div>
                  <DropdownMenuLabel className=" flex justify-between items-center gap-4">

                    <Avatar>
                      <AvatarImage src={user?.picture} />
                      <AvatarFallback>
                        {user?.given_name.slice(0, 3)}
                      </AvatarFallback>
                    </Avatar>
                    {user?.given_name}
                    {user?.family_name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogoutLink className="text-subtle p-1 flex">
                      <LogOut className="mr-2 h-4 w-4" />
                      LOGOUT
                    </LogoutLink>


                  </DropdownMenuItem>
                </div>
              )}

            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {/* Genres */}
        {/* <div className="">
          <GenresListMovies />
        </div> */}
        {/* Search */}
        <div className=" ">
          <SearchMultiPage />
        </div>
        <div className=" ">

          <Sheet className="">
            <SheetTrigger><TfiMenu size={25} /></SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Magix Movies</SheetTitle>
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
  );
}