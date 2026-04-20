import axios from 'axios';
import type { NewsItem, NewsListResponse } from '@/types/news';

const API = process.env.NESTJS_API_URL || 'https://scandic-school-api.onrender.com';

export async function fetchNewsList(params: {
  page?: number;
  pageSize?: number;
  tag?: string;
}): Promise<NewsListResponse> {
  const res = await axios.get<NewsListResponse>(`${API}/news`, { params });
  return res.data;
}

export async function fetchNewsTags(): Promise<string[]> {
  const res = await axios.get<string[]>(`${API}/news/tags`);
  return res.data;
}

export async function fetchNewsBySlug(slug: string): Promise<NewsItem> {
  const res = await axios.get<NewsItem>(`${API}/news/${encodeURIComponent(slug)}`);
  return res.data;
}
