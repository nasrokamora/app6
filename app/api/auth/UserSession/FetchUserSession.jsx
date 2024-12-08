"use server"


import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


export default async function FetchUserSession() {
    const {getUser, isAuthenticated} = getKindeServerSession();
        return {
            isAuthenticated: await isAuthenticated(),
            user: await getUser()
        }

}