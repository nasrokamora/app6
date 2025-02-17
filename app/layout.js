
// import { Doppio_One, Inter } from "next/font/google";
import "./globals.css";
// import Navbar from "./Components/Navbar/NavBar";
import Footer from "./Components/Footer/Footer";
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils";
import Nav from "./Components/Navbar/Nav";
import NextTopLoader from "nextjs-toploader";
import { SpeedInsights } from "@vercel/speed-insights/next"



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
})


export const metadata = {
  title: "Magix Movies - Your Ultimate Movie & Series Hub",
  description:
    "Magix Movies, crafted by Nasreddine Abdellouche, is your go-to platform for premium movie and series insights. Explore in-depth reviews, ratings, and personalized recommendations tailored to your preferences.",
  keywords: [
    "Magix Movies", "Nasreddine Abdellouche", "movies", "series",
    "entertainment", "film reviews", "TV show reviews", "best movies",
    "best series", "cinema ratings", "custom recommendations",
    "top-rated films", "binge-worthy series", "movie streaming",
    "latest movies 2024", "trending series 2024", "online movie platform",
    "TV show platform"
  ],
  author: "Nasreddine Abdellouche",
  links: {
    portfolio: "https://nasreddine-abdellouche.vercel.app/",
    linkedIn: "https://linkedin.com/in/nasdev",
    github: "https://github.com/nasrokamora",
    linktree: "https://linktr.ee/nasreddine_ab",
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
        {children}
        <SpeedInsights />
        <Footer />
      </body>
    </html>

  );
}
