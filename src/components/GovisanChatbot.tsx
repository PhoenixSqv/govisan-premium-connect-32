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
    text: 'Hello! I\'m GOVISAN\'s specialized assistant. How can I help you with your hotel project today?',
    isBot: true,
    timestamp: new Date(),
    options: [
      'I need a technical audit',
      'I want a quote for my hotel',
      'I have a construction project',
      'I need to upgrade my WiFi network',
      'Wiredscore certification inquiry'
    ]
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([initialMessage]);
    }
  }, [isOpen]);

  const hotelKnowledge = {
    'technical audit': {
      response: `🔍 Perfect! Our technical audits include:

• Complete current infrastructure assessment
• WiFi and connectivity performance analysis  
• Improvement recommendations
• Implementation roadmap

What type of property is it?`,
      options: ['Luxury Hotel', 'Resort', 'Apartments', 'Corporate Building']
    },
    'quote': {
      response: `💰 I'll help you with the quote! To give you an accurate estimate I need to know:

• Property type
• Number of rooms
• Location
• Required services

Shall we start?`,
      options: ['Yes, let\'s start', 'I want more info first', 'Speak with an expert']
    },
    'construction': {
      response: `🏗️ Excellent timing! For new projects we can:

• Design infrastructure from scratch
• Guarantee international certifications
• Optimize implementation costs
• Prepare for future technologies

What phase is the project in?`,
      options: ['Initial design', 'Pre-construction', 'Under construction', 'Pre-opening']
    },
    'wifi': {
      response: `📶 Hotel WiFi networks require:

• WiFi 6E for maximum performance
• Total coverage with no dead zones
• Bandwidth management per guest
• Enterprise security

What's the main current issue?`,
      options: ['Slow speed', 'Coverage gaps', 'Frequent disconnections', 'Insufficient security']
    },
    'wiredscore': {
      response: `🏅 GOVISAN is expert in Wiredscore certifications:

• Free preliminary assessment
• Design for maximum score
• Complete process management
• Certification guarantee

What type of building?`,
      options: ['Hotel', 'Offices', 'Residential', 'Mixed-use']
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

    if (lowerOption.includes('audit') || lowerOption.includes('technical')) {
      addBotMessage(hotelKnowledge['technical audit'].response, hotelKnowledge['technical audit'].options);
    } else if (lowerOption.includes('quote') || lowerOption.includes('budget')) {
      addBotMessage(hotelKnowledge['quote'].response, hotelKnowledge['quote'].options);
    } else if (lowerOption.includes('construction') || lowerOption.includes('building')) {
      addBotMessage(hotelKnowledge['construction'].response, hotelKnowledge['construction'].options);
    } else if (lowerOption.includes('wifi') || lowerOption.includes('network')) {
      addBotMessage(hotelKnowledge['wifi'].response, hotelKnowledge['wifi'].options);
    } else if (lowerOption.includes('wiredscore')) {
      addBotMessage(hotelKnowledge['wiredscore'].response, hotelKnowledge['wiredscore'].options);
    } else if (lowerOption.includes('expert') || lowerOption.includes('call')) {
      addBotMessage(
        `📞 I'll connect you with our expert team:

• Free 15-minute technical call
• Personalized analysis  
• Specific proposal

Do you prefer a call or WhatsApp?`,
        ['Schedule call', 'WhatsApp now', 'Email contact']
      );
    } else if (lowerOption.includes('schedule') || lowerOption.includes('call')) {
      window.open('https://calendly.com/govisan-consultoria', '_blank');
      addBotMessage('✅ I\'ve redirected you to the calendar. Select the time that works best for you!');
    } else if (lowerOption.includes('whatsapp')) {
      window.open('https://wa.me/34911234567?text=Hello, I come from GOVISAN\'s chatbot. I need technical consultancy for my hotel.', '_blank');
      addBotMessage('✅ I\'ve opened WhatsApp for you. Our team will respond immediately!');
    } else {
      // Intelligent generic response
      addBotMessage(
        `👨‍💻 I understand your inquiry. To give you the best personalized advice, do you prefer:

• Free technical call (15 min)
• WhatsApp consultation
• Receive specific documentation`,
        ['Free call', 'WhatsApp Business', 'Send documentation']
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
          Need hotel consultancy?
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
                <p className="text-xs opacity-90">Hotel Technology Specialist</p>
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
            <span>🔒 Secure conversation</span>
            <span>🌐 24/7 available</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GovisanChatbot;