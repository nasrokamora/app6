
// import { Doppio_One, Inter } from "next/font/google";
import "./globals.css";
// import Navbar from "./Components/Navbar/NavBar";
import Footer from "./Components/Footer/Footer";
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils";
import Nav from "./Components/Navbar/Nav";
import NextTopLoader from "nextjs-toploader";
import { MediaProvider } from "./Context/MediaContext";
import { ContextProvider, MediasProvider } from "./Context/ContextMedia";



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
})


export const metadata = {
  title: "Magix Movies |",
  description: 
    "Magix Movies is a premium platform designed by Nasreddine Abdellouche, offering curated content for movie and series enthusiasts. Dive into detailed reviews, ratings, and recommendations tailored to your taste.",
  keywords: [
    "Magix Movies", "Nasreddine Abdellouche", "movies", 
    "series", "entertainment", "movie reviews", "series reviews", 
    "top movies", "top series", "Nasreddine AB","nasreddine AB", "movie ratings", 
    "series ratings", "customized recommendations", 
    "2024 movies", "2024 series", "movie platform", "series platform"
  ],
  author: "Nasreddine Abdellouche",
  team: {
    founder: "Nasreddine Abdellouche",
    executiveDirector: "Nasreddine Abdellouche",
    uiDesigner: "Nasreddine Abdellouche",
    developer: "Nasreddine Abdellouche",
    contentCurator: "Nasreddine Abdellouche",
  },
  links: {
    portfolio: "https://nasreddine-abdellouche.vercel.app/",
    linkedIn: "https://linkedin.com/in/nasdev",
    github: "https://github.com/nasrokamora",
  },
  
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({ children }) {
  return (


    <html lang="en" suppressHydrationWarning
      className="dark">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        <NextTopLoader
          color="#d50634"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #a632aa,0 0 5px #9c39ed"
        />

        <Nav />
        <ContextProvider>
        {children}
        </ContextProvider>
        <Footer />

      </body>


    </html>

  );
}
