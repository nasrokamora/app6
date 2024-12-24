
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { IoLogInOutline, IoPersonAddOutline } from "react-icons/io5";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export default function LogIn() {

    return (
        <div className=" flex gap-8 md:gap-2 font-bold  w-full justify-center items-center mb-2 md:border-none">
            <LoginLink className="flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  bg-black shadow hover:bg-black/90 h-9 px-4 py-2 max-w-52 whitespace-pre  group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-black hover:ring-offset-2 md:hidden 2xl:font-extrabold 2xl:text-xl" >
                <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
                {/* <IoLogInOutline size={25} className="hover:scale-110 transition-transform duration-300" /> */}
                <span className=" md:hidden ">Log in</span>
            </LoginLink>
            <RegisterLink
                className="  flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-white text-slate-950 shadow hover:bg-white/90 h-9 px-6 py-2 max-w-52 whitespace-pre md:hidden group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-black hover:ring-offset-2 2xl:font-bold 2xl:text-xl 2xl:px-12">
                <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-black opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
                <span className="font-bold text-black lg:hidden xl:hidden 2xl:hidden ">
                    <IoPersonAddOutline size={25} className=" md:hidden" />
                </span>
                <span className="  md:hidden">Sign up for free</span>
            </RegisterLink>
            <div className="lg:hidden xl:hidden 2xl:hidden">

                <DropdownMenu className="" >
                    <DropdownMenuTrigger>
                        <IoLogInOutline size={30} className="hover:scale-110 transition-transform active:scale-95 text-white " />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-auto">
                        <DropdownMenuItem>
                            <LoginLink className="text-subtle font-semibold border p-2 rounded-md active:scale-95 ">
                                Log in
                            </LoginLink>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className=" ">
                            <RegisterLink className="text-subtle font-semibold border p-2 rounded-md text-slate-950 bg-white  active:scale-95">
                                Sign up for free
                            </RegisterLink>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}