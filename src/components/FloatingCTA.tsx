import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 p-6 bg-white rounded-lg shadow-lg max-w-sm"
          >
            <h3 className="text-lg font-semibold mb-2">¿Necesitas ayuda?</h3>
            <p className="text-gray-600 mb-4">
              Nuestro equipo está disponible 24/7 para responder tus preguntas.
            </p>
            <div className="space-y-2">
              <a
                href="tel:1800VIDEODG"
                className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Llamar ahora
              </a>
              <a
                href="mailto:contacto@videodigital.com"
                className="block w-full text-center py-2 px-4 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                Enviar email
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>
    </div>
  );
}