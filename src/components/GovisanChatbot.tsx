import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, MessageCircle, Phone, Calendar, Wifi, Building2, MapPin, Network, Router } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  options?: string[];
}

interface TelecomProject {
  type: string;
  location: string;
  scope?: string;
  timeline: string;
}

export const GovisanChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userProject, setUserProject] = useState<Partial<TelecomProject>>({});

  const initialMessage: ChatMessage = {
    id: '1',
    text: '¡Hola! Soy el asistente especializado de GOVISAN. ¿Cómo puedo ayudarte con tu proyecto de telecomunicaciones?',
    isBot: true,
    timestamp: new Date(),
    options: [
      'Auditoría de red existente',
      'Presupuesto para fibra óptica',
      'Migración a VoIP',
      'Red inalámbrica empresarial',
      'Consultoría técnica especializada'
    ]
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([initialMessage]);
    }
  }, [isOpen]);

  const telecomKnowledge = {
    'auditoría': {
      response: `🔍 Perfecto! Nuestras auditorías de red incluyen:

• Análisis completo de infraestructura actual
• Evaluación de rendimiento y seguridad  
• Identificación de cuellos de botella
• Plan de mejoras y optimización

¿Qué tipo de red necesitas auditar?`,
      options: ['Red corporativa', 'Fibra óptica', 'Sistemas VoIP', 'Red inalámbrica']
    },
    'presupuesto': {
      response: `💰 Te ayudo con el presupuesto! Para cotizar correctamente necesito:

• Ubicación del proyecto
• Metros lineales aproximados
• Número de puntos de red
• Servicios adicionales requeridos

¿Empezamos?`,
      options: ['Sí, empezamos', 'Necesito más información', 'Hablar con especialista']
    },
    'voip': {
      response: `📞 Excelente elección! La migración VoIP ofrece:

• Reducción de costos del 40-60%
• Comunicaciones unificadas
• Escalabilidad total
• Integración con sistemas empresariales

¿Cuántas líneas telefónicas tienes actualmente?`,
      options: ['Menos de 50', '50-100 líneas', '100-200 líneas', 'Más de 200']
    },
    'inalámbrica': {
      response: `📶 Las redes inalámbricas empresariales requieren:

• Diseño de cobertura profesional
• WiFi 6/6E para máximo rendimiento
• Gestión centralizada de accesos
• Seguridad empresarial avanzada

¿Qué superficie necesitas cubrir?`,
      options: ['Menos de 1,000 m²', '1,000-5,000 m²', '5,000-10,000 m²', 'Más de 10,000 m²']
    },
    'consultoría': {
      response: `👨‍💼 GOVISAN ofrece consultoría especializada en:

• Planificación de infraestructura
• Selección de tecnologías
• Gestión de proyectos
• Cumplimiento normativo

¿En qué área necesitas consultoría?`,
      options: ['Red corporativa', 'Centro de datos', 'Comunicaciones', 'Normativas técnicas']
    }
  };

  const addBotMessage = (text: string, options?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text,
        isBot: true,
        timestamp: new Date(),
        options
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleOptionClick = (option: string) => {
    // Agregar mensaje del usuario
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: option,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Process intelligent response
    const lowerOption = option.toLowerCase();

    if (lowerOption.includes('auditoría') || lowerOption.includes('auditoria')) {
      addBotMessage(telecomKnowledge['auditoría'].response, telecomKnowledge['auditoría'].options);
    } else if (lowerOption.includes('presupuesto') || lowerOption.includes('fibra')) {
      addBotMessage(telecomKnowledge['presupuesto'].response, telecomKnowledge['presupuesto'].options);
    } else if (lowerOption.includes('voip') || lowerOption.includes('migración')) {
      addBotMessage(telecomKnowledge['voip'].response, telecomKnowledge['voip'].options);
    } else if (lowerOption.includes('inalámbrica') || lowerOption.includes('wifi') || lowerOption.includes('wireless')) {
      addBotMessage(telecomKnowledge['inalámbrica'].response, telecomKnowledge['inalámbrica'].options);
    } else if (lowerOption.includes('consultoría') || lowerOption.includes('consultoria')) {
      addBotMessage(telecomKnowledge['consultoría'].response, telecomKnowledge['consultoría'].options);
    } else if (lowerOption.includes('especialista') || lowerOption.includes('hablar')) {
      addBotMessage(
        `📞 Te conecto con nuestro equipo especializado:

• Consulta técnica gratuita (30 min)
• Análisis personalizado  
• Propuesta específica

¿Prefieres llamada o WhatsApp?`,
        ['Programar llamada', 'WhatsApp ahora', 'Email de contacto']
      );
    } else if (lowerOption.includes('programar') || lowerOption.includes('llamada')) {
      window.open('https://calendly.com/govisan-telecomunicaciones', '_blank');
      addBotMessage('✅ Te he redirigido al calendario. ¡Selecciona el horario que mejor te convenga!');
    } else if (lowerOption.includes('whatsapp')) {
      window.open('https://wa.me/34911234567?text=Hola, vengo del chatbot de GOVISAN. Necesito consultoría en telecomunicaciones.', '_blank');
      addBotMessage('✅ He abierto WhatsApp. ¡Nuestro equipo te responderá inmediatamente!');
    } else {
      // Intelligent generic response
      addBotMessage(
        `👨‍💻 Entiendo tu consulta. Para darte el mejor asesoramiento personalizado, ¿prefieres:

• Llamada técnica gratuita (30 min)
• Consulta por WhatsApp
• Recibir documentación específica`,
        ['Llamada gratuita', 'WhatsApp Business', 'Enviar documentación']
      );
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-2xl animate-bounce"
          size="lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        <div className="absolute -top-12 right-0 bg-primary text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap animate-pulse">
          ¿Necesitas asesoría técnica?
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] z-50">
      <Card className="w-full h-full flex flex-col shadow-2xl border-2 border-primary/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">GOVISAN Assistant</h3>
                <p className="text-xs opacity-90">Especialista en Telecomunicaciones</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/30">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isBot
                    ? 'bg-white border border-border text-foreground'
                    : 'bg-primary text-white'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                {message.options && (
                  <div className="mt-3 space-y-2">
                    {message.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleOptionClick(option)}
                        className="w-full text-left justify-start text-xs hover:bg-primary hover:text-white border-primary/30"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-border rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce animation-delay-200"></div>
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce animation-delay-400"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border bg-white rounded-b-lg">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>🔒 Conversación segura</span>
            <span>🌐 Disponible 24/7</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GovisanChatbot;