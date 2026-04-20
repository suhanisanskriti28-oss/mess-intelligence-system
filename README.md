# Mess Intelligence System

> **A real-world, dynamic web application designed to bring consistency, transparency, and choice to college mess and catering operations.**

---

## 🎯 Problem Statement
**Who is the user?**
College and university students who rely on massive, institutional catering systems (messes) for their daily meals.

**What problem are we solving?**
Institutional mess systems are notoriously opaque. Students often experience inconsistent food quality, poor hygiene, and lacking communication with authorities. Existing complaint mechanisms are typically slow, paper-based, or disorganized WhatsApp groups where valid feedback gets lost. Additionally, students are often forced into a single catering option without the ability to seamlessly switch based on real-time quality reviews.

**Why does this matter?**
Nutrition and daily food quality directly impact student health and academic performance. The "Mess Intelligence System" transforms a unidirectional, dictated food service into a transparent, user-driven ecosystem. By allowing students to track real-time meal reputation scores, push verifiable complaints, and seamlessly switch between active vendors, the system forces caterers to maintain high quality to retain their student customer base.

---

## 🚀 Core Features

* **Authentication System**: Secure signup and login powered by Firebase Authentication, with protected routing via custom `<ProtectedRoute>` wrappers.
* **Meal Reputation Dashboard**: Real-time aggregation of student ratings to generate live "Reputation Scores" for Breakfast, Lunch, and Dinner.
* **Complaint Board**: A democratic, upvote-based complaint tracking system where students can raise specific issues (Hygiene, Quality, Service) and track them to resolution. *(Demonstrates full CRUD operations)*
* **Vendor Selection & Locking**: Allows students to browse full weekly menus of different active caterers and "opt-in" to a new vendor. The choice automatically locks securely on the last day of the month.
* **Interactive 3D UI**: Built with a bespoke maroon/beige light mode and immersive floating 3D elements powered by React Three Fiber for a premium UX.

---

## ⚛️ Technical Implementation & React Coverage

This project strictly adheres to modern React best practices to deliver a scalable architecture:

### Fundamentals
* **Functional Components** & **Hooks** (`useState`, `useEffect`) govern all state and lifecycle events.
* **Props & Component Composition**: Highly reusable UI elements (e.g., `ComplaintCard`, `StarRating`, `Global3DProvider`).
* **Conditional Rendering & Lists**: Dynamic mapping of complaints, menus, and feedback histories.

### Intermediate & Advanced React
* **Context API**: `AuthContext` governs global user state and authentication persistence.
* **React Router DOM**: Secure client-side routing using nested `Routes` and custom `<ProtectedRoute>` wrappers.
* **Lifting State Up**: Inter-component communication handled efficiently (e.g., voting logic).
* **Lazy Loading & Suspense**: Route-level code splitting via `React.lazy()` ensures minimal initial bundle sizes and fast First Contentful Paint times.
* **useCallback & useMemo**: Employed for optimizing derived state computations and preventing unnecessary re-renders.
* **Custom Hooks**: `useAuth`, `useComplaints`, `useFeedback` encapsulate reusable stateful logic.

---

## 🔐 Backend Integration (Firebase)

The application is fully integrated with **Google Firebase** for production-grade backend services:

* **Firebase Authentication**: Secure Email/Password based signup and login with persistent sessions via `onAuthStateChanged`.
* **Cloud Firestore (NoSQL Database)**: All user profiles, complaints, feedback submissions, and vendor opt-ins are stored in Firestore collections (`users`, `complaints`, `feedbacks`, `vendor_opt_ins`).
* **Full CRUD Operations**: Create complaints, read feedback, update votes, delete sessions.
* **Asynchronous Operations**: All data fetches use Promises and `async/await` with proper loading and error states.

---

## 🏗️ Folder Structure
```
src/
├── components/
│   ├── common/      (Navbar, Loader, Modals, 3D Canvas)
│   ├── student/     (ComplaintCards, Reputation components)
│   └── 3d/          (FoodModels, HeroScene)
├── context/         (AuthContext - Global State via Context API)
├── hooks/           (useAuth, useComplaints, useFeedback - Custom Hooks)
├── pages/           (Lazy loaded route-level components)
├── services/        (Firebase config, Firestore CRUD services)
└── utils/           (Helper functions & constants)
```

---

## 💻 Tech Stack
* **Frontend**: React 18 (Vite)
* **Backend**: Firebase (Authentication + Cloud Firestore)
* **Styling**: Tailwind CSS v3
* **3D Rendering**: `@react-three/fiber` & `@react-three/drei`
* **Routing**: `react-router-dom`
* **Notifications**: `react-hot-toast`
* **Icons**: `lucide-react`

---

## ⚙️ Setup Instructions

To run the Mess Intelligence System locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/suhanisanskriti28-oss/mess-intelligence-system.git
   cd mess-intelligence-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **View the app**
   Open your browser and navigate to `http://localhost:5173`. Create a new student account to explore the dashboard.

---

## 🌐 Live Deployment

The application is deployed and accessible at:
**[https://suhanisanskriti28-oss.github.io/mess-intelligence-system/](https://suhanisanskriti28-oss.github.io/mess-intelligence-system/)**

---

## 🔮 Future Scope

* **Admin Dashboard**: A full administrative panel is planned for future development. This will include:
  * Admin login with role-based access control
  * Dashboard with real-time analytics on meal ratings, complaint trends, and vendor performance
  * Ability to review, respond to, and resolve student complaints
  * Feedback moderation tools for reviewing student submissions
  * Vendor and menu management interface
* **Firebase Cloud Storage**: Integration for photo uploads in feedback submissions
* **Push Notifications**: Real-time alerts for complaint status updates
* **Data Visualization**: Advanced charts and trend analysis for meal quality over time
