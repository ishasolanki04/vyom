'use client';

import { useState } from 'react';
import {
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserCircleIcon,
  PaperAirplaneIcon,
  ClockIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  ArrowPathIcon,
  BoltIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'security' | 'account' | 'transaction';
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState('chat');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: 'Just now',
    },
  ]);

  const categories = [
    { id: 'all', name: 'All Topics', icon: QuestionMarkCircleIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'account', name: 'Account', icon: UserCircleIcon },
    { id: 'transaction', name: 'Transactions', icon: CreditCardIcon },
  ];

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How does the AI-powered fraud detection work?',
      answer: 'Our AI system continuously monitors your transactions and account activity for suspicious patterns. It uses machine learning to analyze various factors like transaction amount, location, and timing to identify potential fraud.',
      category: 'security',
    },
    {
      id: '2',
      question: 'What should I do if I notice a suspicious transaction?',
      answer: 'If you notice any suspicious activity, immediately report it through the Fraud Alerts section or contact our 24/7 support team. You can also freeze your account temporarily through the security settings.',
      category: 'security',
    },
    {
      id: '3',
      question: 'How can I update my KYC documents?',
      answer: 'You can update your KYC documents through the Account Settings > Documents section. Upload the required documents, and our AI system will verify them within 24 hours.',
      category: 'account',
    },
  ];

  const handleSendMessage = () => {
    try {
      if (!chatInput.trim()) return;

      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: chatInput,
        sender: 'user',
        timestamp: 'Just now',
      };

      setChatMessages(prev => [...prev, newMessage]);
      setChatInput('');

      // Simulate AI response
      setTimeout(() => {
        try {
          const aiResponse: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: 'I understand your concern. Let me help you with that. Our AI-powered system is designed to protect your account while maintaining seamless banking experience.',
            sender: 'ai',
            timestamp: 'Just now',
          };
          setChatMessages(prev => [...prev, aiResponse]);
        } catch (error) {
          console.error('Error sending AI response:', error);
        }
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const filteredFaqs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Support Center</h1>
        <p className="text-gray-600">Get instant help with AI assistance or connect with our support team</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <BoltIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Response Time</p>
              <p className="text-xl font-semibold text-gray-900">2 mins</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Resolution Rate</p>
              <p className="text-xl font-semibold text-gray-900">98%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <ClockIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">24/7 Support</p>
              <p className="text-xl font-semibold text-gray-900">Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#E31B54] to-[#FF6B8B] rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <ChatBubbleLeftRightIcon className="w-8 h-8" />
            <div>
              <h3 className="font-medium">AI Chat Support</h3>
              <p className="text-sm opacity-90">Get instant answers</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('chat')}
            className="w-full px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
          >
            Start Chat
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <PhoneIcon className="w-8 h-8 text-[#E31B54]" />
            <div>
              <h3 className="font-medium text-gray-900">Phone Support</h3>
              <p className="text-sm text-gray-500">24/7 assistance</p>
            </div>
          </div>
          <button className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
            +1 800 123 4567
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <EnvelopeIcon className="w-8 h-8 text-[#E31B54]" />
            <div>
              <h3 className="font-medium text-gray-900">Email Support</h3>
              <p className="text-sm text-gray-500">Response within 24h</p>
            </div>
          </div>
          <button className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
            support@vyom.com
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center gap-4 p-4 border-b border-gray-100">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'chat'
                ? 'bg-[#E31B54] text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
            Live Chat
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'faq'
                ? 'bg-[#E31B54] text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <QuestionMarkCircleIcon className="w-5 h-5" />
            FAQs
          </button>
        </div>

        <div className="p-6">
          {/* Chat Interface */}
          {activeTab === 'chat' && (
            <div>
              <div className="h-[400px] pr-4 -mr-4 overflow-y-auto mb-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
                {chatMessages.map(message => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      message.sender === 'user'
                        ? 'bg-[#E31B54]'
                        : 'bg-gray-100'
                    }`}>
                      {message.sender === 'user' ? (
                        <UserCircleIcon className="w-6 h-6 text-white" />
                      ) : (
                        <ChatBubbleLeftRightIcon className="w-6 h-6 text-[#E31B54]" />
                      )}
                    </div>
                    <div className={`flex-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                      <div className={`inline-block max-w-[80%] p-4 rounded-xl ${
                        message.sender === 'user'
                          ? 'bg-[#E31B54] text-white'
                          : 'bg-gray-50 text-gray-800'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E31B54] focus:border-transparent text-gray-800 placeholder-gray-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-3 rounded-xl bg-[#E31B54] text-white hover:bg-[#FF6B8B] transition-colors"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* FAQs */}
          {activeTab === 'faq' && (
            <div>
              {/* Categories */}
              <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
                      selectedCategory === category.id
                        ? 'bg-[#E31B54] text-white'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <category.icon className="w-5 h-5" />
                    {category.name}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {filteredFaqs.map(faq => (
                  <div
                    key={faq.id}
                    className="border border-gray-100 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <QuestionMarkCircleIcon className="w-5 h-5 text-[#E31B54]" />
                        <span className="font-medium text-gray-800">{faq.question}</span>
                      </div>
                      {expandedFaq === faq.id ? (
                        <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="p-4 bg-gray-50 border-t border-gray-100">
                        <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 