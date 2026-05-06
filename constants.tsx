
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
    id: 4,
    title: "Institucional: Como funciona o QueroProcessar",
    color: "bg-amber-600",
    coverImage: "/THUMB000.png",
    duration: "Vídeo Comercial",
    summary: "Aprenda como relatar o seu caso e encontrar o advogado ideal para sua situação. Rápido, seguro e 100% gratuito para quem relata.",
    processDetails: "O vídeo explora o funcionamento da nossa plataforma, destacando as áreas de atuação (como Indenização Aérea, Revisão de Juros Abusivos, Divórcio Consensual, entre outras) e o passo a passo para conectar clientes a especialistas jurídicos."
  },
  {
    id: 5,
    title: "Sujaram seu nome? Nem conhece a empresa? Você pode ser indenizado!",
    color: "bg-teal-600",
    coverImage: "/negativacao.png",
    duration: "Respostas liminares em curto espaço de tempo.",
    summary: "Indenização por Negativação Indevida.",
    processDetails: "Saiba que as empresas tem obrigação por lei de serem transparentes com relação a qualquer dívida ou pendência envolvendo o consumidor! Toda dívida contraída de fato deve estar amparada em uma contratação validade e idônea com prova inequívoca de consentimento do contratante o que nem sempre ocorre."
  },
  {
    id: 6,
    title: "Foi multado no Bafômetro?!",
    color: "bg-red-600",
    coverImage: "/bafometro.png",
    duration: "Recurso Administrativo ou Judicial",
    summary: "Enquanto sua infração está em sede de Recurso seja Administrativo ou Judicial não paga a multa e não suspende o direito de dirigir.",
    processDetails: "No mínimo prorrogue o pagamento da sua infração e seu direito de dirigir contestando possíveis irregularidades na autuação da infração."
  },
  {
    id: 8,
    title: "Foi demitida ou até mesmo pediu as contas já grávida?",
    color: "bg-pink-600",
    coverImage: "/estabilidade.png",
    duration: "Respostas liminares na média em 30 dias.",
    summary: "Saiba que a grávida possui direito a estabilidade até 05 meses após o parto do filho.",
    processDetails: "Foi demitida ou até mesmo pediu demissão já grávida?! Saiba que pode ter  sua estabilidade gestacional reconhecida com todos os seus direitos trabalhistas até  05 meses após o parto."
  },
  {
    id: 7,
    title: "Bpc/Loas saiba se você tem direito!",
    color: "bg-blue-500",
    coverImage: "/bpc.png",
    duration: "Processos Administrativos em torno de 06 meses judiciais variáveis de acordo com o órgão julgador.",
    summary: "Uma quase aposentadoria sem contribuição.",
    processDetails: "Saiba quais são os requisitos para a concessão do benefício de prestação continuada mais famoso da seguridade social."
  },
  {
    id: 1,
    title: "Indenização Aérea: R$ 8.000,00",
    color: "bg-blue-600",
    duration: "Caso resolvido em 15 dias",
    coverImage: "/capa-nova.png",
    summary: "Neste vídeo, explicamos como um cancelamento de voo injustificado resultou em uma indenização significativa para o passageiro, sem a necessidade de audiências presenciais.",
    processDetails: "O processo foi iniciado com um pedido de liminar para reacomodação, seguido de uma ação de danos morais. A companhia aérea propôs acordo após a citação, reconhecendo a falha na prestação do serviço. O valor foi pago em 15 dias úteis."
  },
  {
    id: 2,
    title: "Revisão de Juros Abusivos",
    color: "bg-emerald-600",
    coverImage: "/thumb-juros.png",
    duration: "Economia de R$ 12.400,00",
    summary: "Veja como a análise detalhada de um contrato de financiamento de veículo revelou taxas ilegais e juros acima da média de mercado.",
    processDetails: "Foi ajuizada uma ação revisional de contrato. A perícia contábil demonstrou a capitalização de juros (anatocismo) não pactuada. O banco foi condenado a restituir os valores cobrados a maior e a readequar as parcelas, gerando uma economia total de mais de 12 mil reais."
  },
  {
    id: 3,
    title: "Divórcio Consensual Online",
    color: "bg-purple-600",
    coverImage: "/thumb-divorcio.png",
    duration: "Finalizado em 48 horas",
    summary: "Entenda a facilidade e a rapidez do divórcio extrajudicial quando há consenso entre as partes e não existem filhos menores.",
    processDetails: "O procedimento foi realizado inteiramente via cartório digital. As partes, assistidas por advogado, assinaram a escritura pública digitalmente via certificado e-Notariado. Todo o trâmite, desde a protocolização até a emissão da certidão de divórcio, levou apenas 2 dias úteis."
  }
];
