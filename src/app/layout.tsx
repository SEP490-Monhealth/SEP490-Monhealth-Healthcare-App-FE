import type { Metadata } from "next"
import { Poppins } from "next/font/google"

import { Toaster } from "@/components/globals/atoms/sonner"

import { QueryProvider } from "@/providers/QueryProvider"

import "../styles/globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins"
})

export const metadata: Metadata = {
  title: "Monhealth - Healthcare App",
  description: "Personalized Healthcare Application Based on Individual Needs"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <QueryProvider>
          <main>{children}</main>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  )
}
