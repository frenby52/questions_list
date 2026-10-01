import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildUrl } from '../lib/filterHelpers';
import { ROUTES } from '@/shared/config';
import type { Filters } from '@/entities/question';

type AttributeFilterKey = Extract<keyof Filters, 'skills' | 'keywords'>;

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
