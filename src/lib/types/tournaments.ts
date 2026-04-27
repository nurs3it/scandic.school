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
