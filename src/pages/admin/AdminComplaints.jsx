import React, { useState, useMemo } from 'react';
import { Filter, Search } from 'lucide-react';
import { useComplaints } from '../../hooks/useComplaints';
import ComplaintTable from '../../components/admin/ComplaintTable';
import Loader from '../../components/common/Loader';

const AdminComplaints = () => {
  const { complaints, refreshComplaints, loading } = useComplaints();
  
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Food Quality', 'Hygiene', 'Quantity', 'Service', 'Other'];
  const statuses = ['All', 'open', 'resolved'];

  const filteredComplaints = useMemo(() => {
    return complaints.filter(c => {
      const matchCat = filterCategory === 'All' || c.category === filterCategory;
      const matchStatus = filterStatus === 'All' || c.status === filterStatus;
      const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchStatus && matchSearch;
    });
  }, [complaints, filterCategory, filterStatus, searchQuery]);

  if (loading) return <Loader text="Loading complaints database..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">Complaint Management</h1>
        <p className="text-[#4A3728]/70 mt-1">Review, filter, and resolve student issues.</p>
      </div>

      <div className="bg-[#FDF5E6] border-panelBorder p-6 rounded-xl shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 border border-panelBorder mb-8 mt-4 flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-grow">
          <label className="block text-sm font-bold text-gray-700 mb-2">Search Issues</label>
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-600" />
            </div>
            <input 
              type="text" 
              placeholder="Search titles or descriptions..." 
              className="w-full pl-10 pr-4 py-2.5 bg-darkBg border border-panelBorder rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-[#FDF5E6] border-panelBorder transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="md:w-48">
          <label className="block text-sm font-bold text-gray-700 mb-2">Category Filter</label>
          <select 
            className="w-full px-4 py-2.5 bg-darkBg border border-panelBorder rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-[#FDF5E6] border-panelBorder transition-colors"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="md:w-48">
          <label className="block text-sm font-bold text-gray-700 mb-2">Status Filter</label>
          <select 
            className="w-full px-4 py-2.5 bg-darkBg border border-panelBorder rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-[#FDF5E6] border-panelBorder transition-colors"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {statuses.map(s => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>
      </div>

      <div className="mb-4 text-sm text-gray-500 font-medium">
        Showing {filteredComplaints.length} result(s)
      </div>

      {filteredComplaints.length > 0 ? (
        <ComplaintTable complaints={filteredComplaints} onRefresh={refreshComplaints} />
      ) : (
        <div className="text-center py-20 bg-[#FDF5E6] border-panelBorder rounded-xl border border-dashed border-panelBorder">
          <Filter className="h-10 w-10 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No complaints match your filters.</p>
          <button 
            onClick={() => { setFilterCategory('All'); setFilterStatus('All'); setSearchQuery(''); }}
            className="mt-3 text-primary text-sm font-medium hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminComplaints;
