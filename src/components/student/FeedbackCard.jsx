import React from 'react';
import StarRating from '../common/StarRating';
import { Camera } from 'lucide-react';

const FeedbackCard = ({ mealType, rating, comment, photoUrl, dateString }) => {
  return (
    <div className="bg-[#FDF5E6] border-panelBorder rounded-xl shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 border border-panelBorder p-5 transition-all hover:shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-xs font-semibold text-primary bg-indigo-50 px-2 py-1 rounded-md mb-2 inline-block">
            {mealType}
          </span>
          <div className="text-xl font-bold text-gray-900 mt-1">{dateString}</div>
        </div>
        <div className="bg-darkBg px-3 py-1.5 rounded-lg border border-panelBorder">
          <StarRating rating={rating} readOnly size={18} />
        </div>
      </div>
      
      {comment && (
        <p className="text-gray-600 text-sm italic border-l-2 border-primary pl-3 my-3">
          "{comment}"
        </p>
      )}

      {photoUrl ? (
        <div className="mt-4 rounded-lg overflow-hidden border border-panelBorder">
          <img src={photoUrl} alt="Meal feedback" className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300" />
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-600 bg-darkBg px-3 py-2 rounded-md">
          <Camera size={14} />
          No photo attached
        </div>
      )}
    </div>
  );
};

export default FeedbackCard;
