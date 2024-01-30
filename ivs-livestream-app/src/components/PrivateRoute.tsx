// PrivateRoute.tsx
import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect to the login page if the user is not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render the Outlet which will render child routes when the user is logged in
  return <Outlet />;
};

export default PrivateRoute;
