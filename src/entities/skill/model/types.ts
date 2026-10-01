import type { User } from '@/shared/api';
import type { Specialization } from '@/entities/specialization/@x/skill';

export interface Skill {
  id: number;
  title: string;
  description: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: User | null;
  specializations: Specialization[];
}

export interface SkillsParams {
  page?: number;
  limit?: number;
  specializations?: number[];
  authorId?: string;
  title?: string;
}
