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
                Log in
            </LoginLink>

            <RegisterLink
                className="flex items-center gap-2 p-3 text-gray-600 hover:text-blue-50 hover:bg-purple-600 rounded-full shadow-sm hover:shadow-md transition-all duration-500"
            >
                <IoPersonAddOutline size={25} className="hover:scale-125 transition-transform duration-500" />
                Sign up
            </RegisterLink>

            <RegisterLink>
            
<div class="flex items-center justify-center">
  <div class="relative group">
    <button
      class="relative inline-block p-px font-semibold leading-6 text-white bg-neutral-900 shadow-2xl cursor-pointer rounded-2xl shadow-emerald-900 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-emerald-600"
    >
      <span
        class="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-600 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      ></span>
      <span class="relative z-10 block px-6 py-3 rounded-2xl bg-neutral-950">
        <div class="relative z-10 flex items-center space-x-3">
          <span
            class="transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-emerald-300"
            >Sign up</span
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-7 h-7 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-emerald-300"
          >
            <path
              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
            ></path>
          </svg>
        </div>
      </span>
    </button>
  </div>
</div>


            </RegisterLink>


        </div>
    )
}