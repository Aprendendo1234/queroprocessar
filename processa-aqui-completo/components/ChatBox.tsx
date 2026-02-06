
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, UserRole } from '../types';
import { Send, User as UserIcon, ShieldCheck } from 'lucide-react';

interface ChatBoxProps {
  caseId: string;
  messages: ChatMessage[];
  onSendMessage: (caseId: string, text: string) => void;
  userRole: UserRole;
}

const ChatBox: React.FC<ChatBoxProps> = ({ caseId, messages, onSendMessage, userRole }) => {
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(caseId, inputText.trim());
      setInputText('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FCFCFD]">
      <div
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-8 space-y-6"
      >
        {messages.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-100 shadow-sm">
              <ShieldCheck className="w-8 h-8 text-[#C5A059]" />
            </div>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Canal de Comunicação Blindado</p>
            <p className="text-sm text-slate-400 mt-2 font-light">Inicie a negociação institucional com o lead.</p>
          </div>
        ) : (
          messages.map((m) => {
            const isMe = (userRole === UserRole.CLIENT && m.senderId.startsWith('u')) ||
              (userRole === UserRole.LAWYER && m.senderId.startsWith('l')) ||
              (userRole === UserRole.ADMIN && m.senderId === 'a1'); // ID from constants.tsx

            return (
              <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-5 rounded-3xl text-sm shadow-sm ${isMe ? 'bg-[#0F172A] text-white rounded-br-none' : 'bg-white text-slate-900 border border-slate-100 rounded-bl-none'}`}>
                  <p className="leading-relaxed font-light">{m.text}</p>
                  <p className={`text-[9px] mt-2 font-bold uppercase tracking-tighter ${isMe ? 'text-slate-400' : 'text-slate-300'}`}>
                    {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <form onSubmit={handleSend} className="p-6 bg-white border-t border-slate-50 flex items-center space-x-4">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Mensagem institucional..."
          className="flex-grow px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#C5A059] outline-none text-sm font-light transition-all"
        />
        <button
          type="submit"
          className="p-4 bg-[#0F172A] text-white rounded-2xl hover:bg-slate-800 transition shadow-xl disabled:opacity-20 active:scale-90"
          disabled={!inputText.trim()}
        >
          <Send className="w-5 h-5 text-[#C5A059]" />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
