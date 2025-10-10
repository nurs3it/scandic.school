import { apiClient, serverApiClient } from '../client';
import { Review, CreateReviewRequest, RatingEnum } from '../types';

export class ReviewsService {
  private client = apiClient;
  private serverClient = serverApiClient;

  // Client-side methods
  async getAll(): Promise<Review[]> {
    return this.client.get<Review[]>('/api/reviews/');
  }

  async create(data: CreateReviewRequest): Promise<Review> {
    return this.client.post<Review>('/api/reviews/', data);
  }

  // Server-side methods (for server actions)
  async getAllServer(): Promise<Review[]> {
    return this.serverClient.get<Review[]>('/api/reviews/');
  }

  // Helper methods
  getReviewsByRating(reviews: Review[], rating: RatingEnum): Review[] {
    return reviews.filter(review => review.rating === rating);
  }

  getReviewsWithNames(reviews: Review[]): Review[] {
    return reviews.filter(review => review.name && review.name.trim() !== '');
  }

  getRecentReviews(reviews: Review[], limit: number = 10): Review[] {
    return reviews
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit);
  }

  getAverageRating(reviews: Review[]): number {
    const reviewsWithRating = reviews.filter(review => review.rating);
    if (reviewsWithRating.length === 0) return 0;
    
    const sum = reviewsWithRating.reduce((acc, review) => acc + (review.rating || 0), 0);
    return Math.round((sum / reviewsWithRating.length) * 10) / 10;
  }

  getRatingDistribution(reviews: Review[]): Record<number, number> {
    const distribution: Record<number, number> = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0
    };

    reviews.forEach(review => {
      if (review.rating) {
        distribution[review.rating]++;
      }
    });

    return distribution;
  }

  searchReviews(reviews: Review[], query: string): Review[] {
    const lowerQuery = query.toLowerCase();
    return reviews.filter(review => 
      review.text.toLowerCase().includes(lowerQuery) ||
      review.name?.toLowerCase().includes(lowerQuery)
    );
  }
}

export const reviewsService = new ReviewsService();
