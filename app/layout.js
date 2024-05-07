// import { Doppio_One, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar/NavBar";
import Footer from "./Components/Footer/Footer";
import { ThemeProvider } from "./Components/theme-provider";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils";
import Nav from "./Components/Navbar/Nav";

// const inter = Inter({ subsets: ["latin"] });
// const doppioOne = Doppio_One({ subsets: ["latin"], weight: "400" });

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export const metadata = {
  title: "Magix Movies",
  description: "movies app",
  icons: {
    icon:"/favicon.ico",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>

      {/* <Navbar /> */}
      <Navbar/>
        {children}
        <Footer/>

        </body>
    </html>
  );
}
