import { useState, useRef, useCallback } from 'react'
import { Camera, Video, ArrowRight } from 'lucide-react'
import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme, useThemeValue } from '@/context/ThemeContext'

export default function About() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const constraintsRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [selectedMedia, setSelectedMedia] = useState(null)
  
  // Theme integration
  const { resolvedTheme } = useTheme()
  const backgroundColor = useThemeValue('bg-white', 'bg-gray-900')
  const textColor = useThemeValue('text-gray-900', 'text-white')
  const secondaryTextColor = useThemeValue('text-gray-600', 'text-gray-300')
  const gradientFrom = useThemeValue('from-gray-50', 'from-black')
  const gradientTo = useThemeValue('to-gray-100', 'to-gray-900')
  const dotColor = useThemeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.05)')

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

  const projectsGallery = [
    { 
      type: 'image', 
      src: '/patchera.jpg', 
      title: 'Transmisión en Autódromo', 
      description: 'Cobertura de transmisión en vivo del Autódromo de Concepción del Uruguay' 
    },
    { 
      type: 'video', 
      src: '/video1.mp4', 
      title: 'Streaming Fiesta de la Playa', 
      description: 'Transmisión en vivo del evento de verano más importante de la ciudad' 
    },
    { 
      type: 'image', 
      src: '/patchera.jpg', 
      title: 'Sistema de Cámaras Urbanas', 
      description: 'Monitoreo en tiempo real de puntos estratégicos de la ciudad' 
    },
    { 
      type: 'image', 
      src: '/patchera.jpg', 
      title: 'Conectividad a Parque Industrial', 
      description: 'Conectividad a Parque ' 
    }
  ]

  const openMediaModal = (media) => {
    setSelectedMedia(media)
  }

  const closeMediaModal = () => {
    setSelectedMedia(null)
  }

  return (
    <div id="about" className={`relative bg-gradient-to-b ${gradientFrom} ${gradientTo} py-24 overflow-hidden`}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${dotColor} 1px, transparent 0)`,
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
          <h2 className={`text-4xl font-extrabold ${textColor} sm:text-5xl`}>
            TITULO
          </h2>
          <p className={`mt-4 max-w-2xl mx-auto text-xl ${secondaryTextColor}`}>
            Explorá algunos de los proyectos más destacados en Concepción del Uruguay
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {projectsGallery.map((project, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative group cursor-pointer"
              onClick={() => openMediaModal(project)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                {project.type === 'image' ? (
                  <img 
                    src={project.src} 
                    alt={project.title} 
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <video 
                    src={project.src} 
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    preload="metadata"
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="mt-2 text-sm">{project.description}</p>
                    <ArrowRight className="mx-auto mt-2 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {selectedMedia && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={closeMediaModal}
          >
            <div className="max-w-4xl w-full">
              {selectedMedia.type === 'image' ? (
                <img 
                  src={selectedMedia.src} 
                  alt={selectedMedia.title} 
                  className="max-w-full max-h-[80vh] mx-auto object-contain"
                />
              ) : (
                <video 
                  src={selectedMedia.src} 
                  controls 
                  className="max-w-full max-h-[80vh] mx-auto"
                  autoPlay
                />
              )}
              <div className="text-center text-white mt-4">
                <h3 className="text-2xl font-semibold">{selectedMedia.title}</h3>
                <p className="mt-2">{selectedMedia.description}</p>
              </div>
            </div>
          </div>
        )}

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
            <div className={`absolute inset-0 ${resolvedTheme === 'dark' ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-600 to-purple-600'} mix-blend-multiply opacity-70 pointer-events-none`} />
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