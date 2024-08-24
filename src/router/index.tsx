import { Navigate, useRoutes } from 'react-router-dom';
import Loadable from '../components/Loadable';
import { lazy } from 'react';
import DashboardLayout from 'layouts/Dashboard';

export const Router = () =>
  useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/demo" replace />, index: true },
        { path: 'demo', element: <Home /> },
      ],
    },
    {
      path: '/demo/:demoid',
      element: <DashboardLayout />,
      children: [{ path: '', element: <Frames /> }],
    },
    {
      path: '/demo/:demoid/frame/:frameid',
      element: <DashboardLayout />,
      children: [{ path: '', element: <EditFrame /> }],
    },
    {
      path: '*',
      element: <DashboardLayout />,
      children: [{ path: '*', element: <h1>404</h1> }],
    },
  ]);

const Home = Loadable(lazy(() => import('pages/Home')));
const Frames = Loadable(lazy(() => import('pages/Frames')));
const EditFrame = Loadable(lazy(() => import('pages/EditFrame')));
