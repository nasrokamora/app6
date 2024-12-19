import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button"
import { cva } from "class-variance-authority";
import { IoLogInOutline, IoPersonAddOutline } from "react-icons/io5";
export default function LogIn() {

    return (
        <div className=" flex gap-8 md:gap-2 font-bold mb-4">
            <LoginLink className="flex items-center gap-2  text-gray-600" >
                <IoLogInOutline size={25} className="hover:scale-110 transition-transform duration-300" />
               <span className=" md:hidden">Log in</span> 
            </LoginLink>

            <RegisterLink
                className="flex items-center gap-2 p-3 text-gray-600 hover:text-blue-50 hover:bg-purple-600 rounded-full shadow-sm hover:shadow-md transition-all duration-500"
            >
                <IoPersonAddOutline size={25} className="hover:scale-125 transition-transform duration-500" />
               <span className=" md:hidden">Sign up</span> 
            </RegisterLink>
        </div>
    )
}