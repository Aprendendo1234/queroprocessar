
import React, { useState, useEffect } from 'react';
import {
  CheckCircle, Shield, Star, Zap, ArrowRight, MessageSquare,
  Search, Award, Gavel, Users, BarChart3, HelpCircle, ChevronDown, Check,
  Clock, MapPin, MousePointer2, Scale as ScaleIcon, Lock, Eye, Play
} from 'lucide-react';
import { LEGAL_AREAS, SUCCESS_STORIES } from '../constants';

interface LandingPageProps {
  onStart: () => void;
  onBrowseCases: () => void;
  onViewStory: (id: number) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onBrowseCases, onViewStory }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % SUCCESS_STORIES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: 'Casos Relatados', value: '6.200+', icon: <Gavel className="w-3 h-3" /> },
    { label: 'Advogados Ativos', value: '500+', icon: <Users className="w-3 h-3" /> },
    { label: 'Cidades Atendidas', value: '460+', icon: <Search className="w-3 h-3" /> },
    { label: 'Taxa de Satisfação', value: '96%', icon: <BarChart3 className="w-3 h-3" /> },
  ];

  const [recentCasesIndex, setRecentCasesIndex] = useState(0);

  const recentCases = [
    { title: "Indenização por Danos Morais - Aéreo", area: "Consumidor", city: "São Paulo", urgency: "Alta" },
    { title: "Revisão Contratual Imobiliária", area: "Civil", city: "Curitiba", urgency: "Média" },
    { title: "Ação de Alimentos e Guarda", area: "Família", city: "Belo Horizonte", urgency: "Alta" },
    { title: "Divórcio Consensual e Partilha", area: "Família", city: "Rio de Janeiro", urgency: "Média" },
    { title: "Ação Revisional de Juros", area: "Bancário", city: "Porto Alegre", urgency: "Alta" },
    { title: "Trabalhista - Horas Extras", area: "Trabalhista", city: "Recife", urgency: "Alta" }
  ];

  const leadsGroups = [
    recentCases.slice(0, 3),
    recentCases.slice(3, 6)
  ];

  const faqs = [
    { q: "Como relato meu caso?", a: "Basta clicar em 'Cadastre-se', escolher o perfil de Cliente e preencher o formulário de relato com os detalhes da sua situação jurídica." },
    { q: "Quanto custa para o cliente?", a: "Para quem relata o caso, o serviço é totalmente gratuito. Os advogados é que investem para ter acesso aos seus dados de contato." },
    { q: "Meus dados estão seguros?", a: "Sim, utilizamos criptografia de ponta a ponta e seus dados sensíveis só são revelados ao advogado que você escolher ou que adquirir o lead." },
    { q: "Como o advogado entra em contato?", a: "Após o desbloqueio do contato, o advogado pode iniciar um chat direto com você dentro da nossa plataforma." }
  ];

  return (
    <div className="flex flex-col bg-[#FCFCFD] text-slate-800">
      {/* Hero Section */}
      <section className="relative pt-4 pb-2 lg:pt-6 lg:pb-4 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-stretch">
            {/* Left: Text & Actions */}
            <div className="lg:col-span-7 flex flex-col justify-between py-6">
              <div className="inline-flex items-center space-x-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full mb-4 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></div>
                <span className="text-[10px] font-bold text-[#0F172A] uppercase tracking-[0.2em]">Conexão Jurídica Inteligente</span>
              </div>
              <div className="max-w-3xl">
                <div className="flex flex-col w-full mb-6 font-serif leading-none">
                  {/* Line 1 - Dark */}
                  <div className="flex justify-between items-end w-full text-[#0F172A] text-2xl sm:text-4xl lg:text-6xl mb-2 mt-4 font-black tracking-tight">
                    <span>Conectamos</span>
                    <span className="mx-2">você</span>
                    <span>ao</span>
                  </div>

                  {/* Line 2 - Gold & Title Case */}
                  <div className="flex justify-between items-end w-full text-[#C5A059] text-2xl sm:text-4xl lg:text-5xl mb-2 font-black">
                    <span>Escritório</span>
                    <span>de</span>
                    <span>Advocacia</span>
                  </div>

                  {/* Line 3 - Dark */}
                  <div className="text-[#0F172A] text-2xl sm:text-4xl lg:text-6xl mb-6 font-black tracking-tight">
                    ideal.
                  </div>
                </div>

                <p className="text-2xl text-slate-400 mb-10 leading-relaxed font-medium text-justify w-full pl-1 max-w-2xl">
                  A tecnologia aproximando você da solução. Relate seu caso e deixe que os melhores especialistas do Brasil encontrem você.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={onStart}
                  className="bg-[#0F172A] text-white px-10 py-5 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-[#1E293B] transition shadow-2xl flex items-center justify-center group"
                >
                  CADASTRE SEU CASO
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform w-4 h-4" />
                </button>
                <button
                  onClick={onBrowseCases}
                  className="bg-white border border-slate-200 px-10 py-5 rounded-sm flex flex-col items-center justify-center min-w-[200px] leading-tight hover:bg-slate-50 transition-colors"
                >
                  <span className="text-[#0F172A] font-bold text-[10px] uppercase tracking-[0.2em]">Casos Relatados</span>
                  <span className="text-slate-400 text-[9px] lowercase tracking-normal mt-1">(para advogados)</span>
                </button>
              </div>
            </div>

            {/* Right: Vertical "Como Funciona" with Horizontal Stats */}
            <div className="lg:col-span-5 flex flex-col py-6">
              <div className="glass-card rounded-2xl p-8 lg:p-10 border border-slate-100 shadow-[0_32px_64px_-16px_rgba(15,23,42,0.08)] relative z-20 overflow-hidden bg-white flex flex-col h-full flex-1">
                <h3 className="text-xl font-serif text-[#0F172A] mb-8 border-b border-slate-100 pb-4 flex items-center justify-between">
                  Como Funciona
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></div>
                  </div>
                </h3>

                <div className="relative mb-10">
                  {/* Timeline Line */}
                  <div className="absolute left-5 top-2 bottom-2 w-px bg-slate-100"></div>

                  <div className="space-y-8">
                    {[
                      { step: '01', title: 'Relatar Caso', desc: 'Descreva sua situação de forma detalhada e anônima, anexando provas que fundamente seus argumentos.', icon: <MessageSquare className="w-3 h-3" /> },
                      { step: '02', title: 'Escritórios de Advocacia Analisam', desc: 'Especialistas avaliam seu relato e demonstram interesse.', icon: <Search className="w-3 h-3" /> },
                      { step: '03', title: 'Você Escolhe', desc: 'Escolha o profissional que mais lhe sentir confortável.', icon: <CheckCircle className="w-3 h-3" /> },
                      { step: '04', title: 'Inicie sua Ação', desc: 'Após escolher o profissional inicie sua ação de forma segura.', icon: <Shield className="w-3 h-3" /> },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start space-x-4 relative z-10 group">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:border-[#C5A059] transition-all duration-500">
                          <span className="text-xs font-black text-[#C5A059]">{item.step}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0F172A] text-sm uppercase tracking-wider mb-1">{item.title}</h4>
                          <p className="text-slate-400 text-xs leading-relaxed font-light">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Action Button */}
                  <div className="mt-8 pl-16 relative z-10">
                    <button
                      onClick={onStart}
                      className="bg-[#0F172A] text-white px-8 py-4 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-[#1E293B] transition shadow-lg flex items-center group"
                    >
                      CADASTRE SEU CASO
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* HORIZONTAL STATS - ABAIXO DO TERCEIRO ITEM */}
                <div className="pt-8 border-t border-slate-100">
                  <div className="grid grid-cols-4 gap-2">
                    {stats.map((s, i) => (
                      <div key={i} className="text-center group">
                        <p className="text-sm lg:text-base font-serif text-[#0F172A] mb-0.5 tracking-tighter group-hover:text-[#C5A059] transition-colors">
                          {s.value}
                        </p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter leading-none">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Vitórias que Inspiram Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-serif text-[#0F172A] mb-12 text-center">Vitórias que inspiram..</h2>
          <div className="relative max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl bg-[#0F172A] group border border-slate-100">
            {/* Carousel Content */}
            {SUCCESS_STORIES.map((video, index) => (
              <div
                key={video.id}
                className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${index === currentVideoIndex ? 'opacity-100' : 'opacity-0'} ${index === currentVideoIndex ? 'pointer-events-auto' : 'pointer-events-none'}`}
              >
                {/* Background with overlay */}
                <div className={`absolute inset-0 ${video.color} opacity-40 mix-blend-multiply`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-90"></div>

                {/* Content */}
                <div className="relative z-20 flex flex-col items-center justify-center text-center p-8">
                  <div
                    onClick={() => onViewStory(video.id)}
                    className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-8 cursor-pointer hover:scale-110 transition-transform border border-white/20 shadow-xl group/btn"
                  >
                    <Play className="w-8 h-8 text-white fill-current translate-x-0.5 group-hover/btn:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-white text-3xl md:text-4xl font-serif mb-4 drop-shadow-md">{video.title}</h3>
                  <p className="text-[#C5A059] text-lg font-bold uppercase tracking-widest">{video.duration}</p>
                  <button
                    onClick={() => onViewStory(video.id)}
                    className="mt-6 text-white/70 hover:text-white text-sm uppercase tracking-widest border-b border-white/30 hover:border-white transition-colors pb-1"
                  >
                    Ver Detalhes do Caso
                  </button>
                </div>
              </div>
            ))}

            {/* Indicators */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-30">
              {SUCCESS_STORIES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentVideoIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentVideoIndex ? 'w-12 bg-[#C5A059]' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Areas Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-[#0F172A] mb-4">Áreas de Atuação</h2>
            <p className="text-slate-400 font-light">Cards com especialidades jurídicas prontas para te atender.</p>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {LEGAL_AREAS.map((area) => (
              <div key={area.id} className="group p-10 bg-white border border-slate-100 hover:border-[#C5A059] transition-all duration-300 shadow-sm hover:shadow-xl rounded-sm text-center">
                <div className="text-[#0F172A] group-hover:text-[#C5A059] transition-colors mb-6 flex justify-center transform group-hover:-translate-y-1">
                  {React.cloneElement(area.icon as React.ReactElement, { size: 32, strokeWidth: 1.5 })}
                </div>
                <h4 className="font-bold text-[#0F172A] text-xs uppercase tracking-widest">{area.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Clients Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-[#0F172A] mb-8 leading-tight">
              Para <span className="text-[#C5A059]">Clientes</span>
            </h2>
            <p className="text-slate-500 text-xl max-w-5xl mx-auto font-light">
              Encontre a solução jurídica para seus problemas sem precisar sair de casa e sem custos iniciais.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-stretch">
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { t: 'Totalmente Gratuito', d: 'Você não paga nada para relatar seu caso na plataforma.' },
                { t: 'Segurança de Dados', d: 'Seu anonimato é garantido até que você aceite uma proposta.' },
                { t: 'Advogados Verificados', d: 'Todos os profissionais passam por rigorosa checagem da OAB.' },
                { t: 'Agilidade', d: 'Receba retornos em menos de 24 horas para casos urgentes.' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col space-y-5 bg-white p-8 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#C5A059]/10 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-[#C5A059]" />
                  </div>
                  <h4 className="font-bold text-[#0F172A] text-base uppercase tracking-wider">{item.t}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-light">{item.d}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#0F172A] p-16 rounded-lg text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 transition-transform duration-700 group-hover:scale-110">
                <Shield className="w-64 h-64" />
              </div>
              <h4 className="text-2xl font-serif mb-8 relative z-10">Benefícios de usar o Quero Processar</h4>
              <ul className="space-y-6 relative z-10">
                {['Acesso a advogados de todo o país', 'Chat integrado em tempo real', 'Suporte especializado', 'Gestão simples de casos'].map((l, i) => (
                  <li key={i} className="flex items-center space-x-4">
                    <div className="w-2 h-2 rounded-full bg-[#C5A059]"></div>
                    <span className="text-slate-300 font-light">{l}</span>
                  </li>
                ))}
              </ul>
              <button onClick={onStart} className="mt-12 w-full bg-[#C5A059] text-white py-4 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-[#B38E46] transition">Quero Relatar um Caso</button>
            </div>
          </div>
        </div>
      </section>

      {/* For Lawyers Section */}
      <section className="py-24 md:py-32 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-[#0F172A] mb-6">Para <span className="text-[#C5A059]">Advogados</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-light text-lg">
              Aumente sua carteira de clientes com leads qualificados e validados.
            </p>
          </div>

          {/* Moved Recent Cases Section */}
          <div className="mb-20">
            <div className="relative group/leads">
              <div className="grid md:grid-cols-3 gap-8 transition-all duration-500">
                {leadsGroups[recentCasesIndex].map((rc, i) => (
                  <div key={i} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group/card animate-in fade-in slide-in-from-right-4">
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded uppercase tracking-wider">{rc.area}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-3 group-hover/card:text-[#C5A059] transition">{rc.title}</h4>
                    <div className="space-y-3 mb-6">
                      <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden relative">
                        <div className="absolute inset-0 bg-slate-200/50 backdrop-blur-[2px]"></div>
                      </div>
                      <div className="h-2 w-2/3 bg-slate-50 rounded-full overflow-hidden relative">
                        <div className="absolute inset-0 bg-slate-200/50 backdrop-blur-[2px]"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {rc.city}</span>
                      <span className="flex items-center text-[#C5A059]"><Lock className="w-3 h-3 mr-1" /> Dados Ocultos</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Controls */}
              <div className="flex justify-center mt-8 space-x-3">
                {leadsGroups.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setRecentCasesIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${recentCasesIndex === idx ? 'w-12 bg-[#C5A059]' : 'w-2 bg-slate-200 hover:bg-slate-300'}`}
                    aria-label={`Página ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-20">
            {[
              { t: 'Leads Qualificados', d: 'Tenha acesso a relatos detalhados e já analisados por nossa equipe.', icon: <CheckCircle className="w-8 h-8" /> },
              { t: 'Baixo Investimento', d: 'Pague apenas pelos contatos que realmente interessam ao seu escritório.', icon: <Zap className="w-8 h-8" /> },
              { t: 'Gestão de Atendimento', d: 'Organize suas conversas e documentos em um só lugar.', icon: <MessageSquare className="w-8 h-8" /> }
            ].map((item, i) => (
              <div key={i} className="glass-card p-10 rounded-xl text-center border border-white hover:border-[#C5A059] transition duration-500 shadow-sm">
                <div className="text-[#C5A059] mb-6 flex justify-center">
                  {item.icon}
                </div>
                <h4 className="text-lg font-bold text-[#0F172A] mb-4 uppercase tracking-wider">{item.t}</h4>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-200 p-12 rounded-lg flex flex-col items-center text-center gap-10 shadow-sm">
            <div className="w-full max-w-none">
              <h3 className="text-2xl font-serif text-[#0F172A] mb-4">Vantagens de se cadastrar</h3>
              <p className="text-slate-500 font-light text-center">Tenha em mãos as melhores oportunidades jurídicas, filtradas por área de atuação e urgência, prontas para o seu atendimento.</p>
            </div>
            <button onClick={onStart} className="bg-[#0F172A] text-white px-10 py-5 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-[#1E293B] transition shadow-lg">Cadastrar Escritório</button>
          </div>
        </div>
      </section>



      {/* Testimonials */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-serif text-[#0F172A] text-center mb-16">Depoimentos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Maria Silva', role: 'Cliente', text: 'Encontrei um advogado especialista em menos de 24 horas. O processo foi transparente e o resultado excelente.' },
              { name: 'Dr. João Santos', role: 'Advogado', text: 'A plataforma mudou a forma como captamos clientes. Leads qualificados que realmente precisam de ajuda.' },
              { name: 'Ana Costa', role: 'Cliente', text: 'Excelente serviço! O advogado que me atendeu foi muito atencioso e conseguiu um acordo muito melhor do que eu esperava.' },
            ].map((t, idx) => (
              <div key={idx} className="bg-white p-10 rounded-xl border border-slate-100 shadow-sm relative group hover:shadow-md transition">
                <div className="flex text-[#C5A059] mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-500 font-light italic mb-8 leading-relaxed">"{t.text}"</p>
                <div>
                  <h5 className="font-bold text-[#0F172A] text-sm uppercase tracking-wider">{t.name}</h5>
                  <span className="text-[10px] text-[#C5A059] uppercase font-bold tracking-widest">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <HelpCircle className="w-10 h-10 text-[#C5A059] mx-auto mb-4" />
            <h2 className="text-3xl font-serif text-[#0F172A]">Perguntas Frequentes</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-sm">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-slate-50 transition"
                >
                  <span className="font-bold text-[#0F172A] text-sm uppercase tracking-wider">{f.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#C5A059] transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed border-t border-slate-50 pt-4 font-light animate-in fade-in slide-in-from-top-2">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-[#0F172A] py-12 px-8 rounded-lg text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
            <h2 className="text-4xl font-serif text-white mb-6 relative z-10 leading-tight">Pronto para resolver seu problema?</h2>
            <p className="text-slate-400 mb-8 text-sm relative z-10 w-full max-w-none font-light">
              Junte-se a milhares de pessoas que já encontraram o profissional certo através de nossa rede exclusiva.
            </p>
            <button onClick={onStart} className="bg-[#C5A059] text-white px-10 py-4 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-[#B38E46] transition shadow-2xl relative z-10">
              CADASTRAR MEU CASO AGORA
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
