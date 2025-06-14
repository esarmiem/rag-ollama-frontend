"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, RotateCcw, CheckCircle } from "lucide-react"
import { resetDatabase } from "@/lib/api"
import { useAppContext } from "@/context/AppContext"
import toast from "react-hot-toast"
import LoadingSpinner from "@/components/ui/LoadingSpinner"

export default function ResetDbPage() {
  const [isResetting, setIsResetting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)
  const { setCurrentPdf, setDbStatus } = useAppContext()

  const handleReset = async () => {
    setIsResetting(true)
    try {
      await resetDatabase()
      setCurrentPdf(null)
      setDbStatus(true)
      setResetSuccess(true)
      setShowConfirm(false)
      toast.success("Base de datos reseteada exitosamente")
    } catch (error) {
      toast.error("Error al resetear la base de datos")
      console.error("Reset DB error:", error)
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Resetear Base de Datos</h1>
        <p className="text-gray-600">Elimina todos los datos y archivos PDF de la base de datos</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-2xl mx-auto"
      >
        {resetSuccess ? (
          <div className="card p-8 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, type: "spring" }}>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">¡Base de datos reseteada!</h3>
            <p className="text-gray-600 mb-6">Todos los datos han sido eliminados exitosamente</p>
            <button onClick={() => setResetSuccess(false)} className="btn-secondary">
              Continuar
            </button>
          </div>
        ) : !showConfirm ? (
          <div className="card p-8">
            <div className="text-center mb-6">
              <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Resetear Base de Datos</h3>
              <p className="text-gray-600">
                Esta acción eliminará permanentemente todos los PDFs subidos y datos asociados. No se puede deshacer.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-1">⚠️ Advertencia</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Se eliminarán todos los archivos PDF subidos</li>
                    <li>• Se borrarán todos los datos de la base de datos</li>
                    <li>• Esta acción no se puede deshacer</li>
                    <li>• Tendrás que volver a subir tus documentos</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowConfirm(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Continuar con el reseteo
              </motion.button>

              <motion.a
                href="/dashboard"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary py-3 px-6"
              >
                Cancelar
              </motion.a>
            </div>
          </div>
        ) : (
          <div className="card p-8">
            <div className="text-center mb-6">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Confirmación Final</h3>
              <p className="text-gray-600">¿Estás completamente seguro de que quieres resetear la base de datos?</p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-center font-medium">
                Esta acción eliminará TODOS los datos permanentemente
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                disabled={isResetting}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isResetting ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Reseteando...
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-4 h-4" />
                    Sí, resetear ahora
                  </>
                )}
              </motion.button>

              <button onClick={() => setShowConfirm(false)} disabled={isResetting} className="btn-secondary py-3 px-6">
                No, cancelar
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
