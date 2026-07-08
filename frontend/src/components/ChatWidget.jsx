import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! Welcome to Veloura. I'm your AI style assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, isBot: false }]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "I'm still learning! In the future, I'll be able to give you personalized fashion advice right here. For now, try our AI Style Suggestions on the Home page!", 
        isBot: true 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-80 h-96 glass-panel flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-velvet-maroon p-4 flex justify-between items-center border-b border-white/10">
            <h3 className="font-serif font-semibold text-gold-champagne">Veloura Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">
              <X size={20} />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.isBot ? 'bg-white/10 text-gray-200' : 'bg-gold-champagne text-gray-900 font-medium'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp Link */}
          <div className="p-2 text-center border-t border-white/10 bg-black/20">
            <a 
              href="https://wa.me/919911828497" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-green-400 hover:text-green-300 underline"
            >
              Chat with us on WhatsApp
            </a>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for style advice..." 
              className="flex-1 bg-black/50 border border-white/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold-champagne"
            />
            <button onClick={handleSend} className="bg-gold-champagne text-black p-2 rounded-md hover:bg-yellow-500">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
      
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-gold-champagne text-black p-4 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
}
