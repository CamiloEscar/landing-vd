import { Action } from '../types';

class NLPService {
  private intents: { [key: string]: string[] } = {
    greeting: ['hola', 'buenos días', 'buenas tardes', 'hey'],
    farewell: ['adiós', 'hasta luego', 'chao', 'nos vemos'],
    help: ['ayuda', 'necesito ayuda', 'problemas', 'no funciona'],
    internet: ['internet', 'wifi', 'conexión', 'red'],
    tv: ['televisión', 'canales', 'señal', 'cable'],
    billing: ['factura', 'pago', 'cobro', 'cuenta'],
    plans: ['planes', 'paquetes', 'ofertas', 'promociones'],
    complaints: ['queja', 'reclamo', 'insatisfecho', 'problema'],
  };

  private responses: { [key: string]: string[] } = {
    greeting: [
      "¡Hola! Bienvenido a nuestro servicio de atención al cliente. Soy su asistente virtual y estoy aquí para ayudarle con cualquier consulta o problema que tenga. ¿En qué puedo ayudarle hoy?",
      "¡Buenos días! (o buenas tardes, según la hora). Me alegro de atenderle. Soy el asistente virtual de la compañía. ¿Cómo puedo ayudarle en este momento?",
      "¡Saludos! Gracias por contactar con nuestro servicio de atención al cliente. Estoy aquí para ayudarle con cualquier pregunta o inquietud que tenga. ¿En qué puedo asistirle hoy?"
    ],
    farewell: [
      "Ha sido un placer ayudarle. Si necesita algo más en el futuro, no dude en volver a contactarnos. Estamos disponibles las 24 horas del día, los 7 días de la semana. ¡Que tenga un excelente día!",
      "Gracias por utilizar nuestro servicio de atención al cliente. Recuerde que estamos aquí para ayudarle en cualquier momento. Si tiene más preguntas, no dude en volver a contactarnos. ¡Que tenga un buen día!",
      "Me alegra haber podido ayudarle. Si surge cualquier otra duda o necesidad, por favor, no dude en volver a contactarnos. Estamos aquí para servirle. ¡Cuídese y hasta pronto!"
    ],
    help: [
      "Entiendo que está experimentando algunos problemas. No se preocupe, estoy aquí para ayudarle. ¿Podría, por favor, darme más detalles sobre la situación que está enfrentando? Por ejemplo, ¿es un problema con su servicio de internet, televisión, o tal vez con su factura?",
      "Lamento que esté teniendo dificultades. Vamos a resolverlo juntos, paso a paso. ¿Podría describir el problema con más detalle? Por ejemplo, ¿cuándo comenzó a notar este problema? ¿Ha intentado alguna solución por su cuenta?",
      "Estoy aquí para asistirle con cualquier problema que tenga. Para poder ayudarle mejor, ¿podría especificar si es un problema con internet, TV, facturación o algún otro servicio? Cuanto más detalles me proporcione, mejor podré ayudarle."
    ],
    internet: [
      "Entiendo que está teniendo problemas con su conexión a internet. No se preocupe, vamos a solucionarlo juntos. Primero, ¿ha intentado reiniciar su router? Para hacerlo, desconecte el cable de la corriente, espere 30 segundos, y vuelva a conectarlo. A veces, esto puede resolver muchos problemas de conexión. ¿Podría intentarlo y decirme si nota alguna mejora?",
      "Lamento que esté experimentando dificultades con su internet. Para ayudarle mejor, ¿podría decirme si el problema es de velocidad lenta, conexión intermitente o falta total de conexión? Además, ¿el problema afecta a todos los dispositivos en su hogar o solo a uno en particular?",
      "Los problemas de internet pueden ser muy frustrantes, pero estoy aquí para ayudarle. Vamos a hacer algunas comprobaciones básicas. Primero, ¿podría verificar si todos los cables de su router están bien conectados? Luego, ¿podría intentar conectarse tanto por cable como por WiFi (si es posible) y decirme si nota alguna diferencia?"
    ],
    tv: [
      "Lamento que esté teniendo problemas con su servicio de TV. Vamos a intentar solucionarlo. Primero, ¿podría decirme si está experimentando problemas de señal, calidad de imagen o con canales específicos? Esto nos ayudará a identificar la causa del problema.",
      "Entiendo que hay un problema con su servicio de televisión. No se preocupe, vamos a resolverlo juntos. ¿Ha notado si el problema ocurre en todos los canales o solo en algunos en particular? Además, ¿podría comprobar si los cables de su decodificador están bien conectados?",
      "Siento las molestias con su servicio de TV. Para ayudarle mejor, ¿podría decirme si el problema comenzó repentinamente o ha estado ocurriendo gradualmente? También, ¿ha intentado reiniciar su decodificador? A veces, un simple reinicio puede resolver muchos problemas."
    ],
    billing: [
      "Entiendo que tiene una consulta sobre su factura. Estoy aquí para ayudarle a aclarar cualquier duda. ¿Hay algún cargo específico que le gustaría revisar o tiene una pregunta general sobre su factura? Recuerde que también puede acceder a los detalles de su factura en línea a través de nuestro sitio web.",
      "Las cuestiones de facturación pueden ser confusas a veces, pero estoy aquí para ayudarle a entenderlas. ¿Le gustaría que revisáramos juntos los componentes principales de su factura? Puedo explicarle cada sección para que tenga una mejor comprensión de los cargos.",
      "Lamento si ha tenido algún problema con su factura. ¿Podría decirme si su consulta es sobre el monto total, algún cargo específico o sobre las opciones de pago disponibles? Estoy aquí para ayudarle a entender cada detalle de su factura."
    ],
    plans: [
      "¡Me alegra que esté interesado en nuestros planes! Para recomendarle la mejor opción, ¿podría decirme qué servicios le interesan más: internet de alta velocidad, TV con variedad de canales, o telefonía? También, ¿cuántas personas viven en su hogar y qué tipo de actividades realizan en internet?",
      "Tenemos una variedad de planes diseñados para satisfacer diferentes necesidades. Para ayudarle a encontrar el más adecuado, ¿podría contarme un poco sobre cómo utiliza estos servicios en su hogar? Por ejemplo, ¿ve mucha televisión, trabaja desde casa, o quizás tiene hijos que usan internet para estudiar?",
      "Es genial que esté explorando nuestras opciones de planes. Para asegurarme de ofrecerle la mejor recomendación, ¿podría decirme qué es lo más importante para usted en un plan de servicios? ¿Velocidad de internet, variedad de canales de TV, o tal vez un paquete que incluya todo a un precio económico?"
    ],
    complaints: [
      "Lamento mucho escuchar que tiene una queja. Su satisfacción es muy importante para nosotros. Para asegurarnos de que su reclamo sea atendido adecuadamente, le recomiendo contactar directamente con nuestro servicio de reclamos al número 3442457060. Están disponibles de lunes a viernes de 8:00 a 20:00 horas.",
      "Entiendo que está insatisfecho con nuestro servicio y lo siento mucho. Para que podamos abordar su reclamo de la manera más eficiente, por favor llame a nuestro departamento de reclamos al 3442457060. Ellos están especialmente capacitados para manejar estas situaciones y asegurarse de que su problema se resuelva.",
      "Agradezco que nos haga saber su insatisfacción. Queremos hacer las cosas bien. Le sugiero que se comunique con nuestro equipo especializado de reclamos al 3442457060. Ellos tomarán todos los detalles de su queja y se asegurarán de que se le dé seguimiento hasta su resolución."
    ]
  };

  public detectIntent(input: string): string {
    const lowercaseInput = input.toLowerCase();
    for (const [intent, keywords] of Object.entries(this.intents)) {
      if (keywords.some(keyword => lowercaseInput.includes(keyword))) {
        return intent;
      }
    }
    return 'unknown';
  }

  public generateResponse(intent: string): string {
    const responses = this.responses[intent] || this.responses['help'];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  public async performAction(action: Action): Promise<string> {
    switch (action.type) {
      case 'PROVIDE_CONTACT':
        return "Para obtener información específica sobre su cuenta o factura, o para presentar un reclamo, por favor contacte a nuestro equipo de atención al cliente al 3442457060. Están disponibles de lunes a viernes de 8:00 a 20:00 horas. ¿Hay algo más en lo que pueda ayudarle mientras tanto?";
      case 'TROUBLESHOOT_INTERNET':
        return "Lamento que esté experimentando problemas con su conexión a internet. Vamos a intentar algunos pasos básicos de solución de problemas:\n\n1. Reinicie su router: Desconéctelo de la corriente, espere 30 segundos y vuelva a conectarlo.\n2. Verifique las conexiones: Asegúrese de que todos los cables estén correctamente conectados.\n3. Compruebe otros dispositivos: ¿El problema ocurre en todos sus dispositivos o solo en uno?\n\nSi después de estos pasos el problema persiste, le recomiendo contactar a nuestro soporte técnico al 3442457060 para una asistencia más detallada. ¿Le gustaría que le explicara alguno de estos pasos con más detalle?";
      case 'EXPLAIN_BILL':
        return "Entiendo que tiene preguntas sobre su factura. Aunque no puedo acceder a su información específica, puedo explicarle los componentes generales de nuestras facturas:\n\n1. Cargo base: Este es el costo mensual de su plan.\n2. Servicios adicionales: Cualquier servicio extra que haya contratado.\n3. Impuestos y tasas: Varían según su ubicación.\n4. Descuentos: Si tiene alguna promoción aplicada.\n\nPara obtener detalles específicos sobre su factura, le recomiendo que inicie sesión en su cuenta en línea o contacte a nuestro equipo de facturación al 3442457060. ¿Le gustaría que le explicara cómo acceder a su cuenta en línea para ver su factura?";
      default:
        return 'Entiendo su solicitud. Para poder ayudarle de la mejor manera, le recomiendo que contacte directamente con nuestro equipo de atención al cliente al 3442457060. Ellos podrán asistirle con información específica y realizar acciones en su cuenta si es necesario. ¿Hay algo más en lo que pueda orientarle mientras tanto?';
    }
  }
}

export const nlpService = new NLPService();

