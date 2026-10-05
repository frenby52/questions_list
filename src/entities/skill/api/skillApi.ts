import { baseApi } from '@/shared/api';
import type { Paginated } from '@/shared/api';
import type { Skill, SkillsParams } from '../model/types';

const skillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query<Paginated<Skill>, SkillsParams>({
      async queryFn(arg, _api, _extra, baseQuery) {
        const params = new URLSearchParams();
        if (arg.specializations && arg.specializations.length > 0) {
          arg.specializations.forEach((id) => params.append('specializations', String(id)));
        }
        const queryString = params.toString();
        const url = queryString ? `/skills?${queryString}` : '/skills';

        const first = await baseQuery(url);
        if (first.error) return { error: first.error };

        const firstData = first.data as Paginated<Skill>;
        const total = firstData?.total ?? 0;
        const loadedCount = firstData?.data?.length ?? 0;

        if (total === 0 || loadedCount >= total) {
          return { data: firstData };
        }
        params.set('limit', String(total));
        const full = await baseQuery(`/skills?${params.toString()}`);
        return full.error
          ? { error: full.error }
          : { data: full.data as Paginated<Skill> };
      },
    }),
  }),
});

export const { useGetSkillsQuery } = skillApi;
