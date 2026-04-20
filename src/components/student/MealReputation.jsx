import React from 'react';
import { getReputationStatus } from '../../utils/reputationScore';
import { Utensils } from 'lucide-react';

const MealReputation = ({ mealType, score }) => {
  const status = getReputationStatus(score);

  return (
    <div className="bg-[#FDF5E6] border-[#E8E8D5] rounded-xl shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 p-6 border flex flex-col items-center justify-center text-center transition-transform hover:scale-105">
      <div className="bg-orange-50 p-3 rounded-full mb-4">
        <Utensils className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-[#4A3728] tracking-tight mb-1">{mealType}</h3>
      <div className="flex items-end justify-center gap-1 mb-2 text-[#4A3728]">
        <span className="text-3xl font-bold">{score.toFixed(1)}</span>
        <span className="text-gray-500 text-sm mb-1">/ 5.0</span>
      </div>
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-[#FDF5E6] border border-[#E8E8D5] shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 ${status.textValue}`}>
        <span>{status.icon}</span>
        <span>{status.label}</span>
      </div>
    </div>
  );
};

export default MealReputation;
