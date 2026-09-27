import { baseApi } from '@/shared/api/baseApi';

export interface Paginated<T> {
    data: T[];
    page: number;
    limit: number;
    total: number;
}
export interface User {
    id: string;
    username: string;
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
    questionTopics: string[];
    questionSpecializations: Specialization[];
    questionSkills: Skill[];
}
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

export interface Filters {
    search: string;
    specializationId: number | null;
    skills: number[];
    keywords: string[];
    complexity: string[];
    rate: number[];
    status: string;
}

export type QuestionsQueryArgs = Partial<Filters> & {
    page?: number;
};

export const skillApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSkills: builder.query<Paginated<Skill>, number>({
            query: (specializationId) => ({
                url: `/skills`,
                params: { specializations: specializationId },
            }),
        }),
    }),
});

export const { useGetSkillsQuery } = skillApi;