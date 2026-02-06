
import React from 'react';
import { Scale, Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';

interface FooterProps {
  onVitoriasClick?: () => void;
  onPropostaClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onVitoriasClick, onPropostaClick }) => {
  return (
    <footer className="bg-[#0F172A] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16 text-center">
          <div className="flex flex-col items-center">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-[#C5A059]">Institucional</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-light">
              <li>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); onPropostaClick?.(); }}
                  className="hover:text-white transition"
                >
                  Nossa Proposta
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); onVitoriasClick?.(); }}
                  className="hover:text-white transition"
                >
                  Vitórias Inspiradoras
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex items-center mb-8">
              <div className="p-1 border border-[#C5A059] rounded-sm mr-2">
                <Scale className="h-5 w-5 text-[#C5A059]" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">Quero <span className="text-[#C5A059]">Processar</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light max-w-xs text-center">
              Plataforma institucional de alto padrão para conexão jurídica segura e eficiente. Focada na excelência do atendimento ao cliente.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-[#C5A059]">Contato</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-light">
              <li>contato@queroprocessar.com.br</li>
              <li>0800 123 4567</li>
              <li>Av. Paulista, 1000 - SP</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 flex justify-center items-center text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          <p>© 2026 - Quero Processar</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
