import Layout from 'components/Layout';
import Main from 'pages/main';
import SearchPage from 'pages/search';
import OneBook from 'pages/search/components/OneBook';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/:search',
        element: <SearchPage />,
      },
      {
        path: '/:search/:page/:id',
        element: <OneBook />,
      },
    ],
  },
]);

export default router;
