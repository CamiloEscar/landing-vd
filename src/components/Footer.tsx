import React, { useState, useEffect } from 'react';
import { 
  Wifi, Mail, Phone, MapPin, Facebook, Twitter, 
  Instagram, Youtube, ExternalLink, QrCode 
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const Footer = () => {
  const [visitCount, setVisitCount] = useState(0);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Simulación de contador de visitas - En producción esto debería
    // conectarse a tu backend
    const storedCount = localStorage.getItem('visitCount') || 0;
    const newCount = parseInt(storedCount) + 1;
    localStorage.setItem('visitCount', newCount);
    setVisitCount(newCount);
  }, []);

  const qrValue = "https://www.videodigital.com"; // URL de tu empresa

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna de información de la empresa */}
          <div className="col-span-1">
            <div className="flex items-center">
              <Wifi className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-white">Video Digital</span>
            </div>
            <p className="mt-4 text-gray-300">
              Conectando hogares con el mejor servicio de cable e internet desde 2018.
            </p>
            
            {/* QR Code */}
            <Card className="mt-4 p-4 bg-white w-32 h-32">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(qrValue)}`}
                alt="QR Code de la empresa"
                className="w-full h-full"
              />
            </Card>

            {/* Contador de visitas */}
            <div className="mt-4 bg-gray-800 rounded-lg p-3 inline-block">
              <p className="text-gray-300 text-sm">Visitas totales:</p>
              <p className="text-blue-500 font-bold text-xl">{visitCount.toLocaleString()}</p>
            </div>

            {/* Redes sociales */}
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Columna de Servicios */}
          <div>
            <h3 className="text-sm font-semibold text-blue-400 tracking-wider uppercase">
              Servicios
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#plans" className="text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span>Internet de Alta Velocidad</span>
                  <ExternalLink className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#plans" className="text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span>TV Digital HD</span>
                  <ExternalLink className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#plans" className="text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span>Paquetes Combinados</span>
                  <ExternalLink className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#plans" className="text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span>Servicios Empresariales</span>
                  <ExternalLink className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Columna de Soporte */}
          <div>
            <h3 className="text-sm font-semibold text-blue-400 tracking-wider uppercase">
              Soporte
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#about" className="text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span>Centro de Ayuda</span>
                  <ExternalLink className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#coverage" className="text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span>Verificar Cobertura</span>
                  <ExternalLink className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#payment" className="text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span>Realizar Pagos</span>
                  <ExternalLink className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span>Reportar Problemas</span>
                  <ExternalLink className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Columna de Contacto */}
          <div>
            <h3 className="text-sm font-semibold text-blue-400 tracking-wider uppercase">
              Contacto 24/7
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center group">
                <Phone className="h-5 w-5 text-blue-500" />
                <a href="tel:1800VIDEODG" className="ml-2 text-gray-300 hover:text-white transition-colors">
                  1-800-VIDEO-DG
                </a>
              </li>
              <li className="flex items-center group">
                <Mail className="h-5 w-5 text-blue-500" />
                <a href="mailto:contacto@videodigital.com" className="ml-2 text-gray-300 hover:text-white transition-colors">
                  contacto@videodigital.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                <span className="ml-2 text-gray-300">
                  Av. Principal #123,<br />
                  Ciudad Central, CP 12345
                </span>
              </li>
              <li className="mt-4">
                <a 
                  href="https://servicioscf.afip.gob.ar/publico/denuncias/denunciaCD.aspx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  <span className="text-white text-sm">Denuncias AFIP</span>
                  <ExternalLink className="h-4 w-4 ml-2 text-white" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer inferior */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-base text-gray-400 text-center md:text-left">
              © {currentYear} Video Digital. Todos los derechos reservados.
            </p>
            <div className="flex justify-center md:justify-end space-x-6">
              <a href="/terminos" className="text-gray-400 hover:text-white transition-colors">
                Términos y Condiciones
              </a>
              <a href="/privacidad" className="text-gray-400 hover:text-white transition-colors">
                Privacidad
              </a>
              <a href="/legal" className="text-gray-400 hover:text-white transition-colors">
                Legal
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;