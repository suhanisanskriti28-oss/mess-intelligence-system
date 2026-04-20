import React, { useState, useEffect } from 'react';
import { Camera, Image as ImageIcon, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useFeedback } from '../../hooks/useFeedback';
import StarRating from '../../components/common/StarRating';
import Loader from '../../components/common/Loader';

const MEALS = ['Breakfast', 'Lunch', 'Dinner'];

const FeedbackPage = () => {
  const { currentUser } = useAuth();
  const { submitMealFeedback, checkSubmission, loading } = useFeedback();

  const [activeTab, setActiveTab] = useState('Breakfast');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [checking, setChecking] = useState(true);

  // Check if submitted whenever tab changes
  useEffect(() => {
    const checkStatus = async () => {
      setChecking(true);
      const isSub = await checkSubmission(currentUser.uid, activeTab);
      setHasSubmitted(isSub);
      setChecking(false);
      
      // Reset form on tab change
      setRating(0);
      setComment('');
      setPhoto(null);
      setPhotoPreview(null);
    };
    checkStatus();
  }, [activeTab, currentUser.uid, checkSubmission]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a star rating');
      return;
    }

    const response = await submitMealFeedback(
      currentUser.uid,
      activeTab,
      rating,
      comment,
      photo
    );

    if (response.success) {
      toast.success('Feedback submitted successfully!');
      setHasSubmitted(true);
    } else {
      toast.error('Failed to submit feedback');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">Daily Meal Feedback</h1>
        <p className="text-[#4A3728]/70 mt-1">Help us improve the food quality by rating your meals.</p>
      </div>

      <div className="bg-[#FDF5E6] border-panelBorder rounded-2xl shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 border border-panelBorder overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-panelBorder">
          {MEALS.map((meal) => (
            <button
              key={meal}
              onClick={() => setActiveTab(meal)}
              className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${
                activeTab === meal
                  ? 'bg-primary/5 text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-darkBg'
              }`}
            >
              {meal}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {checking ? (
            <Loader fullScreen={false} text="Checking submission status..." />
          ) : hasSubmitted ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center p-4 bg-emerald-100 rounded-full mb-4">
                <Send className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Already Submitted</h3>
              <p className="text-gray-500">You have already provided feedback for {activeTab} today. Thank you!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex flex-col items-center justify-center p-6 bg-white/60 rounded-xl border border-[#E8E8D5]">
                <label className="block text-sm font-bold text-[#4A3728] mb-4 text-center">
                  How was the {activeTab.toLowerCase()}?
                </label>
                <div className="transform scale-125">
                  <StarRating rating={rating} onRatingChange={setRating} />
                </div>
              </div>

              <div>
                <label htmlFor="comment" className="block text-sm font-bold text-[#4A3728] mb-2">
                  Additional Comments <span className="text-gray-600 font-normal">(Optional)</span>
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  className="w-full px-4 py-3 border border-[#E8E8D5] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-[#4A3728] placeholder-gray-400"
                  placeholder="What's on your mind? Was the curry too spicy? Let us know."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#4A3728] mb-2">
                  Photo Evidence <span className="text-gray-600 font-normal">(Optional)</span>
                </label>
                
                {photoPreview ? (
                  <div className="relative inline-block">
                    <img src={photoPreview} alt="Preview" className="h-40 w-full md:w-64 object-cover rounded-xl border border-panelBorder" />
                    <button
                      type="button"
                      onClick={() => { setPhoto(null); setPhotoPreview(null); }}
                      className="absolute top-2 right-2 bg-gray-900/60 hover:bg-gray-900 text-gray-900 p-1.5 rounded-full text-xs transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#E8E8D5] border-dashed rounded-xl cursor-pointer bg-white/60 hover:bg-primary/5 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
                      <Camera className="h-8 w-8 mb-2 text-primary/50" />
                      <p className="text-sm font-medium">Click to upload a photo</p>
                      <p className="text-xs mt-1">PNG, JPG up to 5MB</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                  </label>
                )}
              </div>

              <div className="pt-4 border-t border-panelBorder">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto md:px-12 flex justify-center items-center py-3 px-4 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primaryHover shadow-md hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
