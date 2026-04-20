import { useState, useCallback, useEffect } from 'react';
import { getComplaints, createComplaint, voteOnComplaint } from '../services/complaintService';

export const useComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComplaints = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getComplaints();
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
    const response = await createComplaint(title, description, category, authorId, authorName);
    if (response.success) {
      await fetchComplaints(); // Refresh list immediately
    }
    return response;
  }, [fetchComplaints]);

  const handleVote = useCallback(async (complaintId, userId, voteValue) => {
    const response = await voteOnComplaint(complaintId, userId, voteValue);
    if (response.success) {
      // Optimistic update
      setComplaints(prev => prev.map(c => {
        if (c.id === complaintId) {
          return {
            ...c,
            voteCount: response.newVoteCount,
            votes: response.newVotes
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
