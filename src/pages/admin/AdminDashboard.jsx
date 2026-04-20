import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Star, MessageSquare, AlertTriangle, TrendingDown, ChefHat } from 'lucide-react';
import StatsCard from '../../components/admin/StatsCard';
import TrendChart from '../../components/admin/TrendChart';
import ComplaintTable from '../../components/admin/ComplaintTable';
import { useComplaints } from '../../hooks/useComplaints';
import { getCurrentVendor } from '../../services/menuService';
import { getTodayFeedbackStats } from '../../services/feedbackService';
import Loader from '../../components/common/Loader';

// Mock data for charts
const trendData = [
  { date: 'Mon', complaints: 4 }, { date: 'Tue', complaints: 3 },
  { date: 'Wed', complaints: 8 }, { date: 'Thu', complaints: 2 },
  { date: 'Fri', complaints: 6 }, { date: 'Sat', complaints: 1 },
  { date: 'Sun', complaints: 5 },
];

const peakTimeData = [
  { meal: 'Breakfast', dissatisfaction: 20 },
  { meal: 'Lunch', dissatisfaction: 65 },
  { meal: 'Dinner', dissatisfaction: 15 },
];

const COLORS = ['#800000', '#8B4513', '#5C4033', '#C0392B', '#A0522D'];

const AdminDashboard = () => {
  const { complaints, refreshComplaints, loading: complaintsLoading } = useComplaints();
  const vendor = getCurrentVendor();
  const [feedbackStats, setFeedbackStats] = React.useState(null);

  React.useEffect(() => {
    const fetchStats = async () => {
      const stats = await getTodayFeedbackStats();
      setFeedbackStats(stats);
    }
    fetchStats();
  }, []);

  // Calculate stats from complaints
  const stats = useMemo(() => {
    const total = complaints.length;
    const resolved = complaints.filter(c => c.status === 'resolved').length;
    const open = total - resolved;
    
    // Category counts for pie chart
    const cats = {};
    complaints.forEach(c => {
      cats[c.category] = (cats[c.category] || 0) + 1;
    });
    
    const pieData = Object.keys(cats).map(key => ({
      name: key,
      value: cats[key]
    }));

    return { total, open, resolved, pieData };
  }, [complaints]);

  if (complaintsLoading || !feedbackStats) return <Loader text="Loading dashboard analytics..." />;

  // Calculate lowest rated meal
  let lowestMeal = "No Ratings";
  let lowestRating = 5;
  Object.entries(feedbackStats.meals).forEach(([meal, rating]) => {
    const r = parseFloat(rating);
    if (r > 0 && r < lowestRating) {
      lowestRating = r;
      lowestMeal = meal;
    }
  });

  // Convert meal ratings for the bar chart
  const dynamicPeakTimeData = [
    { meal: 'Breakfast', dissatisfaction: Math.max(0, 5 - parseFloat(feedbackStats.meals.Breakfast || 5)).toFixed(1) },
    { meal: 'Lunch', dissatisfaction: Math.max(0, 5 - parseFloat(feedbackStats.meals.Lunch || 5)).toFixed(1) },
    { meal: 'Dinner', dissatisfaction: Math.max(0, 5 - parseFloat(feedbackStats.meals.Dinner || 5)).toFixed(1) },
  ];

  // Recent complaints (top 5)
  const recentComplaints = complaints.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight">Admin Dashboard</h1>
          <p className="text-[#4A3728]/70 mt-1">Overview of mess operations and student feedback.</p>
        </div>
        
        {/* Active Vendor Small Badge */}
        <div className="flex items-center gap-3 bg-[#FDF5E6] border border-[#E8E8D5] px-4 py-2.5 rounded-xl shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300">
          <div className="bg-primary/10 p-2 rounded-lg">
            <ChefHat className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-[#4A3728]/60 font-bold uppercase tracking-wider">Active Vendor</p>
            <p className="text-sm font-bold text-primary">{vendor.name}</p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Today's Average" 
          value={feedbackStats.averageRating || "N/A"} 
          icon={Star} 
          colorClass="bg-primary/10 text-primary"
          subtitle={`${feedbackStats.totalCount} ratings today`}
        />
        <StatsCard 
          title="Total Complaints" 
          value={stats.total} 
          icon={MessageSquare} 
          colorClass="bg-neonOrange/10 text-neonOrange"
        />
        <StatsCard 
          title="Open Issues" 
          value={stats.open} 
          icon={AlertTriangle} 
          colorClass="bg-amber-100 text-amber-700"
          subtitle={`${stats.resolved} resolved`}
        />
        <StatsCard 
          title="Lowest Rated Meal" 
          value={lowestMeal} 
          icon={TrendingDown} 
          colorClass="bg-red-50 text-red-700"
          subtitle={lowestMeal === "No Ratings" ? "" : `Avg: ${lowestRating.toFixed(1)}/5`}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <TrendChart data={trendData} />
        </div>
        
        <div className="bg-[#FDF5E6] border border-[#E8E8D5] rounded-xl shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col">
          <h3 className="text-lg font-extrabold text-primary mb-1">Issue Distribution</h3>
          <div className="flex-grow flex items-center justify-center -ml-6">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={stats.pieData.length ? stats.pieData : [{name: 'No Data', value: 1}]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {(stats.pieData.length ? stats.pieData : [{name: 'No Data', value: 1}]).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={stats.pieData.length ? COLORS[index % COLORS.length] : '#E5E7EB'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-gray-600">
            {stats.pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                <span className="truncate">{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Peak Dissatisfaction Bar Chart */}
        <div className="bg-[#FDF5E6] border border-[#E8E8D5] rounded-xl shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 p-6">
           <h3 className="text-lg font-extrabold text-primary mb-1">Dissatisfaction by Meal</h3>
           <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dynamicPeakTimeData}>
                <XAxis dataKey="meal" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                <Bar dataKey="dissatisfaction" fill="#800000" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
           </div>
        </div>

        {/* Recent Complaints Table */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-extrabold text-primary">Recent Complaints</h2>
          </div>
          <ComplaintTable complaints={recentComplaints} onRefresh={refreshComplaints} />
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
