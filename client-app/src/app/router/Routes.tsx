import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom'
import App from '../layout/App'
import ActivityDashboard from '../layout/components/activities/dashboard/ActivityDashboard'
import ActivityForm from '../layout/components/activities/form/ActivityForm'
import ActivityDetails from '../layout/components/activities/details/ActivityDetails'
import TestErrors from '../layout/components/errors/TestError'
import NotFound from '../layout/components/errors/NotFound'
import ServerError from '../layout/components/errors/ServerError'
import LoginForm from '../layout/components/users/LoginForm'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'activities',
        element: <ActivityDashboard />,
      },
      {
        path: 'activities/:id',
        element: <ActivityDetails />,
      },
      {
        path: 'create-activity',
        element: <ActivityForm key='create' />,
      },
      {
        path: 'manage/:id',
        element: <ActivityForm key='manage' />,
      },
      {
        path: 'errors',
        element: <TestErrors />,
      },
      {
        path: 'not-found',
        element: <NotFound />,
      },
      {
        path: '*',
        element: <Navigate replace to='/not-found' />,
      },
      {
        path: 'server-error',
        element: <ServerError />,
      },
      {
        path: 'login',
        element: <LoginForm />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
