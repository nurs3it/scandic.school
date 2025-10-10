import { apiClient, serverApiClient } from '../client';
import { Teacher, CreateTeacherRequest, PatchedTeacher } from '../types';

export class TeachersService {
  private client = apiClient;
  private serverClient = serverApiClient;

  // Client-side methods
  async getAll(): Promise<Teacher[]> {
    return this.client.get<Teacher[]>('/api/teachers/');
  }

  async getById(id: number): Promise<Teacher> {
    return this.client.get<Teacher>(`/api/teachers/${id}/`);
  }

  async create(data: CreateTeacherRequest): Promise<Teacher> {
    const formData = new FormData();
    
    formData.append('name', data.name);
    if (data.subject) formData.append('subject', data.subject);
    if (data.bio) formData.append('bio', data.bio);
    if (data.email) formData.append('email', data.email);
    if (data.phone) formData.append('phone', data.phone);
    
    if (data.photo instanceof File) {
      formData.append('photo', data.photo);
    } else if (typeof data.photo === 'string') {
      formData.append('photo', data.photo);
    }

    return this.client.post<Teacher>('/api/teachers/', formData);
  }

  async update(id: number, data: CreateTeacherRequest): Promise<Teacher> {
    const formData = new FormData();
    
    formData.append('name', data.name);
    if (data.subject) formData.append('subject', data.subject);
    if (data.bio) formData.append('bio', data.bio);
    if (data.email) formData.append('email', data.email);
    if (data.phone) formData.append('phone', data.phone);
    
    if (data.photo instanceof File) {
      formData.append('photo', data.photo);
    } else if (typeof data.photo === 'string') {
      formData.append('photo', data.photo);
    }

    return this.client.put<Teacher>(`/api/teachers/${id}/`, formData);
  }

  async partialUpdate(id: number, data: Partial<PatchedTeacher>): Promise<Teacher> {
    return this.client.patch<Teacher>(`/api/teachers/${id}/`, data);
  }

  async delete(id: number): Promise<void> {
    await this.client.delete(`/api/teachers/${id}/`);
  }

  // Server-side methods (for server actions)
  async getAllServer(): Promise<Teacher[]> {
    return this.serverClient.get<Teacher[]>('/api/teachers/');
  }

  async getByIdServer(id: number): Promise<Teacher> {
    return this.serverClient.get<Teacher>(`/api/teachers/${id}/`);
  }

  // Helper methods
  getTeachersBySubject(teachers: Teacher[], subject: string): Teacher[] {
    return teachers.filter(teacher => 
      teacher.subject?.toLowerCase().includes(subject.toLowerCase())
    );
  }

  searchTeachers(teachers: Teacher[], query: string): Teacher[] {
    const lowerQuery = query.toLowerCase();
    return teachers.filter(teacher => 
      teacher.name.toLowerCase().includes(lowerQuery) ||
      teacher.subject?.toLowerCase().includes(lowerQuery) ||
      teacher.bio?.toLowerCase().includes(lowerQuery)
    );
  }

  getTeachersWithPhotos(teachers: Teacher[]): Teacher[] {
    return teachers.filter(teacher => teacher.photo_url);
  }
}

export const teachersService = new TeachersService();
