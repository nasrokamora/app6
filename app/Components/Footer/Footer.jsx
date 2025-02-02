import { LinkFooter } from "@/app/libs/DataLink";
import Link from "next/link";
import TmdbIcon from "../../../public/image/tmdb-image.png"
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";

export default function Footer() {
    return (
        <footer className="font-semibold relative footer-center gap-2 p-10  bg-[#09090b] text-base-100 rounded z-40 w-full footer">

            <aside className="text-center text-base">
                <p className="font-semibold text-base-content">
                    Copyright © 2024 - All rights reserved by Nas@Dev, Nasreddine Abdellouche
                </p>
                <ul className="flex justify-center gap-3 items-center">
                    <li>
                        <Link href={'https://www.linkedin.com/in/nasdev'} target="_blank" rel="noopener noreferrer " className="hover:text-[#0a66c2] hover:duration-300">
                            <FaLinkedin size={32} />
                        </Link>

                    </li>
                    <li>
                        <Link href={'https://github.com/nasrokamora'} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:duration-300">
                            <FaGithub size={32} />
                        </Link>
                    </li>

                    <li>
                        <Link href={'tel:+213670228131'} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 hover:duration-300" >
                            <IoCall size={32} />
                        </Link>

                    </li>
                    <li>
                        <Link href={'https://wa.me/213670228131'} target="_blank" rel="noopener noreferrer" className="hover:text-green-500 hover:duration-300" >
                            <IoLogoWhatsapp size={32} />
                        </Link>

                    </li>

                </ul>
            </aside>

            <section className="flex justify-start gap-3 items-center ">
                <p className="text-sm text-base-content">
                    This product uses the{" "}
                    <Link
                        href="https://www.themoviedb.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-400"
                    >
                        TMDB API
                    </Link>{" "}
                    but is not endorsed or certified by TMDB.
                </p>
                <div className="flex justify-center mt-2">
                    <Image
                        src={TmdbIcon}
                        alt="TMDB Logo"
                        width={80}
                        height={40}
                        className="mx-auto"
                        priority
                        style={{ width: "auto", height: "auto" }}
                    />
                </div>
            </section>
        </footer>
    )
}