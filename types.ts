
export enum UserRole {
  CLIENT = 'cliente',
  LAWYER = 'advogado',
  ADMIN = 'admin'
}

export enum CaseStatus {
  PENDING = 'pendente',
  APPROVED = 'aprovado',
  REJECTED = 'recusado',
  ARCHIVED = 'arquivado'
}

export enum UrgencyLevel {
  LOW = 'Baixa',
  MEDIUM = 'Média',
  HIGH = 'Alta'
}

export enum PublicationType {
  PUBLIC = 'publico',
  PRIVATE = 'privado'
}

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  cpfCnpj: string;
  password?: string;
  oab?: string;
  ufOab?: string;
  specialties?: string[];
  isVerified?: boolean; // Sugestão: Selo de confiança
  city?: string;
  active: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface LegalCase {
  id: string;
  userId: string;
  clientName: string;
  title: string;
  legalArea: string;
  description: string;
  urgency: UrgencyLevel;
  city: string;
  state: string;
  publicationType: PublicationType;
  status: CaseStatus;
  unlockPrice?: number;
  rejectionReason?: string;
  views: number;
  unlockedByIds: string[];
  createdAt: string;
  attachments?: string[];
}

export interface ChatMessage {
  id: string;
  caseId: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface SuccessStory {
  id: number;
  title: string;
  videoUrl?: string;
  color: string;
  duration: string;
  summary: string;
  processDetails: string;
}
