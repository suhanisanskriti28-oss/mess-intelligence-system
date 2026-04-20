import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Utensils, QrCode, Star, ChefHat } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useComplaints } from '../../hooks/useComplaints';
import { useEffect } from 'react';
import { getTodayMenu, getCurrentVendor } from '../../services/menuService';
import { getTodayFeedbackStats } from '../../services/feedbackService';
import MealReputation from '../../components/student/MealReputation';
import ComplaintCard from '../../components/student/ComplaintCard';
import MealPassModal from '../../components/student/MealPassModal';
import Loader from '../../components/common/Loader';

const StudentHome = () => {
  const { currentUser } = useAuth();
  const { complaints, handleVote, loading } = useComplaints();
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const [scores, setScores] = useState({
    Breakfast: { average: 0, count: 0 },
    Lunch: { average: 0, count: 0 },
    Dinner: { average: 0, count: 0 }
  });

  // Fetch Menu & Vendor
  const dailyMenu = getTodayMenu();
  const vendor = getCurrentVendor();

  useEffect(() => {
    const fetchStats = async () => {
      const stats = await getTodayFeedbackStats();
      if (stats && stats.meals) {
        setScores({
          Breakfast: stats.meals.Breakfast,
          Lunch: stats.meals.Lunch,
          Dinner: stats.meals.Dinner
        });
      }
    };
    fetchStats();
  }, []);

  // Sort complaints by most voted and take top 5
  const topComplaints = useMemo(() => {
    return [...complaints]
      .sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0))
      .slice(0, 5);
  }, [complaints]);

  if (loading) return <Loader text="Loading your dashboard..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Header & QR Action */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight">Welcome, {currentUser?.name || 'Student'}! 👋</h1>
          <p className="text-[#4A3728]/70 mt-1">Check today's menu and your meal reputation.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsQrModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-bold text-[#4A3728] bg-[#FDF5E6] border border-[#E8E8D5] shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 hover:bg-gray-50 transition-colors"
          >
            <QrCode size={18} />
            Show Meal Pass
          </button>
          <Link 
            to="/student/feedback"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-bold text-white bg-primary hover:bg-primaryHover transition-colors shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300"
          >
            <Utensils size={18} />
            Rate Meal
          </Link>
        </div>
      </div>

      {/* Vendor Banner */}
      <div className="bg-gradient-to-r from-primary to-neonOrange rounded-2xl shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 p-6 sm:p-8 mb-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
        <div className="absolute -right-10 -top-10 opacity-10 pointer-events-none">
          <ChefHat size={180} />
        </div>
        <div className="relative z-10 flex-1">
          <div className="text-orange-200 font-bold tracking-wider text-xs uppercase mb-1">Vendor of the Month</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold">{vendor.name}</h2>
          <p className="text-orange-100 mt-2 max-w-xl">{vendor.tagline}</p>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center bg-[#FDF5E6] border-panelBorder backdrop-blur-md px-6 py-4 rounded-xl border">
          <span className="text-xs font-semibold text-gray-500 uppercase mb-1">Current Rating</span>
          <div className="flex items-center gap-1.5 text-3xl font-bold text-yellow-500">
            {vendor.rating} <Star className="fill-yellow-500 h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Today's Menu Column */}
        <div className="lg:col-span-1 flex flex-col">
          <h2 className="text-xl font-extrabold text-primary mb-4">Today's Menu</h2>
          <div className="bg-[#FDF5E6] border-panelBorder rounded-xl shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 border border-panelBorder flex-grow p-1">
            {Object.entries(dailyMenu).map(([mealType, items], index) => (
              <div 
                key={mealType} 
                className={`p-5 ${index !== 0 ? 'border-t border-panelBorder' : ''}`}
              >
                <h3 className="font-extrabold text-primary mb-3 text-sm tracking-wide uppercase">{mealType}</h3>
                <ul className="space-y-2">
                  {items.map((item, idx) => (
                    <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                      <span className="text-primary mt-1">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Reputation & Complaints */}
        <div className="lg:col-span-2 flex flex-col space-y-8">
          <div>
            <h2 className="text-xl font-bold text-primary mb-4">Meal Reputation</h2>
            <div className="responsive-grid border border-transparent">
              <MealReputation mealType="Breakfast" score={scores.Breakfast.average} count={scores.Breakfast.count} />
              <MealReputation mealType="Lunch" score={scores.Lunch.average} count={scores.Lunch.count} />
              <MealReputation mealType="Dinner" score={scores.Dinner.average} count={scores.Dinner.count} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-primary">Trending Complaints</h2>
              <Link 
                to="/student/complaints"
                className="text-primary font-medium hover:text-primaryHover transition-colors text-sm"
              >
                View All &rarr;
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {topComplaints.length > 0 ? (
                topComplaints.map(complaint => (
                  <ComplaintCard 
                    key={complaint.id} 
                    complaint={complaint} 
                    onVote={handleVote}
                    currentUserId={currentUser.uid}
                  />
                ))
              ) : (
                <div className="bg-[#FDF5E6] border-[#E8E8D5] rounded-xl p-8 text-center shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 border">
                  <div className="inline-flex items-center justify-center p-3 bg-orange-50 rounded-full mb-3">
                    <PlusCircle className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-[#4A3728] font-medium">No complaints yet. Things must be perfect!</p>
                  <Link 
                    to="/student/complaints"
                    className="mt-4 inline-block text-primary hover:underline text-sm font-medium"
                  >
                    Post a new complaint
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <MealPassModal 
        isOpen={isQrModalOpen} 
        onClose={() => setIsQrModalOpen(false)} 
        user={currentUser}
      />
    </div>
  );
};

export default StudentHome;
