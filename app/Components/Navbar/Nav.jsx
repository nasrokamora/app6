import { Button } from "@/components/ui/button"
import { TfiMenu } from "react-icons/tfi";
import Link from "next/link"
import { DataLink } from "@/app/libs/DataLink";
import LogoIcon from '../../../public/icon/Icon.png'
import Image from "next/image"
import { cn } from "@/lib/utils";
import NavMenu from "./NavBar";
import Profile from "@/app/libs/Profile";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react"
import { Suspense } from "react";
import SearchMultiPage from "@/app/(movies)/Components/SearchMulti/SearchMultiPage";
import { IoCloseCircleSharp } from "react-icons/io5";
import FooterMenu from "../Footer/FooterMenu";
import ImageCloudinaryLoader from "@/app/libs/loader";


const TrendingMoviesLoad = dynamic(() => import("@/app/(movies)/Components/TrendingMovies/TrendingMoviesLoad"), {
  ssr: false,
});

export default function NavBar() {

  return (
    <NavMenu>
      <div className="w-full flex justify-between items-center pt-2 ">
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


          {/* Search */}
          <Suspense fallback={<Loader2 className="animate-spin" />}>
            <SearchMultiPage />
          </Suspense>
          <div className=" ">
            <div className="drawer drawer-end">
              <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">

                <label htmlFor="my-drawer-4" className="drawer-button">
                  <TfiMenu size={25} className="2xl:size-8 hover:text-red-700 hover:scale-110 duration-300 cursor-pointer" />
                </label>
              </div>
              <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-[#09090b] text-slate-400 min-h-full md:w-full w-[55%] lg:w-10/12  p-4 pt-3 ">
                  <label htmlFor="my-drawer-4" aria-label="close sidebar" className="">
                    <IoCloseCircleSharp size={25} className="cursor-pointer hover:text-red-500 transition-all ease-in-out duration-300 md:active:scale-95 md:active:translate-y-0.5" />
                  </label>

                  <div className="flex justify-center items-center gap-2 pb-2 w-full">
                    <Image src={LogoIcon} alt="Magix_Movies_Logo" width={25} hieght={25} className="lg:w-10 lg:h-10" />
                    <h1 className="text-xl lg:text-2xl text-center font-bold bg-gradient-to-r from-[#b62323] via-[#9c40ff] to-[#b62323] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">Magix Movies</h1>
                  </div>
                  <p className="text-center font-bold italic  mb-4 w-full">The Best of Movies and TV</p>
                  {/* Sidebar content here */}
                  <div className="flex flex-col gap-2 justify-center items-center w-full">
                    {DataLink.map((item) => (
                      <div key={item.id} className=" py-4 ">
                        <div  className=" text-white">
                          <Link href={`${item.link}`} className="" htmlFor="my-drawer-4" aria-label="close sidebar">
                            <Button variant='outline' type='button' className="px-8 font-bold" >
                              {item.name}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Trending Movies */}
                  {/* Trending Movies */}
                  {/* <div className="">
                    <TrendingMoviesLoad />
                  </div> */}
                  {/* Footer */}
                    <div className="md:hidden">

                    <FooterMenu />
                    </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavMenu>
  );
}