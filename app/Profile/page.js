import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
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
import Image from "next/image"
import FetchUserSession from "../api/auth/UserSession/FetchUserSession";
import LogIn from "../api/(auth)/@signUp/page";



export default async function Profile() {
    const { user, isAuthenticated } = await FetchUserSession();
    return (
        <div className=" mt-[0.5rem]">
            {!isAuthenticated ? (
                <div className="">
                    <LogIn />
                </div>
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger className="rounded-full border">
                        <VscAccount size={23} className="mb-1" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-auto">
                        {user?.picture && (
                            <div>
                                <DropdownMenuLabel className="flex justify-between items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src={user?.picture} />
                                        <AvatarFallback>
                                            {user?.given_name.slice(0, 3)}
                                        </AvatarFallback>
                                    </Avatar>
                                    {user?.given_name} {user?.family_name}
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
        </div>
    )
}