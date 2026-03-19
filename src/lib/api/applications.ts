import { apiClient } from './axios-instance';

export interface CreateApplicationPayload {
  parentName: string;
  grade: '1' | '2' | '3' | '4';
  language: 'kazakh' | 'russian';
  parentPhone: string;
}

export interface Application extends CreateApplicationPayload {
  id: number;
  createdAt: string;
}

export async function submitApplication(payload: CreateApplicationPayload): Promise<Application> {
  const { data } = await apiClient.post<Application>('/applications', payload);
  return data;
}

export async function getApplications(): Promise<Application[]> {
  const { data } = await apiClient.get<Application[]>('/applications');
  return data;
}
