import { useState, useEffect, useRef } from 'react';
import { apiRequest, mapFiltersToParams, buildUrl, API_ENDPOINTS } from '../utils/api.js';

export const useQuestionsData = (filters, page, debouncedSearch, onInitialLoad) => {
  const [data, setData] = useState({
    questions: { data: [], total: 0 },
    skills: { data: [], total: 0 },
    specializations: { data: [], total: 0 },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const { specializationId, skills: skillIds, keywords, complexity, rate, status } = filters;
  const onInitialLoadRef = useRef(onInitialLoad);
  const initialSpecIdRef = useRef(specializationId);

  useEffect(() => {
    const loadSpecializations = async () => {
      try {
        const { total: totalSpecializations } = await apiRequest(API_ENDPOINTS.SPECIALIZATIONS);
        const specializations = await apiRequest(`${API_ENDPOINTS.SPECIALIZATIONS}?limit=${totalSpecializations}`);
        setData((prev) => ({ ...prev, specializations }));

        if (!initialSpecIdRef.current && specializations.data.length > 0) {
          onInitialLoadRef.current(specializations.data[0].id);
        }
      } catch (err) {
        setFetchError(err);
      }
    };
    loadSpecializations();
  }, []);

  useEffect(() => {
    if (!specializationId) return;
    const loadSkills = async () => {
      try {
        const skills = await apiRequest(`${API_ENDPOINTS.SKILLS}?specializations=${specializationId}`);
        setData((prev) => ({ ...prev, skills }));
      } catch (err) {
        setFetchError(err);
      }
    };
    loadSkills();
  }, [specializationId]);

  useEffect(() => {
    if (!specializationId) return;
    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        const params = mapFiltersToParams(
          {
            search: debouncedSearch,
            specializationId,
            skills: skillIds,
            keywords,
            complexity,
            rate,
            status,
          },
          page,
        );
        const url = buildUrl(params, API_ENDPOINTS.QUESTIONS);
        const questions = await apiRequest(url);
        setData((prev) => ({ ...prev, questions }));
        setFetchError(null);
      } catch (err) {
        setFetchError(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadQuestions();
  }, [specializationId, skillIds, keywords, complexity, rate, status, debouncedSearch, page]);

  return {
    questions: data.questions,
    specializations: data.specializations,
    skills: data.skills,
    isLoading,
    fetchError,
  };
};
