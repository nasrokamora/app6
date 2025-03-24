import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";

import { VscAccount } from "react-icons/vsc";
import FetchUserSession from "../api/auth/UserSession/FetchUserSession";
import LogIn from "../api/(auth)/@signUp/page";
import Image from "next/image";
import { TbLogout2 } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";


export default async function Profile() {
    const { user, isAuthenticated } = await FetchUserSession();
    return (
        <div className=" mt-[0.5rem] ">
            {!isAuthenticated ? (
                <div className="">
                    <LogIn />
                </div>
            ) : (

                <div className="dropdown dropdown-end dropdown-bottom  ">
                    <div tabIndex={0} role="button" className="m-1">
                        <VscAccount size={23} className="mb-1 hover:scale-110 transition-transform  hover:animate-pulse hover:duration-700 hover:text-green-500" />
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-[#09090b] rounded-box z-[1] w-52 p-2 shadow">
                        <div className="">

                            {user?.picture && (
                                <div className="flex flex-col gap-2">


                                    <div className=" w-full flex justify-start items-center gap-3 ">
                                        <Image src={user?.picture} alt="avatar" width={48} height={48} className="rounded-full" />
                                        <h1 className=" font-semibold">
                                            {user?.given_name} {user?.family_name}
                                        </h1>
                                    </div>


                                    <>
                                        <LogoutLink className="text-subtle ">
                                            <button className="relative overflow-hidden flex items-center justify-center px-4 py-2 rounded-full text-white font-semibold bg-red-500 hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:shadow-lg active:scale-95 sm:text-sm md:text-base">
                                                <span className="mr-2">
                                                    Logout
                                                </span>
                                                <TbLogout2 className="transition-transform duration-300 group-hover:rotate-12 font-semibold" size={20} />
                                                <span
                                                    className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300 ease-in-out" />
                                            </button>
                                            {/* 
                                        <button
                                            className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
                                        >
                                            <div
                                                className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3"
                                            >
                                                <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                                                    <path
                                                        d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <div
                                                className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                            >
                                                Logout
                                            </div>
                                        </button> */}

                                        </LogoutLink>
                                    </>
                                </div>
                            )}
                        </div>
                    </ul>
                </div>

            )}
        </div>
    )
}