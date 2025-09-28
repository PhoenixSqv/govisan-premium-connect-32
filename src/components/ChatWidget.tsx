import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatWidgetProps {
  className?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Quick action chips
  const quickActions = [
    'WiFi Information',
    'Smart TV Solutions',
    'Contact Us',
    'Our Services'
  ];

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('govisan-chat-history');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    }
  }, []);

  // Save messages to localStorage when messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('govisan-chat-history', JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mock chat function - prepare for /api/chat.php integration
  const sendMessage = async (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Mock delay and response - replace with actual API call
    setTimeout(() => {
      const mockResponse = getMockResponse(message);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: mockResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);

    // TODO: Replace with actual API call
    // try {
    //   const response = await fetch('/api/chat.php', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ message })
    //   });
    //   const data = await response.json();
    //   // Handle response...
    // } catch (error) {
    //   console.error('Chat API error:', error);
    // }
  };

  const getMockResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('wifi') || lowerMessage.includes('internet')) {
      return 'We provide enterprise-grade WiFi solutions with high-speed fiber optic networks, redundant connectivity, and 24/7 monitoring. Our networks are designed specifically for hospitality environments.';
    }
    
    if (lowerMessage.includes('tv') || lowerMessage.includes('entertainment') || lowerMessage.includes('iptv')) {
      return 'Our Smart Entertainment Solutions include IPTV & Smart TV systems, casting & streaming services, interactive room controls, and premium audio systems designed to enhance guest satisfaction.';
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
      return 'You can reach us at info@govisan.com or call us at +34 93 414 18 20 (Barcelona) or contact our Bengaluru office at info@govisan.com. Would you like me to help you with the contact form?';
    }
    
    if (lowerMessage.includes('service') || lowerMessage.includes('solution')) {
      return 'We specialize in hospitality technology, network infrastructure, smart building integration, and audiovisual systems. Our services include Wiredscore certifications, IoT automation, and business intelligence solutions.';
    }
    
    return 'Thank you for your message! I\'m here to help with questions about our technology solutions for hospitality and real estate. You can also fill out our contact form for detailed inquiries.';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleQuickAction = (action: string) => {
    sendMessage(action);
  };

  const openContactForm = () => {
    setIsOpen(false);
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`fixed bottom-5 left-5 z-40 ${className}`}>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-gold transition-all duration-300 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'gradient-accent hover:shadow-teal'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </Button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-80 sm:w-96 h-96 bg-white rounded-2xl shadow-glass border border-white/20 flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="gradient-accent p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Govisan Assistant</h3>
                <p className="text-sm opacity-90">How can we help you?</p>
              </div>
              <Bot className="h-6 w-6" />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <Bot className="h-12 w-12 mx-auto mb-4 text-govisan-gold" />
                <p className="mb-4">Welcome! I'm here to help with your technology needs.</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <Button
                      key={action}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action)}
                      className="text-xs h-8 hover:bg-govisan-gold/10 hover:border-govisan-gold"
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-govisan-gold/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-govisan-gold" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'gradient-accent text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-govisan-gold/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-govisan-gold" />
                </div>
                <div className="bg-gray-100 p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="gradient-accent hover:shadow-teal"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            
            <Button
              variant="ghost"
              onClick={openContactForm}
              className="w-full mt-2 text-xs text-govisan-gold hover:bg-govisan-gold/10"
            >
              Need detailed help? Contact our team →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;