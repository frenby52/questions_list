import { useState, useEffect, useRef } from 'react';
import { apiRequest, mapFiltersToParams, buildUrl, API_ENDPOINTS } from '../utils/api.js';

export const useQuestionsData = (filters, page, debouncedSearch, onInitialLoad) => {
  const [data, setData] = useState({
    questions: { data: [], total: 0 },
    skills: { data: [], total: 0 },
    specializations: { data: [], total: 0 },
  });
  const [isSpecializationsLoading, setIsSpecializationsLoading] = useState(true);
  const [isSkillsLoading, setIsSkillsLoading] = useState(true);
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const {search, specializationId, skills: skillIds, keywords, complexity, rate, status} = filters;
  const hasOtherFiltersInUrl = useRef(
    search.trim() !== '' ||
    skillIds.length > 0 || 
    keywords.length > 0 || 
    complexity.length > 0 || 
    rate.length > 0
  );
  const onInitialLoadRef = useRef(onInitialLoad);
  const initialSpecIdRef = useRef(specializationId);

  useEffect(() => {
    const loadSpecializations = async () => {
      try {
        setIsSpecializationsLoading(true);
        const { total: totalSpecializations } = await apiRequest(API_ENDPOINTS.SPECIALIZATIONS);
        const specializations = await apiRequest(`${API_ENDPOINTS.SPECIALIZATIONS}?limit=${totalSpecializations}`);
        setData((prev) => ({ ...prev, specializations }));

        if (!initialSpecIdRef.current && specializations.data.length > 0 && !hasOtherFiltersInUrl.current) {
          onInitialLoadRef.current(specializations.data[0].id);
        }
      } catch (err) {
        setFetchError(err);
      } finally {
        setIsSpecializationsLoading(false);
      }
    };
    loadSpecializations();
  }, []);

  useEffect(() => {
    const loadSkills = async () => {
      if (!specializationId) {
        setIsSkillsLoading(false);
        return;
      }
      try {
        setIsSkillsLoading(true);
        const skills = await apiRequest(`${API_ENDPOINTS.SKILLS}?specializations=${specializationId}`);
        setData((prev) => ({ ...prev, skills }));
      } catch (err) {
        setFetchError(err);
      } finally {
        setIsSkillsLoading(false);
      }
    };
    loadSkills();
  }, [specializationId]);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsQuestionsLoading(true);
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
        setIsQuestionsLoading(false);
      }
    };
    loadQuestions();
  }, [specializationId, skillIds, keywords, complexity, rate, status, debouncedSearch, page]);

  return {questions: data.questions, specializations: data.specializations, skills: data.skills, isSpecializationsLoading, isSkillsLoading, isQuestionsLoading, fetchError};
};
