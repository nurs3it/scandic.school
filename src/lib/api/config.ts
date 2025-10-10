// API Configuration
export const API_CONFIG = {
  // Base URLs
  CLIENT_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  SERVER_BASE_URL: process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  
  // Timeouts
  DEFAULT_TIMEOUT: 10000,
  UPLOAD_TIMEOUT: 30000,
  
  // Retry settings
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  
  // File upload settings
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  
  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  
  // Cache settings
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
} as const;

// Environment-specific configurations
export const getApiConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    ...API_CONFIG,
    isDevelopment,
    isProduction,
    enableLogging: isDevelopment,
    enableCaching: isProduction,
  };
};
