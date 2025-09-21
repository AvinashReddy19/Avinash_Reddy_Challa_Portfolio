import { Inter } from "next/font/google"
import { Metadata } from "next"

import "./globals.css"
import { Providers } from "./providers"
import { Navbar } from "@/app/layout/navbar"
import { Footer } from "@/app/layout/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Avinash Reddy Challa | AI Engineer & Software Developer",
  description: "Portfolio website of Avinash Reddy Challa, an AI Engineer and Software Developer specializing in AI and full-stack development.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}