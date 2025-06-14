"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Sidebar from "@/components/layout/Sidebar"
import Header from "@/components/layout/Header"
import { AppProvider } from "@/context/AppContext"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setSidebarOpen(true)
      } else {
        setSidebarOpen(false)
      }
    }

    // Ejecutar al montar el componente
    handleResize()

    // Agregar listener para cambios de tamaño
    window.addEventListener('resize', handleResize)

    // Limpiar listener al desmontar
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <AppProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
            <div className="w-full">{children}</div>
          </main>
        </div>
      </div>
    </AppProvider>
  )
}
