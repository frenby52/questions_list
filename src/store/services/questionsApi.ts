import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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

export const questionsApi = createApi({
    reducerPath: 'questionsApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    tagTypes: ['Questions', 'Question'],
    endpoints: (builder) => ({
        getQuestion: builder.query<Question, number>({
            query: (id) => `${API_ENDPOINTS.QUESTIONS}/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Question', id }],
        }),
    }),
});

export const {
    useGetQuestionQuery,
} = questionsApi;