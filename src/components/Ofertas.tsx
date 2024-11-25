// src/components/Offers.tsx
import React from 'react';
import { ArrowRight, Clock, Star, CheckCircle } from 'lucide-react';

interface OfferType {
  id: number;
  title: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  duration: string;
  features: string[];
  isPopular?: boolean;
  imageUrl: string;
}

const Offers: React.FC = () => {
  const offers: OfferType[] = [
    {
      id: 1,
      title: "Pack ejemplo",
      description: "¡No te pierdas ningún partido! Incluye todos los canales deportivos en HD",
      originalPrice: 5999,
      discountPrice: 4499,
      discountPercentage: 25,
      duration: "3 meses",
      features: [
        "Todos los partidos de fútbol en vivo",
        "Eventos deportivos internacionales",
        "Contenido exclusivo 24/7",
        "Calidad HD garantizada"
      ],
      isPopular: true,
      imageUrl: "/deportes-banner.jpg"
    },
    // {
    //   id: 2,
    //   title: "Pack Familiar Total",
    //   description: "Entretenimiento para toda la familia con más de 200 canales",
    //   originalPrice: 4999,
    //   discountPrice: 3999,
    //   discountPercentage: 20,
    //   duration: "6 meses",
    //   features: [
    //     "Canales infantiles",
    //     "Series y películas",
    //     "Documentales",
    //     "Control parental incluido"
    //   ],
    //   imageUrl: "/familia-banner.jpg"
    // },
    // {
    //   id: 3,
    //   title: "Pack Internet + TV",
    //   description: "Combina tu servicio de TV con internet de alta velocidad",
    //   originalPrice: 7999,
    //   discountPrice: 5999,
    //   discountPercentage: 25,
    //   duration: "12 meses",
    //   features: [
    //     "Internet 100MB",
    //     "Más de 200 canales",
    //     "Instalación gratuita",
    //     "Soporte técnico 24/7"
    //   ],
    //   imageUrl: "/internet-tv-banner.jpg"
    // }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ofertas Especiales
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Aprovecha nuestras promociones por tiempo limitado
          </p>
        </div>

        {/* Grid de ofertas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 
                ${offer.isPopular ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}`}
            >
              {/* Banner de imagen */}
              <div className="h-48 relative overflow-hidden">
                <img
                  src={offer.imageUrl}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                {offer.isPopular && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Más Popular
                  </div>
                )}
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {offer.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {offer.description}
                </p>

                {/* Precios */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${offer.discountPrice}
                    </span>
                    <span className="ml-2 text-lg text-gray-500 dark:text-gray-400 line-through">
                      ${offer.originalPrice}
                    </span>
                    <span className="ml-2 text-sm font-medium text-green-500">
                      {offer.discountPercentage}% OFF
                    </span>
                  </div>
                  <div className="flex items-center mt-2 text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">Válido por {offer.duration}</span>
                  </div>
                </div>

                {/* Características */}
                <ul className="mb-6 space-y-2">
                  {offer.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Botón */}
                <button className="w-full flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200">
                  Contratar ahora
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Banner de tiempo limitado */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">¡Ofertas por tiempo limitado!</h3>
          <p className="text-lg mb-4">
            Aprovecha estos precios especiales. Válidos hasta agotar stock.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
            Ver todas las ofertas
          </button>
        </div>
      </div>
    </section>
  );
};

export default Offers;