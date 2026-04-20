import { apiClient } from './axios-instance';

export interface CreateContactMessagePayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactMessage extends CreateContactMessagePayload {
  id: number;
  createdAt: string;
}

export async function submitContactMessage(payload: CreateContactMessagePayload): Promise<ContactMessage> {
  const { data } = await apiClient.post<ContactMessage>('/contact-messages', payload);
  return data;
}
