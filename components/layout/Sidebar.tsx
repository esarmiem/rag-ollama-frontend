"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, MessageSquare, Upload, FileSearch, List, RotateCcw, Database, Home } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      title: "Modelo base",
      href: "/dashboard/chat",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      title: "Modelo entrenado",
      href: "/dashboard/ask-pdf",
      icon: <FileSearch className="w-5 h-5" />,
    },
    {
      title: "Subir PDF",
      href: "/dashboard/upload",
      icon: <Upload className="w-5 h-5" />,
    },
    {
      title: "Listar PDFs",
      href: "/dashboard/list-pdfs",
      icon: <List className="w-5 h-5" />,
    },
    {
      title: "Resetear DB",
      href: "/dashboard/reset-db",
      icon: <RotateCcw className="w-5 h-5" />,
    },
    {
      title: "Estado de la DB",
      href: "/dashboard/db-status",
      icon: <Database className="w-5 h-5" />,
    },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : -320,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 z-50 lg:relative lg:translate-x-0 lg:z-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logoexperian.png"
                alt="Experian AI"
                width={30}
                height={30}
                className="object-contain"
              />
            </Link>

            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link 
                    key={item.href} 
                    href={item.href} 
                    onClick={(e) => {
                      // Solo cerrar el sidebar en móvil
                      if (window.innerWidth < 1024) {
                        onClose()
                      }
                    }}
                  >
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className={isActive ? "text-blue-600" : "text-gray-500"}>{item.icon}</div>
                      <span className="font-medium">{item.title}</span>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-center text-sm text-gray-500">
              <p>Experian-AI v1.0</p>
              <p>Tu asistente inteligente</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
