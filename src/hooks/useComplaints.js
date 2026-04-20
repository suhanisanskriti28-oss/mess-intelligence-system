import { useState, useCallback, useEffect } from 'react';
import { fetchAllComplaints, submitComplaint, voteComplaint } from '../services/complaintService';

export const useComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComplaints = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAllComplaints();
      setComplaints(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  const addComplaint = useCallback(async (title, description, category, authorId, authorName) => {
    const response = await submitComplaint(authorId, title, description, category, authorName);
    if (response.success) {
      await fetchComplaints(); // Refresh list immediately
    }
    return response;
  }, [fetchComplaints]);

  const handleVote = useCallback(async (complaintId, userId, voteValue) => {
    const response = await voteComplaint(complaintId, userId, voteValue);
    if (response.success) {
      // Optimistic update
      setComplaints(prev => prev.map(c => {
        if (c.id === complaintId) {
          return {
            ...c,
            voteCount: response.voteCount,
            votes: response.votes
          };
        }
        return c;
      }));
    }
    return response;
  }, []);

  return {
    complaints,
    loading,
    error,
    refreshComplaints: fetchComplaints,
    addComplaint,
    handleVote
  };
};
