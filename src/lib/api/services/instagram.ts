import { apiClient } from '../client';

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

export class InstagramService {
  private client = apiClient;

  async getAll(): Promise<InstagramPost[]> {
    return this.client.get<InstagramPost[]>('/instagram-posts');
  }

  async create(data: CreateInstagramPostRequest): Promise<InstagramPost> {
    return this.client.post<InstagramPost>('/instagram-posts', data);
  }

  async update(id: number, data: UpdateInstagramPostRequest): Promise<InstagramPost> {
    return this.client.patch<InstagramPost>(`/instagram-posts/${id}`, data);
  }

  async delete(id: number): Promise<void> {
    await this.client.delete(`/instagram-posts/${id}`);
  }
}

export const instagramService = new InstagramService();
