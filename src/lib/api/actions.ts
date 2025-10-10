'use server';

import { 
  documentsService, 
  teachersService, 
  reviewsService, 
  schoolService 
} from './services/index';
import { Document, Teacher, Review, SchoolInfo } from './types';
import { ApiError } from './types';

// Document actions
export async function getDocuments(): Promise<{
  success: boolean;
  data?: Document[];
  error?: string;
}> {
  try {
    const data = await documentsService.getAllServer();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching documents:', error);
    return { 
      success: false, 
      error: error instanceof ApiError ? error.message : 'Failed to fetch documents' 
    };
  }
}

export async function getDocumentById(id: number): Promise<{
  success: boolean;
  data?: Document;
  error?: string;
}> {
  try {
    const data = await documentsService.getByIdServer(id);
    return { success: true, data };
  } catch (error) {
    console.error(`Error fetching document ${id}:`, error);
    return { 
      success: false, 
      error: error instanceof ApiError ? error.message : 'Failed to fetch document' 
    };
  }
}

export async function getPublicDocuments(): Promise<{
  success: boolean;
  data?: Document[];
  error?: string;
}> {
  try {
    const allDocuments = await documentsService.getAllServer();
    const publicDocuments = documentsService.getPublicDocuments(allDocuments);
    return { success: true, data: publicDocuments };
  } catch (error) {
    console.error('Error fetching public documents:', error);
    return { 
      success: false, 
      error: error instanceof ApiError ? error.message : 'Failed to fetch public documents' 
    };
  }
}

// Teacher actions
export async function getTeachers(): Promise<{
  success: boolean;
  data?: Teacher[];
  error?: string;
}> {
  try {
    const data = await teachersService.getAllServer();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return { 
      success: false, 
      error: error instanceof ApiError ? error.message : 'Failed to fetch teachers' 
    };
  }
}

export async function getTeacherById(id: number): Promise<{
  success: boolean;
  data?: Teacher;
  error?: string;
}> {
  try {
    const data = await teachersService.getByIdServer(id);
    return { success: true, data };
  } catch (error) {
    console.error(`Error fetching teacher ${id}:`, error);
    return { 
      success: false, 
      error: error instanceof ApiError ? error.message : 'Failed to fetch teacher' 
    };
  }
}

export async function getTeachersWithPhotos(): Promise<{
  success: boolean;
  data?: Teacher[];
  error?: string;
}> {
  try {
    const allTeachers = await teachersService.getAllServer();
    const teachersWithPhotos = teachersService.getTeachersWithPhotos(allTeachers);
    return { success: true, data: teachersWithPhotos };
  } catch (error) {
    console.error('Error fetching teachers with photos:', error);
    return { 
      success: false, 
      error: error instanceof ApiError ? error.message : 'Failed to fetch teachers with photos' 
    };
  }
}

// Review actions
export async function getReviews(): Promise<{
  success: boolean;
  data?: Review[];
  error?: string;
}> {
  try {
    const data = await reviewsService.getAllServer();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return { 
      success: false, 
      error: error instanceof ApiError ? error.message : 'Failed to fetch reviews' 
    };
  }
}

export async function getRecentReviews(limit: number = 10): Promise<{
  success: boolean;
  data?: Review[];
  error?: string;
}> {
  try {
    const allReviews = await reviewsService.getAllServer();
    const recentReviews = reviewsService.getRecentReviews(allReviews, limit);
    return { success: true, data: recentReviews };
  } catch (error) {
    console.error('Error fetching recent reviews:', error);
    return { 
      success: false, 
      error: error instanceof ApiError ? error.message : 'Failed to fetch recent reviews' 
    };
  }
}

export async function getReviewsStats(): Promise<{
  success: boolean;
  data?: {
    totalReviews: number;
    averageRating: number;
    ratingDistribution: Record<number, number>;
  };
  error?: string;
}> {
  try {
    const allReviews = await reviewsService.getAllServer();
    const stats = {
      totalReviews: allReviews.length,
      averageRating: reviewsService.getAverageRating(allReviews),
      ratingDistribution: reviewsService.getRatingDistribution(allReviews),
    };
    return { success: true, data: stats };
  } catch (error) {
    console.error('Error fetching reviews stats:', error);
    return { 
      success: false, 
      error: error instanceof ApiError ? error.message : 'Failed to fetch reviews stats' 
    };
  }
}

// School actions
export async function getSchoolInfo(): Promise<{
  success: boolean;
  data?: SchoolInfo;
  error?: string;
}> {
  try {
    const schoolData = await schoolService.getAllServer();
    const schoolInfo = schoolService.getSchoolInfo(schoolData);
    return { success: true, data: schoolInfo || undefined };
  } catch (error) {
    console.error('Error fetching school info:', error);
    return { 
      success: false, 
      error: error instanceof ApiError ? error.message : 'Failed to fetch school info' 
    };
  }
}

export async function getContactInfo(): Promise<{
  success: boolean;
  data?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  error?: string;
}> {
  try {
    const schoolData = await schoolService.getAllServer();
    const schoolInfo = schoolService.getSchoolInfo(schoolData);
    
    if (!schoolInfo) {
      return { success: false, error: 'School information not found' };
    }
    
    const contactInfo = schoolService.getContactInfo(schoolInfo);
    return { success: true, data: contactInfo };
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return { 
      success: false, 
      error: error instanceof ApiError ? error.message : 'Failed to fetch contact info' 
    };
  }
}
