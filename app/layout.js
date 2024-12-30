
// import { Doppio_One, Inter } from "next/font/google";
import "./globals.css";
// import Navbar from "./Components/Navbar/NavBar";
import Footer from "./Components/Footer/Footer";
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils";
import Nav from "./Components/Navbar/Nav";
import NextTopLoader from "nextjs-toploader";






// const inter = Inter({ subsets: ["latin"] });
// const doppioOne = Doppio_One({ subsets: ["latin"], weight: "400" });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
})


export const metadata = {
  title: "Magix Movies",
  description: "Explore the latest movies and series with detailed summaries, ratings, and reviews. Magix Movies is your ultimate destination for all things entertainment.",
  keywords: [
    "movies",
    "series",
    "movie reviews",
    "series reviews",
    "top movies",
    "top series",
    "movie ratings",
    "Nasreddine Abdellouche",
    "Nasreddine AB",
    "nasreddine ab",
    "Magix Movies",
    "entertainment",
  ],
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
          <Footer />

      </body>


    </html>

  );
}
