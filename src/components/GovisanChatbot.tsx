import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, MessageCircle, Phone, Calendar, Wifi, Building2, MapPin } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  options?: string[];
}

interface HotelProject {
  type: string;
  location: string;
  rooms?: number;
  timeline: string;
}

export const GovisanChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userProject, setUserProject] = useState<Partial<HotelProject>>({});

  const initialMessage: ChatMessage = {
    id: '1',
    text: '¡Hola! Soy el asistente especializado de GOVISAN. ¿En qué proyecto hotelero te puedo ayudar hoy?',
    isBot: true,
    timestamp: new Date(),
    options: [
      'Necesito auditoría técnica',
      'Quiero presupuesto para mi hotel',
      'Tengo un proyecto en construcción',
      'Necesito actualizar mi red WiFi',
      'Consulta sobre certificación Wiredscore'
    ]
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([initialMessage]);
    }
  }, [isOpen]);

  const hotelKnowledge = {
    'auditoría técnica': {
      response: `🔍 Perfecto! Nuestras auditorías técnicas incluyen:

• Evaluación completa de infraestructura actual
• Análisis de rendimiento WiFi y conectividad  
• Recomendaciones de mejora
• Roadmap de implementación

¿Qué tipo de propiedad es?`,
      options: ['Hotel de lujo', 'Resort', 'Apartamentos', 'Edificio corporativo']
    },
    'presupuesto': {
      response: `💰 Te ayudo con el presupuesto! Para darte una estimación precisa necesito conocer:

• Tipo de propiedad
• Número de habitaciones
• Ubicación
• Servicios requeridos

¿Empezamos?`,
      options: ['Sí, empezemos', 'Primero quiero más info', 'Hablar con un experto']
    },
    'construcción': {
      response: `🏗️ ¡Excelente timing! En proyectos nuevos podemos:

• Diseñar la infraestructura desde cero
• Garantizar certificaciones internacionales
• Optimizar costos de implementación
• Preparar para tecnologías futuras

¿En qué fase está el proyecto?`,
      options: ['Diseño inicial', 'Pre-construcción', 'En construcción', 'Pre-apertura']
    },
    'wifi': {
      response: `📶 Las redes WiFi hoteleras requieren:

• WiFi 6E para máximo rendimiento
• Cobertura total sin zonas muertas
• Gestión de ancho de banda por huésped
• Seguridad empresarial

¿Cuál es el problema principal actual?`,
      options: ['Velocidad lenta', 'Zonas sin cobertura', 'Muchas desconexiones', 'Seguridad insuficiente']
    },
    'wiredscore': {
      response: `🏅 GOVISAN es experto en certificaciones Wiredscore:

• Evaluación previa gratuita
• Diseño para máxima puntuación
• Gestión completa del proceso
• Garantía de certificación

¿Para qué tipo de edificio?`,
      options: ['Hotel', 'Oficinas', 'Residencial', 'Mixto']
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

    // Procesar respuesta inteligente
    const lowerOption = option.toLowerCase();

    if (lowerOption.includes('auditoría') || lowerOption.includes('auditoria')) {
      addBotMessage(hotelKnowledge['auditoría técnica'].response, hotelKnowledge['auditoría técnica'].options);
    } else if (lowerOption.includes('presupuesto')) {
      addBotMessage(hotelKnowledge['presupuesto'].response, hotelKnowledge['presupuesto'].options);
    } else if (lowerOption.includes('construcción')) {
      addBotMessage(hotelKnowledge['construcción'].response, hotelKnowledge['construcción'].options);
    } else if (lowerOption.includes('wifi') || lowerOption.includes('red')) {
      addBotMessage(hotelKnowledge['wifi'].response, hotelKnowledge['wifi'].options);
    } else if (lowerOption.includes('wiredscore')) {
      addBotMessage(hotelKnowledge['wiredscore'].response, hotelKnowledge['wiredscore'].options);
    } else if (lowerOption.includes('experto') || lowerOption.includes('llamada')) {
      addBotMessage(
        `📞 Te conecto con nuestro equipo de expertos:

• Llamada técnica gratuita de 15 min
• Análisis personalizado  
• Propuesta específica

¿Prefieres llamada o WhatsApp?`,
        ['Agendar llamada', 'WhatsApp ahora', 'Email de contacto']
      );
    } else if (lowerOption.includes('agendar') || lowerOption.includes('llamada')) {
      window.open('https://calendly.com/govisan-consultoria', '_blank');
      addBotMessage('✅ Te he redirigido al calendario. ¡Selecciona el horario que mejor te convenga!');
    } else if (lowerOption.includes('whatsapp')) {
      window.open('https://wa.me/34911234567?text=Hola, vengo del chatbot de GOVISAN. Necesito consultoría técnica para mi hotel.', '_blank');
      addBotMessage('✅ Te he abierto WhatsApp. ¡Nuestro equipo te responderá inmediatamente!');
    } else {
      // Respuesta genérica inteligente
      addBotMessage(
        `👨‍💻 Entiendo tu consulta. Para darte la mejor asesoría personalizada, ¿prefieres:

• Llamada técnica gratuita (15 min)
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
          className="bg-govisan-gold hover:bg-govisan-gold/90 text-white rounded-full p-4 shadow-2xl animate-bounce"
          size="lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        <div className="absolute -top-12 right-0 bg-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap animate-pulse">
          ¿Necesitas asesoría hotelera?
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] z-50">
      <Card className="w-full h-full flex flex-col shadow-2xl border-2 border-govisan-gold/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-govisan-gold to-yellow-600 text-white p-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">GOVISAN Assistant</h3>
                <p className="text-xs opacity-90">Especialista en Tecnología Hotelera</p>
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isBot
                    ? 'bg-white border border-gray-200 text-gray-800'
                    : 'bg-govisan-gold text-white'
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
                        className="w-full text-left justify-start text-xs hover:bg-govisan-gold hover:text-white border-govisan-gold/30"
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
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-400"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 bg-white rounded-b-lg">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>🔒 Conversación segura</span>
            <span>🌐 24/7 disponible</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GovisanChatbot;