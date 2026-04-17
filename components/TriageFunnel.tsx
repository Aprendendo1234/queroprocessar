import React, { useState } from 'react';
import { LEGAL_AREAS } from '../constants';
import { ChevronRight, ArrowLeft, CheckCircle, Scale, Shield, Zap } from 'lucide-react';
import { UrgencyLevel } from '../types';

interface TriageFunnelProps {
  onComplete: (userData: any, caseData: any) => void;
  onBack: () => void;
}

const TriageFunnel: React.FC<TriageFunnelProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(1);

  // Case Data
  const [legalArea, setLegalArea] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<UrgencyLevel>(UrgencyLevel.MEDIUM);

  // User Data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');

  const handleNext = () => setStep((s) => s + 1);
  const handlePrev = () => setStep((s) => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(
      { name, email, city, password },
      { legalArea, title, description, urgency }
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center pt-8 md:pt-20 px-4">
      {/* Progress Header */}
      <div className="w-full max-w-3xl mb-8 flex justify-between items-center group">
        <button onClick={step === 1 ? onBack : handlePrev} className="text-slate-400 hover:text-slate-900 transition flex items-center text-sm font-semibold">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>
        <div className="flex space-x-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1.5 w-8 md:w-16 rounded-full transition-all duration-500 ${s <= step ? 'bg-[#C5A059]' : 'bg-slate-200'}`} />
          ))}
        </div>
      </div>

      <div className="w-full max-w-3xl bg-white p-8 md:p-12 rounded-3xl shadow-[0_32px_64px_-16px_rgba(15,23,42,0.08)] border border-slate-100 relative overflow-hidden">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-serif text-[#0F172A] mb-2">Para começarmos...</h2>
            <p className="text-slate-500 mb-10">Selecione a área jurídica principal que mais se aproxima do seu caso.</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {LEGAL_AREAS.map((area) => (
                <button
                  key={area.id}
                  onClick={() => { setLegalArea(area.name); handleNext(); }}
                  className={`p-6 border-2 rounded-2xl flex flex-col items-center text-center transition-all duration-300 ${legalArea === area.name ? 'border-[#C5A059] bg-[#C5A059]/5' : 'border-slate-100 hover:border-[#C5A059]/40 hover:shadow-md'}`}
                >
                  <div className={`mb-4 ${legalArea === area.name ? 'text-[#C5A059]' : 'text-slate-400'}`}>
                    {React.cloneElement(area.icon as React.ReactElement, { size: 32, strokeWidth: 1.5 })}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">{area.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-serif text-[#0F172A] mb-2">Detalhes do Caso</h2>
            <p className="text-slate-500 mb-10">Conte-nos brevemente o que aconteceu. Não precisa se preocupar com termos jurídicos.</p>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Título (Resumo ou Assunto)</label>
                <input
                  type="text" placeholder="Ex: Cancelamento de Voo e Extravio de Bagagem"
                  value={title} onChange={e => setTitle(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#C5A059] transition outline-none font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">O que aconteceu?</label>
                <textarea
                  rows={5} placeholder="Fui realizar uma viagem para..."
                  value={description} onChange={e => setDescription(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#C5A059] transition outline-none resize-none font-light text-slate-700"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-3">Nível de Urgência</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  {Object.values(UrgencyLevel).map((level) => (
                    <button
                      key={level}
                      onClick={() => setUrgency(level as UrgencyLevel)}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center transition-all ${urgency === level ? 'bg-[#0F172A] text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                    >
                      {level === UrgencyLevel.HIGH && <Zap className="w-4 h-4 mr-2 text-red-400" />}
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <button
                disabled={!title || !description}
                onClick={handleNext}
                className="w-full mt-8 bg-[#C5A059] text-white py-5 rounded-xl font-black text-xs uppercase tracking-[0.3em] hover:bg-[#B38E46] transition shadow-lg shadow-[#C5A059]/20 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                Avançar
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-[#C5A059]/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-[#C5A059]" />
              </div>
            </div>
            <h2 className="text-3xl font-serif text-center text-[#0F172A] mb-4">Quase lá!</h2>
            <p className="text-slate-500 text-center mb-10 max-w-lg mx-auto leading-relaxed text-sm">
              Encontramos especialistas em <strong>{legalArea}</strong>. Para enviarmos o seu caso diretamente para a mesa deles de forma sigilosa, preencha os dados de contato.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text" required placeholder="Seu Nome Completo"
                  value={name} onChange={e => setName(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#C5A059] transition outline-none font-medium"
                />
                <input
                  type="text" required placeholder="Cidade"
                  value={city} onChange={e => setCity(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#C5A059] transition outline-none font-medium"
                />
              </div>
              <input
                type="email" required placeholder="Seu melhor E-mail"
                value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#C5A059] transition outline-none font-medium"
              />
              <input
                type="password" required placeholder="Crie uma Senha para acessar sua conta depois"
                value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#C5A059] transition outline-none font-medium"
              />

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={!name || !city || !email || !password}
                  className="w-full bg-[#0F172A] text-white py-5 rounded-xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-[#1E293B] transition shadow-2xl flex items-center justify-center active:scale-95 duration-200 disabled:opacity-50"
                >
                  Confirmar e Enviar Caso Grátis
                  <Shield className="ml-2 w-4 h-4 text-[#C5A059]" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TriageFunnel;
