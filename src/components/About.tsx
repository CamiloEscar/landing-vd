"use client"

import { useState, useRef, useCallback } from 'react'
import { Shield, Clock, Heart, Users, Award, TrendingUp } from 'lucide-react'
import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const constraintsRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  const clipPath = useTransform(x, (value) => {
    const percentage = value / (constraintsRef.current?.offsetWidth || 1) * 100
    return `inset(0 ${100 - percentage}% 0 0)`
  })

  const handleDrag = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: { point: { x: number } }) => {
    if (constraintsRef.current && sliderRef.current) {
      const containerRect = constraintsRef.current.getBoundingClientRect()
      const sliderRect = sliderRef.current.getBoundingClientRect()
      const newX = info.point.x - containerRect.left - sliderRect.width / 2
      const containerWidth = containerRect.width
      const newPosition = (newX / containerWidth) * 100
      setSliderPosition(Math.min(Math.max(newPosition, 0), 100))
    }
  }, [])

  useAnimationFrame(() => {
    const containerWidth = constraintsRef.current?.offsetWidth || 0
    x.set((sliderPosition / 100) * containerWidth)
  })

  const values = [
    { icon: Shield, title: 'Confiabilidad', description: 'Más de 6 años brindando servicios de calidad a nuestros clientes.', color: 'bg-blue-500/20' },
    { icon: Clock, title: 'Soporte al instante', description: 'Atención al cliente disponible en todo momento para resolver tus dudas.', color: 'bg-purple-500/20' },
    { icon: Heart, title: 'Compromiso', description: 'Trabajamos constantemente para mejorar tu experiencia digital.', color: 'bg-pink-500/20' },
    { icon: Users, title: 'Comunidad', description: 'Miles de usuarios satisfechos confían en nuestros servicios.', color: 'bg-green-500/20' },
    { icon: Award, title: 'Excelencia', description: 'Reconocidos por nuestra calidad y servicio excepcional.', color: 'bg-yellow-500/20' },
    { icon: TrendingUp, title: 'Innovación', description: 'Siempre a la vanguardia en tecnología y servicios digitales.', color: 'bg-red-500/20' }
  ]

  return (
    <div id="about" className="relative bg-gradient-to-b from-black to-gray-900 py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}/>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Nuestra Historia
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
            Desde 2018, Video Digital ha revolucionado el servicio de telecomunicaciones en Concepción del Uruguay, 
            llevando entretenimiento y conectividad a miles de hogares.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-2xl hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-xl ${value.color}`}>
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="ml-4 text-xl font-semibold text-white">
                      {value.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24"
        >
          <div className="relative rounded-2xl overflow-hidden h-[600px]" ref={constraintsRef}>
            <div className="absolute inset-0 w-full h-full">
              <div
                className="absolute top-0 bottom-0 left-0 w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80')",
                }}
              />
              <motion.div
                className="absolute top-0 bottom-0 left-0 w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('/patchera.jpg')",
                  clipPath: clipPath
                }}
              />
            </div>
            <motion.div
              ref={sliderRef}
              className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize z-10"
              style={{ x }}
              drag="x"
              dragConstraints={constraintsRef}
              dragElastic={0}
              dragMomentum={false}
              onDrag={handleDrag}
            >
              <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 mix-blend-multiply opacity-70 pointer-events-none" />
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8 pointer-events-none">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Comprometidos con tu Satisfacción
                </h2>
                <p className="mt-6 max-w-2xl mx-auto text-center text-xl text-blue-100">
                  Nuestro equipo trabaja día a día para brindarte la mejor experiencia en 
                  entretenimiento y conectividad, adaptándonos a tus necesidades y 
                  superando tus expectativas.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}