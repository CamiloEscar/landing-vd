import React, { useState } from 'react';
import { ChevronDown, Wifi, Tv, Router, CreditCard } from 'lucide-react';

const FAQSection = ({ icon: Icon, title, questions }) => {
  const [openQuestion, setOpenQuestion] = useState(null);

  return (
    <div id='faq' className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <Icon className="w-8 h-8 mr-3 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      {questions.map((q, index) => (
        <div key={index} className="border-b last:border-b-0 py-4">
          <button 
            onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
            className="w-full flex justify-between items-center text-left focus:outline-none"
          >
            <span className="font-semibold text-gray-700">{q.question}</span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform ${
                openQuestion === index ? 'rotate-180' : ''
              }`} 
            />
          </button>
          {openQuestion === index && (
            <div className="mt-2 text-gray-600 pl-4 border-l-4 border-blue-500">
              {q.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const PreguntasFrecuentes = () => {
  const faqSections = [
    {
      icon: Wifi,
      title: 'Internet Inalámbrico',
      questions: [
        {
          question: '¿Necesito teléfono de línea o TV por cable para el servicio?',
          answer: 'No, nuestro servicio de Internet Inalámbrico es independiente y no requiere línea telefónica o TV por cable.'
        },
        {
          question: '¿Cómo es la instalación?',
          answer: 'La instalación es rápida y sencilla. Nuestro técnico instala una antena en el exterior de su propiedad que captura la señal de internet.'
        },
        {
          question: '¿Cómo se conecta a mi casa?',
          answer: 'La antena externa se conecta a un router WiFi dentro de su casa, distribuyendo internet por cable o inalámbricamente.'
        },
        {
          question: '¿Cómo se conecta a mi PC?',
          answer: 'Puede conectarse mediante cable ethernet directamente al router o por WiFi usando la contraseña proporcionada.'
        },
        {
          question: '¿Cómo hago para tener WiFi en el celular y la TV?',
          answer: 'El router WiFi distribuye señal a todos los dispositivos. Solo necesita conectar su celular o TV al WiFi usando la contraseña.'
        },
        {
          question: '¿Cómo se paga la instalación?',
          answer: 'La instalación puede pagarse en cuotas junto con su mensualidad o como un cargo único al contratar el servicio.'
        },
        {
          question: '¿Puedo cambiarme de plan?',
          answer: 'Sí, puede cambiar de plan en cualquier momento. Nuestro equipo le ayudará a encontrar la mejor opción para sus necesidades.'
        },
        {
          question: '¿Si cambio de plan necesito otra antena?',
          answer: 'Depende del plan. Algunos cambios de velocidad no requieren nueva antena, mientras que otros sí pueden necesitar una actualización.'
        },
        // {
        //   question: '¿Cómo se paga Velocom?',
        //   answer: 'Puede pagar mediante transferencia bancaria, tarjeta de crédito, débito automático o en nuestros puntos de pago autorizados.'
        // }
      ]
    },
    {
      icon: Tv,
      title: 'Internet Fibra Óptica',
      questions: [
        {
          question: '¿Cómo es la instalación?',
          answer: 'La instalación de Fibra Óptica es profesional. Un técnico instala la fibra directamente en su domicilio y configura su equipo.'
        },
        {
          question: '¿Incluye un router WiFi?',
          answer: 'Sí, todos nuestros planes de Fibra Óptica incluyen un router WiFi de última generación sin costo adicional.'
        },
        {
          question: '¿Cómo funciona TV App?',
          answer: 'TV App le permite ver canales en streaming desde su smartphone, tablet o smart TV. Se descarga desde la tienda de aplicaciones.'
        },
        {
          question: '¿Dónde puedo ver Sensa?',
          answer: 'Puede ver Sensa a través de nuestra TV App o en canales específicos de nuestro servicio de televisión.'
        },
        {
          question: 'Si tengo una TV que no es Smart, ¿puedo tener el servicio TV por streaming?',
          answer: 'Sí, puede usar un dispositivo de streaming como Chromecast o un decodificador para ver contenido en su TV tradicional.'
        },
        {
          question: '¿Puedo cambiarme de plan?',
          answer: 'Por supuesto, puede cambiar de plan en cualquier momento. Le recomendamos contactar a nuestro servicio al cliente para asesoría personalizada.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Preguntas Frecuentes
        </h1>
        {faqSections.map((section, index) => (
          <FAQSection 
            key={index} 
            icon={section.icon} 
            title={section.title} 
            questions={section.questions} 
          />
        ))}
      </div>
    </div>
  );
};

export default PreguntasFrecuentes;