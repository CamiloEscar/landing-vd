"use client"

import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useThemeValue } from '@/context/ThemeContext'

interface Review {
  id: string
  author_name: string
  author_type?: string
  rating: number
  text: string
  date: string
  likes?: number
  reply?: {
    author: string
    text: string
    date: string
  }
}

const initialReviews: Review[] = [
  {
    id: '1',
    author_name: 'Diego Aguilar',
    author_type: 'Local Guide',
    rating: 5,
    text: 'Siempre tratan tu problema de la mejor manera. El servicio de video digital es muy bueno tanto en televisión HD como en internet de alta definición a través de su fibra óptica. La principal ventaja de la empresa es estar en la ...',
    date: 'Hace un año',
    likes: 1
  },
  {
    id: '2',
    author_name: 'Roberto Scevola',
    author_type: 'Local Guide',
    rating: 5,
    text: 'Servicio de internet y cable lo instalamos en un negocio hace dos años. Muy buen servicio. Este mes decidí instalar el sistema en mí casa, después les cuento.',
    date: 'Hace un año',
    reply: {
      author: 'Video Digital (propietario)',
      text: 'Muchas gracias por la confianza.',
      date: 'Hace un año'
    }
  },
  {
    id: '3',
    author_name: 'Maira Gonzalez',
    rating: 5,
    text: 'Excelente servicio, y atención! He tenido pocos inconvenientes, pero siempre los han solucionado con mucha paciencia y amabilidad. Muy recomendable! Además, buen precio de internet + cable (:',
    date: 'Hace 3 años'
  },
  {
    id: '4',
    author_name: 'Raul cesar Altamirano',
    rating: 3,
    text: 'Excelente servicio, pero cuando se corta la señal de internet fuera del horario administrativo no tienen un número de teléfono para atención, no hay forma que te arreglen el servicio hasta el otro día, y ni hablar si es fin de semana',
    date: 'Hace 4 años',
    likes: 1
  },
  {
    id: '5',
    author_name: 'Nahuel Francia',
    rating: 5,
    text: 'Impresionante como instalan los técnicos, muy prolijos y rápidos, el internet vuela, está a la velocidad de la looooooooz!',
    date: 'Hace 2 años'
  },
  {
    id: '6',
    author_name: 'Felipe Guzman',
    rating: 5,
    text: 'Excelente calidad de imagen y velocidad de internet, no se corta !!!',
    date: 'Hace 5 años',
    reply: {
      author: 'Video Digital (propietario)',
      text: 'Todos dias nos esforzamos para transmitir la mejor internet y televison. Muchas gracias por tus comentarios',
      date: 'Hace 5 años'
    }
  },
  {
    id: '7',
    author_name: 'Francisco Pelozo',
    rating: 5,
    text: 'INTERNET DE ALTA VELOCIDAD',
    date: 'Hace 2 años'
  },
  {
    id: '8',
    author_name: 'Julieta Valori',
    author_type: 'Local Guide',
    rating: 4,
    text: 'Buen servicio, amables en la atención. La estabilidad y rapidez de internet es buena',
    date: 'Hace 2 años'
  }
]

export default function GoogleReviewsSlider() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [newReview, setNewReview] = useState({ author_name: '', rating: 5, text: '' })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const background = useThemeValue('bg-white', 'bg-gray-800'); // Cambia colores según el tema
  const textColor = useThemeValue('text-gray-900', 'text-gray-100');
  const cardShadow = useThemeValue('shadow-lg', 'shadow-none');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    const review: Review = {
      id: (reviews.length + 1).toString(),
      ...newReview,
      date: 'Justo ahora'
    }
    setReviews([review, ...reviews])
    setNewReview({ author_name: '', rating: 5, text: '' })
    setIsDialogOpen(false)
  }

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [reviews.length])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length)
  }

  return (
    <div className={`max-w-4xl mx-auto px-4 py-16 ${background}`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h2 className={`text-4xl font-bold ${textColor}`}>Video Digital</h2>
          <div className="flex items-center mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 ${
                    star <= Math.round(averageRating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className={`ml-2 text-2xl font-semibold ${textColor}`}>{averageRating.toFixed(1)}</span>
            <span className="ml-2 text-gray-600">({reviews.length} reseñas)</span>
          </div>
        </div>
        <a
          href="https://www.google.com/maps/place/Video+Digital/@-32.4888188,-58.2676553,17z/data=!4m8!3m7!1s0x95afdbbf7c420d65:0xde1b2afdc5796c68!8m2!3d-32.4888188!4d-58.2654666!9m1!1b1!16s%2Fg%2F11gr2scpf3?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" className="hover:bg-gray-100 dark:hover:bg-gray-700">
            Escribir una reseña
          </Button>
        </a>
        {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className={`hover:bg-gray-100 ${background}`}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Escribir una reseña
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Escribe tu reseña</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <Label htmlFor="author_name">Nombre</Label>
                <Input
                  id="author_name"
                  value={newReview.author_name}
                  onChange={(e) => setNewReview({ ...newReview, author_name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="rating">Calificación</Label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="p-1"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= newReview.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="text">Reseña</Label>
                <Textarea
                  id="text"
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Publicar reseña</Button>
            </form>
          </DialogContent>
        </Dialog> */}

      </motion.div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Card className={`w-full ${cardShadow}`}>
              <CardContent className={`p-6 ${background}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl font-semibold text-white">
                      {reviews[currentIndex].author_name[0]}
                    </div>
                    <div className="ml-4">
                      <h3 className={`text-lg font-semibold ${textColor}`}>{reviews[currentIndex].author_name}</h3>
                      {reviews[currentIndex].author_type && (
                        <p className="text-sm text-gray-500">{reviews[currentIndex].author_type}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{reviews[currentIndex].date}</div>
                </div>
                <div className="flex mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= reviews[currentIndex].rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className={`mt-4 ${textColor}`}>{reviews[currentIndex].text}</p>
                {reviews[currentIndex].reply && (
                  <div className="mt-4 pl-4 border-l-2 border-blue-500">
                    <p className={`font-semibold ${textColor}`}>{reviews[currentIndex].reply.author}</p>
                    <p className="text-sm text-gray-500">{reviews[currentIndex].reply.date}</p>
                    <p className={`mt-2 ${textColor}`}>{reviews[currentIndex].reply.text}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 bg-white hover:bg-gray-100 shadow-md"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-white hover:bg-gray-100 shadow-md"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}