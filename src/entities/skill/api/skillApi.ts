import { baseApi } from '@/shared/api/baseApi';
import type { Paginated } from '@/shared/api/types';
import type { Skill, SkillsParams } from '../model/types';

const skillApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSkills: builder.query<Paginated<Skill>, SkillsParams>({
            query: (params) => ({
                url: `/skills`,
                params: params,
            }),
        }),
    }),
});

export const { useGetSkillsQuery } = skillApi;
