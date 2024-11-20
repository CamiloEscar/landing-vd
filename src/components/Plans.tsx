"use client"

import { Wifi, Tv, Check, MonitorPlay, Package, Info } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Types remain unchanged
type PlanType = 'internet' | 'tv-internet' | 'tv-hd'
type AddOnType = 'hbo' | 'adultos' | 'deportes'

interface PlanFeature {
  speed: string
  tvs?: number
  decos?: number
  features: string[]
  phoneNumber: string
  whatsapp: string
}

const plansConfig: Record<PlanType, PlanFeature[]> = {
  'internet': [
    {
      speed: '65 MB',
      phoneNumber: '(3442) 45-7061',
      whatsapp: '+543442457061',
      features: [
        'Ideal para streaming HD',
        'Conexión estable',
        'Soporte técnico incluido',
        'WiFi de alta velocidad'
      ]
    },
    {
      speed: '100 MB',
      phoneNumber: '(3442) 45-7061',
      whatsapp: '+543442457061',
      features: [
        'Perfecto para gaming',
        'Streaming 4K sin interrupciones',
        'Soporte técnico prioritario',
        'WiFi de última generación'
      ]
    }
  ],
  'tv-internet': [
    {
      speed: '45 MB',
      tvs: 3,
      phoneNumber: '(3442) 45-7061',
      whatsapp: '+543442457061',
      features: [
        'TV Digital hasta 3 televisores',
        'Canales nacionales e internacionales',
        'Guía de programación',
        'Internet estable'
      ]
    },
    {
      speed: '65 MB',
      tvs: 3,
      phoneNumber: '(3442) 45-7061',
      whatsapp: '+543442457061',
      features: [
        'Mayor velocidad de internet',
        'TV Digital hasta 3 televisores',
        'Canales premium incluidos',
        'Soporte prioritario'
      ]
    },
    {
      speed: '100 MB',
      tvs: 3,
      phoneNumber: '(3442) 45-7061',
      whatsapp: '+543442457061',
      features: [
        'Máxima velocidad disponible',
        'TV Digital hasta 3 televisores',
        'Paquete completo de canales',
        'Atención VIP'
      ]
    }
  ],
  'tv-hd': [
    {
      speed: '45 MB',
      tvs: 3,
      decos: 1,
      phoneNumber: '(3442) 45-7061',
      whatsapp: '+543442457061',
      features: [
        'TV HD hasta 3 televisores',
        '1 decodificador HD incluido',
        'Calidad de imagen superior',
        'Internet estable'
      ]
    },
    {
      speed: '65 MB',
      tvs: 3,
      decos: 1,
      phoneNumber: '(3442) 45-7061',
      whatsapp: '+543442457061',
      features: [
        'Mayor velocidad de internet',
        'TV HD hasta 3 televisores',
        '1 decodificador HD incluido',
        'Canales premium en HD'
      ]
    },
    {
      speed: '100 MB',
      tvs: 3,
      decos: 1,
      phoneNumber: '(3442) 45-7061',
      whatsapp: '+543442457061',
      features: [
        'Máxima velocidad disponible',
        'TV HD hasta 3 televisores',
        '1 decodificador HD incluido',
        'Experiencia premium completa'
      ]
    }
  ]
}

const addOns = [
  { id: 'hbo', name: 'HBO', icon: MonitorPlay },
  { id: 'adultos', name: 'Adultos', icon: Package },
  { id: 'deportes', name: 'Deportes', icon: Tv }
]

const cardBackgrounds = [
  "https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80",
  "https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80",
  "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80",
  "https://images.unsplash.com/photo-1484807352052-23338990c6c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80",
  "https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80"
]

export default function EnhancedPlans() {
  const [selectedType, setSelectedType] = useState<PlanType>('internet')
  
  const handleWhatsApp = (whatsapp: string) => {
    window.open(`https://wa.me/${whatsapp}?text=Hola, me interesa conocer más sobre los planes de Video Digital`, '_blank')
  }

  return (
    <div id='plans' className="relative bg-gradient-to-b from-gray-900 to-black py-24">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}/>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Nuestros Planes
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
            Elige el plan perfecto para tu hogar
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="bg-white/10 backdrop-blur-lg p-1 rounded-lg inline-flex gap-2">
            <Button
              onClick={() => setSelectedType('internet')}
              variant={selectedType === 'internet' ? "default" : "ghost"}
              className={`flex items-center gap-2 ${
                selectedType === 'internet' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Wifi className="h-5 w-5" />
              <span>Solo Internet</span>
            </Button>
            <Button
              onClick={() => setSelectedType('tv-internet')}
              variant={selectedType === 'tv-internet' ? "default" : "ghost"}
              className={`flex items-center gap-2 ${
                selectedType === 'tv-internet'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Tv className="h-5 w-5" />
              <span>TV + Internet</span>
            </Button>
            <Button
              onClick={() => setSelectedType('tv-hd')}
              variant={selectedType === 'tv-hd' ? "default" : "ghost"}
              className={`flex items-center gap-2 ${
                selectedType === 'tv-hd'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <MonitorPlay className="h-5 w-5" />
              <span>TV HD + Internet</span>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plansConfig[selectedType].map((plan, index) => (
            <div
              key={`${plan.speed}-${index}`}
              className="transform transition-all duration-300 hover:scale-105"
            >
              <Card className="relative overflow-hidden border-0 shadow-2xl">
                {/* Background Image with Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${cardBackgrounds[index % cardBackgrounds.length]})` }}
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                
                <CardContent className="relative p-8">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-blue-600/20 backdrop-blur-md rounded-xl">
                      {selectedType === 'internet' ? (
                        <Wifi className="h-8 w-8 text-blue-400" />
                      ) : selectedType === 'tv-hd' ? (
                        <MonitorPlay className="h-8 w-8 text-blue-400" />
                      ) : (
                        <Tv className="h-8 w-8 text-blue-400" />
                      )}
                    </div>
                    <div className="text-right">
                      <h3 className="text-2xl font-bold text-white">{plan.speed}</h3>
                      {plan.tvs && (
                        <p className="text-sm text-gray-300">Hasta {plan.tvs} TVs</p>
                      )}
                      {plan.decos && (
                        <p className="text-sm text-gray-300">+ {plan.decos} Deco HD</p>
                      )}
                    </div>
                  </div>

                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="ml-3 text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 space-y-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          Consultar Precio
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Consulta de Precios</DialogTitle>
                          <DialogDescription>
                            Contacta con nuestro equipo de ventas para conocer los precios disponibles en tu zona.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-4">
                          <p className="text-sm text-gray-500">
                            Llámanos al: <span className="font-medium">{plan.phoneNumber}</span>
                          </p>
                          <p className="text-sm text-gray-500">
                            O escríbenos por WhatsApp para recibir información personalizada.
                          </p>
                          <Button onClick={() => handleWhatsApp(plan.whatsapp)}>
                            Contactar por WhatsApp
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {selectedType === 'tv-hd' && (
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-sm text-gray-300 mb-2">Paquetes adicionales disponibles:</p>
                        <div className="flex flex-wrap gap-2">
                          {addOns.map((addon) => (
                            <div
                              key={addon.id}
                              className="flex items-center gap-1 text-xs bg-black/30 backdrop-blur-md rounded-full px-3 py-1"
                            >
                              <addon.icon className="h-3 w-3 text-blue-400" />
                              <span className="text-gray-300">{addon.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-lg px-4 py-2">
            <Info className="h-5 w-5 text-blue-400" />
            <span className="text-gray-300">
              Consulta con nuestro equipo de ventas los costos de instalación según tu zona
            </span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Medios de pago: Pago Mis Cuentas (Red Banelco), Entre Ríos Servicios,
            <br />
            Tarjeta de Crédito Visa o Master, Débito Directo por CBU
          </p>
        </div>
      </div>
    </div>
  )
}