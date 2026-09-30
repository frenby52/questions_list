import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';

export function useQuestionActions() {
  const navigate = useNavigate();

  const openDetails = useCallback((id) => navigate(ROUTES.getQuestion(id)), [navigate]);

  return { openDetails };
}
