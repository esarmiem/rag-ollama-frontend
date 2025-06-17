"use client"

import { motion } from "framer-motion"
import { MessageSquare, Upload, FileSearch, List, RotateCcw, Database } from "lucide-react"
import Link from "next/link"
import { useAppContext } from "@/context/AppContext"
import { useEffect } from "react"
import { listPdfs } from "@/lib/api"

export default function Dashboard() {
  const { dbStatus, currentPdf, setCurrentPdf } = useAppContext()

  useEffect(() => {
    const loadCurrentPdf = async () => {
      try {
        const response = await listPdfs()
        if (response.files && response.files.length > 0) {
          setCurrentPdf(response.files[0].name)
        } else {
          setCurrentPdf(null)
        }
      } catch (error) {
        console.error("Error loading PDFs:", error)
        setCurrentPdf(null)
      }
    }

    loadCurrentPdf()
  }, [setCurrentPdf])

  const menuItems = [
    {
      title: "Chat modelo base",
      description: "Conversa con la IA base",
      icon: <MessageSquare className="w-8 h-8" />,
      href: "/dashboard/chat",
      color: "bg-blue-500",
    },
    {
      title: "Chat modelo entrenado",
      description: "Haz preguntas a base de información",
      icon: <FileSearch className="w-8 h-8" />,
      href: "/dashboard/ask-pdf",
      color: "bg-purple-500",
    },
    {
      title: "Chat con OpenAI",
      description: "Consulta sobre tus datos usando OpenAI",
      icon: <FileSearch className="w-8 h-8" />,
      href: "/dashboard/ask-pdf-openai",
      color: "bg-green-500",
    },
    {
      title: "Subir PDF",
      description: "Carga un nuevo documento PDF",
      icon: <Upload className="w-8 h-8" />,
      href: "/dashboard/upload",
      color: "bg-green-500",
    },
    {
      title: "Listar bases de conocimiento",
      description: "Ve todos los documentos subidos",
      icon: <List className="w-8 h-8" />,
      href: "/dashboard/list-pdfs",
      color: "bg-orange-500",
    },
    {
      title: "Resetear DB",
      description: "Limpia la base de datos",
      icon: <RotateCcw className="w-8 h-8" />,
      href: "/dashboard/reset-db",
      color: "bg-red-500",
    },
    {
      title: "Estado de la DB",
      description: "Verifica el estado de la base de datos",
      icon: <Database className="w-8 h-8" />,
      href: "/dashboard/db-status",
      color: "bg-indigo-500",
    },
  ]

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido a Experian-AI (admin)</h1>
        <p className="text-gray-600">Selecciona una opción para comenzar a trabajar con tus documentos</p>
      </motion.div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Estado de la Base de Datos</h3>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${dbStatus ? "bg-green-500" : "bg-red-500"}`} />
            <span className="text-gray-600">{dbStatus ? "Conectada" : "Desconectada"}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Ultimo base cargada</h3>
          <p className="text-gray-600">{currentPdf || "Ningún PDF cargado"}</p>
        </motion.div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Link href={item.href}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="card p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
              >
                <div className={`${item.color} w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
