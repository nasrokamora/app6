
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
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/types/server";




export default async function UserAvatar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();




  return (
    <div>
      {!(await isAuthenticated()) ? (
        <LogIn/>
      ):(
        
    <DropdownMenu>
      <DropdownMenuTrigger>My Account</DropdownMenuTrigger>
      <DropdownMenuContent>
        {user?.picture ? (
          <div>

          <DropdownMenuLabel>
            {user?.given_name}
            <Avatar>
              <AvatarImage src={user?.picture} />
              <AvatarFallback>
                {user?.given_name.slice(0, 3)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          </div>  
        ):(
          <DropdownMenuItem>
            <div>
            {user?.given_name}
            {user?.family_name}
            <LogoutLink className="text-subtle p-1 border">Log out</LogoutLink>
            </div>
          </DropdownMenuItem>
          
        )}

      </DropdownMenuContent>
    </DropdownMenu>
      )}
    </div>
  )

}