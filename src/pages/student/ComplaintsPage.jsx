import React, { useState, useMemo } from 'react';
import { PlusCircle, Search, Filter } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useComplaints } from '../../hooks/useComplaints';
import ComplaintCard from '../../components/student/ComplaintCard';
import Loader from '../../components/common/Loader';

const CATEGORIES = ['Food Quality', 'Hygiene', 'Quantity', 'Service', 'Other'];

const ComplaintsPage = () => {
  const { currentUser } = useAuth();
  const { complaints, loading, addComplaint, handleVote } = useComplaints();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [submitting, setSubmitting] = useState(false);

  const [sortBy, setSortBy] = useState('votes'); // 'votes', 'recent'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    // Note: in a real app, authorName would come from context/firestore user profile. 
    // Using email username fallback for now.
    const authorNameFallback = currentUser.email.split('@')[0];
    
    const response = await addComplaint(title, description, category, currentUser.uid, authorNameFallback);
    
    if (response.success) {
      toast.success("Complaint posted!");
      setIsFormOpen(false);
      setTitle('');
      setDescription('');
      setCategory(CATEGORIES[0]);
    } else {
      toast.error("Failed to post complaint");
    }
    setSubmitting(false);
  };

  const sortedComplaints = useMemo(() => {
    if (sortBy === 'votes') {
      return [...complaints].sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0));
    } else {
      return [...complaints].sort((a, b) => {
        const timeA = a.createdAt?.toMillis() || 0;
        const timeB = b.createdAt?.toMillis() || 0;
        return timeB - timeA;
      });
    }
  }, [complaints, sortBy]);

  if (loading) return <Loader text="Loading complaints..." />;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight">Complaint Board</h1>
          <p className="text-[#4A3728]/70 mt-1">Voice issues and upvote shared concerns.</p>
        </div>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-bold text-white bg-primary hover:bg-primaryHover transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 duration-200"
        >
          <PlusCircle size={18} />
          {isFormOpen ? 'Cancel' : 'New Complaint'}
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-[#FDF5E6] border-panelBorder p-6 md:p-8 rounded-2xl shadow-lg border border-panelBorder mb-10 animate-fade-in">
          <h2 className="text-xl font-extrabold text-primary mb-5">Post a New Complaint</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-panelBorder rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="E.g., Found insect in lunch"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <select
                  className="w-full px-4 py-3 border border-panelBorder rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-[#FDF5E6] border-panelBorder"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border border-panelBorder rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                placeholder="Provide detailed information..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 rounded-lg font-bold text-white bg-primary hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-50 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                {submitting ? 'Posting...' : 'Post Complaint'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex items-center justify-between py-3 border-b border-panelBorder mb-6">
        <div className="flex space-x-4">
          <button 
            onClick={() => setSortBy('votes')}
            className={`text-sm font-semibold pb-3 border-b-2 transition-colors ${sortBy === 'votes' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            Most Voted
          </button>
          <button 
            onClick={() => setSortBy('recent')}
            className={`text-sm font-semibold pb-3 border-b-2 transition-colors ${sortBy === 'recent' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            Most Recent
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {sortedComplaints.length > 0 ? (
          sortedComplaints.map(complaint => (
            <ComplaintCard 
              key={complaint.id} 
              complaint={complaint} 
              onVote={handleVote}
              currentUserId={currentUser.uid}
            />
          ))
        ) : (
          <div className="text-center py-16 bg-[#FDF5E6] border-panelBorder rounded-xl border border-dashed border-panelBorder">
            <p className="text-gray-500 font-medium">No complaints found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintsPage;
