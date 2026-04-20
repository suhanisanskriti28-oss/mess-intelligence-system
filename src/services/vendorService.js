// Hardcoded mock data for the 3 distinct vendors
export const VENDORS = [
  {
    id: "v1_gaura",
    name: "Gaura's Secret Recipe",
    tagline: "Authentic & Traditional Indian Homestyle Meals",
    rating: "4.8",
    priceRange: "Standard",
    color: "bg-primary",
    menuExtract: {
      Breakfast: "Aloo Paratha, Poha, Kachori, Masala Chai",
      Lunch: "Rajma Chawal, Kadhai Paneer, Roti, Boondi Raita",
      Dinner: "Dal Makhani, Butter Naan, Gulab Jamun"
    },
    fullMenu: {
      Monday:    { Breakfast: ["Poha", "Boiled Eggs", "Masala Chai"], Lunch: ["Dal Tadka", "Aloo Sabzi", "Roti", "Rice"], Dinner: ["Paneer Butter Masala", "Naan", "Dal Fry"] },
      Tuesday:   { Breakfast: ["Aloo Paratha", "Curd", "Pickle"], Lunch: ["Rajma Chawal", "Seasonal Veg", "Raita"], Dinner: ["Kadhi Pakora", "Jeera Rice", "Roti"] },
      Wednesday: { Breakfast: ["Besan Chilla", "Green Chutney", "Tea"], Lunch: ["Chole", "Bhature", "Onion Salad"], Dinner: ["Matar Paneer", "Roti", "Dal Tadka", "Rice"] },
      Thursday:  { Breakfast: ["Upma", "Coconut Chutney", "Coffee"], Lunch: ["Kadhai Paneer", "Butter Roti", "Rice"], Dinner: ["Palak Dal", "Aloo Gobi", "Roti"] },
      Friday:    { Breakfast: ["Kachori", "Sabzi", "Chai"], Lunch: ["Boondi Raita", "Pulao", "Mix Veg"], Dinner: ["Shahi Paneer", "Naan", "Kheer"] },
      Saturday:  { Breakfast: ["Idli Sambar", "Coconut Chutney"], Lunch: ["Dal Makhani", "Jeera Rice", "Papad"], Dinner: ["Veg Biryani", "Raita", "Gulab Jamun"] },
      Sunday:    { Breakfast: ["Puri", "Aloo Bhaji", "Halwa"], Lunch: ["Special Thali — Dal, Sabzi, Roti, Rice, Dessert"], Dinner: ["Paneer Do Pyaza", "Pulao", "Ice Cream"] }
    }
  },
  {
    id: "v2_uniworld",
    name: "Uniworld Mess",
    tagline: "Cosmopolitan flavors mixed with local favorites",
    rating: "4.2",
    priceRange: "Premium",
    color: "bg-neonOrange",
    menuExtract: {
      Breakfast: "Pancakes, Continental Breakfast, Fresh Juices",
      Lunch: "Chicken Curry, Mixed Veg, Hakka Noodles",
      Dinner: "Pasta Alfredo, Dal Palak, Ice Cream"
    },
    fullMenu: {
      Monday:    { Breakfast: ["Pancakes with Maple Syrup", "Orange Juice", "Coffee"], Lunch: ["Chicken Curry", "Steamed Rice", "Salad"], Dinner: ["Pasta Alfredo", "Garlic Bread", "Custard"] },
      Tuesday:   { Breakfast: ["Continental Breakfast", "Boiled Eggs", "Toast"], Lunch: ["Mixed Veg Stir-fry", "Hakka Noodles", "Manchurian"], Dinner: ["Dal Palak", "Jeera Rice", "Ice Cream"] },
      Wednesday: { Breakfast: ["French Toast", "Juice", "Tea"], Lunch: ["Butter Chicken (or Soya)", "Naan", "Dal"], Dinner: ["Veg Lasagna", "Salad", "Mousse"] },
      Thursday:  { Breakfast: ["Croissant", "Jam", "Coffee"], Lunch: ["Fried Rice", "Chilli Paneer", "Soup"], Dinner: ["Creamy Tomato Pasta", "Bread Roll", "Ice Cream"] },
      Friday:    { Breakfast: ["Waffles", "Honey", "Fresh Fruit"], Lunch: ["Egg Bhurji / Paneer Bhurji", "Paratha", "Pickle"], Dinner: ["Spaghetti Bolognese (Veg)", "Garlic Bread"] },
      Saturday:  { Breakfast: ["Omelette", "Toast", "Juice"], Lunch: ["Biryani (Veg/Chicken)", "Raita", "Pickle"], Dinner: ["Mezze Platter", "Pita", "Dip", "Brownie"] },
      Sunday:    { Breakfast: ["Pancake Stack", "Syrup", "Juice"], Lunch: ["Sunday Special Thali"], Dinner: ["Pizza Night — Margherita or Mix Veg", "Soft Drink"] }
    }
  },
  {
    id: "v3_craving",
    name: "The Craving Brew",
    tagline: "Cafe-style contemporary and fast-food focused",
    rating: "4.6",
    priceRange: "Standard",
    color: "bg-neonPurple",
    menuExtract: {
      Breakfast: "Grilled Sandwiches, Cold Coffee, Hash Browns",
      Lunch: "Burgers, Wraps, Cheesy Fries, Lemonade",
      Dinner: "Mac & Cheese, Thin Crust Pizza, Brownie Sizzler"
    },
    fullMenu: {
      Monday:    { Breakfast: ["Grilled Cheese Sandwich", "Cold Coffee", "Hash Browns"], Lunch: ["Classic Burger", "Cheesy Fries", "Lemonade"], Dinner: ["Mac & Cheese", "Veg Soup"] },
      Tuesday:   { Breakfast: ["Egg Roll", "Masala Chai", "Banana"], Lunch: ["Chicken Wrap / Paneer Wrap", "Fries", "Cola"], Dinner: ["Thin Crust Pizza", "Coleslaw"] },
      Wednesday: { Breakfast: ["Avocado Toast", "Smoothie"], Lunch: ["Loaded Nachos", "Salsa", "Sour Cream"], Dinner: ["Pasta Bake", "Garlic Bread", "Brownie"] },
      Thursday:  { Breakfast: ["Poached Eggs", "Toast", "OJ"], Lunch: ["Veg Hot Dog", "Fries", "Milkshake"], Dinner: ["BBQ Paneer Bowl", "Rice", "Coleslaw"] },
      Friday:    { Breakfast: ["Granola Bowl", "Yogurt", "Berries"], Lunch: ["Double Decker Burger", "Onion Rings"], Dinner: ["Brownie Sizzler", "Ice Cream", "Waffle Sandwich"] },
      Saturday:  { Breakfast: ["Grilled Sandwich", "Dip Sauce", "Coffee"], Lunch: ["Tex-Mex Bowl", "Chips", "Dip"], Dinner: ["Cheesy Veg Pizza", "Soft Drink"] },
      Sunday:    { Breakfast: ["Cold Coffee", "Muffin", "Fruit Bowl"], Lunch: ["Sunday Brunch Spread — Sliders, Rolls, Fries"], Dinner: ["Cheesy Pasta", "Brownie Sizzler", "Juice"] }
    }
  }
];

export const getVendors = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(VENDORS);
    }, 400); // Simulate network load
  });
};

export const optInVendor = async (userId, vendorId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const optIns = JSON.parse(localStorage.getItem('vendor_opt_ins') || '{}');
      optIns[userId] = vendorId;
      localStorage.setItem('vendor_opt_ins', JSON.stringify(optIns));
      resolve({ success: true, vendorId });
    }, 500);
  });
};

export const getStudentOptIn = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const optIns = JSON.parse(localStorage.getItem('vendor_opt_ins') || '{}');
      resolve(optIns[userId] || null); // Returns vendorId or null
    }, 200);
  });
};
