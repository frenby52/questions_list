import { baseApi } from '@/shared/api';
import type { Paginated } from '@/shared/api';
import type { Filters, Question } from '../model/types';
import { mapFiltersToParams } from '../lib/mapFiltersToParams';

const questionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<Paginated<Question>, Filters>({
      query: (filters) => ({
        url: `/questions/public-questions`,
        params: mapFiltersToParams(filters),
      }),
      providesTags: (result) =>
        result
          ? [...result.data.map((q) => ({ type: 'Question' as const, id: q.id })),
            { type: 'Questions' as const, id: 'LIST' }]
          : [{ type: 'Questions' as const, id: 'LIST' }],
    }),
    getQuestion: builder.query<Question, number>({
      query: (id) => `/questions/public-questions/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Question', id }],
    }),
  }),
});

export const { useGetQuestionsQuery, useGetQuestionQuery } = questionApi;
