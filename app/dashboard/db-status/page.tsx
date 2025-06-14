"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Database, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { checkDbStatus } from "@/lib/api"
import { useAppContext } from "@/context/AppContext"
import toast from "react-hot-toast"
import LoadingSpinner from "@/components/ui/LoadingSpinner"

interface DbStatusInfo {
  status: string
  collections_count: number
  db_path: string
  db_exists: boolean
  db_empty: boolean
}

export default function DbStatusPage() {
  const [statusInfo, setStatusInfo] = useState<DbStatusInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { dbStatus, setDbStatus } = useAppContext()

  const fetchStatus = async () => {
    setIsLoading(true)
    try {
      const response = await checkDbStatus()
      setStatusInfo(response)
      setDbStatus(response.status === "success")
    } catch (error) {
      toast.error('Error al verificar el estado de la base de datos')
      console.error('DB Status error:', error)
      setDbStatus(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Estado de la Base de Datos</h1>
          <p className="text-gray-600">
            Información detallada sobre el estado y conexión de la base de datos
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchStatus}
          disabled={isLoading}
          className="btn-secondary flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Actualizar
        </motion.button>
      </motion.div>

      {isLoading ? (
        <div className="card p-8 text-center">
          <LoadingSpinner />
          <p className="text-gray-600 mt-4">Verificando estado de la base de datos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Status Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                statusInfo?.status === "success" ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {statusInfo?.status === "success" ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-600" />
                )}
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Estado General
                </h3>
                <p className={`text-lg font-medium ${
                  statusInfo?.status === "success" ? 'text-green-600' : 'text-red-600'
                }`}>
                  {statusInfo?.status === "success" ? 'Conectada' : 'Desconectada'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Connection Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                Detalles de Conexión
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Estado de conexión:</span>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    statusInfo?.status === "success" ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <span className={`font-medium ${
                    statusInfo?.status === "success" ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {statusInfo?.status === "success" ? 'Activa' : 'Inactiva'}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Número de colecciones:</span>
                <span className="font-medium text-gray-900">{statusInfo?.collections_count || 0}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Ruta de la base de datos:</span>
                <span className="font-medium text-gray-900">{statusInfo?.db_path || 'No disponible'}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Base de datos existe:</span>
                <span className={`font-medium ${statusInfo?.db_exists ? 'text-green-600' : 'text-red-600'}`}>
                  {statusInfo?.db_exists ? 'Sí' : 'No'}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Base de datos vacía:</span>
                <span className={`font-medium ${statusInfo?.db_empty ? 'text-yellow-600' : 'text-green-600'}`}>
                  {statusInfo?.db_empty ? 'Sí' : 'No'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
