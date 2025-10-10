import { DocumentsService } from './documents';
import { TeachersService } from './teachers';
import { ReviewsService } from './reviews';
import { SchoolService } from './school';

// Export service instances
export const documentsService = new DocumentsService();
export const teachersService = new TeachersService();
export const reviewsService = new ReviewsService();
export const schoolService = new SchoolService();

// Export service classes for those who want to create their own instances
export { DocumentsService, TeachersService, ReviewsService, SchoolService };

