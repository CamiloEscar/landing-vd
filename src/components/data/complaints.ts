import { Wifi, Tv, Router, Cable, Zap, SignalHigh } from 'lucide-react'
import { ComplaintType } from '../types/complaints'

export const complaintTypes: ComplaintType[] = [
  {
    id: 'internet',
    name: 'Problemas de Internet',
    icon: Wifi,
    problems: [
      {
        id: 'no-connection',
        label: 'Sin conexión',
        description: 'No hay señal de internet',
        solutions: [
          {
            id: 'restart-modem',
            title: 'Reiniciar el módem',
            steps: [
              'Desconecta el módem de la corriente eléctrica',
              'Espera 30 segundos',
              'Vuelve a conectar el módem',
              'Espera a que todas las luces se estabilicen',
            ]
          },
          {
            id: 'check-connections',
            title: 'Verificar conexiones',
            steps: [
              'Asegúrate de que el cable de fibra óptica esté bien conectado al módem',
              'Verifica que el cable Ethernet esté correctamente conectado (si aplica)',
              'Comprueba que no haya daños visibles en los cables',
            ]
          },
          {
            id: 'check-multiple-devices',
            title: 'Comprobar en varios dispositivos',
            steps: [
              'Intenta conectarte a internet desde otro dispositivo',
              'Si ningún dispositivo tiene conexión, el problema es probablemente del servicio',
              'Si solo un dispositivo no tiene conexión, el problema puede ser de ese dispositivo',
            ]
          }
        ]
      },
      {
        id: 'slow-connection',
        label: 'Conexión lenta',
        description: 'Internet funciona, pero muy lento',
        solutions: [
          {
            id: 'speed-test',
            title: 'Realizar prueba de velocidad',
            steps: [
              'Ve a speedtest.net y realiza una prueba de velocidad',
              'Compara el resultado con la velocidad contratada',
              'Si es significativamente menor, continúa con las siguientes soluciones',
            ]
          },
          {
            id: 'check-connected-devices',
            title: 'Verificar dispositivos conectados',
            steps: [
              'Accede a la interfaz de tu router (generalmente 192.168.0.1 o 192.168.1.1)',
              'Revisa la lista de dispositivos conectados',
              'Desconecta dispositivos que no estés usando activamente',
            ]
          },
          {
            id: 'change-wifi-channel',
            title: 'Cambiar canal de Wi-Fi',
            steps: [
              'Accede a la configuración de tu router',
              'Busca la opción de "Canal Wi-Fi" o "Wireless Channel"',
              'Cambia a un canal menos congestionado (1, 6 o 11 para 2.4GHz)',
              'Guarda los cambios y reinicia el router',
            ]
          }
        ]
      },
      {
        id: 'intermittent-connection',
        label: 'Conexión intermitente',
        description: 'La conexión se corta frecuentemente',
        solutions: [
          {
            id: 'check-wifi-signal',
            title: 'Verificar la señal Wi-Fi',
            steps: [
              'Acércate al router y comprueba si el problema persiste',
              'Si mejora cerca del router, considera usar un repetidor Wi-Fi',
              'Asegúrate de que no haya obstáculos grandes entre el router y tus dispositivos',
            ]
          },
          {
            id: 'update-router-firmware',
            title: 'Actualizar firmware del router',
            steps: [
              'Accede a la interfaz de administración del router',
              'Busca la opción de "Actualización de firmware" o similar',
              'Si hay una actualización disponible, instálala siguiendo las instrucciones',
            ]
          },
          {
            id: 'check-interference',
            title: 'Comprobar interferencias',
            steps: [
              'Aleja el router de otros dispositivos electrónicos',
              'Especialmente de microondas, teléfonos inalámbricos y monitores de bebé',
              'Intenta cambiar la ubicación del router si es posible',
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'tv',
    name: 'Problemas de TV',
    icon: Tv,
    problems: [
      {
        id: 'no-signal',
        label: 'Sin señal',
        description: 'Pantalla en negro o mensaje "Sin señal"',
        solutions: [
          {
            id: 'check-tv-connections',
            title: 'Verificar conexiones',
            steps: [
              'Asegúrate de que el cable del decodificador esté bien conectado al televisor',
              'Verifica que el decodificador esté enchufado y encendido',
              'Comprueba que el televisor esté en la entrada (HDMI, AV) correcta',
            ]
          },
          {
            id: 'restart-decoder',
            title: 'Reiniciar el decodificador',
            steps: [
              'Desenchufa el decodificador de la corriente',
              'Espera 30 segundos',
              'Vuelve a enchufar el decodificador',
              'Espera a que se reinicie completamente (puede tardar unos minutos)',
            ]
          },
          {
            id: 'check-input-signal',
            title: 'Verificar la señal de entrada',
            steps: [
              'Asegúrate de que el cable de fibra óptica esté bien conectado al decodificador',
              'Verifica que no haya daños visibles en el cable',
              'Si es posible, prueba con otro cable',
            ]
          }
        ]
      },
      {
        id: 'pixelated-image',
        label: 'Imagen pixelada',
        description: 'La imagen se ve borrosa o con cuadrados',
        solutions: [
          {
            id: 'check-signal-strength',
            title: 'Comprobar la señal',
            steps: [
              'Accede al menú de configuración del decodificador',
              'Busca la opción de "Intensidad de señal" o similar',
              'Si la señal es débil, verifica las conexiones de los cables',
            ]
          },
          {
            id: 'restart-decoder-pixelated',
            title: 'Reiniciar el decodificador',
            steps: [
              'Apaga el decodificador',
              'Desenchúfalo de la corriente',
              'Espera 1 minuto',
              'Vuelve a enchufarlo y enciéndelo',
            ]
          },
          {
            id: 'check-resolution',
            title: 'Verificar la resolución',
            steps: [
              'Accede a la configuración del decodificador',
              'Asegúrate de que la resolución de salida coincida con la de tu TV',
              'Prueba diferentes resoluciones si es necesario',
            ]
          }
        ]
      },
      {
        id: 'audio-issues',
        label: 'Problemas de audio',
        description: 'No hay sonido o se escucha distorsionado',
        solutions: [
          {
            id: 'check-audio-connections',
            title: 'Verificar conexiones de audio',
            steps: [
              'Asegúrate de que el cable HDMI o de audio esté bien conectado',
              'Si usas un sistema de sonido, verifica sus conexiones',
              'Prueba con otro cable si es posible',
            ]
          },
          {
            id: 'check-audio-settings',
            title: 'Comprobar configuración de audio',
            steps: [
              'Accede al menú de configuración del decodificador',
              'Verifica que la salida de audio esté configurada correctamente',
              'Prueba diferentes configuraciones (estéreo, surround, etc.)',
            ]
          },
          {
            id: 'restart-devices-audio',
            title: 'Reiniciar dispositivos',
            steps: [
              'Apaga el televisor y el decodificador',
              'Desenchufa ambos de la corriente',
              'Espera 1 minuto',
              'Vuelve a enchufar y encender ambos dispositivos',
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'modem',
    name: 'Problemas de Módem',
    icon: Router,
    problems: [
      {
        id: 'modem-lights',
        label: 'Luces del módem',
        description: 'Las luces del módem no se ven normales',
        solutions: [
          {
            id: 'interpret-modem-lights',
            title: 'Interpretar las luces del módem',
            steps: [
              'Verifica el significado de cada luz en el manual del módem',
              'Asegúrate de que la luz de "Power" esté encendida y estable',
              'La luz de "Internet" o "Online" debe estar encendida y estable',
              'Si alguna luz está parpadeando en rojo, puede indicar un problema',
            ]
          },
          {
            id: 'restart-modem-lights',
            title: 'Reiniciar el módem',
            steps: [
              'Desenchufa el módem de la corriente',
              'Espera 30 segundos',
              'Vuelve a enchufar el módem',
              'Espera a que todas las luces se estabilicen (puede tardar unos minutos)',
            ]
          },
          {
            id: 'check-modem-connections',
            title: 'Verificar conexiones',
            steps: [
              'Asegúrate de que el cable de fibra óptica esté bien conectado',
              'Verifica que todos los cables estén correctamente enchufados',
              'Comprueba que no haya daños visibles en ningún cable',
            ]
          }
        ]
      },
      {
        id: 'modem-not-powering',
        label: 'El módem no enciende',
        description: 'El módem no muestra signos de estar encendido',
        solutions: [
          {
            id: 'check-power-supply',
            title: 'Verificar la fuente de alimentación',
            steps: [
              'Asegúrate de que el cable de alimentación esté bien conectado al módem',
              'Verifica que el enchufe esté funcionando (prueba con otro dispositivo)',
              'Si es posible, prueba con otro cable de alimentación',
            ]
          },
          {
            id: 'check-power-button',
            title: 'Comprobar el botón de encendido',
            steps: [
              'Localiza el botón de encendido del módem',
              'Asegúrate de que esté en la posición de "encendido"',
              'Intenta presionar el botón de encendido si está apagado',
            ]
          },
          {
            id: 'wait-and-observe',
            title: 'Esperar y observar',
            steps: [
              'Algunos módems pueden tardar en iniciar después de una desconexión',
              'Deja el módem enchufado y espera hasta 5 minutos',
              'Observa si hay algún cambio en las luces durante este tiempo',
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'fiber',
    name: 'Problemas de Fibra',
    icon: Cable,
    problems: [
      {
        id: 'fiber-damage',
        label: 'Cable de fibra dañado',
        description: 'Sospechas de daño en el cable de fibra óptica',
        solutions: [
          {
            id: 'visually-inspect-cable',
            title: 'Inspeccionar visualmente el cable',
            steps: [
              'Revisa cuidadosamente el cable de fibra óptica visible',
              'Busca signos de daño como dobleces, cortes o aplastamiento',
              'No manipules el cable si encuentras daños',
            ]
          },
          {
            id: 'check-fiber-connections',
            title: 'Verificar las conexiones',
            steps: [
              'Asegúrate de que el cable esté bien conectado en ambos extremos',
              'No desconectes el cable de fibra óptica si no estás seguro',
              'Si ves polvo o suciedad en los conectores, no los limpies tú mismo',
            ]
          },
          {
            id: 'avoid-manipulation',
            title: 'Evitar manipulación',
            steps: [
              'No intentes reparar el cable de fibra óptica por tu cuenta',
              'Evita doblar o mover el cable si sospechas que está dañado',
              'Contacta con soporte técnico para una revisión profesional',
            ]
          }
        ]
      },
      {
        id: 'fiber-connection',
        label: 'Problemas de conexión de fibra',
        description: 'La conexión de fibra parece estar fallando',
        solutions: [
          {
            id: 'check-entry-point',
            title: 'Verificar el punto de entrada',
            steps: [
              'Localiza donde el cable de fibra entra a tu hogar',
              'Asegúrate de que no haya daños visibles en este punto',
              'Verifica que la caja de conexión (si es visible) esté cerrada y segura',
            ]
          },
          {
            id: 'check-optical-socket',
            title: 'Comprobar la roseta óptica',
            steps: [
              'Localiza la roseta óptica (punto de conexión en la pared)',
              'Asegúrate de que el cable esté bien conectado a la roseta',
              'Verifica que no haya suciedad o daños visibles en la roseta',
            ]
          },
          {
            id: 'restart-ont-onu',
            title: 'Reiniciar el ONT/ONU',
            steps: [
              'Localiza el dispositivo ONT/ONU (convierte la señal óptica)',
              'Desconéctalo de la corriente durante 30 segundos',
              'Vuelve a conectarlo y espera a que se inicialice completamente',
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'electrical',
    name: 'Problemas Eléctricos',
    icon: Zap,
    problems: [
      {
        id: 'power-outage',
        label: 'Corte de energía',
        description: 'No hay electricidad en el hogar',
        solutions: [
          {
            id: 'check-outage-scope',
            title: 'Verificar el alcance del corte',
            steps: [
              'Comprueba si el corte afecta solo a tu hogar o a todo el vecindario',
              'Si es general, contacta a la compañía eléctrica para información',
              'Si es solo tu hogar, revisa el siguiente paso',
            ]
          },
          {
            id: 'check-electrical-panel',
            title: 'Revisar el tablero eléctrico',
            steps: [
              'Localiza el tablero eléctrico de tu hogar',
              'Verifica si algún interruptor se ha disparado',
              'Si es así, intenta resetearlo moviendo la palanca completamente a OFF y luego a ON',
            ]
          },
          {
            id: 'protect-equipment',
            title: 'Proteger los equipos',
            steps: [
              'Desconecta los equipos sensibles como el módem y decodificador',
              'Espera a que se restablezca la energía de manera estable',
              'Vuelve a conectar los equipos uno por uno',
            ]
          }
        ]
      },
      {
        id: 'voltage-fluctuations',
        label: 'Fluctuaciones de voltaje',
        description: 'La luz parpadea o los equipos se reinician solos',
        solutions: [
          {
            id: 'protect-equipment-voltage',
            title: 'Proteger los equipos',
            steps: [
              'Desconecta inmediatamente los equipos sensibles',
              'Esto incluye módem, decodificador, y otros dispositivos electrónicos',
              'Espera a que el voltaje se estabilice antes de volver a conectarlos',
            ]
          },
          {
            id: 'use-surge-protector',
            title: 'Usar protección contra sobretensiones',
            steps: [
              'Considera usar un estabilizador de voltaje',
              'Conecta tus equipos importantes a través del estabilizador',
              'Asegúrate de que el estabilizador esté correctamente dimensionado',
            ]
          },
          {
            id: 'contact-electric-company',
            title: 'Contactar a la compañía eléctrica',
            steps: [
              'Si el problema persiste, contacta a tu compañía eléctrica',
              'Reporta las fluctuaciones de voltaje que estás experimentando',
              'Solicita una revisión de la línea eléctrica que alimenta tu hogar',
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'signal',
    name: 'Problemas de Señal',
    icon: SignalHigh,
    problems: [
      {
        id: 'weak-signal',
        label: 'Señal débil',
        description: 'La señal de internet o TV es débil',
        solutions: [
          {
            id: 'check-signal-strength-weak',
            title: 'Verificar la intensidad de la señal',
            steps: [
              'Para internet: realiza una prueba de velocidad en speedtest.net',
              'Para TV: verifica la calidad de la señal en el menú del decodificador',
              'Compara los resultados con los valores esperados de tu plan',
            ]
          },
          {
            id: 'optimize-equipment-placement',
            title: 'Optimizar la ubicación de los equipos',
            steps: [
              'Asegúrate de que el router esté en una ubicación central',
              'Evita obstáculos como paredes gruesas o electrodomésticos grandes',
              'Coloca el router en una posición elevada si es posible',
            ]
          },
          {
            id: 'consider-signal-amplifier',
            title: 'Considerar un amplificador de señal',
            steps: [
              'Para Wi-Fi: considera usar un repetidor o malla Wi-Fi',
              'Para TV: un amplificador de señal podría ayudar',
              'Consulta con el soporte técnico antes de instalar estos dispositivos',
            ]
          }
        ]
      },
      {
        id: 'interference',
        label: 'Interferencia en la señal',
        description: 'La señal se ve afectada por interferencias',
        solutions: [
          {
            id: 'identify-interference-sources',
            title: 'Identificar fuentes de interferencia',
            steps: [
              'Busca dispositivos que puedan causar interferencia (microondas, teléfonos inalámbricos)',
              'Aleja estos dispositivos del router y equipos de TV',
              'Apaga temporalmente estos dispositivos para ver si mejora la señal',
            ]
          },
          {
            id: 'change-wifi-channel-interference',
            title: 'Cambiar el canal Wi-Fi',
            steps: [
              'Accede a la configuración de tu router',
              'Busca la opción para cambiar el canal Wi-Fi',
              'Prueba diferentes canales (1, 6 u 11 para 2.4GHz) para encontrar el mejor',
            ]
          },
          {
            id: 'use-wired-connection',
            title: 'Usar una conexión por cable',
            steps: [
              'Si es posible, conecta dispositivos importantes directamente al router con un cable Ethernet',
              'Esto elimina problemas de interferencia Wi-Fi',
              'Asegúrate de usar cables Ethernet de buena calidad',
            ]
          }
        ]
      }
    ]
  }
]

