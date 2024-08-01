import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";


export default async function Dashboard() {
    // const session = await getKindeServerSession(req)
    
    return (
        <div className=" w-full h-screen text-3xl flex justify-center items-center flex-col gap-3">
            <h1>This is page Dashboard</h1>
            <div className=" rounded-md btn-outline border p-3">
            {}


            <LogoutLink>Log out</LogoutLink>
            </div>
        </div>
    )
}