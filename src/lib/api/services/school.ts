import { apiClient, serverApiClient } from '../client';
import { SchoolInfo, UpdateSchoolInfoRequest, PatchedSchoolInfo } from '../types';

export class SchoolService {
  private client = apiClient;
  private serverClient = serverApiClient;

  // Client-side methods
  async getAll(): Promise<SchoolInfo[]> {
    return this.client.get<SchoolInfo[]>('/api/school/');
  }

  async update(id: number, data: UpdateSchoolInfoRequest): Promise<SchoolInfo> {
    return this.client.put<SchoolInfo>(`/api/school/${id}/`, data);
  }

  async partialUpdate(id: number, data: Partial<PatchedSchoolInfo>): Promise<SchoolInfo> {
    return this.client.patch<SchoolInfo>(`/api/school/${id}/`, data);
  }

  // Server-side methods (for server actions)
  async getAllServer(): Promise<SchoolInfo[]> {
    return this.serverClient.get<SchoolInfo[]>('/api/school/');
  }

  // Helper methods
  getSchoolInfo(schoolData: SchoolInfo[]): SchoolInfo | null {
    return schoolData.length > 0 ? schoolData[0] : null;
  }

  getContactInfo(schoolInfo: SchoolInfo): {
    email?: string;
    phone?: string;
    address?: string;
  } {
    return {
      email: schoolInfo.email,
      phone: schoolInfo.phone,
      address: schoolInfo.address,
    };
  }

  hasMap(schoolInfo: SchoolInfo): boolean {
    return Boolean(schoolInfo.map_iframe && schoolInfo.map_iframe.trim() !== '');
  }

  hasAbout(schoolInfo: SchoolInfo): boolean {
    return Boolean(schoolInfo.about && schoolInfo.about.trim() !== '');
  }
}

export const schoolService = new SchoolService();
