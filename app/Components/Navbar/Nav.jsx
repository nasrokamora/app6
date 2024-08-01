// import SearchMultiPage from "@/app/(movies)/Components/SearchMulti/SearchMultiPage";
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
export default function NavBar() {
  return (
    <div className=" px-6 z-10 navbar  border-b md:flex  md:items-center flex justify-between items-center">
      <div className=" scroll-m-20 text-2xl font-extrabold underline-offset-2 underline decoration-red-900 bg-clip-text text-transparent bg-gradient-to-tl from-blue-600 via-white-[30%] to-red-500 tracking-tight">
        <Link href={'/'}>Magix Movies</Link>
      </div>
      <div className=" flex justify-between items-center gap-6">
        {/* <div>
          <LogIn />
        </div> */}
        <div className=" order-2">

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
              <ul key={index} className=" py-4 ">
                <li className=" flex justify-center w-full">
                <SheetClose asChild >
                <Link href={`${item.link}`} rel="noreferrer" className="  w-1/2  flex flex-col" >
                  <Button variant='outline'  type='button'>
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

      <div className=" order-1">
        <SearchMultiPage />
      </div>
            </div>
    </div>
  );
}