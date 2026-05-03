import { useState, useEffect, useRef } from 'react';
import { apiRequest, buildQueryParams, buildUrl } from '../../helpers/utils/api.js';

export const useQuestionsData = (filters, page, debouncedSearch, onInitialLoad) => {
  const [data, setData] = useState({
    questions: { data: [], total: 0 },
    skills: { data: [], total: 0 },
    specializations: { data: [], total: 0 },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const prevSpecializationId = useRef(null);
  const { specializationId, skills: skillIds, complexity, rate, status } = filters;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (specializationId === null) {
          const { total: totalSpecializations } = await apiRequest('/specializations');
          const specializations = await apiRequest(`/specializations?limit=${totalSpecializations}`);
          setData((prev) => ({ ...prev, specializations }));

          if (!specializationId && specializations.data.length > 0) {
            onInitialLoad(specializations.data[0].id);
            return;
          }

          if (specializations.data.length === 0 || !specializationId) {
            setIsLoading(false);
            return;
          }
        }

        const debouncedFilters = {
          search: debouncedSearch,
          specializationId,
          skills: skillIds,
          complexity,
          rate,
          status,
        };

        const params = buildQueryParams(debouncedFilters, page);
        const url = buildUrl(params);

        if (prevSpecializationId.current !== specializationId) {
          const [newQuestions, newSkills] = await Promise.all([
            apiRequest(`/questions/public-questions?specializationId=${specializationId}`),
            apiRequest(`/skills?specializations=${specializationId}`),
          ]);
          setData(prev => ({ ...prev, questions: newQuestions, skills: newSkills }));
          prevSpecializationId.current = specializationId;
        } else {
          const newQuestions = await apiRequest(url);
          setData(prev => ({ ...prev, questions: newQuestions }));
        }
        setFetchError(null);
        setIsLoading(false);
      } catch (err) {
        setFetchError(err);
        setIsLoading(false);
      } 
    };
    fetchData();
  }, [debouncedSearch, specializationId, skillIds, complexity, rate, status, page, onInitialLoad]);

  return { questions: data.questions, specializations: data.specializations, skills: data.skills, isLoading, fetchError };
};