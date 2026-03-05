import { createBrowserRouter, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Login from '../features/auth/Login';
import Dashboard from '../features/dashboard/Dashboard';
import Users from '../features/users/Users';
import UserDetail from '../features/users/UserDetail';
import KYC from '../features/kyc/KYC';
import Reports from '../features/reports/Reports';
import Moderation from '../features/moderation/Moderation';
import Events from '../features/events/Events';
import Analytics from '../features/analytics/Analytics';
import Settings from '../features/settings/Settings';
import Layout from '../components/layout/Layout';
import Subscriptions from '../features/subscriptions/Subscriptions';
import RoleManagement from '../features/RoleManagement/RoleManagement';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'users/:id',
        element: <UserDetail />,
      },
      {
        path: 'kyc',
        element: <KYC />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
      {
        path: 'moderation',
        element: <Moderation />,
      },
      {
        path: 'events',
        element: <Events />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'subscriptions',
        element: <Subscriptions />,
      },
      {
        path: 'rbac',
        element: <RoleManagement />,
      },
    ],
  },
]);