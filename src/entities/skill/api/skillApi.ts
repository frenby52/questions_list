import { baseApi } from '@/shared/api';
import type { Paginated } from '@/shared/api';
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
