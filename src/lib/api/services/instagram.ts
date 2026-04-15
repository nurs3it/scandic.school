import { apiClient } from '../client';
import { ApiError } from '../types';

export interface InstagramPost {
  id: number;
  url: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInstagramPostRequest {
  url: string;
  isActive?: boolean;
}

export interface UpdateInstagramPostRequest {
  url?: string;
  order?: number;
  isActive?: boolean;
}

const isClient = typeof window !== 'undefined';

async function proxyFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(path, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  if (!response.ok) {
    throw new ApiError(`HTTP ${response.status}`, response.status);
  }
  if (response.status === 204) return {} as T;
  return response.json();
}

export class InstagramService {
  async getAll(): Promise<InstagramPost[]> {
    if (isClient) {
      return proxyFetch<InstagramPost[]>('/api/instagram-posts');
    }
    return apiClient.get<InstagramPost[]>('/instagram-posts');
  }

  async create(data: CreateInstagramPostRequest): Promise<InstagramPost> {
    if (isClient) {
      return proxyFetch<InstagramPost>('/api/instagram-posts', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    }
    return apiClient.post<InstagramPost>('/instagram-posts', data);
  }

  async update(id: number, data: UpdateInstagramPostRequest): Promise<InstagramPost> {
    if (isClient) {
      return proxyFetch<InstagramPost>(`/api/instagram-posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    }
    return apiClient.patch<InstagramPost>(`/instagram-posts/${id}`, data);
  }

  async delete(id: number): Promise<void> {
    if (isClient) {
      await proxyFetch<void>(`/api/instagram-posts/${id}`, { method: 'DELETE' });
      return;
    }
    await apiClient.delete(`/instagram-posts/${id}`);
  }
}

export const instagramService = new InstagramService();
