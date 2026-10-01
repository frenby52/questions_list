import type { User } from '@/shared/api';

export interface Specialization {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: User | null;
}

export interface SpecializationsParams {
  page?: number;
  limit?: number;
  authorId?: string;
  title?: string;
}
