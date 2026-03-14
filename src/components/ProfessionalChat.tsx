import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  User, 
  Bot,
  Phone,
  Mail,
  Clock,
  Check,
  CheckCheck
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  read?: boolean;
}

interface ProfessionalChatProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const ProfessionalChat: React.FC<ProfessionalChatProps> = ({ 
  isOpen: externalIsOpen, 
  onToggle: externalOnToggle 
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis l\'assistant virtuel de Zetoun Labs. Comment puis-je vous aider aujourd\'hui ?',
      sender: 'bot',
      timestamp: new Date(),
      read: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const onToggle = externalOnToggle || setInternalIsOpen;

  const quickResponses = [
    'Quels services proposez-vous ?',
    'Quelles formations sont disponibles ?',
    'Comment contacter le support technique ?',
    'Quels sont vos tarifs ?',
    'Où êtes-vous situé ?'
  ];

  const botResponses: Record<string, string> = {
    'services': 'Nous proposons des services complets en IT : ingénierie réseau, développement web, vidéosurveillance, infogérance, support technique et installation solaire. Chaque service est adapté à vos besoins spécifiques.',
    'formations': 'Nos formations couvrent l\'administration Linux/Windows, l\'administration réseau CISCO, la maintenance informatique et la virtualisation. Toutes nos formations sont certifiantes et dispensées par des experts.',
    'contact': 'Vous pouvez nous contacter par téléphone au +243 XXX XXX XXX, par email à contact@zetounlabs.cd, ou via notre formulaire de contact en ligne. Notre équipe est disponible 24/7.',
    'tarifs': 'Nos tarifs varient selon les services et formations. Nous proposons des solutions adaptées à tous les budgets. Contactez-nous pour un devis personnalisé.',
    'localisation': 'Nous sommes basés à Kinshasa, RDC. Notre bureau principal est situé au centre-ville et nous intervenons dans toute la région de Kinshasa.'
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return 'Je comprends votre demande. Pour une réponse plus précise, je vous invite à consulter notre site web ou à contacter directement notre équipe technique. Vous pouvez également utiliser l\'un des boutons de réponse rapide ci-dessous.';
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
      read: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(text),
        sender: 'bot',
        timestamp: new Date(),
        read: true
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickResponse = (response: string) => {
    sendMessage(response);
  };

  const handleSend = () => {
    sendMessage(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const markAsRead = () => {
    setMessages(prev => 
      prev.map(msg => ({ ...msg, read: true }))
    );
    setUnreadCount(0);
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      markAsRead();
    }
  }, [isOpen, isMinimized]);

  const unreadMessages = messages.filter(msg => !msg.read && msg.sender === 'bot');
  useEffect(() => {
    setUnreadCount(unreadMessages.length);
  }, [unreadMessages]);

  if (!isOpen && unreadCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setInternalIsOpen(true)}
          className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="w-6 h-6" />
          {unreadCount > 0 && (
            <motion.span
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              {unreadCount}
            </motion.span>
          )}
          <motion.div
            className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: [0, 0.2, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
          />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-96 h-[600px] flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Assistant Zetoun Labs</h3>
                  <div className="flex items-center space-x-1 text-xs">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>En ligne</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={onToggle}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`flex items-end space-x-2 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.sender === 'user' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className={`rounded-2xl px-4 py-2 ${
                              message.sender === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-800 border border-gray-200'
                            }`}>
                              <p className="text-sm">{message.text}</p>
                            </div>
                            <div className={`flex items-center space-x-1 mt-1 text-xs text-gray-500 ${
                              message.sender === 'user' ? 'justify-end' : 'justify-start'
                            }`}>
                              <span>{formatTime(message.timestamp)}</span>
                              {message.sender === 'user' && (
                                message.read ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-end space-x-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Responses */}
                <div className="px-4 py-2 bg-white border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {quickResponses.slice(0, 3).map((response, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickResponse(response)}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                      >
                        {response}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Tapez votre message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 text-sm"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!inputValue.trim()}
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfessionalChat;
