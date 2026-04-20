import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, Circle, MoreVertical, ExternalLink } from 'lucide-react';
import { markComplaintResolved } from '../../services/complaintService';
import { toast } from 'react-hot-toast';

const ComplaintTable = ({ complaints, onRefresh }) => {
  const [resolvingId, setResolvingId] = useState(null);

  const handleResolve = async (id) => {
    setResolvingId(id);
    const res = await markComplaintResolved(id);
    if (res.success) {
      toast.success("Marked as resolved");
      onRefresh();
    } else {
      toast.error("Failed to resolve");
    }
    setResolvingId(null);
  };

  return (
    <div className="bg-[#FDF5E6] border-panelBorder rounded-xl shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 border border-panelBorder overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#FDFBF7]">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Complaint
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Votes
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#FDF5E6] border-panelBorder divide-y divide-gray-200">
            {complaints.map((complaint) => (
              <tr key={complaint.id} className="hover:bg-primary/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900 line-clamp-1">{complaint.title}</span>
                    <span className="text-xs text-gray-500 line-clamp-1">{complaint.description}</span>
                    <span className="text-xs text-gray-600 mt-1">
                      By {complaint.authorName} • {complaint.createdAt ? formatDistanceToNow(complaint.createdAt.toDate(), { addSuffix: true }) : 'Recently'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-primary/10 text-primary border border-primary/20">
                    {complaint.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">{complaint.voteCount || 0}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {complaint.status === 'resolved' ? (
                    <span className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium">
                      <CheckCircle2 size={16} /> Resolved
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-amber-600 text-sm font-medium">
                      <Circle size={16} /> Open
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {complaint.status === 'open' && (
                    <button
                      onClick={() => handleResolve(complaint.id)}
                      disabled={resolvingId === complaint.id}
                      className="text-primary hover:text-primaryHover font-bold disabled:opacity-50 transition-colors"
                    >
                      {resolvingId === complaint.id ? 'Resolving...' : 'Resolve'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintTable;
