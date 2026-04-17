export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  bannerUrl: string;
  content: string;
  author: string;
  tags: string[];
  publishedAt: string;
  readingMinutes: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewsListResponse {
  items: NewsItem[];
  total: number;
  page: number;
  pageSize: number;
}
