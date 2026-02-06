
import React from 'react';
import {
  Scale,
  Briefcase,
  Heart,
  Car,
  ShieldCheck,
  Users,
  Home,
  FileText,
  Gavel,
  Landmark,
  Cpu,
  Stethoscope,
  Leaf,
  Award,
  Globe
} from 'lucide-react';

export const LEGAL_AREAS = [
  { id: 'trabalhista', name: 'Direito Trabalhista', icon: <Briefcase className="w-6 h-6" /> },
  { id: 'transito', name: 'Direito do Trânsito', icon: <Car className="w-6 h-6" /> },
  { id: 'civil', name: 'Direito Civil', icon: <Scale className="w-6 h-6" /> },
  { id: 'imobiliario', name: 'Direito Imobiliário', icon: <Home className="w-6 h-6" /> },
  { id: 'familia', name: 'Direito de Família', icon: <Heart className="w-6 h-6" /> },
  { id: 'criminal', name: 'Direito Criminal', icon: <ShieldCheck className="w-6 h-6" /> },
  { id: 'previdenciario', name: 'Direito Previdenciário', icon: <Users className="w-6 h-6" /> },
  { id: 'consumidor', name: 'Direito do Consumidor', icon: <Briefcase className="w-6 h-6" /> },
  { id: 'tributario', name: 'Direito Tributário', icon: <FileText className="w-6 h-6" /> },
  { id: 'empresarial', name: 'Direito Empresarial', icon: <Briefcase className="w-6 h-6" /> },
  { id: 'bancario', name: 'Direito Bancário', icon: <Landmark className="w-6 h-6" /> },
  { id: 'digital', name: 'Direito Digital', icon: <Cpu className="w-6 h-6" /> },
  { id: 'medico', name: 'Direito Médico', icon: <Stethoscope className="w-6 h-6" /> },
  { id: 'eleitoral', name: 'Direito Eleitoral', icon: <Gavel className="w-6 h-6" /> },
  { id: 'ambiental', name: 'Direito Ambiental', icon: <Leaf className="w-6 h-6" /> },
  { id: 'intelectual', name: 'Propriedade Intelectual', icon: <Award className="w-6 h-6" /> },
];

export const STATES_BR = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export const MOCK_USERS = {
  CLIENT: {
    id: 'u1',
    role: 'cliente' as any,
    name: 'Maria Silva',
    email: 'cliente@teste.com',
    phone: '(11) 98888-7777',
    cpfCnpj: '123.456.789-00',
    active: true,
    status: 'approved',
    createdAt: '2024-01-01'
  },
  LAWYER: {
    id: 'l1',
    role: 'advogado' as any,
    name: 'Dr. João Santos',
    email: 'advogado@teste.com',
    phone: '(11) 97777-6666',
    cpfCnpj: '987.654.321-00',
    oab: '123456',
    ufOab: 'SP',
    specialties: ['Trabalhista', 'Civil'],
    active: true,
    status: 'approved',
    createdAt: '2024-01-01'
  },
  ADMIN: {
    id: 'a1',
    role: 'admin' as any,
    name: 'Administrador Sistema',
    email: 'admin@queroprocessar.com',
    phone: '(11) 90000-0000',
    cpfCnpj: '00.000.000/0001-00',
    active: true,
    status: 'approved',
    createdAt: '2024-01-01'
  }
};

export const SUCCESS_STORIES = [
  {
    id: 1,
    title: "Indenização Aérea: R$ 8.000,00",
    color: "bg-blue-600",
    duration: "Caso resolvido em 15 dias",
    summary: "Neste vídeo, explicamos como um cancelamento de voo injustificado resultou em uma indenização significativa para o passageiro, sem a necessidade de audiências presenciais.",
    processDetails: "O processo foi iniciado com um pedido de liminar para reacomodação, seguido de uma ação de danos morais. A companhia aérea propôs acordo após a citação, reconhecendo a falha na prestação do serviço. O valor foi pago em 15 dias úteis."
  },
  {
    id: 2,
    title: "Revisão de Juros Abusivos",
    color: "bg-emerald-600",
    duration: "Economia de R$ 12.400,00",
    summary: "Veja como a análise detalhada de um contrato de financiamento de veículo revelou taxas ilegais e juros acima da média de mercado.",
    processDetails: "Foi ajuizada uma ação revisional de contrato. A perícia contábil demonstrou a capitalização de juros (anatocismo) não pactuada. O banco foi condenado a restituir os valores cobrados a maior e a readequar as parcelas, gerando uma economia total de mais de 12 mil reais."
  },
  {
    id: 3,
    title: "Divórcio Consensual Online",
    color: "bg-purple-600",
    duration: "Finalizado em 48 horas",
    summary: "Entenda a facilidade e a rapidez do divórcio extrajudicial quando há consenso entre as partes e não existem filhos menores.",
    processDetails: "O procedimento foi realizado inteiramente via cartório digital. As partes, assistidas por advogado, assinaram a escritura pública digitalmente via certificado e-Notariado. Todo o trâmite, desde a protocolização até a emissão da certidão de divórcio, levou apenas 2 dias úteis."
  }
];
