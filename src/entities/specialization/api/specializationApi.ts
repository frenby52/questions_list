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

export const specializationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSpecializations: builder.query<Paginated<Specialization>, void>({
            async queryFn(_arg, _api, _extra, baseQuery) {
                const first = await baseQuery(`/specializations`);
                if (first.error) return { error: first.error };
                const total = (first.data as Paginated<Specialization>).total;
                const full = await baseQuery(`/specializations?limit=${total}`);
                return full.error
                    ? { error: full.error }
                    : { data: full.data as Paginated<Specialization> };
            },
        }),
    }),
});

export const { useGetSpecializationsQuery } = specializationApi;