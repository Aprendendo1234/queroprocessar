import React from 'react';
import { ArrowLeft, Play, FileText, Video } from 'lucide-react';
import { SuccessStory } from '../types';

interface CaseSuccessPageProps {
    story: SuccessStory;
    onBack: () => void;
}

const CaseSuccessPage: React.FC<CaseSuccessPageProps> = ({ story, onBack }) => {
    return (
        <div className="min-h-screen bg-[#FCFCFD]">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="group flex items-center text-slate-500 hover:text-[#0F172A] transition-colors mb-8 font-medium"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Voltar para Home
                </button>

                <h1 className="text-3xl md:text-5xl font-serif text-[#0F172A] mb-8">{story.title}</h1>

                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Main Content - Left: Video */}
                    <div>
                        <div className={`relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-slate-900 group`}>
                            {/* Video Placeholder using colors from data */}
                            <div className={`absolute inset-0 ${story.color} opacity-20`}></div>

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform border border-white/20 shadow-xl group-hover:bg-white/20">
                                    <Play className="w-8 h-8 text-white fill-current translate-x-0.5" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Video Summary */}
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center space-x-2 mb-4 text-[#C5A059] font-bold uppercase tracking-widest text-xs">
                            <Video className="w-4 h-4" />
                            <span>Sobre o Caso</span>
                        </div>
                        <h2 className="text-2xl font-serif text-[#0F172A] mb-6">Sumário do Vídeo</h2>
                        <p className="text-slate-600 text-lg leading-relaxed font-light mb-8">
                            {story.summary}
                        </p>
                        <div className="p-6 bg-white border border-slate-100 rounded-xl shadow-sm">
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Resultado</span>
                            <p className="font-serif text-[#0F172A] text-xl">{story.duration}</p>
                        </div>
                    </div>
                </div>

                {/* Bottom: Process Summary */}
                <div className="bg-white p-8 md:p-12 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center space-x-2 mb-6 text-[#C5A059] font-bold uppercase tracking-widest text-xs">
                        <FileText className="w-4 h-4" />
                        <span>Detalhes Jurídicos</span>
                    </div>
                    <h2 className="text-2xl font-serif text-[#0F172A] mb-6">Resumo do Processo</h2>
                    <div className="prose prose-slate max-w-none">
                        <p className="text-slate-600 leading-relaxed font-light text-lg">
                            {story.processDetails}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaseSuccessPage;
