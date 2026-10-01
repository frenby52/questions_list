import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildUrl } from '@/shared/helpers/helpers';
import { ROUTES } from '@/shared/config/routes';
import type { Filters } from '@/shared/api/types';

type AttributeFilterKey = Extract<keyof Filters, 'skills' | 'keywords' >;

export function useDetailedQuestionAttributeFilter() {
  const navigate = useNavigate();

  return useCallback(
    (key: AttributeFilterKey, value: string | number) => {
      const params = new URLSearchParams();
      params.set(key, String(value));
      navigate(buildUrl(params, ROUTES.QUESTIONS));
    },
    [navigate],
  );
}
