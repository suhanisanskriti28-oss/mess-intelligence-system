import React, { useState, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import Loader from '../../components/common/Loader';

const AdminFeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay
    setTimeout(() => {
      const allFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
      // Sort by newest first
      allFeedbacks.sort((a, b) => b.timestamp - a.timestamp);
      setFeedbacks(allFeedbacks);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <Loader text="Loading feedback records..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">Feedback Reviews</h1>
        <p className="text-[#4A3728]/70 mt-1">Review raw student meal ratings and comments.</p>
      </div>

      {feedbacks.length === 0 ? (
        <div className="text-center py-20 bg-[#FDF5E6] border border-[#E8E8D5] rounded-xl border-dashed">
          <MessageSquare className="h-10 w-10 text-primary/30 mx-auto mb-3" />
          <p className="text-[#4A3728]/60 font-medium tracking-wide">No feedback submitted yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((item) => (
            <div key={item.id} className="bg-[#FDF5E6] border border-[#E8E8D5] rounded-xl p-5 shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <span className="px-2.5 py-1 inline-flex text-xs font-bold rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                  {item.mealType}
                </span>
                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                  {item.rating} <Star className="h-4 w-4 fill-yellow-500" />
                </div>
              </div>
              
              <div className="flex-grow">
                <p className="text-[#4A3728] text-sm leading-relaxed mb-4">
                  {item.comment ? `"${item.comment}"` : <span className="italic text-gray-400">No comment provided</span>}
                </p>
                {item.photoUrl && (
                  <div className="mt-2 mb-4">
                    <img src={item.photoUrl} alt="Feedback" className="w-full h-32 object-cover rounded-lg border border-[#E8E8D5]" />
                  </div>
                )}
              </div>

              <div className="text-xs text-[#4A3728]/50 font-semibold border-t border-[#E8E8D5] pt-3 mt-auto">
                Submitted: {item.dateString}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFeedbackPage;
