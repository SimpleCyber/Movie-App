import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "MovieApp - Discover Movies & Build Your Watchlist",
  description:
    "Transform the way you discover and save movies. Built with React Native, featuring TMDB API integration, personalized recommendations, and seamless watchlist management.",
  keywords: "movie app, react native, tmdb api, movie recommendations, watchlist, mobile app",
  authors: [{ name: "Satyam Yadav" }],
  openGraph: {
    title: "MovieApp - Discover Movies & Build Your Watchlist",
    description: "Transform the way you discover and save movies with our React Native app.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} ${poppins.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
