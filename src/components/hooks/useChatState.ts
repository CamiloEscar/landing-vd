import { useState, useEffect, useCallback } from 'react';
import { Message, ChatbotState, Action } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { nlpService } from '../services/nlpService.ts';

const MAX_CONTEXT_LENGTH = 5;

export function useChatState() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatbotState, setChatbotState] = useState<ChatbotState>({
    isReady: false,
    context: [],
    learningData: {},
  });

  const addMessage = useCallback((type: 'user' | 'bot', content: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      type,
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Update context
    setChatbotState(prev => ({
      ...prev,
      context: [...prev.context.slice(-MAX_CONTEXT_LENGTH + 1), content],
    }));
  }, []);

  const handleSubmit = async (userMessage: string) => {
    if (!userMessage.trim()) return;

    addMessage('user', userMessage);
    setIsTyping(true);

    try {
      const intent = nlpService.detectIntent(userMessage);
      const botResponse = nlpService.generateResponse(intent);
      
      // Simular tiempo de procesamiento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addMessage('bot', botResponse);
      
      // Simular aprendizaje
      setChatbotState(prev => ({
        ...prev,
        learningData: {
          ...prev.learningData,
          [intent]: (prev.learningData[intent] || 0) + 1,
        },
      }));
    } catch (error) {
      addMessage('bot', 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo más tarde.');
    } finally {
      setIsTyping(false);
    }
  };

  const performAction = async (action: Action) => {
    setIsTyping(true);
    try {
      const result = await nlpService.performAction(action);
      addMessage('bot', result);
    } catch (error) {
      addMessage('bot', 'Lo siento, no pude completar la acción. Por favor, intenta de nuevo.');
    } finally {
      setIsTyping(false);
    }
  };

  const initChatbot = useCallback(() => {
    setChatbotState(prev => ({ ...prev, isReady: true }));
    addMessage('bot', '¡Hola! Soy tu asistente virtual mejorado. ¿En qué puedo ayudarte hoy?');
  }, [addMessage]);

  return {
    messages,
    input,
    setInput,
    isTyping,
    chatbotState,
    handleSubmit,
    initChatbot,
    performAction,
  };
}

