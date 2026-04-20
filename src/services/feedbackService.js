import { 
  collection, 
  addDoc, 
  getDocs, 
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

export const getTodayDateString = () => {
  const d = new Date();
  // Using local date in YYYY-MM-DD format
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const submitFeedback = async (userId, mealType, rating, comment, photoFile) => {
  try {
    let photoUrl = null;
    // Firebase Cloud Storage would go here. For now, we omit photo upload to keep it simple,
    // or you could use a Base64 string if files are tiny (not recommended for production).
    
    const dateString = getTodayDateString();
    
    const newFeedback = {
      userId,
      mealType,
      rating,
      comment,
      photoUrl,
      dateString,
      timestamp: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'feedbacks'), newFeedback);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return { success: false, error };
  }
};

export const checkHasSubmittedToday = async (userId, mealType) => {
  try {
    const q = query(
      collection(db, 'feedbacks'),
      where("userId", "==", userId),
      where("dateString", "==", getTodayDateString()),
      where("mealType", "==", mealType)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking feedback:", error);
    return false;
  }
};

export const getTodayFeedbackStats = async () => {
  try {
    const q = query(
      collection(db, 'feedbacks'),
      where("dateString", "==", getTodayDateString())
    );
    const querySnapshot = await getDocs(q);
    
    const todayFeedbacks = [];
    querySnapshot.forEach(doc => todayFeedbacks.push(doc.data()));
    
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

    return {
      averageRating: todayFeedbacks.length ? Number((totalRating / todayFeedbacks.length).toFixed(1)) : 0,
      totalCount: todayFeedbacks.length,
      meals: {
        Breakfast: {
          average: meals.Breakfast.count ? Number((meals.Breakfast.total / meals.Breakfast.count).toFixed(1)) : 0,
          count: meals.Breakfast.count
        },
        Lunch: {
          average: meals.Lunch.count ? Number((meals.Lunch.total / meals.Lunch.count).toFixed(1)) : 0,
          count: meals.Lunch.count
        },
        Dinner: {
          average: meals.Dinner.count ? Number((meals.Dinner.total / meals.Dinner.count).toFixed(1)) : 0,
          count: meals.Dinner.count
        }
      }
    };
  } catch (error) {
    console.error("Error fetching feedback stats:", error);
    return { averageRating: 0, totalCount: 0, meals: { Breakfast: 0, Lunch: 0, Dinner: 0 } };
  }
};
