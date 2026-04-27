import axios from 'axios';
import type {
  Tournament,
  TournamentsListResponse,
  TournamentsFilter,
} from './types/tournaments';

const API_BASE = process.env.NESTJS_API_URL || 'https://scandic-school-api.onrender.com';
// На клиенте process.env.NESTJS_API_URL недоступен — используем rewrite proxy /_api/*
const CLIENT_API_BASE = '/_api';

export async function fetchTournaments(
  filter: TournamentsFilter = {},
): Promise<TournamentsListResponse> {
  const { data } = await axios.get<TournamentsListResponse>(`${API_BASE}/tournaments`, {
    params: filter,
  });
  return data;
}

export async function fetchTournamentBySlug(slug: string): Promise<Tournament> {
  const { data } = await axios.get<Tournament>(`${API_BASE}/tournaments/${slug}`);
  return data;
}

export async function fetchTournamentAgeGroups(): Promise<string[]> {
  const { data } = await axios.get<string[]>(`${API_BASE}/tournaments/age-groups`);
  return data;
}

export async function submitTournamentRegistration(
  slug: string,
  formData: FormData,
): Promise<{ id: number; status: string }> {
  const { data } = await axios.post<{ id: number; status: string }>(
    `${CLIENT_API_BASE}/tournaments/${slug}/register`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return data;
}
