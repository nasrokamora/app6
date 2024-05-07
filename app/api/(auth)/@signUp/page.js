import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";


export default  function LogIn() {


    
    return (
        <div className=" flex gap-8">
            <LoginLink target="blank">Sign in</LoginLink>
            <RegisterLink target="blank">Sign up</RegisterLink>
        </div>
    )
}