
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { IoLogInOutline} from "react-icons/io5";
import { BiLogInCircle } from "react-icons/bi";
import { Separator } from "@/components/ui/separator"

export default function LogIn() {

    return (
        <div className=" dropdown dropdown-bottom  lg:dropdown-end xl:dropdown-end 2xl:dropdown-end  ">
            <div tabIndex={0} role="button" className=" m-1">
                <IoLogInOutline size={30} className="hover:scale-110 transition-transform active:scale-95 text-white " />
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-black/70 backdrop-blur rounded-box z-[1] w-52 p-4 shadow ">
                    <div className="flex w-full flex-col">
                <li>
                    <LoginLink className="group relative flex w-full max-w-52 items-center justify-center gap-3 overflow-hidden rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-all duration-300 ease-out hover:bg-blue-700 hover:ring-2 hover:ring-blue-600 hover:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50 ">
                        {/* Sliding animation element */}
                        <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />

                        {/* Login icon and text */}
                        <div className="flex items-center gap-2">
                            <BiLogInCircle className="h-5 w-5" />
                            <span>Login</span>
                        </div>

                        {/* User count (optional, you can remove this if not needed) */}
                        <div className="flex items-center gap-1">
                            <span className="font-display text-xs tabular-nums tracking-wider text-blue-200">1.2k</span>
                        </div>
                    </LoginLink>
                    </li>
                    {/* sepatator 2 button */}
                    <Separator className="my-4" />
                <li>

                    {/*  sign up button */}
                    <RegisterLink className="group relative flex w-full max-w-52 items-center justify-center gap-3 overflow-hidden rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow transition-all duration-300 ease-out hover:bg-green-700 hover:ring-2 hover:ring-green-600 hover:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 disabled:pointer-events-none disabled:opacity-50">
                    <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
                        <div className="flex items-center gap-2">
  
                            <span>
                            Sign up for free
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-display text-xs tabular-nums tracking-wider text-blue-200">10k+</span>
                        </div>
                    </RegisterLink>
                </li>
                    </div>
            </ul>
        </div>
    )
}