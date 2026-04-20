import React, { useMemo } from 'react';
import { ThumbsUp, ThumbsDown, Clock, CheckCircle2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const ComplaintCard = ({ complaint, onVote, currentUserId }) => {
  const { title, description, category, voteCount, createdAt, status, votes, authorName } = complaint;

  const userVote = useMemo(() => {
    return votes?.[currentUserId] || 0;
  }, [votes, currentUserId]);

  const handleUpvote = () => onVote(complaint.id, currentUserId, 1);
  const handleDownvote = () => onVote(complaint.id, currentUserId, -1);

  const getCategoryColor = (cat) => {
    switch(cat?.toLowerCase()) {
      case 'food quality': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'hygiene': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'quantity': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'service': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-panelBorder';
    }
  };

  const isResolved = status === 'resolved';

  return (
    <div className={`bg-[#FDF5E6] border rounded-xl shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 border ${isResolved ? 'border-emerald-200 bg-emerald-50/30' : 'border-[#E8E8D5]'} flex overflow-hidden hover:shadow-lg transition-shadow`}>
      {/* Voting Sidebar */}
      <div className={`w-16 flex flex-col items-center py-4 ${isResolved ? 'bg-emerald-100/50' : 'bg-[#FDFBF7]'} border-r border-[#E8E8D5]`}>
        <button 
          onClick={handleUpvote}
          disabled={isResolved}
          className={`p-2 rounded-full hover:bg-orange-100 transition-all ${userVote === 1 ? 'text-primary scale-110' : 'text-gray-400 opacity-60'}`}
          title="Like"
        >
          <ThumbsUp className={`h-6 w-6 ${userVote === 1 ? 'fill-primary' : ''}`} />
        </button>
        <span className={`font-bold my-1 text-sm ${userVote === 1 ? 'text-primary' : userVote === -1 ? 'text-red-500' : 'text-[#4A3728]'}`}>
          {voteCount || 0}
        </span>
        <button 
          onClick={handleDownvote}
          disabled={isResolved}
          className={`p-2 rounded-full hover:bg-red-50 transition-all ${userVote === -1 ? 'text-red-500 scale-110' : 'text-gray-400 opacity-60'}`}
          title="Dislike"
        >
          <ThumbsDown className={`h-6 w-6 ${userVote === -1 ? 'fill-red-500' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-5 flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getCategoryColor(category)}`}>
              {category}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {createdAt ? formatDistanceToNow(createdAt.toDate(), { addSuffix: true }) : 'Recently'}
            </span>
            <span className="text-xs text-gray-600">by {authorName}</span>
          </div>

          {isResolved && (
            <span className="flex items-center gap-1 text-emerald-600 bg-emerald-100 px-2 py-1 rounded text-xs font-bold">
              <CheckCircle2 className="h-3 w-3" />
              Resolved
            </span>
          )}
        </div>

        <h3 className={`text-lg font-bold ${isResolved ? 'text-gray-600' : 'text-gray-900'} mb-2 line-clamp-1`}>
          {title}
        </h3>
        
        <p className={`${isResolved ? 'text-gray-500' : 'text-gray-700'} text-sm line-clamp-3 overflow-hidden text-ellipsis flex-grow`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default ComplaintCard;
