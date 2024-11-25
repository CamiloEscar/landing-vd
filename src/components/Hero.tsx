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
  HeadphonesIcon,
  Clock,
  MapPin,
  ExternalLink,
  Grid,
  Search
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EnhancedHero() {
  const [selectedDevices, setSelectedDevices] = useState(1);
  const [selectedUsage, setSelectedUsage] = useState("basic");
  
  const getRecommendedSpeed = () => {
    const baseSpeed = {
      basic: 45,
      streaming: 65,
      gaming: 100,
      work: 75
    }[selectedUsage];
    
    return Math.min(100, baseSpeed * selectedDevices);
  };

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
          <source src="/video1.webm" type="video/webm" />
          Tu navegador no soporta el tag de video.
        </video>
      </div>

      {/* Social Media Bar - Fixed on the left */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-lg p-3 rounded-r-lg z-50">
        <div className="flex flex-col gap-4">
          <a href="https://www.facebook.com/videodigitalconcepciondeluruguay" target="_blank" rel="noopener noreferrer" 
            className="text-white hover:text-blue-400 transition-colors">
            <Facebook className="h-6 w-6" />
          </a>
          <a href="https://www.instagram.com/videodigitalcdeluruguayok/" target="_blank" rel="noopener noreferrer"
            className="text-white hover:text-pink-400 transition-colors">
            <Instagram className="h-6 w-6" />
          </a>
          <a href="ventas@videodigital.com.ar" 
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
            <div className="flex items-center gap-2 text-white">
              <Clock className="h-5 w-5 text-blue-400" />
              <span>
                <span className="block sm:inline">Lun. a Vie. 8 a 17hs</span>
                <span className="mx-1 hidden sm:inline">|</span>
                <span className="block sm:inline">Sáb. 8 a 12hs</span>
              </span>
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
          {/* Internet Speed Test Card */}
          <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-2xl hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-600/20 rounded-xl">
                  <Wifi className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="ml-4 text-xl font-semibold text-white">
                  Internet de Alta Velocidad
                </h3>
              </div>
              <p className="mt-4 text-gray-300 leading-relaxed mb-6">
                Navega sin límites con nuestra conexión de fibra óptica, estable
                y ultrarrápida.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/10 hover:bg-white/20 text-white border-blue-400"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Calcular velocidad recomendada
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Calcular velocidad recomendada</DialogTitle>
                    <DialogDescription>
                      Ayudanos a determinar la mejor velocidad para tu hogar
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        ¿Cuántos dispositivos conectarás simultáneamente?
                      </label>
                      <Select
                        value={selectedDevices.toString()}
                        onValueChange={(value) => setSelectedDevices(parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona cantidad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1-2 dispositivos</SelectItem>
                          <SelectItem value="2">3-4 dispositivos</SelectItem>
                          <SelectItem value="3">5-6 dispositivos</SelectItem>
                          <SelectItem value="4">7+ dispositivos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        ¿Cuál será el uso principal?
                      </label>
                      <Select
                        value={selectedUsage}
                        onValueChange={setSelectedUsage}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona uso" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Navegación básica y redes sociales</SelectItem>
                          <SelectItem value="streaming">Streaming de video (Netflix, YouTube)</SelectItem>
                          <SelectItem value="gaming">Gaming online</SelectItem>
                          <SelectItem value="work">Trabajo remoto / Videollamadas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                      <h4 className="font-semibold mb-2">Velocidad recomendada:</h4>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {getRecommendedSpeed()} Mbps
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Esta recomendación está basada en tu uso previsto y la cantidad de dispositivos.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Channel Grid Card */}
          <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-2xl hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-600/20 rounded-xl">
                  <Grid className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="ml-4 text-xl font-semibold text-white">
                  Cable SD y HD
                </h3>
              </div>
              <p className="mt-4 text-gray-300 leading-relaxed mb-6">
              Disfruta de 86 canales con una calidad SD. Y
              Cable Digital HD con nuestro servicio ISDBT
              Accede a más de 200 canales en alta definición con nuestro decoHD.
              </p>
              <Button 
                asChild 
                variant="outline" 
                className="w-full bg-white/10 hover:bg-white/20 text-white border-blue-400"
              >
                <a 
                  href="/grilla" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <span>Ver Grilla de Canales</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Company Info Card */}
          <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-2xl hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-600/20 rounded-xl">
                  <MapPin className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="ml-4 text-xl font-semibold text-white">
                  Información
                </h3>
              </div>
              <div className="space-y-4 text-gray-300 mb-6">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span>Intendente González 2479</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span>Lun. a Vie. 8 a 17hs | Sáb. 8 a 12hs</span>
                </p>
              </div>
              <Button 
                asChild 
                variant="outline" 
                className="w-full bg-white/10 hover:bg-white/20 text-white border-blue-400"
              >
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Intendente+González+2479" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <span>Ver en Maps</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}