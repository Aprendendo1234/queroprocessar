
import React, { useState, useEffect, useMemo } from 'react';
import { User, UserRole, LegalCase, CaseStatus, UrgencyLevel, PublicationType, ChatMessage, Notification } from './types';
import { MOCK_USERS } from './constants';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import ClientDashboard from './components/ClientDashboard';
import LawyerDashboard from './components/LawyerDashboard';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/Navbar';
import VitoriasPage from './components/VitoriasPage';
import PropostaPage from './components/PropostaPage';

import Footer from './components/Footer';
import CaseSuccessPage from './components/CaseSuccessPage';
import { SUCCESS_STORIES } from './constants';
import { supabase } from './lib/supabase';

const INITIAL_CASES: LegalCase[] = [
  {
    id: 'c1',
    userId: 'u1',
    clientName: 'Maria Silva',
    title: 'Acidente de trabalho com afastamento',
    legalArea: 'Direito Trabalhista',
    description: 'Fui afastada do trabalho por um acidente na linha de produção e a empresa não está pagando os encargos devidos...',
    urgency: UrgencyLevel.HIGH,
    city: 'São Paulo',
    state: 'SP',
    publicationType: PublicationType.PUBLIC,
    status: CaseStatus.APPROVED,
    unlockPrice: 75,
    views: 12,
    unlockedByIds: [],
    createdAt: '2025-01-10T10:00:00Z'
  },
  {
    id: 'c2',
    userId: 'u1',
    clientName: 'Maria Silva',
    title: 'Revisão de benefício previdenciário',
    legalArea: 'Direito Previdenciário',
    description: 'Desejo revisar meu benefício de aposentadoria pois acredito que o cálculo inicial está incorreto baseado em contribuições antigas.',
    urgency: UrgencyLevel.MEDIUM,
    city: 'Rio de Janeiro',
    state: 'RJ',
    publicationType: PublicationType.PRIVATE,
    status: CaseStatus.APPROVED,
    unlockPrice: 100,
    views: 8,
    unlockedByIds: [],
    createdAt: '2025-01-12T14:30:00Z'
  },
  {
    id: 'c3',
    userId: 'u1',
    clientName: 'Maria Silva',
    title: 'Erro médico em cirurgia',
    legalArea: 'Direito Civil',
    description: 'Sofri complicações graves após uma cirurgia eletiva e suspeito de negligência médica durante o procedimento.',
    urgency: UrgencyLevel.HIGH,
    city: 'Curitiba',
    state: 'PR',
    publicationType: PublicationType.PUBLIC,
    status: CaseStatus.PENDING,
    views: 0,
    unlockedByIds: [],
    createdAt: '2025-02-01T09:15:00Z'
  }
];

export default function App() {
  // Initialize users state with values from MOCK_USERS
  const [users, setUsers] = useState<User[]>([
    MOCK_USERS.CLIENT as User,
    MOCK_USERS.LAWYER as User,
    MOCK_USERS.ADMIN as User
  ]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<'landing' | 'auth' | 'dashboard' | 'success-case' | 'vitorias' | 'proposta'>('landing');
  const [selectedStoryId, setSelectedStoryId] = useState<number | null>(null);
  const [cases, setCases] = useState<LegalCase[]>(INITIAL_CASES);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Users
        const { data: userData, error: userError } = await supabase.from('profiles').select('*');
        if (userError) console.error('Error fetching users:', userError);
        else if (userData) setUsers(userData as User[]);

        // Fetch Cases
        const { data: caseData, error: caseError } = await supabase.from('cases').select('*');
        if (caseError) console.error('Error fetching cases:', caseError);
        else if (caseData) setCases(caseData as LegalCase[]);

        // Fetch Messages
        const { data: msgData, error: msgError } = await supabase.from('messages').select('*');
        if (msgError) console.error('Error fetching messages:', msgError);
        else if (msgData) setMessages(msgData as ChatMessage[]);

        // Fetch Notifications
        const { data: notifData, error: notifError } = await supabase.from('notifications').select('*').eq('userId', currentUser?.id);
        if (notifError) console.error('Error fetching notifications:', notifError);
        else if (notifData) setNotifications(notifData as Notification[]);

      } catch (err) {
        console.error('Data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser?.id]);

  const login = (email: string, password: string) => {
    // Find user by email first (email should be unique)
    const user = users.find(u => u.email === email);

    if (user) {
      // Password check
      if (user.password && user.password !== password) {
        alert("Senha incorreta.");
        return;
      }

      if (user.status === 'pending') {
        alert("Seu cadastro está em análise pelo administrador. Aguarde a aprovação.");
        return;
      }
      if (user.status === 'rejected') {
        alert("Seu cadastro foi recusado.");
        return;
      }
      setCurrentUser(user);
      setView('dashboard');
    } else {
      alert("Usuário não encontrado.");
    }
  };

  const register = async (userData: Partial<User> & { password?: string }) => {
    const newUser: Partial<User> & { password?: string } = {
      role: userData.role || UserRole.CLIENT,
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      cpfCnpj: '',
      password: userData.password || '',
      active: true,
      status: userData.role === UserRole.LAWYER ? 'pending' : 'approved',
      createdAt: new Date().toISOString(),
      ...userData
    };

    const { data, error } = await supabase.from('profiles').insert([newUser]).select().single();

    if (error) {
      alert("Erro ao cadastrar: " + error.message);
      return;
    }

    if (data) {
      const user = data as User;
      setUsers(prev => [...prev, user]);

      if (user.status === 'approved') {
        setCurrentUser(user);
        setView('dashboard');
      } else {
        alert("Cadastro realizado! Aguarde a aprovação do administrador.");
        setView('landing');
      }
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setView('landing');
  };

  const uploadFile = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `cases/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('case-attachments')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('case-attachments')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const addCase = async (newCase: any) => {
    const { files, ...caseData } = newCase;

    try {
      let attachmentUrls: string[] = [];

      if (files && files.length > 0) {
        // Upload all files and get URLs
        const uploadPromises = Array.from(files as File[]).map(file => uploadFile(file));
        attachmentUrls = await Promise.all(uploadPromises);
      }

      const freshCase = {
        ...caseData,
        attachments: attachmentUrls, // Replace filenames with URLs
        status: CaseStatus.PENDING,
        views: 0,
        unlockedByIds: [],
        createdAt: new Date().toISOString()
      };

      const { data, error } = await supabase.from('cases').insert([freshCase]).select().single();

      if (error) {
        alert("Erro ao enviar caso: " + error.message);
        return;
      }

      if (data) {
        setCases(prev => [data as LegalCase, ...prev]);
        addNotification(MOCK_USERS.ADMIN.id, 'info', 'Novo Caso', `Um novo caso "${data.title}" foi relatado.`);
      }
    } catch (err: any) {
      alert("Erro ao processar anexos: " + err.message);
    }
  };

  const approveCase = async (id: string, price: number) => {
    const { error } = await supabase.from('cases').update({ status: CaseStatus.APPROVED, unlockPrice: price }).eq('id', id);

    if (error) {
      alert("Erro ao aprovar caso: " + error.message);
      return;
    }

    setCases(prev => prev.map(c => c.id === id ? { ...c, status: CaseStatus.APPROVED, unlockPrice: price } : c));
    const targetCase = cases.find(c => c.id === id);
    if (targetCase) {
      addNotification(targetCase.userId, 'success', 'Caso Aprovado', `Seu caso "${targetCase.title}" foi aprovado e já está visível para advogados.`);
    }
  };

  const rejectCase = async (id: string, reason: string) => {
    const { error } = await supabase.from('cases').update({ status: CaseStatus.REJECTED, rejectionReason: reason }).eq('id', id);

    if (error) {
      alert("Erro ao recusar caso: " + error.message);
      return;
    }

    setCases(prev => prev.map(c => c.id === id ? { ...c, status: CaseStatus.REJECTED, rejectionReason: reason } : c));
    const targetCase = cases.find(c => c.id === id);
    if (targetCase) {
      addNotification(targetCase.userId, 'warning', 'Caso Recusado', `Seu caso "${targetCase.title}" foi recusado. Motivo: ${reason}`);
    }
  };


  const unlockCase = async (caseId: string, lawyerId: string) => {
    const targetCase = cases.find(c => c.id === caseId);
    if (!targetCase) return;

    const updatedUnlockedByIds = [...targetCase.unlockedByIds, lawyerId];

    const { error } = await supabase.from('cases').update({ unlockedByIds: updatedUnlockedByIds }).eq('id', caseId);

    if (error) {
      alert("Erro ao desbloquear caso: " + error.message);
      return;
    }

    setCases(prev => prev.map(c =>
      c.id === caseId ? { ...c, unlockedByIds: updatedUnlockedByIds } : c
    ));

    addNotification(targetCase.userId, 'success', 'Advogado Interessado', `O advogado ${currentUser?.name} adquiriu seu contato para o caso "${targetCase.title}".`);
  };

  const addNotification = async (userId: string, type: 'info' | 'success' | 'warning', title: string, message: string) => {
    const n: Partial<Notification> = {
      userId,
      type,
      title,
      message,
      read: false,
      createdAt: new Date().toISOString()
    };

    const { data, error } = await supabase.from('notifications').insert([n]).select().single();

    if (error) {
      console.error("Erro ao criar notificação:", error);
      return;
    }

    if (data) {
      setNotifications(prev => [data as Notification, ...prev]);
    }
  };

  const approveUser = async (userId: string) => {
    const { error } = await supabase.from('profiles').update({ status: 'approved' }).eq('id', userId);

    if (error) {
      alert("Erro ao aprovar usuário: " + error.message);
      return;
    }

    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'approved' } : u));
    addNotification(userId, 'success', 'Cadastro Aprovado', 'Seu cadastro foi aprovado! Você já pode acessar o sistema.');
  };

  const rejectUser = async (userId: string) => {
    const { error } = await supabase.from('profiles').update({ status: 'rejected' }).eq('id', userId);

    if (error) {
      alert("Erro ao recusar usuário: " + error.message);
      return;
    }

    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'rejected' } : u));
  };

  const deleteUser = async (userId: string) => {
    const { error } = await supabase.from('profiles').delete().eq('id', userId);

    if (error) {
      alert("Erro ao excluir usuário: " + error.message);
      return;
    }

    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const sendMessage = async (caseId: string, text: string) => {
    if (!currentUser) return;
    const msg: Partial<ChatMessage> = {
      caseId,
      senderId: currentUser.id,
      text,
      timestamp: new Date().toISOString()
    };

    const { data, error } = await supabase.from('messages').insert([msg]).select().single();

    if (error) {
      console.error("Erro ao enviar mensagem:", error);
      return;
    }

    if (data) {
      setMessages(prev => [...prev, data as ChatMessage]);
    }
  };

  const viewStory = (id: number) => {
    setSelectedStoryId(id);
    setView('success-case');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        user={currentUser}
        onLogout={logout}
        onLoginClick={() => setView('auth')}
        onHomeClick={() => setView('landing')}
        onDashboardClick={() => setView('dashboard')}
        onVitoriasClick={() => setView('vitorias')}
        onPropostaClick={() => setView('proposta')}
        onStartClick={() => setView(currentUser ? 'dashboard' : 'auth')}
      />

      <main className="flex-grow">
        {view === 'landing' && (
          <LandingPage
            onStart={() => setView(currentUser ? 'dashboard' : 'auth')}
            onBrowseCases={() => setView(currentUser ? 'dashboard' : 'auth')}
            onViewStory={viewStory}
          />
        )}
        {view === 'vitorias' && (
          <VitoriasPage onBack={() => setView('landing')} />
        )}
        {view === 'proposta' && (
          <PropostaPage onBack={() => setView('landing')} />
        )}
        {view === 'success-case' && selectedStoryId && (
          <CaseSuccessPage
            story={SUCCESS_STORIES.find(s => s.id === selectedStoryId)!}
            onBack={() => setView('landing')}
          />
        )}
        {view === 'auth' && <AuthPage onLogin={login} onRegister={register} />}
        {view === 'dashboard' && currentUser?.role === UserRole.CLIENT && (
          <ClientDashboard
            user={currentUser}
            cases={cases.filter(c => c.userId === currentUser.id)}
            onSubmitCase={addCase}
            messages={messages}
            onSendMessage={sendMessage}
            notifications={notifications.filter(n => n.userId === currentUser.id)}
          />
        )}
        {view === 'dashboard' && currentUser?.role === UserRole.LAWYER && (
          <LawyerDashboard
            user={currentUser}
            allCases={cases.filter(c => c.status === CaseStatus.APPROVED)}
            onUnlock={unlockCase}
            messages={messages}
            onSendMessage={sendMessage}
            notifications={notifications.filter(n => n.userId === currentUser.id)}
          />
        )}
        {view === 'dashboard' && currentUser?.role === UserRole.ADMIN && (
          <AdminDashboard
            user={currentUser}
            allCases={cases}
            users={users}
            onApproveCase={approveCase}
            onRejectCase={rejectCase}
            onApproveUser={approveUser}
            onRejectUser={rejectUser}
            onDeleteUser={deleteUser}
            totalRevenue={cases.reduce((acc, c) => acc + (c.unlockedByIds.length * (c.unlockPrice || 0)), 0)}
            messages={messages}
            onSendMessage={sendMessage}
          />
        )}
      </main>

      <Footer
        onVitoriasClick={() => setView('vitorias')}
        onPropostaClick={() => setView('proposta')}
      />
    </div>
  );
}
