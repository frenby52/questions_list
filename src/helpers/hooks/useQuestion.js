import { useEffect, useState } from 'react';
import { apiRequest, API_ENDPOINTS } from '../utils/api.js';

export const useQuestion = (id) => {
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

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

  return { question, isLoading, fetchError };
};
