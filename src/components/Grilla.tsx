"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Tv, Film, Music2, Gamepad2, Radio, MonitorPlay, LayoutGrid, List, ImageIcon, Baby } from 'lucide-react'
import { Input } from "@/components/ui/input"

type ChannelCategory = 'todos' | 'peliculas' | 'deportes' | 'musica' | 'infantil'
type SignalType = 'sd' | 'isdbt' | 'hd'
type ViewMode = 'grid' | 'list'

interface ChannelNumbers {
  sd?: number
  isdbt?: string
  hd?: number
}

interface Channel {
  name: string
  logo?: string
  category: ChannelCategory
  numbers: ChannelNumbers
}

const channels: Channel[] = [
  // Canales Aire
  {
    name: "Telefe",
    logo: "/api/placeholder/80/40",
    category: "todos",
    numbers: {
      sd: 11,
      isdbt: "34.1",
      hd: 1211
    }
  },
  {
    name: "El Trece",
    logo: "/api/placeholder/80/40",
    category: "todos",
    numbers: {
      sd: 13,
      isdbt: "33.1",
      hd: 1213
    }
  },
  {
    name: "TV Pública",
    logo: "/api/placeholder/80/40",
    category: "todos",
    numbers: {
      sd: 7,
      isdbt: "23.1",
      hd: 1207
    }
  },
  {
    name: "América",
    logo: "/api/placeholder/80/40",
    category: "todos",
    numbers: {
      sd: 2,
      isdbt: "36.1",
      hd: 1202
    }
  },
  // Películas y Series
  {
    name: "HBO",
    logo: "/api/placeholder/80/40",
    category: "peliculas",
    numbers: {
      sd: 120,
      hd: 1120
    }
  },
  {
    name: "TNT",
    logo: "/api/placeholder/80/40",
    category: "peliculas",
    numbers: {
      sd: 121,
      hd: 1121
    }
  },
  {
    name: "Cinecanal",
    logo: "/api/placeholder/80/40",
    category: "peliculas",
    numbers: {
      sd: 122,
      hd: 1122
    }
  },
  {
    name: "FX",
    logo: "/api/placeholder/80/40",
    category: "peliculas",
    numbers: {
      sd: 123,
      hd: 1123
    }
  },
  {
    name: "Space",
    logo: "/api/placeholder/80/40",
    category: "peliculas",
    numbers: {
      sd: 124,
      hd: 1124
    }
  },
  // Deportes
  {
    name: "ESPN",
    logo: "/api/placeholder/80/40",
    category: "deportes",
    numbers: {
      sd: 301,
      hd: 1301
    }
  },
  {
    name: "ESPN 2",
    logo: "/api/placeholder/80/40",
    category: "deportes",
    numbers: {
      sd: 302,
      hd: 1302
    }
  },
  {
    name: "TyC Sports",
    logo: "/api/placeholder/80/40",
    category: "deportes",
    numbers: {
      sd: 303,
      isdbt: "24.2",
      hd: 1303
    }
  },
  {
    name: "Fox Sports",
    logo: "/api/placeholder/80/40",
    category: "deportes",
    numbers: {
      sd: 304,
      hd: 1304
    }
  },
  {
    name: "Fox Sports 2",
    logo: "/api/placeholder/80/40",
    category: "deportes",
    numbers: {
      sd: 305,
      hd: 1305
    }
  },
  // Música
  {
    name: "MTV",
    logo: "/api/placeholder/80/40",
    category: "musica",
    numbers: {
      sd: 201,
      hd: 1201
    }
  },
  {
    name: "CM",
    logo: "/api/placeholder/80/40",
    category: "musica",
    numbers: {
      sd: 202,
      hd: 1202
    }
  },
  {
    name: "HTV",
    logo: "/api/placeholder/80/40",
    category: "musica",
    numbers: {
      sd: 203,
      hd: 1203
    }
  },
  {
    name: "Much Music",
    logo: "/api/placeholder/80/40",
    category: "musica",
    numbers: {
      sd: 204,
      hd: 1204
    }
  },
  // Infantil
  {
    name: "Disney Channel",
    logo: "/api/placeholder/80/40",
    category: "infantil",
    numbers: {
      sd: 401,
      hd: 1401
    }
  },
  {
    name: "Cartoon Network",
    logo: "/api/placeholder/80/40",
    category: "infantil",
    numbers: {
      sd: 402,
      hd: 1402
    }
  },
  {
    name: "Nickelodeon",
    logo: "/api/placeholder/80/40",
    category: "infantil",
    numbers: {
      sd: 403,
      hd: 1403
    }
  },
  {
    name: "Discovery Kids",
    logo: "/api/placeholder/80/40",
    category: "infantil",
    numbers: {
      sd: 404,
      hd: 1404
    }
  }
]

const categories = [
  { id: 'todos', name: 'Todos los Canales', icon: Tv },
  { id: 'peliculas', name: 'Películas y Series', icon: Film },
  { id: 'deportes', name: 'Deportes', icon: Gamepad2 },
  { id: 'musica', name: 'Música', icon: Music2 },
  { id: 'infantil', name: 'Infantil', icon: Baby }
]

const signalTypes = [
  { id: 'all', name: 'Todas las señales', icon: Tv },
  { id: 'sd', name: 'TV SD', icon: Tv, color: 'text-gray-400' },
  { id: 'isdbt', name: 'TV ISDBT', icon: Radio, color: 'text-yellow-400' },
  { id: 'hd', name: 'TV HD', icon: MonitorPlay, color: 'text-blue-400' }
]

export default function ChannelGrid() {
  const [selectedCategory, setSelectedCategory] = useState<ChannelCategory>('todos')
  const [selectedSignalType, setSelectedSignalType] = useState<'all' | SignalType>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  const filteredChannels = channels.filter(channel => {
    const matchesCategory = selectedCategory === 'todos' || channel.category === selectedCategory
    const matchesSignalType = selectedSignalType === 'all' || channel.numbers[selectedSignalType]
    const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         Object.values(channel.numbers).some(num => 
                           num?.toString().includes(searchTerm)
                         )
    return matchesCategory && matchesSignalType && matchesSearch
  })

  const getSignalTypeBadge = (type: SignalType, number?: number | string) => {
    if (!number) return null
    
    const styles = {
      sd: 'bg-gray-600/20 text-gray-400 border border-gray-600/30',
      isdbt: 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30',
      hd: 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
    }
    
    return (
      <span className={`px-2 py-1 rounded-md text-xs font-medium ${styles[type]} backdrop-blur-sm`}>
        {type.toUpperCase()} {number}
      </span>
    )
  }

  const ChannelCard = ({ channel }: { channel: Channel }) => (
    <Card className="bg-black/40 border-white/5 backdrop-blur-sm hover:bg-black/50 transition-all hover:scale-102 hover:border-white/10">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative w-20 h-10 bg-black/40 rounded-lg overflow-hidden flex items-center justify-center border border-white/5">
            {channel.logo ? (
              <img 
                src={channel.logo} 
                alt={`${channel.name} logo`} 
                className="w-full h-full object-contain"
              />
            ) : (
              <ImageIcon className="w-6 h-6 text-gray-500" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-white mb-2">
              {channel.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {getSignalTypeBadge('sd', channel.numbers.sd)}
              {getSignalTypeBadge('isdbt', channel.numbers.isdbt)}
              {getSignalTypeBadge('hd', channel.numbers.hd)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const ChannelRow = ({ channel }: { channel: Channel }) => (
    <div className="flex items-center gap-4 p-4 bg-black/40 rounded-lg hover:bg-black/50 transition-all border border-white/5 hover:border-white/10">
      <div className="relative w-20 h-10 bg-black/40 rounded-lg overflow-hidden flex items-center justify-center border border-white/5">
        {channel.logo ? (
          <img 
            src={channel.logo} 
            alt={`${channel.name} logo`} 
            className="w-full h-full object-contain"
          />
        ) : (
          <ImageIcon className="w-6 h-6 text-gray-500" />
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-medium text-white">
          {channel.name}
        </h3>
      </div>
      <div className="flex gap-2 flex-wrap justify-end">
        {getSignalTypeBadge('sd', channel.numbers.sd)}
        {getSignalTypeBadge('isdbt', channel.numbers.isdbt)}
        {getSignalTypeBadge('hd', channel.numbers.hd)}
      </div>
    </div>
  )

  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-gray-900 to-black py-24">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-repeat opacity-5" 
          style={{
            backgroundImage: `
              radial-gradient(circle at 100% 100%, transparent 25%, rgba(255,255,255,0.05) 25.5%, transparent 26%),
              radial-gradient(circle at 0% 100%, transparent 25%, rgba(255,255,255,0.05) 25.5%, transparent 26%),
              radial-gradient(circle at 100% 0%, transparent 25%, rgba(255,255,255,0.05) 25.5%, transparent 26%),
              radial-gradient(circle at 0% 0%, transparent 25%, rgba(255,255,255,0.05) 25.5%, transparent 26%)
            `,
            backgroundSize: '64px 64px'
          }}
        />
        <div className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 sm:text-6xl">
            Grilla de Canales
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
            Explora nuestra completa programación
          </p>
        </div>

        {/* Search, View Toggle, and Filter Section */}
        <div className="mt-12 space-y-6">
          <div className="flex gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por nombre o número..."
                className="pl-10 bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus:border-blue-400/50 focus:ring-blue-400/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-1 flex gap-1 border border-white/10">
              <Button
                variant={viewMode === 'grid' ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-blue-600 hover:bg-blue-500' : ''}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-blue-600 hover:bg-blue-500' : ''}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-lg p-1 rounded-lg inline-flex gap-2 border border-white/10">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id as ChannelCategory)}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    className={`flex items-center gap-2 ${
                      selectedCategory === category.id 
                        ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <category.icon className="h-5 w-5" />
                    <span className="hidden sm:inline">{category.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-lg p-1 rounded-lg inline-flex gap-2 border border-white/10">
                {signalTypes.map((type) => (
                  <Button
                    key={type.id}
                    onClick={() => setSelectedSignalType(type.id as 'all' | SignalType)}
                    variant={selectedSignalType === type.id ? "default" : "ghost"}
                    className={`flex items-center gap-2 ${
                      selectedSignalType === type.id 
                        ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <type.icon className={`h-5 w-5 ${type.color || ''}`} />
                    <span className="hidden sm:inline">{type.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Channels Display */}
        <div className={`mt-16 ${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3' 
            : 'space-y-4'
        }`}>
          {filteredChannels.map((channel) => (
            viewMode === 'grid' 
              ? <ChannelCard key={channel.name} channel={channel} />
              : <ChannelRow key={channel.name} channel={channel} />
          ))}
        </div>

        {filteredChannels.length === 0 && (
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
              <Search className="h-5 w-5 text-gray-400" />
              <span className="text-gray-300">No se encontraron canales que coincidan con tu búsqueda.</span>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-12 flex justify-center gap-6 flex-wrap">
          {signalTypes.slice(1).map((type) => (
            <div key={type.id} className="flex items-center gap-2 bg-black/20 px-3 py-2 rounded-lg backdrop-blur-sm border border-white/5">
              <type.icon className={`h-4 w-4 ${type.color}`} />
              <span className="text-sm text-gray-300">{type.name}</span></div>
          ))}
        </div>
      </div>
    </div>
  )
}