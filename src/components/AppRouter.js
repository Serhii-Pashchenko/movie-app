import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import App from '../App';
import Login from '../pages/auth/Login';
import Registration from '../pages/auth/Registration';
import PostContainer from '../pages/dashboard/PostContainer';
import ErrorPage from '../pages/errorPage/errorPage';

export const RouteNames = {
  HOME: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  REGISTRATION: '/registration',
  USERS: '/users',
  ANYPATH: '*',
};

const AppRouter = () => {
  const { isAuth } = useAppSelector((state) => state.authReducer);

  const publicRouter = createBrowserRouter([
    {
      path: RouteNames.HOME,
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: RouteNames.LOGIN,
          element: <Login />,
        },
        {
          path: RouteNames.REGISTRATION,
          element: <Registration />,
        },
        {
          path: RouteNames.ANYPATH,
          element: <ErrorPage />,
        },
      ],
    },
  ]);

  const privateRouter = createBrowserRouter([
    {
      path: RouteNames.HOME,
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <PostContainer />,
        },
        {
          path: RouteNames.USERS,
          element: <PostContainer />,
        },
        {
          path: RouteNames.LOGIN,
          element: <Login />,
        },
        {
          path: RouteNames.REGISTRATION,
          element: <Registration />,
        },
        {
          path: RouteNames.ANYPATH,
          element: <ErrorPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={isAuth ? privateRouter : publicRouter} />;
};

export default AppRouter;
