// API Types based on OpenAPI schema

export enum AudienceEnum {
  ALL = 'ALL',
  TEACHERS = 'TEACHERS',
  PARENTS = 'PARENTS',
  STUDENTS = 'STUDENTS'
}

export enum RatingEnum {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5
}

export interface Document {
  id: number;
  title: string;
  category?: string;
  description?: string;
  audience?: AudienceEnum;
  audience_label: string;
  file: string;
  file_url: string;
  original_name?: string;
  is_public?: boolean;
  uploaded_at: string;
  download_url: string;
}

export interface Teacher {
  id: number;
  name: string;
  subject?: string;
  bio?: string;
  email?: string;
  phone?: string;
  photo?: string | null;
  photo_url: string;
}

export interface Review {
  id: number;
  name?: string;
  text: string;
  rating?: RatingEnum;
  created_at: string;
}

export interface SchoolInfo {
  id: number;
  address?: string;
  email?: string;
  phone?: string;
  about?: string;
  map_iframe?: string;
}

// Partial types for updates
export interface PatchedTeacher {
  id?: number;
  name?: string;
  subject?: string;
  bio?: string;
  email?: string;
  phone?: string;
  photo?: string | null;
}

export interface PatchedSchoolInfo {
  id?: number;
  address?: string;
  email?: string;
  phone?: string;
  about?: string;
  map_iframe?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export class ApiError extends Error {
  public status: number;
  public details?: unknown;

  constructor(message: string, status: number = 0, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

// Request types
export interface CreateDocumentRequest {
  title: string;
  category?: string;
  description?: string;
  audience?: AudienceEnum;
  file: File | string;
  original_name?: string;
  is_public?: boolean;
}

export interface CreateTeacherRequest {
  name: string;
  subject?: string;
  bio?: string;
  email?: string;
  phone?: string;
  photo?: File | string | null;
}

export interface CreateReviewRequest {
  name?: string;
  text: string;
  rating?: RatingEnum;
}

export interface UpdateSchoolInfoRequest {
  address?: string;
  email?: string;
  phone?: string;
  about?: string;
  map_iframe?: string;
}
