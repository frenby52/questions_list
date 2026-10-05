import type { User } from '@/shared/api';
import type { Skill } from '@/entities/skill/@x/question';
import type { Specialization } from '@/entities/specialization/@x/question';

export interface QuestionTopics {
  id: number;
  title: string;
  description: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: number;
  title: string;
  slug: string;
  description: string;
  code: string | null;
  imageSrc: string | null;
  keywords: string[];
  longAnswer: string;
  shortAnswer: string;
  status: string;
  rate: number;
  complexity: number;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  updatedById: string;
  createdBy: User;
  updatedBy: User;
  questionTopics: QuestionTopics[];
  questionSpecializations: Specialization[];
  questionSkills: Skill[];
}

export interface QuestionParams {
  page?: number;
  limit?: number;
  title?: string;
  titleOrDescription?: string;
  skills?: string[];
  skillFilterMode?: 'ALL' | 'ANY';
  topics?: string;
  complexity?: number[];
  collection?: number;
  article?: number;
  rate?: number[];
  keywords?: string[];
  specializationId?: number | null;
  specializationSlug?: string;
  createdAtFrom?: string;
  createdAtTo?: string;
  orderBy?: string;
  order?: 'ASC' | 'DESC';
  random?: boolean;
  status?: string;
}

export interface Filters {
  search: string;
  specializationId?: number | null;
  skills?: number[];
  keywords?: string[];
  complexity?: string[];
  rate?: number[];
  status?: string;
  page?: number;
}
