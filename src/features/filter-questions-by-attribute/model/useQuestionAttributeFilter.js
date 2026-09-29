import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildUrl } from '@/shared/helpers/helpers';
import { ROUTES } from '@/shared/config/routes';

export function useQuestionAttributeFilter() {
  const navigate = useNavigate();

  return useCallback((key, value) => {
    const params = new URLSearchParams();
    params.set(key, String(value));
    navigate(buildUrl(params, ROUTES.QUESTIONS));
  }, [navigate]);
}
