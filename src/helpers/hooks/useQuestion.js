import { useEffect, useState, useCallback } from 'react';
import { apiRequest, API_ENDPOINTS } from '../utils/api.js';
import { useParams, useNavigate } from 'react-router-dom';
import { buildUrl } from '../utils/api.js';
import { ROUTES } from '../../constants/routes.js';

export const useQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const handleQuestionFilterClick = useCallback((key, value) => {
    const params = new URLSearchParams();
    params.set(key, String(value));
    navigate(buildUrl(params, ROUTES.QUESTIONS));
  }, [navigate]);

  useEffect(() => {
    if (!id) return;

    const fetchQuestion = async () => {
      try {
        setIsLoading(true);
        const questionData = await apiRequest(`${API_ENDPOINTS.QUESTIONS}/${id}`);
        setQuestion(questionData);
        setFetchError(null);
      } catch (err) {
        setFetchError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  return { question, isLoading, fetchError, handleQuestionFilterClick };
};
