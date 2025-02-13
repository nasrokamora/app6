import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";
import { SiLinktree } from "react-icons/si";
import Link from "next/link";

export default function ContactLink() {
    return(
        <ul className="flex justify-center gap-3 items-center duration-300">
        <li>
            <Link href={'https://www.linkedin.com/in/nasdev'} target="_blank" rel="noopener noreferrer " className="hover:text-[#0a66c2] duration-300">
                <FaLinkedin size={32} />
            </Link>

        </li>
        <li>
            <Link href={'https://github.com/nasrokamora'} target="_blank" rel="noopener noreferrer" className="hover:text-white duration-300">
                <FaGithub size={32} />
            </Link>
        </li>

        <li>
            <Link href={'tel:+213670228131'} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 duration-300" >
                <IoCall size={32} />
            </Link>

        </li>
        <li>
            <Link href={'https://wa.me/213670228131'} target="_blank" rel="noopener noreferrer" className="hover:text-green-500 duration-300"  >
                <IoLogoWhatsapp size={32} />
            </Link>

        </li>
        <li>
            <Link href={`https://linktr.ee/nasreddine_ab`} target="_blank" rel="noopener noreferrer" className="hover:text-[#3be76b] " >
                <SiLinktree size={32} />
            </Link>
        </li>

    </ul>
    )
}