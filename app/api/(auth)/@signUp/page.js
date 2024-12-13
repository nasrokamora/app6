import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";


export default  function LogIn() {
   
    return (
        <div className=" flex gap-8 font-bold ">
            <LoginLink className="border p-2 border-slate-600 rounded-lg" >Sign in</LoginLink>
            <RegisterLink className="border p-2 border-slate-600 rounded-lg" >Sign up</RegisterLink>
        </div>
    )
}