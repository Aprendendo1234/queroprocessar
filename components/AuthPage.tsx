
import React, { useState } from 'react';
import { UserRole } from '../types';
import { Scale, Mail, Lock, User as UserIcon, Phone, Briefcase, ShieldCheck, ChevronRight, Award, MapPin } from 'lucide-react';

import { User } from '../types';

interface AuthPageProps {
  onLogin: (email: string, password: string) => void;
  onRegister: (userData: Partial<User> & { password?: string }) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>(UserRole.CLIENT);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [oab, setOab] = useState('');
  const [ufOab, setUfOab] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      alert("As senhas não conferem!");
      return;
    }

    if (isLogin) {
      onLogin(email, password);
    } else {
      onRegister({
        email,
        password,
        role,
        name,
        phone,
        city,
        oab: role === UserRole.LAWYER ? oab : undefined,
        ufOab: role === UserRole.LAWYER ? ufOab : undefined,
        active: true,
      } as any);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#F8FAFC] py-12 px-4">
      <div className="max-w-xl w-full">
        {/* Brand context */}
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-[#0F172A] rounded-2xl mb-6 shadow-2xl">
            <Scale className="h-10 w-10 text-[#C5A059]" />
          </div>
          <h2 className="text-4xl font-serif text-[#0F172A] mb-2 tracking-tight">
            {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
          </h2>
          <p className="text-slate-400 font-light text-lg">
            Acesse a maior rede de escritórios de advocacia do país.
          </p>
        </div>

        <div className="bg-white p-10 md:p-12 rounded-3xl shadow-[0_32px_64px_-16px_rgba(15,23,42,0.08)] border border-slate-100">
          <div className="flex bg-slate-50 p-1.5 rounded-2xl mb-10 border border-slate-100">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${isLogin ? 'bg-white shadow-md text-[#0F172A]' : 'bg-[#0F172A] text-white shadow-lg hover:bg-slate-800'}`}
            >
              Fazer Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${!isLogin ? 'bg-white shadow-md text-[#0F172A]' : 'bg-[#0F172A] text-white shadow-lg hover:bg-slate-800'}`}
            >
              Registrar-se
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {!isLogin && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Selecione seu Perfil</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole(UserRole.CLIENT)}
                    className={`p-5 border-2 rounded-2xl flex flex-col items-center justify-center space-y-3 transition-all ${role === UserRole.CLIENT ? 'border-[#C5A059] bg-[#C5A059]/5 text-[#0F172A]' : 'border-slate-50 text-slate-400 hover:border-slate-200'}`}
                  >
                    <UserIcon className="w-6 h-6" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Sou Cliente</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole(UserRole.LAWYER)}
                    className={`p-5 border-2 rounded-2xl flex flex-col items-center justify-center space-y-3 transition-all ${role === UserRole.LAWYER ? 'border-[#C5A059] bg-[#C5A059]/5 text-[#0F172A]' : 'border-slate-50 text-slate-400 hover:border-slate-200'}`}
                  >
                    <Briefcase className="w-6 h-6" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Sou Advogado</span>
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-5">
              {!isLogin && (
                <>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text" required placeholder="Nome Completo"
                      value={name} onChange={(e) => setName(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#C5A059] transition text-sm outline-none font-medium"
                    />
                  </div>

                  {!isLogin && role === UserRole.LAWYER && (
                    <div className="grid grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="col-span-3 relative">
                        <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text" required placeholder="Número da OAB"
                          value={oab} onChange={(e) => setOab(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#C5A059] transition text-sm outline-none font-medium"
                        />
                      </div>
                      <div className="col-span-1 relative">
                        <input
                          type="text" required placeholder="UF" maxLength={2}
                          value={ufOab} onChange={(e) => setUfOab(e.target.value.toUpperCase())}
                          className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#C5A059] transition text-sm outline-none font-medium text-center"
                        />
                      </div>
                    </div>
                  )}
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text" required placeholder="Cidade"
                      value={city} onChange={(e) => setCity(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#C5A059] transition text-sm outline-none"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel" required placeholder="Telefone"
                      value={phone} onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#C5A059] transition text-sm outline-none"
                    />
                  </div>
                </>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email" required placeholder="E-mail Institucional"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#C5A059] transition text-sm outline-none font-medium"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password" required placeholder="Sua Senha"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#C5A059] transition text-sm outline-none font-medium"
                />
              </div>

              {!isLogin && (
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password" required placeholder="Confirmar Senha"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#C5A059] transition text-sm outline-none font-medium"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#0F172A] text-white py-5 rounded-xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-slate-800 transition shadow-2xl shadow-slate-200 flex items-center justify-center active:scale-95 duration-200"
            >
              {isLogin ? 'Validar Credenciais' : 'Criar Perfil Jurídico'}
              <ChevronRight className="ml-2 w-4 h-4 text-[#C5A059]" />
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Ambiente Seguro de Teste
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {['cliente@teste.com', 'advogado@teste.com', 'admin@queroprocessar.com'].map(e => (
                <span key={e} className="text-[9px] bg-slate-50 border border-slate-100 px-2 py-1 rounded-md text-slate-400 font-mono">{e}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
