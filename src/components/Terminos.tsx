import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TerminosCondiciones() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Términos y Condiciones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Aceptación de los Términos</h2>
            <p className="text-gray-600">
              Al acceder y utilizar los servicios de Video Digital, usted acepta estos términos y condiciones en su totalidad. 
              Si no está de acuerdo con estos términos, no debe utilizar nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Servicios</h2>
            <p className="text-gray-600">
              Video Digital proporciona servicios de televisión por cable e internet según los planes contratados. 
              Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del servicio en cualquier momento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Responsabilidades del Cliente</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Mantener al día los pagos del servicio</li>
              <li>Utilizar los servicios de manera legal y apropiada</li>
              <li>No realizar modificaciones no autorizadas al equipo proporcionado</li>
              <li>Reportar cualquier fallo o irregularidad en el servicio</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Pagos y Facturación</h2>
            <p className="text-gray-600">
              Los pagos deben realizarse mensualmente según el plan contratado. Los cargos por mora o reconexión 
              serán aplicados según las políticas vigentes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Cancelación del Servicio</h2>
            <p className="text-gray-600">
              El cliente puede cancelar el servicio con un preaviso de 30 días. Deberá devolver los equipos 
              proporcionados en buen estado o abonar su valor residual.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}