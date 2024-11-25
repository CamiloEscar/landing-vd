'use client'

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Loader, PhoneCall, Wifi, FileText, HelpCircle, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatState } from './hooks/useChatState';
import { Message, Action } from './types';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    input,
    setInput,
    isTyping,
    chatbotState,
    handleSubmit,
    initChatbot,
    performAction,
  } = useChatState();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !chatbotState.isReady) {
      initChatbot();
    }
  }, [isOpen, chatbotState.isReady, initChatbot]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(input);
    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity:
0, scale: 0.8, y: 20 }}
            className={`mb-4 ${isExpanded ? 'w-[800px] h-[600px]' : 'w-[400px]'} bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out`}
          >
            <Card className="h-full flex flex-col">
              <CardHeader className="border-b flex justify-between items-center bg-blue-600 text-white">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <MessageCircle className="mr-2 h-6 w-6" />
                  Asistente Virtual
                </CardTitle>
                <div className="flex space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)} className="text-white hover:bg-blue-700">
                          {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isExpanded ? 'Minimizar' : 'Expandir'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-blue-700">
                          <X className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Cerrar</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-0">
                <ScrollArea className={`h-full ${isExpanded ? 'max-h-[calc(600px-130px)]' : 'max-h-[400px]'}`}>
                  <div className="p-4 space-y-4">
                    <MessagesContainer 
                      messages={messages} 
                      isTyping={isTyping} 
                      messagesEndRef={messagesEndRef} 
                      performAction={performAction}
                    />
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="border-t p-4">
                <InputForm 
                  input={input} 
                  setInput={setInput} 
                  onSubmit={onSubmit} 
                  disabled={!chatbotState.isReady} 
                />
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

function MessagesContainer({ 
  messages, 
  isTyping, 
  messagesEndRef,
  performAction
}: { 
  messages: Message[], 
  isTyping: boolean, 
  messagesEndRef: React.RefObject<HTMLDivElement>,
  performAction: (action: Action) => void
}) {
  return (
    <>
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} performAction={performAction} />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </>
  );
}

function MessageBubble({ message, performAction }: { message: Message, performAction: (action: Action) => void }) {
  const [showActions, setShowActions] = useState(false);

  const handleAction = (actionType: string) => {
    switch (actionType) {
      case 'PROVIDE_CONTACT':
        performAction({ type: 'PROVIDE_CONTACT', payload: {} });
        break;
      case 'TROUBLESHOOT_INTERNET':
        performAction({ type: 'TROUBLESHOOT_INTERNET', payload: {} });
        break;
      case 'EXPLAIN_BILL':
        performAction({ type: 'EXPLAIN_BILL', payload: {} });
        break;
      default:
        console.log('Acción no reconocida');
    }
  };

  return (
    <div
      className={`flex ${
        message.type === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          message.type === 'user'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
        onMouseEnter={() => message.type === 'bot' && setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className="flex items-start">
          {message.type === 'bot' && (
            <Avatar className="w-8 h-8 mr-2">
              <AvatarImage src="/bot-avatar.png" alt="Bot" />
              <AvatarFallback>Bot</AvatarFallback>
            </Avatar>
          )}
          <div>
            <p className="text-base leading-relaxed">{message.content}</p>
            <div className="text-xs mt-1 text-gray-400">
              {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        </div>
        {message.type === 'bot' && showActions && (
          <div className="mt-2 flex flex-wrap justify-end gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="outline" onClick={() => handleAction('PROVIDE_CONTACT')}>
                    <PhoneCall className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Contactar servicio al cliente</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="outline" onClick={() => handleAction('TROUBLESHOOT_INTERNET')}>
                    <Wifi className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Solucionar problemas de internet</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="outline" onClick={() => handleAction('EXPLAIN_BILL')}>
                    <FileText className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Explicar factura</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center text-gray-500 text-sm">
      <Loader className="h-4 w-4 mr-2 animate-spin" />
      Escribiendo...
    </div>
  );
}

function InputForm({ 
  input, 
  setInput, 
  onSubmit, 
  disabled 
}: { 
  input: string, 
  setInput: (value: string) => void, 
  onSubmit: (e: React.FormEvent) => void, 
  disabled: boolean 
}) {
  return (
    <form onSubmit={onSubmit} className="flex w-full space-x-2">
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escriba su mensaje aquí..."
        disabled={disabled}
        className="flex-grow text-lg"
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="submit" disabled={!input.trim() || disabled} size="lg">
              <Send className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Enviar mensaje</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}

function ToggleButton({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (value: boolean) => void }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="lg"
            className="rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isOpen ? 'Cerrar chat' : 'Abrir chat'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

