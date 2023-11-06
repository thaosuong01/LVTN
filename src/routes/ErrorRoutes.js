const { default: Loadable } = require('components/Loadable');
const { lazy } = require('react');

const Error404 = Loadable(lazy(() => import('pages/error-pages/Error404')));
const Error403 = Loadable(lazy(() => import('pages/error-pages/Error403')));

// ==============================|| Error ROUTING ||============================== //
const ErrorRoutes = {
  path: '/',
  children: [
    {
      path: '403',
      element: <Error403 />
    },
    {
      path: '*',
      element: <Error404 />
    }
  ]
};

export default ErrorRoutes;
