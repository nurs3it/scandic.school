export type PaymentMethod = 'NONE' | 'KASPI_PHONE' | 'KASPI_QR' | 'BOTH';

export interface TournamentStage {
  title: string;
  date: string;
  description?: string;
}

export interface TournamentClubBrief {
  id: number;
  name: string;
  slug: string;
}

export interface TournamentWinner {
  place: number;
  category?: string;
  name: string;
  club?: string;
  note?: string;
  photoUrl?: string;
}

export interface TournamentGalleryItem {
  url: string;
  caption?: string;
}

export interface Tournament {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  bannerUrl: string;
  ageGroup: string | null;
  startDate: string;
  endDate: string;
  registrationDeadline: string | null;
  location: string | null;
  stages: TournamentStage[];
  isFree: boolean;
  price: number;
  paymentMethod: PaymentMethod;
  kaspiPhone: string | null;
  kaspiQrUrl: string | null;
  isActive: boolean;
  isRegistrationOpen: boolean;
  order: number;
  clubId: number | null;
  club?: TournamentClubBrief | null;
  recapSummary: string | null;
  winners: TournamentWinner[];
  gallery: TournamentGalleryItem[];
  createdAt: string;
  updatedAt: string;
}

export interface TournamentsListResponse {
  items: Tournament[];
  total: number;
  page: number;
  pageSize: number;
}

export type TournamentStatusFilter = 'all' | 'upcoming' | 'ongoing' | 'past';

export interface TournamentsFilter {
  status?: TournamentStatusFilter;
  clubId?: number;
  ageGroup?: string;
  page?: number;
  pageSize?: number;
}

export type RegistrationStatus =
  | 'NEW'
  | 'PAID'
  | 'CONFIRMED'
  | 'REJECTED'
  | 'CANCELLED';

export interface TournamentParticipant {
  id: number;
  participantName: string;
  phone: string;
  email: string | null;
  fideId: string | null;
  birthDate: string | null;
  comment: string | null;
  status: RegistrationStatus;
  createdAt: string;
}

export interface TournamentParticipantsResponse {
  items: TournamentParticipant[];
  total: number;
  page: number;
  pageSize: number;
}
