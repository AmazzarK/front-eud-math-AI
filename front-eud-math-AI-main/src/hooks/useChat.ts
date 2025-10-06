import { useState, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'equation' | 'graph';
}

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Bonjour ! Je suis EduBot, votre assistant mathématiques. Comment puis-je vous aider aujourd\'hui ?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = useCallback((content: string, sender: 'user' | 'bot' = 'user') => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (isTyping) return;
    
    const userMessage = addMessage(content, 'user');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(content);
      addMessage(botResponse, 'bot');
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  }, [addMessage, isTyping]);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: '1',
        content: 'Bonjour ! Je suis EduBot, votre assistant mathématiques. Comment puis-je vous aider aujourd\'hui ?',
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  }, []);

  const retryLastMessage = useCallback(() => {
    if (messages.length > 0) {
      const lastUserMessage = [...messages].reverse().find(m => m.sender === 'user');
      if (lastUserMessage) {
        sendMessage(lastUserMessage.content);
      }
    }
  }, [messages, sendMessage]);

  return {
    messages,
    isTyping,
    sendMessage,
    addMessage,
    clearMessages,
    retryLastMessage,
  };
};

const generateBotResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  if (message.includes('équation') || message.includes('equation')) {
    return 'Les équations sont des égalités contenant une ou plusieurs inconnues. Voulez-vous que je vous aide avec un type d\'équation particulier ?';
  }
  
  if (message.includes('dérivée') || message.includes('derive')) {
    return 'La dérivée d\'une fonction représente le taux de variation instantané. Pour f(x) = x², la dérivée est f\'(x) = 2x. Avez-vous une fonction spécifique à dériver ?';
  }
  
  if (message.includes('intégrale') || message.includes('integrale')) {
    return 'L\'intégrale est l\'opération inverse de la dérivation. Elle permet de calculer l\'aire sous une courbe. Quelle fonction souhaitez-vous intégrer ?';
  }
  
  if (message.includes('pythagore') || message.includes('triangle')) {
    return 'Le théorème de Pythagore : dans un triangle rectangle, le carré de l\'hypoténuse est égal à la somme des carrés des deux autres côtés (a² + b² = c²).';
  }
  
  const responses = [
    "Excellente question ! Laissez-moi vous expliquer ce concept mathématique...",
    "Pour résoudre ce problème, nous devons d'abord identifier les données connues.",
    "Cette équation peut être résolue en appliquant la méthode suivante...",
    "Voici une approche étape par étape pour comprendre ce concept.",
    "C'est un problème intéressant ! Analysons-le ensemble."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};
