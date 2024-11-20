"use client";

import { 
  ArrowRight, 
  Wifi, 
  Tv, 
  MonitorPlay, 
  Phone,
  MessageCircle,
  Facebook,
  Instagram,
  Mail,
  HeadphonesIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EnhancedHero() {
  const handleWhatsAppClick = (number) => {
    window.open(`https://wa.me/${number}`, '_blank');
  };

  return (
    <div id="home" className="relative bg-black min-h-screen pt-16 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/video1.mp4" type="video/mp4" />
          Tu navegador no soporta el tag de video.
        </video>
      </div>

      {/* Social Media Bar - Fixed on the left */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-lg p-3 rounded-r-lg z-50">
        <div className="flex flex-col gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
            className="text-white hover:text-blue-400 transition-colors">
            <Facebook className="h-6 w-6" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
            className="text-white hover:text-pink-400 transition-colors">
            <Instagram className="h-6 w-6" />
          </a>
          <a href="mailto:info@example.com" 
            className="text-white hover:text-red-400 transition-colors">
            <Mail className="h-6 w-6" />
          </a>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="text-center space-y-8">
          {/* Logo */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <img 
              src="https://ss-static-01.esmsv.com/id/23061/galeriaimagenes/obtenerimagen/?width=104&height=80&id=sitio_logo&ultimaModificacion=2024-11-20+00%3A23%3A33" 
              alt="Logo" 
              className="h-20 w-auto"
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl flex items-center justify-center gap-x-4 flex-wrap"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-blue-400">Video</span>
            <span className="text-white">Digital</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="mt-3 max-w-md mx-auto text-base text-gray-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Descubre la mejor experiencia en entretenimiento y conectividad con
            nuestros servicios de cable e internet de alta velocidad.
          </motion.p>

          {/* Contact Info */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <div className="flex items-center gap-2 text-white">
              <Phone className="h-5 w-5 text-blue-400" />
              <span>Ventas: (3442) 45-7061</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <HeadphonesIcon className="h-5 w-5 text-blue-400" />
              <span>Soporte: (3442) 45-7060</span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="flex justify-center gap-x-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a href="#plans">
                Ver Planes
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Cards */}
        <motion.div 
          className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-3"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-2xl hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center">
                <div className="p-3 bg-blue-600/20 rounded-xl">
                  <Wifi className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="ml-4 text-xl font-semibold text-white">
                  Internet de Alta Velocidad
                </h3>
              </div>
              <p className="mt-4 text-gray-300 leading-relaxed">
                Navega sin límites con nuestra conexión de fibra óptica, estable
                y ultrarrápida.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-2xl hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center">
                <div className="p-3 bg-blue-600/20 rounded-xl">
                  <Tv className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="ml-4 text-xl font-semibold text-white">
                  Cablevisión SD
                </h3>
              </div>
              <p className="mt-4 text-gray-300 leading-relaxed">
                Disfruta de 86 canales con una calidad de imagen excepcional.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-2xl hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center">
                <div className="p-3 bg-blue-600/20 rounded-xl">
                  <MonitorPlay className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="ml-4 text-xl font-semibold text-white">
                  Cable Digital HD
                </h3>
              </div>
              <p className="mt-4 text-gray-300 leading-relaxed">
                Accede a más de 200 canales en alta definición con nuestro
                servicio ISDBT y decoHD.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}