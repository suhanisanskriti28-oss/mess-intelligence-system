import { VENDORS } from './vendorService';

export const VENDOR_OF_THE_MONTH = VENDORS[0]; // Gaura's Secret Recipe

const WEEKLY_MENU = {
  0: { // Sunday
    Breakfast: ["Aloo Paratha with Curd", "Banana", "Tea / Coffee"],
    Lunch: ["Rajma Chawal", "Mix Veg", "Raita", "Salad"],
    Dinner: ["Veg Biryani", "Dal Makhani", "Gulab Jamun", "Papad"]
  },
  1: { // Monday
    Breakfast: ["Poha", "Boiled Eggs", "Tea / Milk"],
    Lunch: ["Dal Tadka", "Seasonal Veg", "Roti", "Rice", "Salad"],
    Dinner: ["Paneer Butter Masala", "Dal Fry", "Roti", "Brownie"]
  },
  2: { // Tuesday
    Breakfast: ["Idli Sambar", "Coconut Chutney", "Fruit", "Coffee"],
    Lunch: ["Chole Bhature", "Jeera Rice", "Onion Salad"],
    Dinner: ["Kadhi Pakora", "Rice", "Aloo Gobi", "Roti", "Kheer"]
  },
  3: { // Wednesday
    Breakfast: ["Masala Dosa", "Fruit Salad", "Filter Coffee"],
    Lunch: ["Dal Makhani", "Shahi Paneer", "Naan", "Jeera Rice"],
    Dinner: ["Mix Veg Curry", "Roti", "Dal Tadka", "Ice Cream"]
  },
  4: { // Thursday
    Breakfast: ["Upma", "Vada", "Tea / Milk"],
    Lunch: ["Pulao", "Matar Paneer", "Boondi Raita", "Salad"],
    Dinner: ["Egg Curry / Soya Chaap", "Rice", "Roti", "Jalebi"]
  },
  5: { // Friday
    Breakfast: ["Pancakes with Syrup", "Omelet", "Juice"],
    Lunch: ["Chicken Curry / Paneer Tikka", "Fried Rice", "Naan"],
    Dinner: ["Dal Palak", "Jeera Aloo", "Roti", "Rasgulla"]
  },
  6: { // Saturday
    Breakfast: ["Puri Bhaji", "Jalebi", "Tea"],
    Lunch: ["Dal Bati Churma", "Garlic Chutney", "Papad"],
    Dinner: ["Pav Bhaji", "Masala Pulao", "Salad", "Custard"]
  }
};

export const getTodayMenu = () => {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date().getDay();
  const todayName = dayNames[today];
  return VENDOR_OF_THE_MONTH.fullMenu[todayName];
};

export const getCurrentVendor = () => {
  return VENDOR_OF_THE_MONTH;
};
