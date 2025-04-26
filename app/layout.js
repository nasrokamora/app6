import "./globals.css";
import Footer from "./Components/Footer/Footer";
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils";
import Nav from "./Components/Navbar/Nav";
import NextTopLoader from "nextjs-toploader";
import openGraph from "../public/opengraph-image.jpg"
import JsonLDSchema from "./Components/Seo/JsonLDSchema";



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
})


export const metadata = {
  title: "Magix Movies - Your Ultimate Movie & Series Hub",
  description:
    "Magix Movies stands as the ultimate hub for premium movie and series insights, delivering in-depth reviews, ratings, and tailored recommendations for every enthusiast.",
  keywords: [
    "Magix Movies",
    "Nasreddine Abdellouche",
    "nasreddine abdellouche",
    "nasreddine AB",
    "Nasreddine ab",
    "Nas@Dev",
    "nasrokamora",
    "nasdev",
    "magix movies",
    "magix movies vercel",
    "nasreddine ab magix movies",
    "movies",
    "series",
    "entertainment",
    "film reviews",
    "TV show reviews",
    "best movies",
    "best movies 2024",
    "best series 2024",
    "best films",
    "best films 2024",
    "best TV shows",
    "best TV shows 2024",
    "top movies",
    "top series",
    "top films",
    "top TV shows",
    "best movies action 2025",
    "best series drama 2025",
    "best movies action 2024",
    "best series drama 2024",
    "best movies adventure 2025",
    "best movies adventure 2024",
    "best films comedy 2025",
    "best TV shows horror 2025",
    "best series",
    "cinema ratings",
    "custom recommendations",
    "top-rated films",
    "binge-worthy series",
    "movie streaming",
    "latest movies 2024",
    "trending series 2024",
    "online movie platform",
    "TV show platform"
  ],
  authors: [{ name: "Nasreddine Abdellouche" }],
  creator: "Nasreddine Abdellouche",
  openGraph: {
    title: "Magix Movies - Your Ultimate Movie & Series Hub",
    description:
      "Discover premium movie and series insights with in-depth reviews, ratings, and personalized recommendations at Magix Movies.",
    url: "https://magix-movies.vercel.app/",
    siteName: "Magix Movies",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: openGraph.src,
        width: 1200,
        height: 630,
        alt: "Magix Movies"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Magix Movies - Your Ultimate Movie & Series Hub",
    description:
      "Discover premium movie and series insights with in-depth reviews, ratings, and personalized recommendations at Magix Movies.",
    site: "",
    creator: "",
    images: [
      {
        url: openGraph.src,
        alt: "Magix Movies"
      }
    ]
  },
  icons: {
    icon: "/favicon.ico"
  },

  alternates: {
    canonical: "https://magix-movies.vercel.app/"
  },

  metadataBase: new URL("https://magix-movies.vercel.app/"),

  other: {
    portfolio: "https://nasreddine-abdellouche.vercel.app/",
    linkedIn: "https://linkedin.com/in/nasdev",
    github: "https://github.com/nasrokamora",
    linktree: "https://linktr.ee/nasreddine_ab"
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
        <JsonLDSchema />
        <Nav /> 

        {children}

        <Footer />
      </body>
    </html>

  );
}
