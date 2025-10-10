import { apiClient, serverApiClient } from '../client';
import { Document, CreateDocumentRequest } from '../types';

export class DocumentsService {
  private client = apiClient;
  private serverClient = serverApiClient;

  // Client-side methods
  async getAll(): Promise<Document[]> {
    return this.client.get<Document[]>('/api/documents/');
  }

  async getById(id: number): Promise<Document> {
    return this.client.get<Document>(`/api/documents/${id}/`);
  }

  async create(data: CreateDocumentRequest): Promise<Document> {
    const formData = new FormData();
    
    formData.append('title', data.title);
    if (data.category) formData.append('category', data.category);
    if (data.description) formData.append('description', data.description);
    if (data.audience) formData.append('audience', data.audience);
    if (data.original_name) formData.append('original_name', data.original_name);
    if (data.is_public !== undefined) formData.append('is_public', String(data.is_public));
    
    if (data.file instanceof File) {
      formData.append('file', data.file);
    } else if (typeof data.file === 'string') {
      formData.append('file', data.file);
    }

    return this.client.post<Document>('/api/documents/', formData);
  }

  async delete(id: number): Promise<void> {
    await this.client.delete(`/api/documents/${id}/`);
  }

  async download(id: number): Promise<Response> {
    return this.client.download(`/api/documents/${id}/download/`);
  }

  // Server-side methods (for server actions)
  async getAllServer(): Promise<Document[]> {
    return this.serverClient.get<Document[]>('/api/documents/');
  }

  async getByIdServer(id: number): Promise<Document> {
    return this.serverClient.get<Document>(`/api/documents/${id}/`);
  }

  async downloadServer(id: number): Promise<Response> {
    return this.serverClient.download(`/api/documents/${id}/download/`);
  }

  // Helper methods
  getPublicDocuments(documents: Document[]): Document[] {
    return documents.filter(doc => doc.is_public);
  }

  getDocumentsByAudience(documents: Document[], audience: string): Document[] {
    return documents.filter(doc => doc.audience_label === audience);
  }

  getDocumentsByCategory(documents: Document[], category: string): Document[] {
    return documents.filter(doc => doc.category === category);
  }
}

export const documentsService = new DocumentsService();
