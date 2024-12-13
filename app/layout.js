
// import { Doppio_One, Inter } from "next/font/google";
import "./globals.css";
// import Navbar from "./Components/Navbar/NavBar";
import Footer from "./Components/Footer/Footer";
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils";
import Nav from "./Components/Navbar/Nav";





// const inter = Inter({ subsets: ["latin"] });
// const doppioOne = Doppio_One({ subsets: ["latin"], weight: "400" });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
})


export const metadata = {
  title: "Magix Movies",
  description: "movies app",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({ children }) {
  return (


      <html lang="en" suppressHydrationWarning
        className="dark">
        <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>

          <Nav />
          {children}

          <Footer />
        </body>

      </html>

  );
}
