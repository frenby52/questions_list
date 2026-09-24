import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { mapFiltersToParams } from '../../helpers/utils/api.js';
import { API_ENDPOINTS } from '../../helpers/utils/api.js';
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

export const questionsApi = createApi({
    reducerPath: 'questionsApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    tagTypes: ['Questions', 'Question'],
    endpoints: (builder) => ({
        getQuestions: builder.query<Paginated<Question>, QuestionsQueryArgs>({
            query: (filters) => ({
                url: API_ENDPOINTS.QUESTIONS,
                params: mapFiltersToParams(filters),
            }),
            providesTags: (result) =>
                result
                    ? [...result.data.map((q) => ({ type: 'Question' as const, id: q.id })),
                        { type: 'Questions' as const, id: 'LIST' },]
                    : [{ type: 'Questions' as const, id: 'LIST' }],
        }),
        getQuestion: builder.query<Question, number>({
            query: (id) => `${API_ENDPOINTS.QUESTIONS}/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Question', id }],
        }),
        getSpecializations: builder.query<Paginated<Specialization>, void>({
            async queryFn(_arg, _api, _extra, baseQuery) {
                const first = await baseQuery(API_ENDPOINTS.SPECIALIZATIONS);
                if (first.error) return { error: first.error };
                const total = (first.data as Paginated<Specialization>).total;
                const full = await baseQuery(`${API_ENDPOINTS.SPECIALIZATIONS}?limit=${total}`);
                return full.error
                    ? { error: full.error }
                    : { data: full.data as Paginated<Specialization> };
            },
        }),
        getSkills: builder.query<Paginated<Skill>, number>({
            query: (specializationId) => `${API_ENDPOINTS.SKILLS}?specializations=${specializationId}`,
        }),
    }),
});

export const {useGetQuestionsQuery, useGetQuestionQuery, useGetSpecializationsQuery, useGetSkillsQuery} = questionsApi;