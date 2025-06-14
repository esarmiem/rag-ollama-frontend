"use client"

import { Menu, Bell, User } from "lucide-react"
import { useAppContext } from "@/context/AppContext"

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { currentPdf, dbStatus } = useAppContext()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          <div className="hidden lg:block">
            <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Status Indicators */}
          <div className="hidden md:flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${dbStatus ? "bg-green-500" : "bg-red-500"}`} />
              <span className="text-gray-600">DB: {dbStatus ? "Conectada" : "Desconectada"}</span>
            </div>

            {currentPdf && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-gray-600">PDF: {currentPdf}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
