import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";


export default async function LogIn() {
    // const {getUser} = getKindeServerSession();
    // const user = await getUser();
    
    // console.log(user);

    
    return (
        <div className=" flex gap-8">
            <LoginLink target="_blank">Sign in</LoginLink>
            <RegisterLink target="_blank">Sign up</RegisterLink>
        </div>
    )
}