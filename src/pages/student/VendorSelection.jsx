import React, { useState, useEffect } from 'react';
import { CheckCircle2, ChevronRight, Store, CalendarRange, Lock, BookOpen, X, Utensils } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { getVendors, optInVendor, getStudentOptIn } from '../../services/vendorService';
import Loader from '../../components/common/Loader';

// Helper: Check if vendor changes are locked (last day of month)
const isVendorChangeLocked = () => {
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  return today.getDate() >= lastDay;
};

// Full Weekly Menu Modal
const FullMenuModal = ({ vendor, onClose }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const meals = ['Breakfast', 'Lunch', 'Dinner'];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-[#4A3728]/40 backdrop-blur-sm" />
      <div
        className="relative bg-[#FDFBF7] rounded-t-3xl sm:rounded-3xl shadow-2xl shadow-primary/20 max-w-3xl w-full max-h-[92vh] sm:max-h-[85vh] overflow-hidden flex flex-col border border-[#E8E8D5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`${vendor.color} p-6 flex items-center justify-between`}>
          <div>
            <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">Full Weekly Menu</p>
            <h2 className="text-2xl font-extrabold text-white">{vendor.name}</h2>
            <p className="text-white/70 text-sm mt-1">{vendor.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Menu */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="space-y-4">
            {days.map((day) => (
              <div key={day} className="bg-white rounded-2xl border border-[#E8E8D5] shadow-sm overflow-hidden">
                <div className="bg-primary/10 px-5 py-2.5 border-b border-[#E8E8D5]">
                  <h3 className="font-extrabold text-primary text-sm tracking-wide uppercase">{day}</h3>
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-3 divide-y xs:divide-y-0 xs:divide-x divide-[#E8E8D5]">
                  {meals.map((meal) => (
                    <div key={meal} className="p-4">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Utensils size={13} className="text-neonOrange" />
                        <span className="text-xs font-bold text-[#4A3728] uppercase tracking-wider">{meal}</span>
                      </div>
                      <ul className="space-y-1">
                        {(vendor.fullMenu?.[day]?.[meal] || []).map((item, i) => (
                          <li key={i} className="text-gray-600 text-sm flex items-start gap-1.5">
                            <span className="text-primary mt-0.5 text-xs">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const VendorSelection = () => {
  const { currentUser } = useAuth();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeOptIn, setActiveOptIn] = useState(null);
  const [submittingId, setSubmittingId] = useState(null);
  const [menuModalVendor, setMenuModalVendor] = useState(null);

  const locked = isVendorChangeLocked();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [vendorData, currentOptIn] = await Promise.all([
        getVendors(),
        getStudentOptIn(currentUser.uid)
      ]);
      setVendors(vendorData);
      setActiveOptIn(currentOptIn);
      setLoading(false);
    };
    fetchData();
  }, [currentUser.uid]);

  const handleOptIn = async (vendorId, vendorName) => {
    if (locked) {
      toast.error("Vendor selection is locked! Changes reopen on the 1st of next month.");
      return;
    }
    setSubmittingId(vendorId);
    try {
      const res = await optInVendor(currentUser.uid, vendorId);
      if (res.success) {
        setActiveOptIn(vendorId);
        toast.success(`Opted into ${vendorName} for next month!`);
      }
    } catch (err) {
      toast.error("Failed to opt-in. Try again.");
    } finally {
      setSubmittingId(null);
    }
  };

  if (loading) return <Loader text="Loading available vendors..." />;

  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const nextMonthName = nextMonth.toLocaleString('default', { month: 'long' });
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  return (
    <>
      {menuModalVendor && (
        <FullMenuModal vendor={menuModalVendor} onClose={() => setMenuModalVendor(null)} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold text-primary tracking-tight">Select Your Vendor</h1>
          <p className="text-[#4A3728] mt-3 text-lg">
            Browse the monthly menus and choose your preferred caterer for{' '}
            <span className="font-bold text-primary">{nextMonthName}</span>.
          </p>

          {/* Lock Status Banner */}
          {locked ? (
            <div className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-red-50 border border-red-200 rounded-full shadow-sm text-red-700 font-semibold text-sm">
              <Lock size={15} />
              Selection locked, opens again on the 1st of next month
            </div>
          ) : (
            <div className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-green-50 border border-green-200 rounded-full shadow-sm text-green-700 font-semibold text-sm">
              <CalendarRange size={15} />
              Open for changes until day {lastDay} of this month
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {vendors.map((vendor) => {
            const isSelected = activeOptIn === vendor.id;
            const isSubmitting = submittingId === vendor.id;

            return (
              <div
                key={vendor.id}
                className={`flex flex-col rounded-2xl overflow-hidden transition-all duration-300 border-2 ${
                  isSelected
                    ? 'border-primary ring-4 ring-primary/10 lg:scale-105 z-10 shadow-2xl shadow-primary/25'
                    : 'border-[#E8E8D5] shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1'
                }`}
              >
                {/* Colored Vendor Header */}
                <div className={`${vendor.color} p-6 text-white relative`}>
                  {isSelected && !locked && (
                    <div className="absolute top-4 right-4 bg-white text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                      <CheckCircle2 size={14} /> Selected
                    </div>
                  )}
                  {locked && (
                    <div className="absolute top-4 right-4 bg-black/20 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Lock size={12} /> Locked
                    </div>
                  )}
                  <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Store className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-1">{vendor.name}</h2>
                  <p className="text-white/80 text-sm font-medium">{vendor.tagline}</p>
                  <div className="mt-4 flex gap-2">
                    <span className="bg-white/20 text-white px-2.5 py-1 rounded-lg text-xs font-bold">⭐ {vendor.rating}</span>
                    <span className="bg-white/20 text-white px-2.5 py-1 rounded-lg text-xs font-bold">{vendor.priceRange}</span>
                  </div>
                </div>

                {/* Menu Highlight Section */}
                <div className="p-6 flex-grow flex flex-col bg-[#FDF5E6]">
                  <div className="flex items-center justify-between mb-4 border-b border-[#E8E8D5] pb-2">
                    <div className="flex items-center gap-2 text-[#4A3728] font-bold text-sm">
                      <CalendarRange size={17} className="text-primary" />
                      Menu Highlight
                    </div>
                    <button
                      onClick={() => setMenuModalVendor(vendor)}
                      className="flex items-center gap-1 text-xs font-bold text-primary hover:text-primaryHover transition-colors underline underline-offset-2"
                    >
                      <BookOpen size={13} /> View Full Menu
                    </button>
                  </div>

                  <ul className="space-y-3 mb-6 flex-grow">
                    {['Breakfast', 'Lunch', 'Dinner'].map((meal) => (
                      <li key={meal} className="text-sm">
                        <span className="block font-bold text-[#4A3728] mb-0.5">{meal}</span>
                        <span className="text-gray-600 leading-relaxed">{vendor.menuExtract[meal]}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Opt-In Button */}
                  <button
                    onClick={() => handleOptIn(vendor.id, vendor.name)}
                    disabled={isSelected || isSubmitting || locked}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                      isSelected
                        ? 'bg-green-100 text-green-800 cursor-not-allowed border border-green-200'
                        : locked
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                        : 'bg-primary hover:bg-primaryHover text-white shadow-md hover:shadow-xl hover:-translate-y-0.5'
                    }`}
                  >
                    {isSubmitting ? (
                      'Processing...'
                    ) : isSelected ? (
                      <><CheckCircle2 size={16} /> Opted In for {nextMonthName}</>
                    ) : locked ? (
                      <><Lock size={16} /> Selection Locked</>
                    ) : (
                      <>Opt-In for {nextMonthName} <ChevronRight size={18} /></>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default VendorSelection;
