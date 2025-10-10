// Main API exports
export * from './types';
export * from './client';
export * from './actions';
export * from './utils';
export * from './config';

// Services
export { documentsService } from './services/documents';
export { teachersService } from './services/teachers';
export { reviewsService } from './services/reviews';
export { schoolService } from './services/school';

// Service classes (if needed for direct instantiation)
export { DocumentsService } from './services/documents';
export { TeachersService } from './services/teachers';
export { ReviewsService } from './services/reviews';
export { SchoolService } from './services/school';
