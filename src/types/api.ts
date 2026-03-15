/**
 * Types TypeScript pour les réponses API
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export interface PaginationMeta {
  total: number;
  limit: number;
  offset: number;
  pages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationMeta;
}

// Auth Types
export interface User {
  _id: string;
  name: string;
  email: string;
  role?: 'user' | 'admin';
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse extends ApiResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface RefreshTokenResponse extends ApiResponse {
  token: string;
  refreshToken: string;
}

// Formation Types
export interface Formation {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  duration: string;
  instructor: string;
  price: number | string;
  seats: number;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FormationsResponse extends PaginatedResponse<Formation> {
  formations: Formation[];
}

// Enrollment Types
export interface Enrollment {
  _id: string;
  user: string;
  userName: string;
  userEmail: string;
  formation: string;
  formationTitle: string;
  formationDate: string;
  formationLocation: string;
  formationDuration: string;
  formationInstructor: string;
  formationPrice: number | string;
  formationSeats: number;
  formationLevel: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EnrollmentResponse extends ApiResponse {
  enrollment: Enrollment;
}

// Telecom Opinion Types
export interface TelecomOpinion {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TelecomOpinionResponse extends ApiResponse {
  data: TelecomOpinion;
}

// Error Types
export interface ApiError {
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
  stack?: string;
}

// Invoice Types
export interface InvoiceItem {
  formationId: string;
  title: string;
  price: number;
  quantity: number;
}

export interface ClientInfo {
  name: string;
  email: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
}

export interface Invoice {
  _id: string;
  invoiceNumber: string;
  user: string | User;
  status: 'pending' | 'paid' | 'cancelled' | 'refunded';
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  clientInfo: ClientInfo;
  paymentMethod?: 'cash' | 'bank_transfer' | 'mobile_money' | 'card' | 'other';
  paymentDate?: string;
  paymentReference?: string;
  notes?: string;
  dueDate?: string;
  paidAt?: string;
  cancelledAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InvoiceResponse extends ApiResponse {
  invoice: Invoice;
}

export interface InvoicesResponse extends ApiResponse {
  invoices: Invoice[];
  pagination?: PaginationMeta;
}

export interface CreateInvoiceRequest {
  items: Array<{
    formationId?: string;
    _id?: string;
    title: string;
    price: number | string;
    quantity?: number;
  }>;
  clientInfo: ClientInfo;
  paymentMethod?: 'cash' | 'bank_transfer' | 'mobile_money' | 'card' | 'other';
  tax?: number;
  discount?: number;
  notes?: string;
}

// Testimonial Types
export interface Testimonial {
  _id: string;
  clientName: string;
  clientRole?: string;
  clientCompany?: string;
  clientAvatar?: string;
  content: string;
  rating: number;
  service: 'formation' | 'service' | 'support' | 'projet' | 'autre';
  isApproved: boolean;
  isFeatured: boolean;
  projectId?: string;
  formationId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TestimonialsResponse extends ApiResponse {
  testimonials: Testimonial[];
  pagination?: PaginationMeta;
}

// Statistic Types
export interface Statistic {
  _id: string;
  label: string;
  value: number;
  unit?: string;
  icon?: string;
  category: 'clients' | 'projets' | 'formations' | 'certifications' | 'experience' | 'autre';
  description?: string;
  isActive: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface StatisticsResponse extends ApiResponse {
  statistics: Statistic[];
}

// Company Types
export interface CompanyValue {
  title: string;
  description: string;
}

export interface CompanyAddress {
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

export interface CompanyContact {
  email?: string;
  phone?: string;
  whatsapp?: string;
  website?: string;
}

export interface CompanySocialMedia {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
}

export interface CompanyCertification {
  name: string;
  issuer: string;
  year: number;
}

export interface CompanyPartner {
  name: string;
  logo?: string;
  website?: string;
}

export interface Company {
  _id: string;
  name: string;
  tagline: string;
  description?: string;
  mission?: string;
  vision?: string;
  values?: CompanyValue[];
  address?: CompanyAddress;
  contact?: CompanyContact;
  socialMedia?: CompanySocialMedia;
  logo?: string;
  foundedYear?: number;
  teamSize?: number;
  certifications?: CompanyCertification[];
  partners?: CompanyPartner[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CompanyResponse extends ApiResponse {
  company: Company;
}

// Payment Types
export type MobileMoneyProvider = 'mpesa' | 'orange_money' | 'airtel_money' | 'africell_money';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'expired';

export interface Payment {
  _id: string;
  transactionReference: string;
  provider: MobileMoneyProvider;
  providerDisplayName: string;
  phoneNumber: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentInstructions: string;
  providerTransactionId?: string;
  confirmedAt?: string;
  expiresAt?: string;
  invoice?: {
    invoiceNumber: string;
    total: number;
    status: string;
  };
  createdAt?: string;
}

export interface InitiatePaymentRequest {
  invoiceId: string;
  provider: MobileMoneyProvider;
  phoneNumber: string;
}

export interface ConfirmPaymentRequest {
  providerTransactionId: string;
}

export interface PaymentResponse extends ApiResponse {
  payment: Payment;
}

export interface PaymentsResponse extends ApiResponse {
  payments: Payment[];
  pagination?: PaginationMeta;
}

// Health Check Types
export interface HealthCheckResponse {
  status: 'ok' | 'degraded';
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
  checks: {
    database: {
      status: 'connected' | 'disconnected' | 'unknown';
      responseTime?: string;
      host?: string;
      name?: string;
      error?: string;
    };
    memory: {
      used: number;
      total: number;
      unit: string;
    };
  };
}
