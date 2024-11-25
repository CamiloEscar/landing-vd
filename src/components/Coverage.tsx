'use client'

import { useState, useEffect } from 'react'
import { MapPin, Search } from 'lucide-react'
import { MapContainer, TileLayer, GeoJSON, Marker, useMap, Polygon, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

const CENTER_POSITION = [-32.4827, -58.2270] // Centro de Concepción del Uruguay

// Base de datos simulada de calles principales por barrio
const STREETS_DATABASE = {
  "rocamora": {
    range: [1, 1500],
    coordinates: [[-32.4850, -58.2400], [-32.4850, -58.2300]],
    neighborhood: "centro"
  },
  "12 de octubre": {
    range: [1, 1200],
    coordinates: [[-32.4827, -58.2270], [-32.4700, -58.2270]],
    neighborhood: "sanMartin"
  },
  "3 de febrero": {
    range: [1, 800],
    coordinates: [[-32.4745, -58.2340], [-32.4745, -58.2207]],
    neighborhood: "terminal"
  },
  "galarza": {
    range: [1, 1000],
    coordinates: [[-32.4780, -58.2350], [-32.4780, -58.2200]],
    neighborhood: "villa"
  },
  "25 de mayo": {
    range: [1, 900],
    coordinates: [[-32.4880, -58.2350], [-32.4880, -58.2200]],
    neighborhood: "zaninetti"
  },
  "9 de julio": {
    range: [1, 1100],
    coordinates: [[-32.4950, -58.2400], [-32.4950, -58.2300]],
    neighborhood: "malvinas"
  }
}

//https://geomat-maps.com.ar/mcdu/maptiles/mcu-wmts-publico.php?llay=5
// Base de datos ampliada de barrios
const NEIGHBORHOODS = {
  centro: {
    name: "Centro",
    coordinates: [
      [-32.4780, -58.2350],
      [-32.4780, -58.2200],
      [-32.4880, -58.2200],
      [-32.4880, -58.2350],
    ],
    status: 'available',
    currentClients: 450,
    maxClients: 1000,
    streets: ["rocamora", "urquiza", "entre ríos"]
  },
  sanMartin: {
    name: "San Martín",
    coordinates: [
      [-32.4700, -58.2300],
      [-32.4700, -58.2200],
      [-32.4800, -58.2200],
      [-32.4800, -58.2300],
    ],
    status: 'saturated',
    currentClients: 750,
    maxClients: 800,
    streets: ["12 de octubre", "san martín", "alberdi"]
  },
  terminal: {
    name: "Terminal",
    coordinates: [
      [-32.4850, -58.2400],
      [-32.4850, -58.2300],
      [-32.4950, -58.2300],
      [-32.4950, -58.2400],
    ],
    status: 'full',
    currentClients: 600,
    maxClients: 600,
    streets: ["3 de febrero", "belgrano"]
  },
  villa: {
    name: "Villa Las Lomas",
    coordinates: [
      [-32.4650, -58.2400],
      [-32.4650, -58.2300],
      [-32.4750, -58.2300],
      [-32.4750, -58.2400],
    ],
    status: 'available',
    currentClients: 300,
    maxClients: 800,
    streets: ["galarza", "sarmiento"]
  },
  zaninetti: {
    name: "Zaninetti",
    coordinates: [
      [-32.4900, -58.2200],
      [-32.4900, -58.2100],
      [-32.5000, -58.2100],
      [-32.5000, -58.2200],
    ],
    status: 'saturated',
    currentClients: 680,
    maxClients: 700,
    streets: ["25 de mayo", "artigas"]
  },
  malvinas: {
    name: "Malvinas",
    coordinates: [
      [-32.4600, -58.2200],
      [-32.3600, -58.2200],
      [-32.4600, -58.2100],
      [-32.4700, -58.2100],
      [-32.4700, -58.2200],
    ],
    status: 'available',
    currentClients: 200,
    maxClients: 500,
    streets: ["9 de julio", "ituzaingó"]
  }
}

function normalizeAddress(address) {
  const addressLower = address.toLowerCase().trim()
  
  for (const [streetName, streetInfo] of Object.entries(STREETS_DATABASE)) {
    if (addressLower.includes(streetName)) {
      const matches = addressLower.match(/\d+/)
      if (matches) {
        const number = parseInt(matches[0])
        if (number >= streetInfo.range[0] && number <= streetInfo.range[1]) {
          return { street: streetName, number }
        }
      }
    }
  }
  
  return null
}

function checkAddressCoverage(address) {
  const normalizedAddress = normalizeAddress(address)
  
  if (!normalizedAddress) {
    return {
      found: false,
      message: "Dirección no reconocida. Por favor, verifica la calle y el número."
    }
  }
  
  const streetInfo = STREETS_DATABASE[normalizedAddress.street]
  if (!streetInfo) {
    return {
      found: false,
      message: "La calle ingresada no está en nuestra base de datos."
    }
  }
  
  const neighborhood = NEIGHBORHOODS[streetInfo.neighborhood]
  const percentageFull = (neighborhood.currentClients / neighborhood.maxClients) * 100
  const position = calculatePositionInStreet(normalizedAddress, streetInfo)
  
  return {
    found: true,
    position,
    neighborhood,
    streetInfo,
    message: getStatusMessage(neighborhood, normalizedAddress),
    percentageFull
  }
}

function calculatePositionInStreet(address, streetInfo) {
  const [start, end] = streetInfo.coordinates
  const percentage = (address.number - streetInfo.range[0]) / (streetInfo.range[1] - streetInfo.range[0])
  
  return [
    start[0] + (end[0] - start[0]) * percentage,
    start[1] + (end[1] - start[1]) * percentage
  ]
}

function getStatusMessage(neighborhood, address) {
  const percentageFull = (neighborhood.currentClients / neighborhood.maxClients) * 100
  
  switch (neighborhood.status) {
    case 'available':
      return `¡Buenas noticias! Tenemos cobertura en ${address.street} ${address.number} (${neighborhood.name}). Ocupación: ${percentageFull.toFixed(1)}%`;
    case 'saturated':
      return `${address.street} ${address.number} está en una zona con alta demanda (${percentageFull.toFixed(1)}% ocupado). Disponibilidad limitada.`;
    case 'full':
      return `Lo sentimos, ${address.street} ${address.number} está en una zona sin capacidad disponible. No podemos aceptar nuevos clientes.`;
    default:
      return `No pudimos determinar la cobertura para ${address.street} ${address.number}.`;
  }
}

function getStatusColor(status) {
  switch (status) {
    case 'available':
      return '#22c55e' // Verde para zonas disponibles
    case 'saturated':
      return '#eab308' // Amarillo para zonas saturadas
    case 'full':
      return '#ef4444' // Rojo para zonas sin capacidad
    default:
      return '#6b7280' // Gris para estado desconocido
  }
}

function MapUpdater({ center }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, 15)
  }, [center, map])
  return null
}

export default function Coverage() {
  const [address, setAddress] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState(null)
  const [mapCenter, setMapCenter] = useState(CENTER_POSITION)
  const [selectedMarker, setSelectedMarker] = useState(null)

  const checkCoverage = async (e) => {
    e.preventDefault()
    setIsChecking(true)
    
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const coverageResult = checkAddressCoverage(address)
    setResult(coverageResult)
    
    if (coverageResult.found && coverageResult.position) {
      setMapCenter(coverageResult.position)
      setSelectedMarker(coverageResult.position)
    }
    
    setIsChecking(false)
  }

  return (
    <div id='coverage' className="relative bg-gradient-to-b from-gray-900 to-black py-24">
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
            Verificá la Cobertura en tu Barrio
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
            Ingresá tu dirección para verificar la disponibilidad del servicio
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
                      placeholder="Ej: Rocamora 750"
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
                    result.found ? 
                      `bg-${result.neighborhood?.status === 'available' ? 'green' : 
                        result.neighborhood?.status === 'saturated' ? 'yellow' : 'red'}-500/20` : 
                      'bg-gray-500/20'
                  }`}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-opacity-20 flex items-center justify-center"
                          style={{ 
                            backgroundColor: result.found ? 
                              getStatusColor(result.neighborhood?.status) : 
                              '#6b7280' 
                          }}>
                          {result.found && (
                            <span className={`text-lg ${
                              result.neighborhood?.status === 'available' ? 'text-green-400' :
                              result.neighborhood?.status === 'saturated' ? 'text-yellow-400' :
                              'text-red-400'
                            }`}>
                              {result.neighborhood?.status === 'available' ? '✓' :
                               result.neighborhood?.status === 'saturated' ? '!' : '×'}
                            </span>
                          )}
                          {!result.found && 
                            <span className="text-gray-400 text-lg">?</span>}
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-lg text-white">
                          {result.message}
                        </p>
                        {result.found && (
                          <div className="mt-2">
                            <div className="text-gray-300">
                              Clientes en la zona: {result.neighborhood.currentClients} / {result.neighborhood.maxClients}
                            </div>
                            <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full transition-all duration-500"
                                style={{
                                  width: `${(result.neighborhood.currentClients / result.neighborhood.maxClients) * 100}%`,
                                  backgroundColor: getStatusColor(result.neighborhood.status)
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 space-y-4">
                  <div className="p-4 rounded-lg bg-white/5">
                    <h4 className="text-white text-sm font-medium mb-2">Estado de Zonas:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"/>
                        <span className="text-gray-300 text-sm">Disponible</span></div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                        <span className="text-gray-300 text-sm">Alta demanda</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"/>
                        <span className="text-gray-300 text-sm">Sin capacidad</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-white/5">
                    <h4 className="text-white text-sm font-medium mb-2">Calles principales con cobertura:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(STREETS_DATABASE).map(([street, info]) => (
                        <div key={street} className="text-gray-300 text-sm">
                          • {street.charAt(0).toUpperCase() + street.slice(1)} ({info.range[0]}-{info.range[1]})
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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

                    {/* Renderizar los barrios */}
                    {Object.entries(NEIGHBORHOODS).map(([id, neighborhood]) => (
                      <Polygon
                        key={id}
                        positions={neighborhood.coordinates}
                        pathOptions={{
                          fillColor: getStatusColor(neighborhood.status),
                          fillOpacity: 0.2,
                          weight: 2,
                          color: getStatusColor(neighborhood.status)
                        }}
                      >
                        <Tooltip>
                          <div className="font-medium">{neighborhood.name}</div>
                          <div className="text-sm">
                            Ocupación: {((neighborhood.currentClients / neighborhood.maxClients) * 100).toFixed(1)}%
                          </div>
                        </Tooltip>
                      </Polygon>
                    ))}

                    {/* Renderizar las calles */}
                    {Object.entries(STREETS_DATABASE).map(([street, info]) => (
                      <GeoJSON 
                        key={street}
                        data={{
                          type: "Feature",
                          properties: { name: street },
                          geometry: {
                            type: "LineString",
                            coordinates: info.coordinates.map(coord => [coord[1], coord[0]])
                          }
                        }}
                        style={() => ({
                          color: getStatusColor(NEIGHBORHOODS[info.neighborhood].status),
                          weight: 4,
                          opacity: 0.8
                        })}
                      >
                        <Tooltip>{street.charAt(0).toUpperCase() + street.slice(1)}</Tooltip>
                      </GeoJSON>
                    ))}

                    {/* Marcador de ubicación seleccionada */}
                    {selectedMarker && (
                      <Marker position={selectedMarker}>
                        <Tooltip permanent>Ubicación seleccionada</Tooltip>
                      </Marker>
                    )}

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