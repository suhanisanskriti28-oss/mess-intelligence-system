import { useState, useCallback } from 'react';
import { submitFeedback, checkHasSubmittedToday } from '../services/feedbackService';

export const useFeedback = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkSubmission = useCallback(async (userId, mealType) => {
    return await checkHasSubmittedToday(userId, mealType);
  }, []);

  const submitMealFeedback = useCallback(async (userId, mealType, rating, comment, photoFile) => {
    setLoading(true);
    setError(null);
    try {
      const response = await submitFeedback(userId, mealType, rating, comment, photoFile);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    submitMealFeedback,
    checkSubmission,
    loading,
    error
  };
};
