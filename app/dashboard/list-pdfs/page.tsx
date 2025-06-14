"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FileText, RefreshCw, Download } from "lucide-react"
import { listPdfs } from "@/lib/api"
import toast from "react-hot-toast"
import LoadingSpinner from "@/components/ui/LoadingSpinner"

interface PdfFile {
  name: string
  size_bytes?: number
  size_mb?: number
  last_modified?: number
  last_modified_human?: string
}

export default function ListPdfsPage() {
  const [pdfs, setPdfs] = useState<PdfFile[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchPdfs = async () => {
    setIsLoading(true)
    try {
      const response = await listPdfs()
      setPdfs(response.files || [])
    } catch (error) {
      toast.error("Error al cargar la lista de PDFs")
      console.error("List PDFs error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPdfs()
  }, [])

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lista de PDFs</h1>
          <p className="text-gray-600">Todos los documentos PDF que has subido al sistema</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchPdfs}
          disabled={isLoading}
          className="btn-secondary flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          Actualizar
        </motion.button>
      </motion.div>

      {isLoading ? (
        <div className="card p-8 text-center">
          <LoadingSpinner />
          <p className="text-gray-600 mt-4">Cargando lista de PDFs...</p>
        </div>
      ) : pdfs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card p-8 text-center"
        >
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay PDFs subidos</h3>
          <p className="text-gray-600 mb-6">Aún no has subido ningún documento PDF al sistema</p>
          <motion.a
            href="/dashboard/upload"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-block"
          >
            Subir primer PDF
          </motion.a>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pdfs.map((pdf, index) => (
            <motion.div
              key={pdf.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate mb-1">{pdf.name}</h3>

                  {pdf.size_mb && <p className="text-sm text-gray-600 mb-2">{pdf.size_mb} MB</p>}

                  {pdf.last_modified_human && (
                    <p className="text-xs text-gray-500">Subido: {pdf.last_modified_human}</p>
                  )}
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex-1 text-sm py-2"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
