import axios from 'axios';
import type { Club } from './types/clubs';

const API_BASE = process.env.NESTJS_API_URL || 'https://scandic-school-api.onrender.com';

export async function fetchClubs(opts: { withTournaments?: boolean } = {}): Promise<Club[]> {
  const params = opts.withTournaments ? { withTournaments: 1 } : undefined;
  const { data } = await axios.get<Club[]>(`${API_BASE}/clubs`, { params });
  return data;
}

export async function fetchClubBySlug(slug: string): Promise<Club> {
  const { data } = await axios.get<Club>(`${API_BASE}/clubs/${slug}`);
  return data;
}
