export const getTodayDateString = () => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

export const submitFeedback = async (userId, mealType, rating, comment, photoFile) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock photo URL if file exists
      let photoUrl = null;
      if (photoFile) {
        photoUrl = URL.createObjectURL(photoFile); // Temporary URL for display
      }

      const dateString = getTodayDateString();
      
      const newFeedback = {
        id: Date.now().toString(),
        userId,
        mealType,
        rating,
        comment,
        photoUrl,
        dateString,
        timestamp: Date.now()
      };

      const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
      feedbacks.push(newFeedback);
      localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

      resolve({ success: true, id: newFeedback.id });
    }, 500);
  });
};

export const checkHasSubmittedToday = async (userId, mealType) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
      const dateString = getTodayDateString();
      
      const hasSubmitted = feedbacks.some(
        f => f.userId === userId && f.dateString === dateString && f.mealType === mealType
      );
      
      resolve(hasSubmitted);
    }, 200);
  });
};

export const getTodayFeedbackStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
      const dateString = getTodayDateString();
      
      const todayFeedbacks = feedbacks.filter(f => f.dateString === dateString);
      
      let totalRating = 0;
      const meals = {
        Breakfast: { total: 0, count: 0 },
        Lunch: { total: 0, count: 0 },
        Dinner: { total: 0, count: 0 }
      };
      
      todayFeedbacks.forEach((data) => {
        totalRating += data.rating;
        if (meals[data.mealType]) {
          meals[data.mealType].total += data.rating;
          meals[data.mealType].count += 1;
        }
      });

      resolve({
        averageRating: todayFeedbacks.length ? (totalRating / todayFeedbacks.length).toFixed(1) : 0,
        totalCount: todayFeedbacks.length,
        meals: {
          Breakfast: meals.Breakfast.count ? (meals.Breakfast.total / meals.Breakfast.count).toFixed(1) : 0,
          Lunch: meals.Lunch.count ? (meals.Lunch.total / meals.Lunch.count).toFixed(1) : 0,
          Dinner: meals.Dinner.count ? (meals.Dinner.total / meals.Dinner.count).toFixed(1) : 0,
        }
      });
    }, 200);
  });
};
