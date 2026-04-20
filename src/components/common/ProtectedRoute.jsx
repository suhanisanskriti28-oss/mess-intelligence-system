import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from './Loader';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { currentUser, userRole } = useAuth();
  const location = useLocation();

  if (currentUser === undefined || userRole === undefined) {
    return <Loader />;
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the role doesn't match, redirect to their home
  if (allowedRole && userRole !== allowedRole) {
    if (userRole === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/student/home" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
