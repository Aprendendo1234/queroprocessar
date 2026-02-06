
import React, { useState } from 'react';
import { User, LegalCase, CaseStatus, ChatMessage, UserRole } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ShieldAlert, CheckCircle, XCircle, DollarSign, Users, Briefcase, TrendingUp, Search, Eye, Paperclip, Trash2, MessageSquare, Info } from 'lucide-react';
import ChatBox from './ChatBox';

interface AdminDashboardProps {
  user: User;
  allCases: LegalCase[];
  users: User[];
  onApproveCase: (id: string, price: number) => void;
  onRejectCase: (id: string, reason: string) => void;
  onApproveUser: (id: string) => void;
  onRejectUser: (id: string) => void;
  onDeleteUser: (id: string) => void;
  totalRevenue: number;
  messages: ChatMessage[];
  onSendMessage: (caseId: string, text: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, allCases, users, onApproveCase, onRejectCase, onApproveUser, onRejectUser, onDeleteUser, totalRevenue, messages, onSendMessage }) => {
  const [tab, setTab] = useState<'stats' | 'moderation' | 'users'>('stats');
  const [selectedCase, setSelectedCase] = useState<LegalCase | null>(null);
  const [price, setPrice] = useState(75);

  const pendingCases = allCases.filter(c => c.status === CaseStatus.PENDING);
  const pendingUsers = users.filter(u => u.status === 'pending');

  const chartData = [
    { name: 'Pendente (Casos)', value: pendingCases.length, color: '#C5A059' },
    { name: 'Pendente (Users)', value: pendingUsers.length, color: '#DC2626' },
    { name: 'Casos Ativos', value: allCases.filter(c => c.status === CaseStatus.APPROVED).length, color: '#0F172A' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-serif text-[#0F172A]">Painel de Controle</h1>
          <p className="text-slate-400 font-light mt-1">Gestão centralizada do Quero Processar.</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto max-w-full">
          <button onClick={() => setTab('stats')} className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition whitespace-nowrap ${tab === 'stats' ? 'bg-[#0F172A] text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}>Analíticos</button>
          <button onClick={() => setTab('moderation')} className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition relative whitespace-nowrap ${tab === 'moderation' ? 'bg-[#0F172A] text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}>
            Moderação
            {(pendingCases.length > 0 || pendingUsers.length > 0) && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">{pendingCases.length + pendingUsers.length}</span>}
          </button>
          <button onClick={() => setTab('users')} className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition whitespace-nowrap ${tab === 'users' ? 'bg-[#0F172A] text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}>Usuários</button>
        </div>
      </div>

      {tab === 'stats' && (
        <div className="space-y-10">
          <div className="grid md:grid-cols-4 gap-8">
            <StatCard icon={<DollarSign className="text-[#C5A059]" />} label="Receita Bruta" value={`R$ ${totalRevenue.toFixed(2)}`} />
            <StatCard icon={<Briefcase className="text-slate-900" />} label="Total de Casos" value={allCases.length} />
            <StatCard icon={<Users className="text-slate-900" />} label="Bancas Ativas" value="1.2k" />
            <StatCard icon={<ShieldAlert className="text-red-500" />} label="Pendentes" value={pendingCases.length} />
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-8">Fluxo de Demanda</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <Bar dataKey="value" barSize={50} radius={[10, 10, 0, 0]}>
                      {chartData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#0F172A] p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <TrendingUp className="absolute right-0 bottom-0 w-64 h-64 opacity-5 pointer-events-none" />
              <h3 className="text-[11px] font-black uppercase tracking-widest text-[#C5A059] mb-8">Metas e Performance</h3>
              <div className="space-y-8 relative z-10">
                {[
                  { l: 'Taxa de Conversão Leads', p: '78%' },
                  { l: 'Tempo Médio Aprovação', p: '2.4h' },
                  { l: 'Satisfação do Cliente', p: '4.9/5' }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                      <span>{item.l}</span>
                      <span className="text-[#C5A059]">{item.p}</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full">
                      <div className="h-full bg-[#C5A059] rounded-full" style={{ width: item.p }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'moderation' && (
        <div className="space-y-12">
          {/* ... existing moderation content ... */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50">
              <h3 className="text-xl font-serif text-[#0F172A]">Casos Pendentes ({pendingCases.length})</h3>
            </div>
            {pendingCases.length === 0 ? (
              <p className="p-8 text-slate-400 text-sm">Nenhum caso pendente.</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Relato Institucional</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Urgência</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ação Corretiva</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {pendingCases.map(c => (
                    <tr key={c.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-10 py-8">
                        <p className="font-serif text-[#0F172A] text-lg">{c.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{c.legalArea} • {c.clientName}</p>
                      </td>
                      <td className="px-10 py-8">
                        <span className={`text-[9px] font-black px-3 py-1.5 rounded-md uppercase tracking-widest ${c.urgency === 'Alta' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'}`}>{c.urgency}</span>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <button onClick={() => setSelectedCase(c)} className="bg-[#0F172A] text-white px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition">Analisar Lead</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50">
              <h3 className="text-xl font-serif text-[#0F172A]">Advogados Pendentes ({pendingUsers.length})</h3>
            </div>
            {pendingUsers.length === 0 ? (
              <p className="p-8 text-slate-400 text-sm">Nenhum advogado aguardando aprovação.</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome / Email</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {pendingUsers.map(u => (
                    <tr key={u.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-10 py-8">
                        <p className="font-serif text-[#0F172A] text-lg">{u.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{u.email} • {u.phone}</p>
                        <p className="text-xs text-slate-500 mt-1">{u.city || 'Cidade não informada'}</p>
                      </td>
                      <td className="px-10 py-8">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest">{u.role}</span>
                      </td>
                      <td className="px-10 py-8 text-right space-x-2">
                        <button onClick={() => onRejectUser(u.id)} className="border border-red-200 text-red-600 px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-red-50 transition">Recusar</button>
                        <button onClick={() => onApproveUser(u.id)} className="bg-[#0F172A] text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 transition">Aprovar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {tab === 'users' && (
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <h3 className="text-xl font-serif text-[#0F172A]">Base de Usuários ({users.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome / Email</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Papel</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Cadastrado em</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/50 transition">
                    <td className="px-10 py-8">
                      <p className="font-serif text-[#0F172A] text-lg">{u.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{u.email}</p>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'bg-purple-50 text-purple-700' : u.role === 'advogado' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest ${u.status === 'approved' ? 'bg-green-50 text-green-700' : u.status === 'pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-10 py-8 text-right">
                      <button
                        onClick={() => {
                          if (window.confirm(`Tem certeza que deseja excluir permanentemente o usuário ${u.name}?`)) {
                            onDeleteUser(u.id);
                          }
                        }}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Excluir Usuário"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedCase && (
        <div className="fixed inset-0 bg-[#0F172A]/90 backdrop-blur-md z-[100] flex items-center justify-center p-6 sm:p-12">
          <div className="bg-white w-full max-w-6xl h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 flex flex-col md:flex-row">

            {/* Left Column: Info & Narrative */}
            <div className="flex-1 p-8 md:p-12 overflow-y-auto border-r border-slate-100">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-serif text-[#0F172A]">Protocolo de Auditoria</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">ID do Caso: {selectedCase.id}</p>
                </div>
                <span className={`text-[9px] font-black px-3 py-1.5 rounded-md uppercase tracking-widest ${selectedCase.urgency === 'Alta' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                  Urgência {selectedCase.urgency}
                </span>
              </div>

              <div className="space-y-10">
                {/* Client Profile Card */}
                <div className="bg-[#0F172A] p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Users className="w-16 h-16" />
                  </div>
                  <p className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest mb-4 flex items-center">
                    <Info className="w-3 h-3 mr-2" /> Dados do Solicitante
                  </p>
                  {(() => {
                    const client = users.find(u => u.id === selectedCase.userId);
                    return client ? (
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Nome Completo</p>
                          <p className="text-lg font-serif">{client.name}</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">E-mail</p>
                          <p className="text-sm font-light break-all">{client.email}</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">WhatsApp / Telefone</p>
                          <p className="text-sm font-light">{client.phone}</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">CPF / CNPJ</p>
                          <p className="text-sm font-light">{client.cpfCnpj || 'Não informado'}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400">Dados do cliente não encontrados.</p>
                    );
                  })()}
                </div>

                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Narrativa do Cliente</p>
                  <p className="text-sm text-slate-700 leading-relaxed font-light">{selectedCase.description}</p>
                </div>

                {selectedCase.attachments && selectedCase.attachments.length > 0 && (
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center">
                      <Paperclip className="w-3 h-3 mr-2" /> Anexos do Caso
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCase.attachments.map((url, idx) => {
                        const isUrl = url.startsWith('http');
                        return isUrl ? (
                          <a
                            key={idx}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-[10px] text-slate-600 flex items-center hover:border-[#C5A059] hover:text-[#C5A059] transition shadow-sm"
                          >
                            <Paperclip className="w-2.5 h-2.5 mr-1.5" />
                            Arquivo {idx + 1}
                          </a>
                        ) : (
                          <span key={idx} className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-[10px] text-slate-400 flex items-center italic">
                            <Paperclip className="w-2.5 h-2.5 mr-1.5" />
                            {url} (Sem link)
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-6 p-2">
                  <div className="flex-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Sugestão de Preço (R$)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                      <input
                        type="number"
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-[#0F172A] focus:ring-2 focus:ring-[#C5A059] outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button onClick={() => setSelectedCase(null)} className="flex-1 py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-600">Voltar</button>
                  <button onClick={() => { onRejectCase(selectedCase.id, 'Inconsistência de dados'); setSelectedCase(null); }} className="flex-1 py-4 border-2 border-red-100 text-red-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition">Recusar</button>
                  <button onClick={() => { onApproveCase(selectedCase.id, price); setSelectedCase(null); }} className="flex-1 bg-[#0F172A] text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition shadow-2xl">Aprovar Lead</button>
                </div>
              </div>
            </div>

            {/* Right Column: Chat */}
            <div className="w-full md:w-[450px] flex flex-col bg-[#F8FAFC]">
              <div className="p-8 border-b border-slate-100 bg-white">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-[#C5A059]/10 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A]">Chat Direto com Cliente</h4>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Verificação de Protocolo</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <ChatBox
                  caseId={selectedCase.id}
                  messages={messages.filter(m => m.caseId === selectedCase.id)}
                  onSendMessage={onSendMessage}
                  userRole={UserRole.ADMIN}
                />
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon, label, value }: any) => (
  <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-[#C5A059]/10 transition-colors">
      {icon}
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{label}</p>
    <h4 className="text-3xl font-serif text-[#0F172A]">{value}</h4>
  </div>
);

export default AdminDashboard;
