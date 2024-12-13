import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"


import magixCover from '../../../public/TMDB_conver.jpg'
import LogIn from "@/app/api/(auth)/@signUp/page"


export default function Login() {
    return(
        <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${magixCover.src})`,
        }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md flex justify-center items-center flex-col">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <div className=" text-center">
  
            {/* <LogIn /> */}
            </div>
          </div>
        </div>
      </div>
    )
}