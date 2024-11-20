import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Legal() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Información Legal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Información de la Empresa</h2>
            <div className="text-gray-600 space-y-2">
              <p>Razón Social: Video Digital S.A.</p>
              <p>CUIT: XX-XXXXXXXX-X</p>
              <p>Domicilio Legal: Av. Principal #123, Ciudad Central</p>
              <p>Inscripción Registral: Registro Público de Comercio N° XXXX</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Licencias y Autorizaciones</h2>
            <div className="text-gray-600 space-y-2">
              <p>Licencia ENACOM N° XXXX</p>
              <p>Registro Nacional de Prestadores de Servicios de Comunicación Audiovisual N° XXXX</p>
              <p>Habilitación Municipal N° XXXX</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Marco Regulatorio</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Ley de Servicios de Comunicación Audiovisual N° 26.522</li>
              <li>Ley Argentina Digital N° 27.078</li>
              <li>Resoluciones ENACOM aplicables</li>
              <li>Ley de Defensa del Consumidor N° 24.240</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Defensa del Consumidor</h2>
            <div className="text-gray-600 space-y-2">
              <p>Para reclamos de defensa del consumidor:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Línea gratuita: 0800-XXX-XXXX</li>
                <li>Libro de Quejas disponible en todas nuestras sucursales</li>
                <li>Ventanilla única federal: <a href="https://www.argentina.gob.ar/produccion/defensadelconsumidor" className="text-blue-600 hover:underline">www.argentina.gob.ar/produccion/defensadelconsumidor</a></li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Denuncias AFIP</h2>
            <div className="text-gray-600 space-y-2">
              <p>Para realizar denuncias ante AFIP:</p>
              <a 
                href="https://servicioscf.afip.gob.ar/publico/denuncias/denunciaCD.aspx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline block mt-2"
              >
                Formulario de Denuncias AFIP
              </a>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Propiedad Intelectual</h2>
            <p className="text-gray-600">
              Todas las marcas, logos, nombres comerciales, signos distintivos, servicios y contenidos de Video Digital 
              están protegidos por las leyes de propiedad intelectual.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}