import { baseApi } from '@/shared/api/baseApi';
import type { Paginated } from '@/shared/api/types';
import type { Specialization, SpecializationsParams } from '../model/types';

const specializationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSpecializations: builder.query<Paginated<Specialization>, SpecializationsParams>({
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
