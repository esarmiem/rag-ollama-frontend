"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Upload, FileText, X, CheckCircle } from "lucide-react"
import { uploadPdf } from "@/lib/api"
import { useAppContext } from "@/context/AppContext"
import toast from "react-hot-toast"
import LoadingSpinner from "@/components/ui/LoadingSpinner"

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const { setCurrentPdf } = useAppContext()

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      const file = files[0]
      if (file.type === "application/pdf") {
        setSelectedFile(file)
        setUploadSuccess(false)
      } else {
        toast.error("Por favor selecciona un archivo PDF válido")
      }
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      const file = files[0]
      if (file.type === "application/pdf") {
        setSelectedFile(file)
        setUploadSuccess(false)
      } else {
        toast.error("Por favor selecciona un archivo PDF válido")
      }
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    try {
      const response = await uploadPdf(selectedFile)
      setCurrentPdf(selectedFile.name)
      setUploadSuccess(true)
      toast.success("PDF subido exitosamente")
    } catch (error) {
      toast.error("Error al subir el PDF")
      console.error("Upload error:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    setUploadSuccess(false)
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Subir PDF</h1>
        <p className="text-gray-600">Carga un documento PDF para analizarlo con inteligencia artificial</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-2xl mx-auto"
      >
        {!selectedFile ? (
          <div
            className={`card p-8 border-2 border-dashed transition-all duration-300 ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Arrastra tu PDF aquí</h3>
              <p className="text-gray-600 mb-6">O haz clic para seleccionar un archivo</p>

              <input type="file" accept=".pdf" onChange={handleFileSelect} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="btn-primary cursor-pointer inline-block">
                Seleccionar archivo
              </label>

              <p className="text-sm text-gray-500 mt-4">Solo archivos PDF (máximo 10MB)</p>
            </div>
          </div>
        ) : (
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedFile.name}</h3>
                  <p className="text-sm text-gray-600">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>

              {uploadSuccess ? (
                <CheckCircle className="w-8 h-8 text-green-500" />
              ) : (
                <button
                  onClick={removeFile}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  disabled={isUploading}
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              )}
            </div>

            {uploadSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">¡PDF subido exitosamente!</h3>
                <p className="text-gray-600 mb-6">Tu documento está listo para ser consultado</p>
                <button
                  onClick={() => {
                    setSelectedFile(null)
                    setUploadSuccess(false)
                  }}
                  className="btn-secondary"
                >
                  Subir otro archivo
                </button>
              </motion.div>
            ) : (
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <div className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      Subiendo...
                    </div>
                  ) : (
                    "Subir PDF"
                  )}
                </motion.button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}
