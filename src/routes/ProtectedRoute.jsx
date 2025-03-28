import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppContext } from '@/hooks/useAppContext';
import paths from '@/routes/paths';

const ProtectedRoute = () => {
  const { isLoggedIn } = useAppContext();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={paths.login} state={{ from: location }} replace />;
  }

  return <Outlet />; // Render the child route component if logged in
};

export default ProtectedRoute;
