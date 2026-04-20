export const getReputationStatus = (score) => {
  if (score >= 4.0) return { label: 'Good', color: 'bg-emerald-500', icon: '🟢', textValue: 'text-emerald-500' };
  if (score >= 2.5) return { label: 'Average', color: 'bg-yellow-500', icon: '🟡', textValue: 'text-yellow-500' };
  return { label: 'Poor', color: 'bg-red-500', icon: '🔴', textValue: 'text-red-500' };
};

// Assuming past 7 days logic would aggregate doc data.
// In the current mock context, we calculate the average directly from the given array of numbers or objects
export const calculateAverageScore = (feedbacks) => {
  if (!feedbacks || feedbacks.length === 0) return 0;
  
  const sum = feedbacks.reduce((acc, current) => {
    return acc + (current.rating || 0);
  }, 0);
  
  return Number((sum / feedbacks.length).toFixed(1));
};
