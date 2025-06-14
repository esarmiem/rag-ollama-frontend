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
      description: "Chatbot entrenado con la base de conocimiento de Experian para asistencia técnica especializada",
    },
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: "Base de Conocimiento",
      description: "Acceso a información técnica actualizada y documentación de Experian",
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Soporte Inmediato",
      description: "Respuestas rápidas y precisas para equipos de desarrollo, soporte y producto",
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Seguridad Garantizada",
      description: "Plataforma segura y confiable para el manejo de información técnica sensible",
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
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
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
                Tu asistente técnico inteligente para Experian Spanish Latam
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-700 max-w-2xl mx-auto mb-12"
            >
              Optimiza el soporte técnico de tus equipos con nuestro chatbot especializado. Accede a respuestas precisas y documentación técnica actualizada de Experian en tiempo real.
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
                  Comenzar ahora
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Por qué elegir Experian-AI?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre cómo nuestro chatbot especializado puede mejorar la eficiencia de tus equipos de desarrollo, soporte y producto
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
            <h2 className="text-4xl font-bold text-white mb-6">¿Listo para optimizar el soporte técnico de tu equipo?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Únete a los equipos de Experian Spanish Latam que ya están transformando su asistencia técnica
            </p>
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
              >
                Acceder a la aplicación
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
