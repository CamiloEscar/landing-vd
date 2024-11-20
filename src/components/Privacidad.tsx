import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Privacidad() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Política de Privacidad
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Recopilación de Información</h2>
            <p className="text-gray-600">
              Recopilamos información personal necesaria para la prestación de nuestros servicios, incluyendo:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
              <li>Nombre y datos de contacto</li>
              <li>Información de facturación</li>
              <li>Dirección de instalación</li>
              <li>Datos de uso del servicio</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Uso de la Información</h2>
            <p className="text-gray-600">
              La información recopilada se utiliza para:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
              <li>Proporcionar y mantener nuestros servicios</li>
              <li>Procesar pagos y facturación</li>
              <li>Comunicarnos con usted sobre su servicio</li>
              <li>Mejorar nuestros productos y servicios</li>
              <li>Cumplir con requisitos legales y regulatorios</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Protección de Datos</h2>
            <p className="text-gray-600">
              Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal, incluyendo:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
              <li>Encriptación de datos sensibles</li>
              <li>Firewalls y sistemas de seguridad</li>
              <li>Acceso restringido a información personal</li>
              <li>Monitoreo regular de nuestros sistemas</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Derechos del Usuario</h2>
            <p className="text-gray-600">
              Usted tiene derecho a:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
              <li>Acceder a su información personal</li>
              <li>Solicitar correcciones de sus datos</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Oponerse al procesamiento de sus datos</li>
              <li>Presentar una reclamación ante la autoridad de protección de datos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Contacto</h2>
            <p className="text-gray-600">
              Para cualquier consulta sobre nuestra política de privacidad, puede contactarnos en:
            </p>
            <div className="mt-2 text-gray-600">
              <p>Email: privacidad@videodigital.com</p>
              <p>Teléfono: 1-800-VIDEO-DG</p>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}