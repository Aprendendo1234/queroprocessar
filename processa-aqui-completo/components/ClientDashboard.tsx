
import React, { useState } from 'react';
import { User, LegalCase, CaseStatus, UrgencyLevel, PublicationType, ChatMessage, Notification } from '../types';
import { Plus, List, MessageSquare, User as UserIcon, Bell, ChevronRight, Clock, CheckCircle, XCircle, MapPin, Scale, Upload, FileText, Image as ImageIcon, Film, Paperclip } from 'lucide-react';
import { LEGAL_AREAS, STATES_BR } from '../constants';
import ChatBox from './ChatBox';

interface ClientDashboardProps {
  user: User;
  cases: LegalCase[];
  onSubmitCase: (c: any) => void;
  messages: ChatMessage[];
  onSendMessage: (caseId: string, text: string) => void;
  notifications: Notification[];
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ user, cases, onSubmitCase, messages, onSendMessage, notifications }) => {
  const [tab, setTab] = useState<'cases' | 'new' | 'messages'>('cases');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    legalArea: LEGAL_AREAS[0].name,
    description: '',
    urgency: UrgencyLevel.MEDIUM,
    city: '',
    state: 'SP',
    publicationType: PublicationType.PUBLIC,
    files: [] as File[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pass the binary files as 'files' and also keep 'attachments' as filenames for reference
    const attachments = formData.files.map(f => f.name);
    onSubmitCase({
      ...formData,
      userId: user.id,
      clientName: user.name,
      attachments,
      files: formData.files // This contains the actual File objects
    });
    setTab('cases');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, files: [...prev.files, ...newFiles] }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const getStatusSteps = (status: CaseStatus) => {
    const steps = [
      { id: 'pendente', label: 'Análise', active: true },
      { id: 'aprovado', label: 'Publicado', active: status === CaseStatus.APPROVED },
      { id: 'interesse', label: 'Interesse', active: false } // Logic based on unlockIds in real app
    ];
    return steps;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-4 gap-10">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_16px_32px_-12px_rgba(15,23,42,0.05)]">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-[#0F172A] text-[#C5A059] rounded-2xl flex items-center justify-center font-serif text-3xl font-bold mx-auto mb-4 shadow-xl">
                {user.name.charAt(0)}
              </div>
              <h3 className="font-serif text-xl text-[#0F172A]">{user.name}</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Membro Institucional</p>
            </div>

            <nav className="space-y-2">
              {[
                { id: 'cases', label: 'Meus Casos', icon: <List className="w-4 h-4" /> },
                { id: 'new', label: 'Novo Relato', icon: <Plus className="w-4 h-4" /> },
                { id: 'messages', label: 'Mensagens', icon: <MessageSquare className="w-4 h-4" /> },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id as any)}
                  className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl transition font-black text-[10px] uppercase tracking-widest ${tab === item.id ? 'bg-[#0F172A] text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
            <Scale className="absolute -right-4 -bottom-4 w-32 h-32 opacity-5 transform group-hover:scale-110 transition duration-700" />
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-6 text-[#C5A059]">Central de Ajuda</h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">Precisa de auxílio técnico ou suporte especializado? Nossa equipe está pronta.</p>
            <button className="w-full bg-[#C5A059] py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#B38E46] transition">Falar com Suporte</button>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {tab === 'cases' && (
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-3xl font-serif text-[#0F172A]">Acompanhamento de Casos</h2>
                  <p className="text-slate-400 font-light mt-1">Monitore o status de seus relatos em tempo real.</p>
                </div>
                <button onClick={() => setTab('new')} className="bg-[#0F172A] text-white px-8 py-3.5 rounded-sm font-black text-[10px] uppercase tracking-widest flex items-center shadow-2xl shadow-slate-200">
                  <Plus className="w-4 h-4 mr-2 text-[#C5A059]" /> Relatar Nova Situação
                </button>
              </div>

              {cases.length === 0 ? (
                <div className="bg-white p-20 text-center rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <List className="w-10 h-10 text-slate-200" />
                  </div>
                  <h3 className="text-2xl font-serif text-slate-900 mb-4">Inicie sua Jornada Jurídica</h3>
                  <p className="text-slate-400 font-light mb-10 max-w-sm mx-auto leading-relaxed">Não encontramos relatos ativos em seu perfil. Comece descrevendo sua situação para os advogados.</p>
                  <button onClick={() => setTab('new')} className="bg-[#C5A059] text-white px-10 py-4 rounded-sm font-black text-[10px] uppercase tracking-[0.2em] shadow-xl">Novo Relato</button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  {cases.map((c) => (
                    <div key={c.id} className="bg-white border border-slate-100 p-8 rounded-3xl hover:shadow-2xl transition duration-500 group relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-5 h-5 text-[#C5A059]" />
                      </div>
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-[10px] font-black text-blue-700 bg-blue-50 px-3 py-1.5 rounded uppercase tracking-widest">{c.legalArea}</span>
                        {c.status === CaseStatus.PENDING ? (
                          <span className="flex items-center text-[10px] font-black text-yellow-600 uppercase tracking-widest"><Clock className="w-3 h-3 mr-1" /> Em Análise</span>
                        ) : (
                          <span className="flex items-center text-[10px] font-black text-green-600 uppercase tracking-widest"><CheckCircle className="w-3 h-3 mr-1" /> Publicado</span>
                        )}
                      </div>
                      <h3 className="text-xl font-serif text-[#0F172A] mb-3 group-hover:text-[#C5A059] transition">{c.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mb-8 leading-relaxed font-light">{c.description}</p>

                      <div className="space-y-4 pt-6 border-t border-slate-50">
                        <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-slate-400">
                          <span>Status da Conexão</span>
                          <span className="text-[#0F172A]">{c.unlockedByIds.length} Escritórios Interessados</span>
                        </div>
                        <div className="flex space-x-1">
                          {[1, 2, 3].map(step => (
                            <div key={step} className={`h-1 flex-1 rounded-full ${step === 1 || (step === 2 && c.status === CaseStatus.APPROVED) || (step === 3 && c.unlockedByIds.length > 0) ? 'bg-[#C5A059]' : 'bg-slate-100'}`}></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'new' && (
            <div className="bg-white p-10 md:p-14 rounded-[2.5rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(15,23,42,0.05)]">
              <div className="mb-12">
                <h2 className="text-3xl font-serif text-[#0F172A] mb-2">Novo Relato Institucional</h2>
                <p className="text-slate-400 font-light">Descreva os detalhes do seu caso para que nossa banca possa analisá-lo.</p>
              </div>

              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Título Principal do Relato</label>
                  <input type="text" required placeholder="Ex: Problema com contrato de locação comercial" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#C5A059] transition text-sm outline-none font-medium" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Área de Atuação</label>
                  <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#C5A059] transition text-sm outline-none font-bold" value={formData.legalArea} onChange={e => setFormData({ ...formData, legalArea: e.target.value })}>
                    {LEGAL_AREAS.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Nível de Urgência</label>
                  <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#C5A059] transition text-sm outline-none font-bold" value={formData.urgency} onChange={e => setFormData({ ...formData, urgency: e.target.value as any })}>
                    <option value={UrgencyLevel.LOW}>Baixa - Consultivo</option>
                    <option value={UrgencyLevel.MEDIUM}>Média - Prazo Regular</option>
                    <option value={UrgencyLevel.HIGH}>Alta - Urgente</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Descrição Detalhada do Fato</label>
                  <textarea required rows={6} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#C5A059] transition text-sm outline-none font-light leading-relaxed resize-none" placeholder="Narração cronológica dos fatos..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                </div>

                <div className="md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Evidências e Documentos</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition cursor-pointer relative group">
                    <input
                      type="file"
                      multiple
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                      accept="image/*,application/pdf,video/*,text/plain"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
                      <div className="w-12 h-12 bg-[#0F172A]/5 text-[#0F172A] rounded-full flex items-center justify-center group-hover:bg-[#C5A059] group-hover:text-white transition-colors">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#0F172A]">Clique para anexar arquivos</p>
                        <p className="text-xs text-slate-400 mt-1">Imagens, Vídeos, PDFs ou Áudios (Máx. 50MB)</p>
                      </div>
                    </div>
                  </div>

                  {formData.files.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      {formData.files.map((file, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                          <div className="flex items-center space-x-3 overflow-hidden">
                            <div className="w-8 h-8 rounded bg-white border border-slate-100 flex items-center justify-center flex-shrink-0">
                              {file.type.startsWith('image') ? <ImageIcon className="w-4 h-4 text-purple-500" /> :
                                file.type.startsWith('video') ? <Film className="w-4 h-4 text-red-500" /> :
                                  <FileText className="w-4 h-4 text-blue-500" />}
                            </div>
                            <span className="text-xs font-medium text-slate-600 truncate">{file.name}</span>
                          </div>
                          <button type="button" onClick={() => removeFile(i)} className="p-1 hover:bg-red-50 rounded text-slate-400 hover:text-red-500 transition">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button type="submit" className="md:col-span-2 bg-[#0F172A] text-white py-5 rounded-xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-slate-800 transition shadow-2xl flex items-center justify-center">
                  Submeter para Auditoria de Conteúdo
                  <ChevronRight className="ml-2 w-4 h-4 text-[#C5A059]" />
                </button>
              </form>
            </div>
          )}

          {tab === 'messages' && (
            <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm flex flex-col h-[700px]">
              <div className="p-8 border-b border-slate-50 bg-[#F8FAFC] flex items-center justify-between">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0F172A] flex items-center">
                  <MessageSquare className="w-5 h-5 mr-3 text-[#C5A059]" /> Central de Negociações
                </h3>
              </div>
              <div className="flex flex-grow overflow-hidden">
                <div className="w-1/3 border-r border-slate-50 overflow-y-auto bg-slate-50/30">
                  {cases.filter(c => c.unlockedByIds.length > 0).length === 0 ? (
                    <div className="p-12 text-center">
                      <p className="text-[10px] font-black text-slate-300 uppercase italic">Aguardando contatos</p>
                    </div>
                  ) : (
                    cases.filter(c => c.unlockedByIds.length > 0).map(c => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCaseId(c.id)}
                        className={`w-full p-8 text-left hover:bg-white transition-all border-b border-slate-50 ${selectedCaseId === c.id ? 'bg-white border-l-4 border-l-[#C5A059] shadow-inner' : ''}`}
                      >
                        <p className="font-serif text-slate-900 mb-1">{c.title}</p>
                        <p className="text-[9px] text-[#C5A059] font-black uppercase tracking-widest">{c.unlockedByIds.length} ADVOGADO(S) ONLINE</p>
                      </button>
                    ))
                  )}
                </div>
                <div className="w-2/3 flex flex-col">
                  {selectedCaseId ? (
                    <ChatBox caseId={selectedCaseId} messages={messages.filter(m => m.caseId === selectedCaseId)} onSendMessage={onSendMessage} userRole={user.role} />
                  ) : (
                    <div className="flex-grow flex items-center justify-center text-slate-300 p-12 text-center font-light">
                      <p>Selecione um caso para visualizar as interações dos escritórios.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
