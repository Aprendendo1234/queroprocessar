
import React, { useState } from 'react';
import { User, LegalCase, UrgencyLevel, ChatMessage, Notification, CaseStatus } from '../types';
import { Search, Filter, MessageSquare, CreditCard, ChevronRight, Eye, MapPin, Clock, Lock, CheckCircle, ShieldCheck, Award, Zap, Paperclip } from 'lucide-react';
import ChatBox from './ChatBox';

interface LawyerDashboardProps {
  user: User;
  allCases: LegalCase[];
  onUnlock: (caseId: string, lawyerId: string) => void;
  messages: ChatMessage[];
  onSendMessage: (caseId: string, text: string) => void;
  notifications: Notification[];
}

const LawyerDashboard: React.FC<LawyerDashboardProps> = ({ user, allCases, onUnlock, messages, onSendMessage, notifications }) => {
  const [tab, setTab] = useState<'browse' | 'purchased' | 'chat'>('browse');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [filterArea, setFilterArea] = useState('Todas');
  const [showPaymentModal, setShowPaymentModal] = useState<string | null>(null);

  const filteredCases = allCases.filter(c =>
    (filterArea === 'Todas' || c.legalArea === filterArea) &&
    !c.unlockedByIds.includes(user.id)
  );

  const purchasedCases = allCases.filter(c => c.unlockedByIds.includes(user.id));

  const handleUnlock = (caseId: string) => {
    onUnlock(caseId, user.id);
    setShowPaymentModal(null);
    setTab('purchased');
  };

  const areas = ['Todas', ...Array.from(new Set(allCases.map(c => c.legalArea)))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-xl">
                  {user.name.split(' ').pop()?.charAt(0) || 'D'}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white rounded-full p-0.5">
                  <ShieldCheck className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 flex items-center">
                  {user.name}
                  <Award className="w-3 h-3 ml-1 text-[#C5A059]" />
                </h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">OAB: {user.oab} {user.ufOab}</p>
              </div>
            </div>

            <nav className="space-y-1">
              {[
                { id: 'browse', label: 'Feed de Oportunidades', icon: <Search className="w-4 h-4" /> },
                { id: 'purchased', label: 'Meus Leads', icon: <CheckCircle className="w-4 h-4" /> },
                { id: 'chat', label: 'Mensagens Ativas', icon: <MessageSquare className="w-4 h-4" /> },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition font-bold text-[10px] uppercase tracking-widest ${tab === item.id ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="bg-[#0F172A] p-6 rounded-2xl text-white shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 transform rotate-12 transition-transform group-hover:rotate-0">
              <Zap className="w-24 h-24" />
            </div>
            <h4 className="font-bold text-[10px] uppercase tracking-widest mb-4 text-[#C5A059]">Saldo Institucional</h4>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-serif font-bold">R$ 450,00</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Crédito</span>
              </div>
              <button className="w-full bg-[#C5A059] py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#B38E46] transition shadow-lg">Adicionar Fundo</button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {tab === 'browse' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-serif text-slate-900">Oportunidades Disponíveis</h2>
                  <p className="text-xs text-slate-400 font-medium">Casos validados e aguardando primeiro contato.</p>
                </div>
                <div className="flex items-center space-x-4 bg-white px-4 py-2 rounded-xl border border-slate-200">
                  <Filter className="w-3 h-3 text-slate-400" />
                  <select
                    value={filterArea} onChange={e => setFilterArea(e.target.value)}
                    className="bg-transparent text-[10px] font-bold uppercase tracking-widest focus:outline-none cursor-pointer"
                  >
                    {areas.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>

              {filteredCases.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 shadow-sm">
                  <p className="text-slate-500 font-light italic">Nenhum caso novo encontrado nesta categoria.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredCases.map((c) => (
                    <div key={c.id} className="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-xl hover:border-[#C5A059] transition-all duration-300 group">
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded uppercase tracking-wider">{c.legalArea}</span>
                        <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${c.urgency === UrgencyLevel.HIGH ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-400'}`}>
                          {c.urgency} Urgência
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#C5A059] transition">{c.title}</h3>
                      <p className="text-sm text-slate-500 line-clamp-2 mb-6 font-light leading-relaxed">{c.description}</p>

                      <div className="flex items-center space-x-4 mb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span className="flex items-center"><MapPin className="w-3 h-3 mr-1 text-[#C5A059]" /> {c.city}, {c.state}</span>
                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1 text-[#C5A059]" /> {new Date(c.createdAt).toLocaleDateString()}</span>
                        {c.attachments && c.attachments.length > 0 && (
                          <span className="flex items-center"><Paperclip className="w-3 h-3 mr-1 text-[#C5A059]" /> {c.attachments.length} Anexos</span>
                        )}
                      </div>

                      <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between border border-slate-100 group-hover:bg-[#0F172A] transition-colors duration-300">
                        <div>
                          <p className="text-[8px] text-slate-400 group-hover:text-slate-500 uppercase font-bold tracking-widest">Investimento de Acesso</p>
                          <p className="text-xl font-serif font-bold text-slate-900 group-hover:text-[#C5A059]">R$ {c.unlockPrice?.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => setShowPaymentModal(c.id)}
                          className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#C5A059] transition shadow-lg group-hover:bg-[#C5A059]"
                        >
                          Adquirir Lead
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'purchased' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-slate-900">Meus Casos Adquiridos</h2>
              {purchasedCases.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-3xl border border-slate-200">
                  <p className="text-slate-500 font-light italic">Você ainda não adquiriu nenhum lead para atendimento.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {purchasedCases.map((c) => (
                    <div key={c.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 mb-1">{c.title}</h3>
                          <p className="text-[10px] text-blue-700 font-bold uppercase tracking-widest">{c.legalArea}</p>
                        </div>
                        <button
                          onClick={() => { setSelectedCaseId(c.id); setTab('chat'); }}
                          className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 flex items-center transition"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" /> Abrir Canal Direto
                        </button>
                      </div>
                      <div className="pt-4 border-t border-slate-50 mt-4">
                        <p className="text-[8px] text-slate-400 uppercase font-bold mb-2 tracking-widest">Documentação Anexa</p>
                        <div className="flex flex-wrap gap-2">
                          {c.attachments && c.attachments.length > 0 ? (
                            c.attachments.map((url, idx) => {
                              const isUrl = url.startsWith('http');
                              return isUrl ? (
                                <a
                                  key={idx}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-slate-50 border border-slate-100 px-2 py-1 rounded text-[9px] text-slate-600 flex items-center hover:bg-white hover:border-blue-200 hover:text-blue-600 transition shadow-sm"
                                >
                                  <Paperclip className="w-2.5 h-2.5 mr-1" /> Documento {idx + 1}
                                </a>
                              ) : (
                                <span key={idx} className="bg-slate-50 border border-slate-100 px-2 py-1 rounded text-[9px] text-slate-400 flex items-center italic">
                                  <Paperclip className="w-2.5 h-2.5 mr-1" /> {url}
                                </span>
                              );
                            })
                          ) : (
                            <span className="text-[10px] text-slate-400 font-light italic">Nenhum anexo enviado.</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'chat' && (
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-[600px]">
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0F172A] flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2 text-[#C5A059]" /> Central de Atendimento ao Lead
                </h3>
              </div>
              <div className="flex flex-grow overflow-hidden">
                <div className="w-1/3 border-r border-slate-100 overflow-y-auto bg-[#F8FAFC]">
                  {purchasedCases.length === 0 ? (
                    <div className="p-12 text-center">
                      <Lock className="w-8 h-8 text-slate-200 mx-auto mb-4" />
                      <p className="text-[10px] text-slate-400 font-bold uppercase italic text-center">Nenhum canal liberado.</p>
                    </div>
                  ) : (
                    purchasedCases.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCaseId(c.id)}
                        className={`w-full p-6 text-left hover:bg-white transition border-b border-slate-100 ${selectedCaseId === c.id ? 'bg-white border-l-4 border-l-[#C5A059]' : ''}`}
                      >
                        <p className="font-bold text-xs text-slate-900 truncate mb-1">{c.clientName}</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter truncate">{c.title}</p>
                      </button>
                    ))
                  )}
                </div>
                <div className="w-2/3 flex flex-col">
                  {selectedCaseId ? (
                    <ChatBox
                      caseId={selectedCaseId}
                      messages={messages.filter(m => m.caseId === selectedCaseId)}
                      onSendMessage={onSendMessage}
                      userRole={user.role}
                    />
                  ) : (
                    <div className="flex-grow flex items-center justify-center text-slate-400 p-12 text-center">
                      <div>
                        <MessageSquare className="w-12 h-12 text-slate-100 mx-auto mb-4" />
                        <p className="text-sm font-light">Selecione um lead para iniciar a negociação institucional.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      {
        showPaymentModal && (
          <div className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl p-10 shadow-2xl animate-in zoom-in-95 duration-300">
              <h3 className="text-2xl font-serif text-slate-900 mb-4">Adquirir Lead</h3>
              <p className="text-slate-500 mb-8 font-light text-sm leading-relaxed">Ao confirmar, o investimento será debitado de seu saldo institucional e as informações de contato do cliente serão liberadas permanentemente.</p>

              <div className="bg-slate-50 p-8 rounded-xl mb-10 border border-slate-100">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Descrição do Ativo</span>
                  <span className="text-xs font-bold text-slate-900 truncate max-w-[150px]">{allCases.find(c => c.id === showPaymentModal)?.title}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Valor do Investimento</span>
                  <span className="text-2xl font-serif font-bold text-[#C5A059]">R$ {allCases.find(c => c.id === showPaymentModal)?.unlockPrice?.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowPaymentModal(null)}
                  className="flex-1 py-4 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:text-slate-600 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleUnlock(showPaymentModal)}
                  className="flex-1 bg-slate-900 text-white py-4 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#C5A059] transition shadow-xl"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default LawyerDashboard;
