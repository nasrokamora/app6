import { RiMovieLine } from "react-icons/ri";
import { BiCameraMovie } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
export const DataLink = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "Tv Show",
        link: "/TvShow"
    },
    {
        name: "Movies",
        link: "/Movies"
        
    },

]


export const IconMD = [
    {
        icon:<RiMovieLine  size={28}/> ,
        id:1,
        name: "Movie"
    },
    {
        icon:<BiCameraMovie  size={28}/> ,
        id:2,
        name: "TV SERIES"
    },
    {
        icon:<FaSearch  size={28}/> ,
        id:3,
        name: "SEARCH",
        path: "/search"
    }

]