import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor — normalize error messages
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as { message?: string | string[] } | undefined;
      const message = Array.isArray(data?.message)
        ? data.message.join('; ')
        : (data?.message || error.message || 'Server error');
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  }
);
