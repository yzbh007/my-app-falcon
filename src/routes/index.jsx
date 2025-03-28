import React, { Suspense, lazy } from 'react';
import { Navigate, createBrowserRouter, Outlet } from 'react-router-dom'; // Use react-router-dom
import AppProvider from '@/providers/AppProvide';
import App from '@/App';
import paths, { rootPaths } from '@/routes/paths';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ProtectedRoute from '@/routes/ProtectedRoute'; // Import ProtectedRoute
import AuthRedirectRoute from '@/routes/AuthRedirectRoute'; // Import AuthRedirectRoute

// Layouts
//const MainLayout = lazy(() => import('@/layouts/MainLayout'));
const AuthLayout = lazy(() => import('@/layouts/AuthLayout'));
const ErrorLayout = lazy(() => import('@/layouts/ErrorLayout'));

// Pages
// Assuming Dashboard exists, adjust path if necessary
// If Dashboard is not in src/components/dashboard/, update the path accordingly.
// For now, let's use a placeholder.
// const Dashboard = lazy(() => import('../components/dashboard/Dashboard'));
const Error404 = lazy(() => import('@/components/errors/Error404'));
const Error500 = lazy(() => import('@/components/errors/Error500'));
const LoginForm = lazy(() => import('@/components/authentication/LoginForm'));
const ForgetPasswordForm = lazy(() => import('@/components/authentication/ForgetPasswordForm'));
// Add other page imports here as needed, e.g.:
// const Profile = lazy(() => import('../components/user/Profile'));
// const Settings = lazy(() => import('../components/user/Settings'));
// const Starter = lazy(() => import('../pages/Starter'));


// Helper function for Suspense fallback
const wrapSuspense = (Component, Layout = React.Fragment) => (
  <Suspense fallback={<LoadingSpinner size="60px" color="gray" />}>
    <Layout>
      <Component />
    </Layout>
  </Suspense>
);


const routes = [
  {
    // Wrap the root element with AppProvider
    element: (
      <AppProvider>
        <App />
      </AppProvider>
    ),
    children: [
      // Protected Routes (require login)
      {
        element: <ProtectedRoute />, // Wrap protected routes
        children: [
          {
            path: '/',
            //element: wrapSuspense(Outlet, MainLayout), // Use Outlet within MainLayout
            element: <div>MainLayout</div>, // Use Outlet within MainLayout
            children: [
              {
                index: true,
                // Use a placeholder if Dashboard component path is uncertain
                element: <div>Main Dashboard/Index Page</div> // wrapSuspense(Dashboard)
              },
              // Add other protected routes here, e.g., profile, settings
              // {
              //   path: rootPaths.userRoot,
              //   children: [
              //     { path: paths.userProfile, element: wrapSuspense(Profile) },
              //     { path: paths.userSettings, element: wrapSuspense(Settings) }
              //   ]
              // },
              // {
              //   path: rootPaths.pagesRoot,
              //   children: [
              //      { path: paths.starter, element: wrapSuspense(Starter) }
              //   ]
              // }
            ]
          }
        ]
      },
      // Auth Routes (redirect if logged in)
      {
        element: <AuthRedirectRoute />, // Wrap auth routes
        children: [
          {
            path: rootPaths.authRoot,
            element: wrapSuspense(Outlet, AuthLayout), // Use Outlet within AuthLayout
            children: [
              {
                path: paths.login,
                element: wrapSuspense(LoginForm)
              },
              {
                path: paths.forgotPassword,
                element: wrapSuspense(ForgetPasswordForm)
              }
            ]
          }
        ]
      },
      // Error Routes
      {
        path: rootPaths.errorsRoot,
        element: wrapSuspense(Outlet, ErrorLayout), // Use Outlet within ErrorLayout
        children: [
          {
            path: paths.error404,
            element: wrapSuspense(Error404)
          },
          {
            path: paths.error500,
            element: wrapSuspense(Error500)
          }
        ]
      },
      // Fallback Route (404)
      {
        path: '*',
        element: <Navigate to={paths.error404} replace />
      }
    ]
  }
];

export const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_PUBLIC_URL
});

// Removed default export to fix HMR issue
