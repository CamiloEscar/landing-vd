'use client'

import { useState, useEffect } from 'react'
import { MapPin, Search } from 'lucide-react'
import { MapContainer, TileLayer, GeoJSON, Marker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

// Coordenadas más precisas para Concepción del Uruguay
const CENTER_POSITION = [-32.4827, -58.2270]

// GeoJSON mejorado con más calles principales de Concepción del Uruguay
const ALL_STREETS = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "name": "Av. Paysandú" },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-58.2340, -32.4745],
          [-58.2207, -32.4745]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": { "name": "Bv. 12 de Octubre" },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-58.2270, -32.4827],
          [-58.2270, -32.4700]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": { "name": "Av. Urquiza" },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-58.2350, -32.4890],
          [-58.2207, -32.4890]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": { "name": "Bv. Yrigoyen" },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-58.2320, -32.4795],
          [-58.2320, -32.4950]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": { "name": "Av. Belgrano" },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-58.2380, -32.4845],
          [-58.2240, -32.4845]
        ]
      }
    }
  ]
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, 15)
  }, [center, map])
  return null
}

export default function Coverage() {
  const [address, setAddress] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState<'available' | 'unavailable' | null>(null)
  const [mapCenter, setMapCenter] = useState(CENTER_POSITION)

  const checkCoverage = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsChecking(true)
    
    // Simulate API call and geocoding
    await new Promise(resolve => setTimeout(resolve, 1500))
    const isAvailable = Math.random() > 0.3
    setResult(isAvailable ? 'available' : 'unavailable')
    
    // Simulate moving the map to the searched address
    setMapCenter([
      CENTER_POSITION[0] + (Math.random() - 0.5) * 0.01,
      CENTER_POSITION[1] + (Math.random() - 0.5) * 0.01
    ])
    
    setIsChecking(false)
  }

  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-black py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}/>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-blue-600/20 rounded-xl mb-4">
            <MapPin className="h-12 w-12 text-blue-400" />
          </div>
          <h2 className="mt-2 text-4xl font-extrabold text-white sm:text-5xl">
            Verificá la Cobertura
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
            Ingresá tu dirección para verificar si nuestros servicios están disponibles en tu zona
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="transform transition-all duration-300 hover:scale-105">
            <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-2xl hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-8">
                <form onSubmit={checkCoverage} className="space-y-6">
                  <div className="relative">
                    <Input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Ingresá tu dirección completa"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  <Button
                    type="submit"
                    disabled={isChecking || !address}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50"
                  >
                    {isChecking ? 'Verificando...' : 'Verificar Disponibilidad'}
                  </Button>
                </form>

                {result && (
                  <div className={`mt-8 p-6 rounded-lg ${
                    result === 'available' ? 'bg-green-900/20' : 'bg-red-900/20'
                  }`}>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        {result === 'available' ? (
                          <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center">
                            <span className="text-green-400 text-lg">✓</span>
                          </div>
                        ) : (
                          <div className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center">
                            <span className="text-red-400 text-lg">×</span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className={`text-lg font-medium ${
                          result === 'available' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {result === 'available' 
                            ? '¡Buenas noticias! Tenemos cobertura en tu zona.'
                            : 'Lo sentimos, aún no tenemos cobertura en tu zona.'}
                        </h3>
                        <div className="mt-2 text-gray-300">
                          {result === 'available' 
                            ? 'Podés contratar cualquiera de nuestros servicios.'
                            : 'Registraremos tu dirección para notificarte cuando el servicio esté disponible.'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="transform transition-all duration-300 hover:scale-105">
            <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-2xl hover:bg-white/20 transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="h-[500px] relative">
                  <MapContainer 
                    center={CENTER_POSITION} 
                    zoom={15} 
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                    className="z-10"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    <GeoJSON 
                      data={ALL_STREETS} 
                      style={() => ({
                        color: '#3b82f6',
                        weight: 4,
                        opacity: 0.8
                      })}
                    />
                    <Marker position={mapCenter} />
                    <MapUpdater center={mapCenter} />
                  </MapContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}