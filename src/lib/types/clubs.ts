import type { Tournament } from './tournaments';

export interface Club {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  ageRange: string | null;
  schedule: string | null;
  teacher: string | null;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  tournaments?: Tournament[];
}
