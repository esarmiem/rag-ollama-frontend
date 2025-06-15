import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EXP-AI - Tu asistente inteligente para documentos PDF",
  description: "Analiza y consulta tus documentos PDF con inteligencia artificial",
  generator: 'v0.dev',
  icons: {
    icon: '/logoexperian.png',
    apple: '/logoexperian.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#fff",
              color: "#374151",
              border: "1px solid #E5E7EB",
            },
          }}
        />
      </body>
    </html>
  )
}
