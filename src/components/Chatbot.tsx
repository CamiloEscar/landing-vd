import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Loader, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface KnowledgeBase {
  content: string;
  loaded: boolean;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBase>({
    content: '',
    loaded: false
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || file.type !== 'application/pdf') {
      alert('Por favor, sube un archivo PDF válido.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('pdf', file);

      // Simular la carga del PDF y extracción del texto
      setKnowledgeBase({
        content: 'Base de conocimientos cargada exitosamente.',
        loaded: true
      });

      addMessage('bot', '¡PDF cargado exitosamente! Ahora puedo ayudarte con preguntas sobre el manual técnico.');
    } catch (error) {
      console.error('Error al cargar el PDF:', error);
      alert('Error al cargar el archivo. Por favor, intenta nuevamente.');
    }
  };

  const addMessage = (type: 'user' | 'bot', content: string) => {
    setMessages(prev => [...prev, { type, content, timestamp: new Date() }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    addMessage('user', userMessage);
    setIsTyping(true);

    // Simular respuesta del chatbot
    setTimeout(() => {
      let response = '';

      if (!knowledgeBase.loaded) {
        response = 'Por favor, carga primero el manual técnico en PDF para poder ayudarte mejor.';
      } else {
        // Aquí implementarías la lógica real de búsqueda en la base de conocimientos
        const commonResponses: { [key: string]: string } = {
          'internet': 'Para problemas de conexión, primero verifica que tu router esté encendido y los cables correctamente conectados. Si el problema persiste, intenta reiniciar el router.',
          'velocidad': 'Si experimentas velocidad lenta, te recomiendo: 1) Realizar una prueba de velocidad, 2) Verificar la cantidad de dispositivos conectados, 3) Ubicar el router en un lugar central.',
          'television': 'Para problemas con la señal de TV, verifica que los cables estén bien conectados y realiza una nueva búsqueda de canales en tu televisor.',
          'factura': 'Puedes pagar tu factura a través de nuestra página web en la sección de pagos, o llamando a nuestro centro de atención al cliente.',
          'contraseña': 'Para cambiar la contraseña de tu WiFi, accede a la configuración del router mediante la dirección IP 192.168.1.1 o contacta a soporte técnico.',
        };

        const matchingKey = Object.keys(commonResponses).find(key => 
          userMessage.toLowerCase().includes(key)
        );

        response = matchingKey 
          ? commonResponses[matchingKey]
          : 'Entiendo tu consulta. Para brindarte una mejor asistencia, ¿podrías proporcionar más detalles sobre el problema que estás experimentando?';
      }

      setIsTyping(false);
      addMessage('bot', response);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-96 bg-white rounded-lg shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 flex justify-between items-center">
              <h3 className="text-white font-semibold flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Soporte Técnico
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Container */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-800 shadow'
                    }`}
                  >
                    {message.content}
                    <div
                      className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center text-gray-500 text-sm">
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Escribiendo...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* PDF Upload */}
            {!knowledgeBase.loaded && (
              <div className="p-4 bg-blue-50 border-t border-blue-100">
                <label className="flex items-center justify-center space-x-2 cursor-pointer">
                  <Upload className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-blue-600">Cargar Manual Técnico (PDF)</span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
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