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