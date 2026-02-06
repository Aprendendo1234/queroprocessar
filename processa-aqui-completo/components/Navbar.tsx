
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Menu, X, Scale, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
  onHomeClick: () => void;
  onDashboardClick: () => void;
  onVitoriasClick: () => void;
  onPropostaClick: () => void;
  onStartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onLoginClick, onHomeClick, onDashboardClick, onVitoriasClick, onPropostaClick, onStartClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center cursor-pointer group" onClick={onHomeClick}>
            <div className="p-2 bg-[#0F172A] rounded-sm mr-3 transform group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-[#0F172A]/20 transition-all duration-300">
              <Scale className="h-5 w-5 text-[#C5A059]" />
            </div>
            <span className="text-xl font-serif font-black text-[#0F172A] tracking-tighter">
              Quero <span className="text-[#C5A059]">Processar</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            <button onClick={onHomeClick} className="text-[#0F172A] hover:text-[#C5A059] transition font-bold text-[10px] uppercase tracking-[0.2em]">Home</button>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onStartClick(); }}
              className="text-slate-400 hover:text-[#0F172A] transition font-bold text-[10px] uppercase tracking-[0.2em] leading-tight flex flex-col items-center text-center"
            >
              <span>Cadastre</span>
              <span>seu caso</span>
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onStartClick(); }}
              className="text-slate-400 hover:text-[#0F172A] transition font-bold text-[10px] uppercase tracking-[0.2em] leading-tight flex flex-col items-center"
            >
              <span>Casos Relatados</span>
              <span className="text-[10px] font-medium lowercase tracking-normal text-slate-400 border-b border-red-500/30">(para advogados)</span>
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onVitoriasClick(); }}
              className="text-slate-400 hover:text-[#0F172A] transition font-bold text-[10px] uppercase tracking-[0.2em] leading-tight flex flex-col items-center"
            >
              <span>Vitórias</span>
              <span>Inspiradoras</span>
            </a>

            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onPropostaClick(); }}
              className="text-slate-400 hover:text-[#0F172A] transition font-bold text-[10px] uppercase tracking-[0.2em] leading-tight"
            >
              Sobre
            </a>

            {user ? (
              <div className="flex items-center space-x-6 border-l border-slate-100 pl-8">
                <button
                  onClick={onDashboardClick}
                  className="bg-[#0F172A] text-white px-6 py-2.5 rounded-sm font-bold text-[10px] uppercase tracking-widest hover:bg-slate-800 transition flex items-center shadow-lg shadow-slate-200"
                >
                  <LayoutDashboard className="w-3 h-3 mr-2" />
                  Painel de Gestão
                </button>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-[11px] font-black text-[#0F172A] leading-none mb-1">{user.name}</p>
                    <div className="flex items-center justify-end">
                      <span className="text-[9px] text-[#C5A059] uppercase font-bold tracking-widest mr-1">{user.role}</span>
                      {user.role === UserRole.LAWYER && <ShieldCheck className="w-2 h-2 text-green-500" />}
                    </div>
                  </div>
                  <button onClick={onLogout} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-[#C5A059] text-white px-8 py-3.5 rounded-sm font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#B38E46] transition-all shadow-xl shadow-[#C5A059]/10 active:scale-95"
              >
                Login
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-900">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-8 px-6 space-y-6 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <button onClick={onHomeClick} className="block w-full text-left font-black uppercase tracking-widest text-[11px] text-[#0F172A]">Início</button>
          <button onClick={onLoginClick} className="block w-full bg-[#0F172A] text-white py-5 rounded-sm font-black uppercase tracking-widest text-[11px] text-center">Login</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
