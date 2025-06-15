"use client"

import { motion } from "framer-motion"
import { ArrowRight, FileText, Brain, Zap, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      title: "IA Especializada",
      description: "Sistema de IA entrenado con documentación técnica para asistencia especializada en desarrollo y soporte",
    },
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: "Documentación Técnica",
      description: "Integración con repositorios de documentación y bases de conocimiento internas",
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Asistencia Técnica",
      description: "Soporte especializado para equipos de desarrollo, integración y mantenimiento de sistemas",
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Seguridad Corporativa",
      description: "Implementación de protocolos de seguridad y acceso controlado para información técnica",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl font-extrabold mb-4 roboto-gradient-text">
                Experian-AI
              </h1>
              <Image
                src="/logoexperian.png"
                alt="Experian Logo"
                width={30}
                height={30}
                className="mx-auto mb-4"
              />
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Plataforma de asistencia técnica interna para equipos de Spanish Latam
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-700 max-w-2xl mx-auto mb-12"
            >
              Sistema de asistencia técnica basado en IA para equipos internos. Proporciona acceso a documentación técnica, guías de implementación y soporte especializado.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                >
                  Acceder al dashboard
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-20 right-20 w-32 h-32 bg-blue-100 rounded-full opacity-20"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute bottom-20 left-20 w-24 h-24 bg-purple-100 rounded-full opacity-20"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Capacidades del Sistema</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plataforma interna diseñada para optimizar el soporte técnico y desarrollo de sistemas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="card p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Acceso al Sistema de Asistencia Técnica</h2>
            <p className="text-xl text-blue-100 mb-8">
              Plataforma disponible para equipos internos con acceso autorizado
            </p>
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
              >
                Acceder al dashboard
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
