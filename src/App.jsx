import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Global3DProvider from './components/common/Global3DProvider';

// Common Components
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import Loader from './components/common/Loader';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Student Pages (Lazy Loaded for Advanced React Concepts)
const StudentHome = lazy(() => import('./pages/student/StudentHome'));
const FeedbackPage = lazy(() => import('./pages/student/FeedbackPage'));
const ComplaintsPage = lazy(() => import('./pages/student/ComplaintsPage'));
const VendorSelection = lazy(() => import('./pages/student/VendorSelection'));

function App() {
  return (
    <Router>
      <AuthProvider>
        <Global3DProvider>
          <div className="flex flex-col flex-grow z-10 font-sans relative">
            <Navbar />

            <main className="flex-grow">
              <Suspense fallback={<Loader text="Loading section..." />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

                  {/* Student Protected Routes */}
                  <Route path="/student/home" element={
                    <ProtectedRoute allowedRole="student">
                      <StudentHome />
                    </ProtectedRoute>
                  } />
                  <Route path="/student/feedback" element={
                    <ProtectedRoute allowedRole="student">
                      <FeedbackPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/student/complaints" element={
                    <ProtectedRoute allowedRole="student">
                      <ComplaintsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/student/vendors" element={
                    <ProtectedRoute allowedRole="student">
                      <VendorSelection />
                    </ProtectedRoute>
                  } />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </main>

            <Toaster
              position="top-center"
              toastOptions={{
                className: 'font-medium',
                style: { padding: '16px', borderRadius: '12px' }
              }}
            />
          </div>
        </Global3DProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
