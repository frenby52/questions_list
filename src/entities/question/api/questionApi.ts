import { mapFiltersToParams } from '@/helpers/utils/api.js';
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

export const questionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getQuestions: builder.query<Paginated<Question>, QuestionsQueryArgs>({
            query: (filters) => ({
                url: `/questions/public-questions`,
                params: mapFiltersToParams(filters),
            }),
            providesTags: (result) =>
                result
                    ? [...result.data.map((q) => ({ type: 'Question' as const, id: q.id })),
                    { type: 'Questions' as const, id: 'LIST' },]
                    : [{ type: 'Questions' as const, id: 'LIST' }],
        }),
        getQuestion: builder.query<Question, number>({
            query: (id) => `/questions/public-questions/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Question', id }],
        }),
    }),
});

export const { useGetQuestionsQuery, useGetQuestionQuery } = questionApi;