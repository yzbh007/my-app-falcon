import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '@/hooks/useAppContext';

const AuthRedirectRoute = () => {
  const { isLoggedIn } = useAppContext();

  if (isLoggedIn) {
    // Redirect logged-in users away from auth pages (e.g., login, forgot password)
    // to the main application page.
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Render the auth page component if not logged in
};

export default AuthRedirectRoute;
