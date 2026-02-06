import React from 'react';
import { ArrowLeft, Target, Eye, Heart, ShieldCheck, Users, Briefcase } from 'lucide-react';

interface PropostaPageProps {
    onBack: () => void;
}

const PropostaPage: React.FC<PropostaPageProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-[#FCFCFD]">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="group flex items-center text-slate-500 hover:text-[#0F172A] transition-colors mb-12 font-medium"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Voltar para Home
                </button>

                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-serif text-[#0F172A] mb-8 text-center">Nossa Proposta</h1>
                    <p className="text-xl text-slate-600 leading-relaxed text-center mb-16 font-light">
                        Transformando o acesso à justiça através da tecnologia e da transparência,
                        conectando propósitos e garantindo direitos.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-[#0F172A] rounded-lg flex items-center justify-center mb-6">
                                <Users className="w-6 h-6 text-[#C5A059]" />
                            </div>
                            <h3 className="text-2xl font-serif text-[#0F172A] mb-4">Empoderamento do Cidadão</h3>
                            <p className="text-slate-600 leading-relaxed font-light">
                                Levar o conhecimento dos direitos fundamentais a cada cidadão,
                                democratizando a informação jurídica e tornando-a acessível, clara e objetiva.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-[#0F172A] rounded-lg flex items-center justify-center mb-6">
                                <Briefcase className="w-6 h-6 text-[#C5A059]" />
                            </div>
                            <h3 className="text-2xl font-serif text-[#0F172A] mb-4">Conexão de Negócios</h3>
                            <p className="text-slate-600 leading-relaxed font-light">
                                Facilitar o encontro entre pessoas ou empresas que necessitam de suporte jurídico
                                especializado e advogados prontos para firmar negócios sólidos e seguros.
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#0F172A] rounded-3xl p-12 text-white mb-20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl text-right"></div>

                        <div className="relative z-10 grid md:grid-cols-3 gap-12">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6">
                                    <Target className="w-8 h-8 text-[#C5A059]" />
                                </div>
                                <h4 className="text-xl font-serif mb-4">Missão</h4>
                                <p className="text-slate-400 text-sm leading-relaxed font-light">
                                    Promover a justiça através da inovação, simplificando o processo de encontrar
                                    suporte jurídico de alta qualidade para todos.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6">
                                    <Eye className="w-8 h-8 text-[#C5A059]" />
                                </div>
                                <h4 className="text-xl font-serif mb-4">Visão</h4>
                                <p className="text-slate-400 text-sm leading-relaxed font-light">
                                    Tornar-se a plataforma líder na conexão jurídica brasileira,
                                    sendo referência em segurança, eficiência e impacto social.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6">
                                    <Heart className="w-8 h-8 text-[#C5A059]" />
                                </div>
                                <h4 className="text-xl font-serif mb-4">Valores</h4>
                                <p className="text-slate-400 text-sm leading-relaxed font-light">
                                    Ética inegociável, transparência total, foco no impacto para o cliente
                                    e excelência em cada conexão realizada.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="inline-flex items-center space-x-2 text-[#C5A059] font-bold uppercase tracking-widest text-xs mb-4">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Qualidade Garantida</span>
                        </div>
                        <h2 className="text-3xl font-serif text-[#0F172A] mb-6">Compromisso com a Excelência</h2>
                        <p className="text-slate-600 text-lg leading-relaxed font-light max-w-2xl mx-auto">
                            Nossa plataforma é fruto do trabalho de especialistas que acreditam que o Direito
                            deve ser uma ferramenta de progresso e não um obstáculo. Estamos aqui para
                            mudar essa realidade.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropostaPage;
